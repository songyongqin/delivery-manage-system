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
import { DEBUG_MODE } from 'configs/ConstConfig'
import { Modal, message as Message } from 'antd'
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
      Mousetrap.bind(['command+alt+d+b', 'ctrl+alt+d+b'], function () {
        Modal.confirm({
          title: "DEBUG模式",
          content: "是否开启DEBUG模式，将关闭数据的加密和解密模块（关闭tab后重启可取消DEBUG模式）",
          okText: "确定",
          onOk: () => {
            sessionStorage.setItem(DEBUG_MODE, DEBUG_MODE)
            if (sessionStorage.getItem(DEBUG_MODE)) {
              Message.success("DEBUG模式开始成功")
            } else {
              Message.error("DEBUG模式开启失败")
            }
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
