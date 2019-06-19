import { LAYOUT_NAMESPACE } from 'constants/model'
import { DARK_THEME, LIGHT_THEME } from 'constants/theme'
import { getCache, setCache, throttle } from 'utils'
import combineNamespace from 'domainUtils/combineNamespace'
import { getOverTime } from 'utils/getInitTime'
import { getTimeConfig } from '../services/user'

const LAYOUT_CACHE_NAMESPACE = combineNamespace("@@__layout__@@")

const initTimeConfigNum = 3

const defaultInitState = {
  theme: LIGHT_THEME,
  navMini: true,
  animate: true,
  initTimeStampRange: getOverTime(initTimeConfigNum),
  commonLayout: {
    darkTheme: false
  }
}

const getInitState = () => {
  try {
    const layout = getCache(LAYOUT_CACHE_NAMESPACE) || defaultInitState
    return {
      ...layout,
      initRoutes: [],
      overdueTipVisible: false,

      timestampRange: defaultInitState.initTimeStampRange
    }
  } catch (e) {
    return defaultInitState
  }
}

const initState = {
  ...getInitState(),
  theme: LIGHT_THEME,
}

const reducers = {
  _changeTheme: (preState, { payload }) => {
    return {
      ...preState,
      theme: payload
    }
  },
  _changeNavStatus: (preState, { payload }) => {
    return {
      ...preState,
      navMini: payload
    }
  },
  saveInitRoutes: (preState, { payload }) => {
    return {
      ...preState,
      initRoutes: [...new Set([...preState.initRoutes, payload])]
    };
  },
  saveOverdueTipVisible: (preState, { payload }) => {
    return {
      ...preState,
      overdueTipVisible: payload
    }
  },

  changeSelectTime: (state, { payload }) => {
    return { ...state, timestampRange: payload }
  },
  setInitConfig: (state, { payload }) => {
    return { ...state, ...payload}
  },
}

const effects = {
  changeTheme: function* ({ payload }, { put, select }) {

    const preState = yield select(store => store[LAYOUT_NAMESPACE])

    setCache(LAYOUT_CACHE_NAMESPACE, { ...preState, theme: payload })

    yield put({
      type: "_changeTheme",
      payload
    })

  },
  changeNavStatus: function* ({ payload }, { put, select }) {

    const preState = yield select(store => store[LAYOUT_NAMESPACE])

    setCache(LAYOUT_CACHE_NAMESPACE, { ...preState, navMini: payload })

    yield put({
      type: "_changeNavStatus",
      payload
    })

  },
  //payload为true时，同时修改layout中timestampRange的值
  getConfiForTime: function* ({ payload }, { call, put, select }) {
    const res = yield call(getTimeConfig)
    if(res&&res.status===1){
      const { timeConfig=initTimeConfigNum } = res.payload
      const initTimeStampRange = getOverTime(timeConfig)
      let obj = payload ? { initTimeStampRange, timestampRange: initTimeStampRange }: { initTimeStampRange } 
      yield put({
        type: "setInitConfig",
        payload: obj
      })
    }
    


  },
}

export default {
  namespace: LAYOUT_NAMESPACE,
  state: initState,
  reducers,
  effects,
  subscriptions: {
    setup: ({ dispatch }) => {

      const adjustNavStatus = throttle(() => {
        const viewWidth = window.document.body.clientWidth
        dispatch({
          type: "_changeNavStatus",
          payload: viewWidth < 1100
        })
      }, 1000)

      adjustNavStatus()

      window.addEventListener("resize", adjustNavStatus)
      dispatch({type: "getConfiForTime", payload:true})
    }
  }
}