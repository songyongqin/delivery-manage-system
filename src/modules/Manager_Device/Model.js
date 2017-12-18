import {
  NAMESPACE
} from './ConstConfig'
import * as service from './Service'
const SHOULD_EXPANDED_WIDTH_DIVIDE = 1600
import { OVER_DUE_NAMESPACE } from 'configs/ConstConfig'

const callConfig = {
  withStatusHandle: true,
  withTime: true,
}

export default {
  namespace: NAMESPACE,
  state: {
    versionColExpanded: true,
    overdueTipVisible: window.sessionStorage.getItem(OVER_DUE_NAMESPACE) === OVER_DUE_NAMESPACE,
  },
  reducers: {
    changeOverdueTipVisible: (preState, { payload }) => {
      return {
        ...preState,
        overdueTipVisible: payload
      }
    },
    changeColExpanded: (preState, { payload }) => {
      return {
        ...preState,
        versionColExpanded: payload,
      }
    }
  },
  effects: {
    throttleChangeColExpanded: function* ({ payload }, { select, put }) {
      const versionColExpanded = yield select(state => state[NAMESPACE].versionColExpanded);
      if (versionColExpanded === payload) {
        return;
      }
      yield put({
        type: "changeColExpanded",
        payload
      })
    },
    postLicence: function* ({ payload, resolve }, { callWithExtra }) {
      const res = yield callWithExtra(
        service.postLicence,
        { data: payload },
        callConfig
      )
      if (res.status === 1) {
        resolve && resolve(res.payload)
      }
    },
    getUpdateInfoLocal: function* ({ payload, resolve, productType }, { callWithExtra }) {
      const res = yield callWithExtra(
        service.getUpdateServiceHandle(productType).getVersionInfoLocal,
        payload,
        callConfig
      )
      if (res.status === 1) {
        resolve && resolve(res.payload)
      }
    },
    getUpdateInfoRemote: function* ({ payload, resolve, productType }, { callWithExtra }) {
      const res = yield callWithExtra(
        service.getUpdateServiceHandle(productType).getVersionInfoRemote,
        payload,
        callConfig
      )
      if (res.status === 1) {
        resolve && resolve(res.payload)
      }
    },
    updateRemote: function* ({ payload, resolve, productType }, { callWithExtra }) {
      const res = yield callWithExtra(
        service.getUpdateServiceHandle(productType).updateRemote,
        payload,
        callConfig
      )
      if (res.status === 1) {
        resolve && resolve(res.payload)
      }
    },
    updateLocal: function* ({ payload, resolve, productType }, { callWithExtra }) {
      const res = yield callWithExtra(
        service.getUpdateServiceHandle(productType).updateLocal,
        payload,
        callConfig
      )
      if (res.status === 1) {
        resolve && resolve(res.payload)
      }
    },
    clean: function* ({ payload, resolve, }, { callWithExtra }) {
      const res = yield callWithExtra(
        service.clean,
        payload,
        callConfig
      )
      if (res.status === 1) {
        resolve && resolve(res.payload)
      }
    },
  },
  subscriptions: {
    setup: ({ history, dispatch }) => {

      dispatch({
        type: "throttleChangeColExpanded",
        payload: window.innerWidth > SHOULD_EXPANDED_WIDTH_DIVIDE
      })

      window.addEventListener("resize", () => {
        dispatch({
          type: "throttleChangeColExpanded",
          payload: window.innerWidth > SHOULD_EXPANDED_WIDTH_DIVIDE
        })
      })
    }
  }
}