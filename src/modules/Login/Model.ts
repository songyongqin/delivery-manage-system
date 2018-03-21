import {
  NAMESPACE,
  POST_SIGN_ACTION,
  DEL_SIGN_ACTION,
  USER_ACCOUNT_DATA_INDEX,
  MODIFY_PASSWORD_ACTION
} from './ConstConfig'
import { DvaModel, DvaModelReducers } from 'interfaces/index'
import * as services from './Services'
import { LOGIN_URL, openRoutes, adminOnlyRoute, HOME_URL } from 'configs/RouteConfig'
import {
  COMMON_SUCCESS_STATUS,
  USER_DATA_CACHE_NAMESPACE,
  ADMIN_ROLE,
  LAST_TARGET_URL,
  ROLE_DATA_INDEX,
  VISIT_ROLE
} from 'configs/ConstConfig'
import { getCache, setCache, setTemp, delay, isNil, getTemp, delTemp } from 'utils/tools'
import { getUserData, setUserData, delUserData } from 'utils/domain'
import { OVERVIEW_URL } from 'routes/config/path'
import { routerRedux } from 'dva/router'

const getInitStates = () => {
  try {
    const cacheUserData = getUserData(),
      role = cacheUserData[ROLE_DATA_INDEX],
      isLogin = !isNil(role)

    return {
      userData: cacheUserData,
      isLogin: isLogin && role !== VISIT_ROLE,
      isAdmin: role === ADMIN_ROLE
    }

  } catch (e) {
    return {
      userData: {},
      isLogin: false,
      isAdmin: false,
    }
  }
}


const initStates = getInitStates()

const subscriptions = {
  setup: ({ dispatch, history }) => {
    return history.listen(({ pathname, search }) => {
      const open = openRoutes.includes(pathname)

      const initStates = getInitStates()
      if (pathname === LOGIN_URL && initStates.isLogin) {
        return dispatch({
          type: "redirect"
        })
      }

      if (!open && !initStates.isLogin) {
        setTemp(LAST_TARGET_URL, { [LAST_TARGET_URL]: pathname + search })
        return dispatch({
          type: "toLogin"
        })
      }
      if (adminOnlyRoute.includes(pathname) && !initStates.isAdmin) {
        return dispatch({
          type: "redirect"
        })
      }

    })
  }
}

const effects = {
  toLogin: function* ({ payload }, { call, put }) {
    yield put(routerRedux.push(LOGIN_URL))
  },
  redirect: function* ({ payload }, { call, put }) {
    //登陆后检测是否有被拦截的访问地址 有 则跳转到该链接 并清除缓存
    if (getTemp(LAST_TARGET_URL)) {
      yield put(routerRedux.push(getTemp(LAST_TARGET_URL)[LAST_TARGET_URL]))
      delTemp(LAST_TARGET_URL)

    } else {
      yield put(routerRedux.push(OVERVIEW_URL))
    }

  },
  getVerificationCode: [
    function* ({ payload }, { call, put }) {
      const res = yield call(services.getVerificationCode)
      return res
    },
    {
      type: "takeLatest"
    }
  ],
  [POST_SIGN_ACTION]: [
    function* ({ payload = {} }, { call, put }) {
      const res = yield call(services.postSign, payload)
      if (res.status === COMMON_SUCCESS_STATUS) {
        const finalPayload = {
          ...payload,
          ...res.payload
        }
        setUserData(finalPayload)

        window.location.reload()
      }
      return res
    },
    {
      type: "throttle",
      ms: 1000
    }
  ],
  [DEL_SIGN_ACTION]: [
    function* ({ payload }, { call, put }) {
      const res = yield call(services.delSign)
      delUserData()
      yield put(routerRedux.push(LOGIN_URL))
      return res
    },
    {
      type: "throttle",
      ms: 1000
    }
  ],
  [MODIFY_PASSWORD_ACTION]: [
    function* ({ payload = {}, resolve, reject }, { call, put }) {
      const res = yield call(services.modifyPassword, payload)

      if (res.status === COMMON_SUCCESS_STATUS) {
        resolve && resolve()
      }

    },
    {
      type: "throttle",
      ms: 1000
    }
  ]
}

const reducers: DvaModelReducers<any> = {
  save: (preState, { payload }) => {
    return { ...preState, ...payload };
  },
}

const model = {
  namespace: NAMESPACE,
  effects,
  subscriptions,
  state: initStates
};


export default model