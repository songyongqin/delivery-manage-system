import { MANAGER_DEVICE_HONEYPOT_STANDALONE_NAMESPACE } from 'constants/model'
import {
  fetchDeviceHoneypotStandalone,
  fetchDeviceHoneypotStandaloneDisk,
  putDeviceHoneypotStandaloneDisk,
  postLicence,
  postDisk,
  updateByLocal,
  fetchVersionInfoByLocal,
  updateByRemote,
  getupdateByRemote,
  fetchVersionInfoByRemote,
  updateRemoteProgress
} from '../services'
import isSuccess from 'domainUtils/isSuccess'
import { delay } from 'utils'
import commonEffectCreator from 'domainUtils/commonEffectCreator'

export default {
  namespace: MANAGER_DEVICE_HONEYPOT_STANDALONE_NAMESPACE,
  state: {
    percent: 0,
    progressState: -1,
  },

  effects: {
    fetch: commonEffectCreator(fetchDeviceHoneypotStandalone),
    fetchDeviceDisk: commonEffectCreator(fetchDeviceHoneypotStandaloneDisk),
    putDeviceDisk: commonEffectCreator(putDeviceHoneypotStandaloneDisk, 500),
    postLicence: commonEffectCreator(postLicence, 500),
    postDisk: commonEffectCreator(postDisk, 500),
    fetchVersionInfoByLocal: commonEffectCreator(fetchVersionInfoByLocal),
    updateByLocal: commonEffectCreator(updateByLocal),
    fetchVersionInfoByRemote: commonEffectCreator(fetchVersionInfoByRemote),
    updateByRemote: commonEffectCreator(updateByRemote),
    getupdateByRemote: commonEffectCreator(getupdateByRemote),
    updateRemoteProgress: function* ({ resolve, reject, payload }, { call, put }) {
      const res = yield call(updateRemoteProgress, payload)

      yield delay(0)

      if (isSuccess(res)) {
        yield put({
          type: "savePercent",
          payload: {
            percent: res.payload.percent,
            progressState: res.payload.progressState
          }
        });
        resolve && resolve(res.payload)
      }
      else {
        reject && reject(res.message)
      }
    },
  },
  reducers: {
    savePercent: (preState, { payload }) => {
      return {
        ...preState,
        percent: payload.percent,
        progressState: payload.progressState
      }
    }
  }
}