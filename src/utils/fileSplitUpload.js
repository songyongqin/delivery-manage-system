export const uploadFile = ({ url, headers = {}, body, onProgress }) => {

  const xhr = new XMLHttpRequest();

  xhr.open("PUT", url);
  xhr.overrideMimeType("application/octet-stream");

  Object.entries(headers).forEach(([key, value]) => {
    xhr.setRequestHeader(key, value)
  })

  xhr.upload.addEventListener("progress", onProgress, false)

  xhr.send(body)

  return new Promise((resolve, reject) => {
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        try {
          resolve(JSON.parse(xhr.responseText))
        } catch (e) {
          console.error(`fileSplitUpload:`, e)
          resolve(xhr.responseText)
        }
      }
      if (xhr.readyState === 4 && xhr.status !== 200) {
        resolve({ status: -1, message: xhr.responseText })
      }
    }

  })
}


export const splitFileToChunk = (file, chunkSize = 1014 * 1024 * 2) => {


  let chunkCount = Math.ceil(file.size / chunkSize),
    chunkList = [];

  new Array(chunkCount).fill("").forEach((i, index) => {
    chunkList.push({
      name: file.name,
      chunk: file.slice(index * chunkSize, (index + 1) * chunkSize)
    })
  })

  return chunkList

}

