import { SET_UP_NAMESPACE } from 'constants/model'
import { initAppConfig as initAppConfigService } from 'domain/app'

const initEffectCreator = (payload) => {
  return function* (_, { call, put }) {
    try {

      const result = yield call(initAppConfigService)

      yield put({
        type: "updateInitialDependenciesStatus",
        payload: payload || {}
      })

    } catch (e) {
      yield put({
        type: "initError"
      })
    }
  }
}

export default {
  namespace: SET_UP_NAMESPACE,
  state: {
    initial: false,
    initialError: false,
    initialDependencies: {
      appConfig: false,
      locale: false
    }
  },
  reducers: {
    updateInitialDependenciesStatus: (preState, { payload }) => {
      return {
        ...preState,
        initialDependencies: {
          ...preState.initialDependencies,
          ...payload
        }
      }
    },
    updateInitialStatus: (preState, { payload }) => {
      return {
        ...preState,
        initial: payload
      }
    },
    initError: (preState, { payload }) => {
      return {
        ...preState,
        initialError: true
      }
    },
  },
  effects: {
    initAppConfig: initEffectCreator({ app: true }),
    setup: function* (_, { put, take }) {

      yield put({
        type: "initAppConfig"
      })

      yield take("initAppConfig/@@end")

      yield put({
        type: "updateInitialStatus",
        payload: true
      })
    }
  },
  subscriptions: {
    setup: ({ dispatch }) => {
      dispatch({
        type: "setup"
      })
    }
  }
}