import isSuccess from 'domainUtils/isSuccess'
import { message as Message } from 'antd'
import ApiConfig from 'services/apiConfig'
const httpApi = ApiConfig.http
import { routerRedux } from 'dva/router'
import { Modal } from 'antd'
import { delUserData } from 'domain/user'
import { setOverdueStatus } from 'domain/licence'
import { MANAGER_DEVICE_URL } from 'routes/config/path'
import { getAppInstance } from 'domain/instance'

Message.config({
  duration: 5,
  top: 70
})

const isIgnoreApi = (url: string, options: object) => {
  return [httpApi.CREATE_STATUS, httpApi.USER_SIGN].includes(url)
}

const handleSignInOverdue = () => {
  //弹出登录超时的提示 点击确定后 清除用户本地信息 重新加载页面
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
  //保存设备授权过期状态
  setOverdueStatus(true)
  //跳转到设备管理页面
  getAppInstance()._store.dispatch(routerRedux.push(MANAGER_DEVICE_URL))
  //改变layout model 中 overdueTipVisible的状态 
  getAppInstance()._store.dispatch({
    type: "layout/saveOverdueTipVisible",
    payload: true
  })
}

export default (url: string, options: object, result: any): void => {
  
  try {
    url = url.split("?")[0]
    //判断最终请求的结果是否成功 成功则直接不处理其他内容
    if (isSuccess(result) || isIgnoreApi(url, options)) {
      return
    }
    //若请求返回的status为-4 表示登录过期
    if (result.status === -4) {
      return handleSignInOverdue()
    }
    //status为-10 产品过期 进行过期处理
    if (result.status === -10) {
      return handleLicenceOverdue()
    }
    //其他错误状态 在全局发送一个错误信息提示
    Message.error(result.message || result.payload)
  } catch (e) {
    Message.error(e.message)
  }

}