import { getToken } from 'domain/user'
import { HTTP_HEADERS_TOKEN_DATA_INDEX } from 'constants/user'
import { isSecret, encrypt } from 'domain/secret'
import UUID from 'uuid-js'

const uuid = UUID.create().toString()

const combinerAccessToken = (url: string, options?: any) => {
  try {
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