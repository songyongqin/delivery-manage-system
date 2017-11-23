/**
 * Created by jojo on 2017/8/21.
 */
import { routerRedux } from 'dva/router';
import moment from 'moment';
import * as service from './Service';
import { queryModelGenerator } from '../../utils/dvaModelGenerator';
import { commonCallConfig } from '../../configs/ExtraEffectsOptions';
import {
  NAMESPACE,
  PROTOCOL_TYPE_DATA_INDEX,
  protocolTypeList,
  URL_DATA_INDEX,
  SOURCE_IP_DATA_INDEX,
  SOURCE_PORT_DATA_INDEX,
  TARGET_IP_DATA_INDEX,
  TARGET_PORT_DATA_INDEX,
  REQUEST_DOMAIN_DATA_INDEX,
  SENDER_DATA_INDEX,
  RECEIVE_DATA_INDEX
} from './ConstConfig'
moment.locale('zh-cn');

const baseModel = {
  namespace: NAMESPACE,
  state: {
    queryFilters: {
      timestampRange: [],
      [PROTOCOL_TYPE_DATA_INDEX]: protocolTypeList[0],
      [URL_DATA_INDEX]: "",
      [SOURCE_IP_DATA_INDEX]: "",
      [SOURCE_PORT_DATA_INDEX]: "",
      [TARGET_IP_DATA_INDEX]: "",
      [TARGET_PORT_DATA_INDEX]: "",
      [REQUEST_DOMAIN_DATA_INDEX]: "",
      [SENDER_DATA_INDEX]: "",
      [RECEIVE_DATA_INDEX]: "",
      value: "",
      limit: 10,
      page: 1
    },
    queryResults: {
      total: 0,
      data: []
    }
  },
  effects: {

  }
};

const payloadFilter = payload => {
  return {
    data: payload.data,
    total: payload.total,
  }
}

export default queryModelGenerator({
  model: baseModel,
  queryService: service.get,
  payloadFilter,
  callConfig: commonCallConfig
});
