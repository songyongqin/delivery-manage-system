import { getToken } from 'domain/user'
import { HTTP_HEADERS_TOKEN_DATA_INDEX } from 'constants/user'
import { isSecret, encrypt } from 'domain/secret'
import UUID from 'uuid-js'
//页面初始化时，生成唯一的uuid
const uuid = UUID.create().toString()

const combinerAccessToken = (url: string, options?: any) => {
  try {
    //在http请求头添加 access-token 参数 , user-uuid 参数
    return {
      ...options,
      headers: {
        ...options.headers,
        [HTTP_HEADERS_TOKEN_DATA_INDEX]: getToken(),
        "user-uuid": uuid,
      }
    }
  } catch (e) {
    return options
  }
}

const encryptBody = (url: string, options?: any) => {
  //判断是否需要进行内容加密 
  if (isSecret() && typeof options.body === "string") {
    return {
      ...options,
      body: encrypt(options.body)
    }
  }

  return options
}

export default (url: string, options?: object) => {
  //  给发出的请求添加额外的请求参数
  options = combinerAccessToken(url, options)
  // 给发出的请求内容进行加密
  options = encryptBody(url, options)

  return options
}