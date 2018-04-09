import { MANAGER_VM_NAMESPACE } from 'constants/model'
import {
  fetchVM,
  deleteVM,
  postVM,
  putVM
} from '../services'
import commonEffectCreator from 'domainUtils/commonEffectCreator'

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
    updateLastReqTime: function* (_, { put }) {
      yield put({
        type: "_updateLastReqTime",
        payload: new Date().getTime()
      })
    }
  }
}