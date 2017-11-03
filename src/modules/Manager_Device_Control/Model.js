/**
 * Created by jojo on 2017/8/21.
 */
import { routerRedux } from 'dva/router';
import moment from 'moment';
import * as service from './Service';
import { queryModelGenerator } from '../../utils/dvaModelGenerator';
import { commonCallConfig } from '../../configs/ExtraEffectsOptions';
import { NAMESPACE } from './ConstConfig';

moment.locale('zh-cn');

const baseModel = {
  namespace: NAMESPACE,
  state: {
    queryFilters: {

    },
    queryResults: {
      "hostIp": "",
      "diskPer": 0,
      "licenceStatus": {
        "value": 0,
        "expiration": 0
      },
      "librayVersion": "",
      "appliactionVersion": "",
      "id": "",
      "deviceProps": [],
      "deviceId": ""
    }
  },
  effects: {
    postLicence: function* ({ payload, resolve }, { callWithExtra }) {
      const res = yield callWithExtra(
        service.postLicence,
        { data: payload },
        commonCallConfig
      )
      if (res.status === 1) {
        resolve && resolve(res.payload)
      }
    }
  }
};

const payloadFilter = (payload) => {
  return {
    ...payload
  }
};

const queryService = service.query;

export default queryModelGenerator({
  model: baseModel,
  payloadFilter,
  callConfig: commonCallConfig,
  queryService,
  initPath: "/manager/device"
});


