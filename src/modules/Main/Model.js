/**
 * Created by jojo on 2017/8/21.
 */
import { routerRedux } from 'dva/router';
import moment from 'moment';
import * as service from './Service';
import { queryModelGenerator } from '../../utils/dvaModelGenerator';
import { commonCallConfig } from '../../configs/ExtraEffectsOptions';
import {
  EVENT_ACTION_DATA_INDEX,
  EVENT_TYPE_DATA_INDEX,
  NAMESPACE
} from './ConstConfig.js'
import Mousetrap from 'mousetrap'
import { DEBUG_MODE, SECRET_KEY_NAMESPACE, IV_NAMESPACE } from 'configs/ConstConfig'
import { Modal, message as Message, Input } from 'antd'
moment.locale('zh-cn');




const baseModel = {
  namespace: NAMESPACE,
  state: {
    queryResults: {

    }
  },
  effects: {
  },
  subscriptions: {
    setup: ({ history, dispatch }) => {

      let debugModalRef = null,
        secretKeyModalRef = null

      //debug窗口快捷监听
      Mousetrap.bind(['command+alt+b', 'ctrl+alt+b'], function () {

        if (debugModalRef) {
          debugModalRef.destroy()
          debugModalRef = null
          return false
        }

        debugModalRef = Modal.confirm({
          title: "DEBUG模式",
          content: "是否开启DEBUG模式，将关闭数据的加密和解密模块（关闭tab后重启或注销登录可取消DEBUG模式）",
          okText: "确定",
          onOk: () => {
            debugModalRef = null
            sessionStorage.setItem(DEBUG_MODE, DEBUG_MODE)
            if (sessionStorage.getItem(DEBUG_MODE)) {
              Message.success("DEBUG模式开始成功,等待窗口刷新..")
              setTimeout(() => {
                window.location.reload()
              }, 1200)
            } else {
              Message.error("DEBUG模式开启失败")
            }

          }
        })

        return false;
      });



      //secret窗口快捷监听
      let secretKey = "", iv = ""
      Mousetrap.bind(['command+alt+k', 'ctrl+alt+k'], function () {

        if (secretKeyModalRef) {
          secretKeyModalRef.destroy()
          secretKeyModalRef = null
          return false
        }

        secretKeyModalRef = Modal.confirm({
          title: "SECRET KEY设置",
          content: <p>
            设置临时的SECRET KEY 和 IV（关闭tab后重启或注销登录可清除）<br />
            设置的内容将会覆盖代码内置的 SECRET KEY 和 IV
            <Input
              style={{ "marginBottom": "15px" }}
              placeholder="请输入key"
              onChange={e => secretKey = e.target.value}
              defaultValue={window.sessionStorage.getItem(SECRET_KEY_NAMESPACE)}>
            </Input>
            <Input
              placeholder="请输入iv"
              onChange={e => iv = e.target.value}
              defaultValue={window.sessionStorage.getItem(IV_NAMESPACE)}>
            </Input>
          </p>,
          okText: "确定",
          onOk: () => {
            sessionStorage.setItem(SECRET_KEY_NAMESPACE, secretKey)
            sessionStorage.setItem(IV_NAMESPACE, iv)
            secretKey = ""
            iv = ""
            secretKeyModalRef = null

            Message.success(`${SECRET_KEY_NAMESPACE}设置成功，等待窗口刷新..`)

            setTimeout(() => {
              window.location.reload()
            }, 1200)


          }
        })

        return false;
      });
    }
  }
};

const payloadFilter = (payload) => {
  return {
    ...payload
  }
};



export default queryModelGenerator({
  model: baseModel,
  queryService: service.get,
  payloadFilter,
  callConfig: commonCallConfig,
});
