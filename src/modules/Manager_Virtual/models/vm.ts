import { MANAGER_VM_NAMESPACE } from 'constants/model'
import {
  fetchVM,
  deleteVM,
  postVM,
  putVM,
  fetchVMOption,
  validate,
  fetchNodeIPList,
} from '../services'
import commonEffectCreator from 'domainUtils/commonEffectCreator'
import isSuccess from 'domainUtils/isSuccess'

export default {
  namespace: MANAGER_VM_NAMESPACE,
  state: {
    lastReqTime: 0,
  },
  reducers: {
    _updateLastReqTime: (preState, { payload }) => {
      return {
        ...preState,
        lastReqTime: payload
      }
    }
  },
  effects: {
    fetch: commonEffectCreator(fetchVM),
    putVM: commonEffectCreator(putVM, 500),
    postVM: commonEffectCreator(postVM, 500),
    deleteVM: commonEffectCreator(deleteVM, 500),
    fetchVMOption: commonEffectCreator(fetchVMOption),
    fetchNodeIP: commonEffectCreator(fetchNodeIPList),
    updateLastReqTime: function* ({ resolve }, { put }) {

      yield put({
        type: "_updateLastReqTime",
        payload: new Date().getTime()
      })

      resolve && resolve()
    },
    validate: function* ({ resolve, reject, payload }, { call }) {
      const res = yield call(validate, payload)

      if (isSuccess(res)) {
        resolve && resolve(res)
      }
      else {
        reject && reject(res.message)
      }
    }
  }
}