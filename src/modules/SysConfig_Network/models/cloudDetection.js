import * as service from '../Service'
import { queryModelGenerator } from 'utils/dvaModelGenerator'
import { commonCallConfig } from 'configs/ExtraEffectsOptions'
import {
  CLOUD_DETECTION_NAMESPACE,
  CONNECT_CLOUD_DATA_INDEX,
  OPEN_DATA_INDEX
} from '../ConstConfig'
import { delay } from 'utils/tools'

const baseModel = {
  namespace: CLOUD_DETECTION_NAMESPACE,
  state: {
    queryFilters: {
    },
    queryResults: {
      [CONNECT_CLOUD_DATA_INDEX]: 0,
      [OPEN_DATA_INDEX]: 0
    }
  },
  effects: {
    *put({ resolve, payload }, { callWithExtra }) {

      yield delay(500)

      const res = yield callWithExtra(
        service.putCloudDetectionConfig,
        { ...payload || {} },
        commonCallConfig
      )

      if (res.status === 1) {
        resolve && resolve(res.payload)
      }
    }
  }
}

const payloadFilter = (payload) => {
  return payload
}

const queryService = service.getCloudDetectionConfig

export default queryModelGenerator({
  model: baseModel,
  payloadFilter,
  callConfig: commonCallConfig,
  queryService,
  // initPath:"/sys-config/network"
});
