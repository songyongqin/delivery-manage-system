/** 
 * 改部分为大文件切割传输的函数
 * 
*/


interface UploadFileParams {
  url: string,
  headers?: object,
  body?: any
}

interface UploadFileChunkFn {
  (params: UploadFileParams): Promise<object>
}


export const uploadFileChunk: UploadFileChunkFn = (params) => {

  const { url = "", headers = {}, body } = params

  const xhr = new XMLHttpRequest()
  xhr.open("PUT", url)
  xhr.overrideMimeType("application/octet-stream")

  Object.entries(headers).forEach(([key, value]) => {
    xhr.setRequestHeader(key, value)
  })

  xhr.send(body)

  return new Promise((resolve, reject) => {
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        try {
          resolve(JSON.parse(xhr.responseText))
        } catch (e) {
          reject({ status: -1, e: e.message })
        }
      }
      if (xhr.readyState === 4 && xhr.status !== 200) {
        resolve({ status: -1, message: xhr.responseText })
      }
    }
  })

}


interface ChunkItem {
  name: string,
  chunk: Blob
}

interface SplitFileToChunkListFn {
  (file: File, chunkSize?: number): ChunkItem[]
}


//将文件按照chunkSize（KB）分片 返回一个array
export const splitFileToChunkList: SplitFileToChunkListFn = (
  file,
  chunkSize = 1024 * 1024 * 2
) => {

  return new Array(Math.ceil(file.size / chunkSize))
    .fill("")
    .map((i, index) => ({
      name: file.name,
      chunk: file.slice(index * chunkSize, (index + 1) * chunkSize)
    }))

}

