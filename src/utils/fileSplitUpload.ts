import { isSecret, encrypt } from 'domain/secret'
import { getToken } from 'domain/user'
import { HTTP_HEADERS_TOKEN_DATA_INDEX } from 'constants/user'
import setUrl from './setUrl'
import UUID from 'uuid-js'
const uuid = UUID.create().toString()

/**
 *上传文件到服务器上 
 */
export const uploadFile = ({ url, headers, body, onProgress = null }) => {

  const xhr = new XMLHttpRequest();

  //增加常规请求头
  let headerCommon = {
    [HTTP_HEADERS_TOKEN_DATA_INDEX]: getToken(),
        "user-uuid": uuid,
    ...headers
  }

  let urls = encodeURI(setUrl(url)) 
  xhr.open("PUT", urls);
  xhr.overrideMimeType("application/octet-stream");
  /**
   * 根据参数添加请求头
   */
  Object.entries(headerCommon).forEach(([key, value]) => {
    xhr.setRequestHeader(key, value as any)
  })

  xhr.upload.addEventListener("progress", onProgress, false)

  xhr.send(body)
  /**
   * 封装为promise对象返回
   */
  return new Promise((resolve, reject) => {
    xhr.onreadystatechange = () => {
      /**
       * 请求正常 返回结果
       */
      if (xhr.readyState === 4 && xhr.status === 200) {
        try {
          resolve(JSON.parse(xhr.responseText))
        } catch (e) {
          resolve(xhr.responseText)
        }
      }
      /**
       * 请求异常 返回异常结果
       * 需要判断是否需要加密返回的结果，解密操作统一由外部进行处理
       */
      const res = { status: -1, message: xhr.responseText }
      if (xhr.readyState === 4 && xhr.status !== 200) {
        resolve(isSecret ? encrypt(JSON.stringify(res)) : res)
      }
    }

  })
}

/**
 * 将传入的file文件进行切块处理 返回切割后的数组
 */
export const splitFileToChunk = (file, chunkSize = 1014 * 1024 * 2) => {


  let chunkCount = Math.ceil(file.size / chunkSize),
    chunkList = [];

  new Array(chunkCount).fill("").forEach((i, index) => {
    chunkList.push({
      name: file.name,
      chunk: file.slice(index * chunkSize, (index + 1) * chunkSize)//文件块 获取对应的二进制数据范围
    })
  })

  return chunkList

}

