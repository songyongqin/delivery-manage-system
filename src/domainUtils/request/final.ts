import isSuccess from 'domainUtils/isSuccess'
import { message as Message } from 'antd'

Message.config({
  duration: 5,
  top: 70
})

const isIgnoreApi = (url: string, options: object) => {
  return false
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