/**
 * Created by jojo on 2017/8/21.
 */
import { routerRedux } from 'dva/router';
import moment from 'moment';
import * as service from './Service';
import { queryModelGenerator } from '../../utils/dvaModelGenerator';
import { commonCallConfig } from '../../configs/ExtraEffectsOptions';
import { NAMESPACE } from './ConstConfig';
import { DISK_PER_DATAINDEX } from '../Manager_Device/ConstConfig'

moment.locale('zh-cn');

const baseModel = {
  namespace: NAMESPACE,
  state: {
    queryFilters: {
      limit: 20,
      page: 1,
      [DISK_PER_DATAINDEX]: 0,
    },
    queryResults: {
      total: 0,
      data: []
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
    total: payload.total,
    data: payload.data,
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

