import { MANAGER_DEVICE_IDS_STANDALONE_NAMESPACE } from 'constants/model'
import {
  fetchDeviceIDSStandalone,
  fetchDeviceIDSStandaloneDisk,
  putDeviceIDSStandaloneDisk,
  postLicence,
  postDisk,
  updateByLocalIDS,
  fetchVersionInfoByLocalIDS,
  updateByRemoteIDS,
  fetchVersionInfoByRemoteIDS,
  updateRemoteProgress,
  getupdateByRemote
} from '../services'
import commonEffectCreator from 'domainUtils/commonEffectCreator'
import isSuccess from 'domainUtils/isSuccess'
import { delay } from 'utils'

export default {
  namespace: MANAGER_DEVICE_IDS_STANDALONE_NAMESPACE,
  state: {
    // localUploadInfo: initLocalUploadInfo,
    percent: 0,
    progressState: -1,
  },
  effects: {
    fetch: commonEffectCreator(fetchDeviceIDSStandalone),
    fetchDeviceDisk: commonEffectCreator(fetchDeviceIDSStandaloneDisk),
    putDeviceDisk: commonEffectCreator(putDeviceIDSStandaloneDisk, 500),
    postLicence: commonEffectCreator(postLicence, 500),

    postDisk: commonEffectCreator(postDisk, 500),

    fetchVersionInfoByLocal: commonEffectCreator(fetchVersionInfoByLocalIDS),
    updateByLocal: commonEffectCreator(updateByLocalIDS),
    fetchVersionInfoByRemote: commonEffectCreator(fetchVersionInfoByRemoteIDS),
    updateByRemote: commonEffectCreator(updateByRemoteIDS),
    getupdateByRemote: commonEffectCreator(getupdateByRemote),

    updateRemoteProgress: function* ({ resolve, reject, payload }, { call, put }) {
      const res = yield call(updateRemoteProgress, payload)

      yield delay(0)

      if (isSuccess(res)) {
        console.info(res)
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
    },
  }
}