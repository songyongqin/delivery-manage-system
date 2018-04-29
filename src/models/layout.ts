import { LAYOUT_NAMESPACE } from 'constants/model'
import { DARK_THEME, LIGHT_THEME } from 'constants/theme'
import { getCache, setCache, throttle } from 'utils'
import combineNamespace from 'domainUtils/combineNamespace'

const LAYOUT_CACHE_NAMESPACE = combineNamespace("@@__layout__@@")

const defaultInitState = {
  theme: LIGHT_THEME,
  navMini: true,
  animate: true,
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
      overdueTipVisible: false
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
  }
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

  }
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
    }
  }
}