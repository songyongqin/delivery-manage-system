import { routerRedux } from 'dva/router';
import moment from 'moment';
import * as service from '../Service';
import { queryModelGenerator } from '../../../utils/dvaModelGenerator';
import { commonCallConfig } from '../../../configs/ExtraEffectsOptions';
import { statisticDataIndexes } from '../ConstConfig';
import {
  NAMESPACE
} from '../ConstConfig'


moment.locale('zh-cn');



const baseModel = {
  namespace: NAMESPACE,
  state: {
    queryFilters: {
      timestampRange: [],
    },
    queryResults: {
      data: []
    }
  },
};

const payloadFilter = (payload) => {
  return {
    data: payload
  }
};

const queryService = service.get;

export default queryModelGenerator({
  model: baseModel,
  payloadFilter,
  callConfig: commonCallConfig,
  queryService,
  initPath: "/report"
});


