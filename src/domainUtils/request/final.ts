import isSuccess from 'domainUtils/isSuccess'
import { message as Message } from 'antd'
import ApiConfig from 'services/apiConfig'
const httpApi = ApiConfig.http
import { routerRedux } from 'dva/router'
import { Modal } from 'antd'
import { delUserData } from 'domain/user'
import { saveLicenceStatus } from 'domain/licence'
import { MANAGER_DEVICE_URL } from 'routes/config/path'

Message.config({
  duration: 5,
  top: 70
})

const isIgnoreApi = (url: string, options: object) => {
  return [httpApi.CREATE_STATUS].includes(url)
}

const handleSignInOverdue = () => {
  Modal.error({
    title: "登录超时",
    content: "登录超时,请重新登录",
    okText: "确定",
    onOk: () => {
      delUserData()
      window.location.reload()
    }
  })
}

const handleLicenceOverdue = () => {
  saveLicenceStatus(true)
  routerRedux.push(MANAGER_DEVICE_URL)
}

export default (url: string, options: object, result: any): void => {

  try {
    url = url.split("?")[0]
    if (isSuccess(result) || isIgnoreApi(url, options)) {
      return
    }
    if (result.status === -4) {
      return handleSignInOverdue()
    }
    if (result.status === -10) {
      return handleLicenceOverdue()
    }
    Message.error(result.message || result.payload)
  } catch (e) {
    Message.error(e.message)
  }

}