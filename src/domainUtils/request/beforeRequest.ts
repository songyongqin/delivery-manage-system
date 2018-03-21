import { getToken } from 'domain/user'
import { HTTP_HEADERS_TOKEN_DATA_INDEX } from 'constants/user'
import { isSecret, encrypt } from 'domain/secret'


const combinerAccessToken = (url: string, options?: any) => {
  try {
    return {
      ...options,
      headers: {
        ...options.headers,
        [HTTP_HEADERS_TOKEN_DATA_INDEX]: getToken()
      }
    }
  } catch (e) {
    return options
  }
}

const encryptBody = (url: string, options?: any) => {

  if (isSecret() && typeof options.body === "string") {
    return {
      ...options,
      body: encrypt(options.body)
    }
  }

  return options
}

export default (url: string, options?: object) => {

  options = combinerAccessToken(url, options)

  options = encryptBody(url, options)

  return options
}