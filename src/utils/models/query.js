import { throwError } from 'utils/tools'
import createSaveFilters from 'utils/reducers/saveFilters'
import createSaveResults from 'utils/reducers/saveResults'

const defaultResultFilter = res => res;

const FILTERS_STATE_KEY = "filters",
  RESULTS_STATE_KEY = "results",
  SAVE_FILTERS_REDUCER_KEY = "@@SAVE_FILTERS",
  SAVE_RESULTS_REDUCER_KEY = "@@SAVE_RESULTS",
  QUERY_EFFECT_KEY = "query",
  INIT_SUBSCRIPTION_KEY = "init",
  QUERY_INIT_REDUCER_KEY = "@@SET_INIT",
  INIT_STATE_KEY = "isInit",
  QUERY_INIT_EFFECT_KEY = "queryInit"

const defaultSagaOption = [
  {
    type: "throttle",
    ms: 1000,
  },
  {
    type: 'takeLatest'
  }

]

const defaultCallConfig = {
  withStatusHandle: true,
}

export default ({
  model = throwError("query model:model is required"),
  service = throwError("query model:service is required"),
  isSuccess = throwError("query model:isSuccess is required"),
  resultFilter = defaultResultFilter,
  initPath,
  cacheInit = true,
  callConfig = defaultCallConfig,
  sagaOption = defaultSagaOption
}) => {

  const {
    namespace = throwError("query model:namespace is required in model"),
    state = {},
    reducers = {},
    effects = {},
    subscriptions = {}
  } = model;

  const wrappedState = {
    [FILTERS_STATE_KEY]: {},
    [RESULTS_STATE_KEY]: {},
    ...state,
  }

  if (SAVE_FILTERS_REDUCER_KEY in reducers) {
    throwError(`query model:${SAVE_FILTERS_REDUCER_KEY} is already in model:${NAMESPACE} reducers`)
  }

  if (SAVE_RESULTS_REDUCER_KEY in reducers) {
    throwError(`query model:${SAVE_RESULTS_REDUCER_KEY} is already in model:${NAMESPACE} reducers`)
  }

  if (QUERY_INIT_REDUCER_KEY in reducers) {
    throwError(`query model:${QUERY_INIT_REDUCER_KEY} is already in model:${NAMESPACE} reducers`)
  }

  const wrappedReducers = {
    [SAVE_FILTERS_REDUCER_KEY]: createSaveFilters(FILTERS_STATE_KEY),
    [SAVE_RESULTS_REDUCER_KEY]: createSaveResults(RESULTS_STATE_KEY),
    [QUERY_INIT_REDUCER_KEY]: (preState) => {
      return {
        ...preState,
        [INIT_STATE_KEY]: true,
      }
    },
    ...reducers
  }

  if (QUERY_EFFECT_KEY in effects) {
    throwError(`query model:${QUERY_EFFECT_KEY} is already in model:${NAMESPACE} effects`)
  }

  const initFilters = wrappedState[FILTERS_STATE_KEY];

  const wrappedEffects = {
    ...effects,
    [QUERY_EFFECT_KEY]: [
      function* ({ resolve, payload = {} }, { put, callWithExtra, select }) {

        yield put({
          type: SAVE_FILTERS_REDUCER_KEY,
          payload,
        })

        const res = yield callWithExtra(
          service,
          payload,
          callConfig,
        )

        if (isSuccess(res)) {
          const store = yield select(state => state),
            filteredPayload = resultFilter(res, store)


          yield put({
            type: SAVE_RESULTS_REDUCER_KEY,
            payload: filteredPayload
          })

          resolve && resolve(filteredPayload)
        }

      },
      ...sagaOption
    ],
    [QUERY_INIT_EFFECT_KEY]: function* ({ resolve, payload }, { put, select }) {

      const state = yield select(state => state[namespace]),
        isInit = state[INIT_STATE_KEY]

      if (isInit && cacheInit) {
        return
      }

      yield put({
        type: QUERY_EFFECT_KEY,
        payload: initFilters
      })

      yield put({
        type: QUERY_INIT_REDUCER_KEY,
      })

    }
  }

  if (INIT_SUBSCRIPTION_KEY in subscriptions) {
    throwError(`query model:${INIT_SUBSCRIPTION_KEY} is already in model:${NAMESPACE} subscriptions`)
  }

  const wrappedSubscriptions = {
    ...subscriptions,
    [INIT_SUBSCRIPTION_KEY]: ({ history, dispatch }) => {
      if (!initPath) {
        return
      }
      return history.listen(({ pathname }) => {
        if (pathname === initPath) {
          dispatch({
            type: QUERY_INIT_EFFECT_KEY
          })
        }
      })
    }
  }

  return {
    ...model,
    state: wrappedState,
    reducers: wrappedReducers,
    effects: wrappedEffects,
    subscriptions: wrappedSubscriptions
  }

}