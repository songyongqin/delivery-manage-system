/**
 * Created by jojo on 2017/8/4.
 */
import { message as Message, Modal } from 'antd'
import app from '../index.js'
import { OVER_DUE_NAMESPACE } from 'configs/ConstConfig'
import { NAMESPACE as DEVICE_NAMESPACE } from 'modules/Manager_Device/ConstConfig'
import { routerRedux } from 'dva/router'

Message.config({
  duration: 3,
  top: 70,
})


/*
*  处理全局错误信息
*  ignoreActionTypes中保存不处理的action Type
* */

const overdueIgnoreActionTypes = ["user/postSign"]
const ignoreActionTypes = ["user/postSign", 'managerVirtual/getStatus']
function messageHandle(res, type) {

  if (res.status === -4 && res.status !== -10 && !ignoreActionTypes.includes(type)) {
    Modal.error({
      title: "登录超时",
      content: "登录超时，请重新登录",
      okText: "确定",
      onOk: () => {
        window.sessionStorage.clear()
        window.location.reload()
      }
    })
  }

  if (res.status === -10 && !overdueIgnoreActionTypes.includes(type)) {
    window.sessionStorage.setItem(OVER_DUE_NAMESPACE, OVER_DUE_NAMESPACE)
    app._store.dispatch(routerRedux.push("/manager/device"))
    if (window.location.hash.slice(1) === "/manager/device") {
      // window.location.reload()
      app._store.dispatch({
        type: `${DEVICE_NAMESPACE}/changeOverdueTipVisible`,
        payload: true
      })
    }
  }

  if (res.status !== -4 && res.status !== -10 && res.status !== 1 && !ignoreActionTypes.includes(type)) {
    Message.error(res.message || res.payload);
  }


}
/*
* 处理promise 的reject
* */
function rejectHandle(res, reject) {
  if (res.status !== 1) {
    reject && reject(res.message || res.payload);
  }
}

export default {
  *argsCombiner({ payload, resolve, reject }, { call, put, select }, args) {

    // const token=yield select(state=>state.user.token);
    //
    // return {
    //   token,
    // };
  },
  *statusHandle({ payload, resolve, reject, type }, { call, put }, res) {
    messageHandle(res, type);

    if (res.status !== -10) {
      rejectHandle(res, reject)
    }

    return;
  }
}

export const commonCallConfig = {
  withArgsCombiner: true,
  withStatusHandle: true,
  withLoading: true,
  withSetFilters: true,
  withTime: true,
}
