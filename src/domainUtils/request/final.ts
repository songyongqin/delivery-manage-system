import isSuccess from 'domainUtils/isSuccess'
import { message as Message } from 'antd'
import ApiConfig from 'services/apiConfig'
const httpApi = ApiConfig.http

Message.config({
  duration: 5,
  top: 70
})

const isIgnoreApi = (url: string, options: object) => {
  return [httpApi.CREATE_STATUS].includes(url)
}

export default (url: string, options: object, result: any): void => {

  try {
    url = url.split("?")[0]
    if (isSuccess(result) || isIgnoreApi(url, options)) {
      return
    }
    Message.error(result.message || result.payload)
  } catch (e) {
    Message.error(e.message)
  }

}