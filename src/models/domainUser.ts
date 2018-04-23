import * as services from 'services/user'
import { getCache, setCache, setTemp, delay, isNil, getTemp, delTemp } from 'utils'
import { adminOnly, openRouteList } from 'routes/config/auth'
import { getUserData, setUserData, delUserData } from 'domain/user'
import { OVERVIEW_URL, LOGIN_URL, ROOT_URL } from 'routes/config/path'
import { routerRedux } from 'dva/router'
import { ROLE_DATA_INDEX, VISIT_ROLE, ADMIN_ROLE } from 'constants/user'
import { DOMAIN_USER_NAMESPACE } from 'constants/model'
import isSuccess from 'domainUtils/isSuccess'
import { getAuthRoutes, getDefaultRoute } from 'navConfig'
import { getAppConfig } from 'domain/app'
import { fetchBaseInfo } from 'services/user'
let basicInfo = {}

export const getIP = () => {
  return basicInfo["ip"]
}

const initBasicInfo = () => {
  fetchBaseInfo().then(res => {
    if (isSuccess(res)) {
      basicInfo = res.payload
    }
  })
}


const LAST_TARGET_URL = "@@__last_target_url__@@"
const openRoutes = openRouteList,
  adminOnlyRoute = adminOnly

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


const subscriptions = {
  setup: ({ dispatch, history }) => {

    initBasicInfo()

    return history.listen(({ pathname, search }) => {
      const open = openRoutes.includes(pathname)

      const authRoutes = getAuthRoutes({ admin: true })

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

      // if (adminOnlyRoute.includes(pathname) && !initStates.isAdmin) {
      //   return dispatch({
      //     type: "redirect"
      //   })
      // }
      // if (!authRoutes.includes(pathname)) {
      //   return dispatch({
      //     type: "redirect"
      //   })
      // }

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
      yield put(routerRedux.push(getDefaultRoute(ROOT_URL)))
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
  postSign: [
    function* ({ payload = {} }, { call, put }) {
      const res = yield call(services.postSign, payload)
      if (isSuccess(res)) {
        const finalPayload = {
          ...payload,
          ...res.payload
        }
        setUserData(finalPayload)
        yield delay(500)
        window.location.reload()
      }
      return res
    },
    {
      type: "throttle",
      ms: 1000
    }
  ],
  delSign: [
    function* ({ payload }, { call, put }) {
      const res = yield call(services.delSign)
      delUserData()
      // window.location.href = LOGIN_URL
      window.location.reload()
      return res
    },
    {
      type: "throttle",
      ms: 1000
    }
  ],
  modifySign: [
    function* ({ payload = {}, resolve, reject }, { call, put }) {
      const res = yield call(services.modifyPassword, payload)

      if (isSuccess(res)) {
        resolve && resolve()
      }

    },
    {
      type: "throttle",
      ms: 1000
    }
  ]
}

const reducers = {
  save: (preState, { payload }) => {
    return { ...preState, ...payload }
  },
}


export default {
  namespace: DOMAIN_USER_NAMESPACE,
  effects,
  subscriptions,
  state: getInitStates()
}