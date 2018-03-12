/**
 * Created by jojo on 2017/8/21.
 */
import moment from 'moment';
import * as service from './Service';
import { routerRedux } from 'dva/router';
import { commonCallConfig } from '../../configs/ExtraEffectsOptions';
import * as tools from '../../utils/tools';
import {
  ADMIN_ROLE,
  ROLE_DATAINDEX,
  USERACCOUNT_DATAINDEX,
  IDS,
  NODE,
  IDS_STAND_ALONE,
} from '../../configs/ConstConfig';
import { getVerificationCode } from './Service';
import { shouldIdsHideRouteList, shouldNodeHideRouteList, shouldIdsStandAloneHideRouteList } from 'configs/RouteConfig'
moment.locale('zh-cn');
import { OVER_DUE_NAMESPACE } from 'configs/ConstConfig'
const NAMESPACE = "user"

const callConfig = {
  withArgsCombiner: true,
  withStatusHandle: true,
  withLoading: true,
}

const baseModel = {
  namespace: NAMESPACE,
  state: {
    signin: !!tools.getTemp("userData"),
    userData: tools.getTemp("userData") || {},
    productType: tools.getTemp("productType") || { standalone: 0, type: "distribution" }
  },
  reducers: {
    setUserData(preState, { payload }) {
      return {
        ...preState,
        signin: true,
        userData: {
          ...preState.userData,
          ...payload || {}
        }
      }
    }
  },
  effects: {

    *putPassword({ payload, resolve }, { callWithExtra }) {

      const res = yield callWithExtra(
        service.putPassowrd,
        { ...payload || {} },
        callConfig
      );

      if (res.status === 1) {
        resolve && resolve();
      }

    },
    *postSign({ payload, resolve }, { callWithExtra, put, take }) {
      const res = yield callWithExtra(
        service.postSign,
        { ...payload || {} },
        commonCallConfig
      );
      if (res.status === -10) {
        window.sessionStorage.setItem(OVER_DUE_NAMESPACE, OVER_DUE_NAMESPACE)
      }
      if (res.status === 1 || res.status === -10) {

        const userData = {
          ...res.payload,
          userAccount: payload[USERACCOUNT_DATAINDEX],
          isAdmin: res.payload[ROLE_DATAINDEX] === ADMIN_ROLE
        }

        tools.setTemp("userData", userData);

        yield put({
          type: "setUserData",
          payload: {
            ...userData
          }
        })

        const productTypeRes = yield callWithExtra(
          service.getProductType,
          {},
          {
            withStatusHandle: true,
          }
        )

        if (productTypeRes.status === 1) {
          tools.setTemp("productType", productTypeRes.payload);
        }

        resolve && resolve();
      }

    },
    *deleteSign({ payload, resolve }, { callWithExtra, put }) {

      const result = yield callWithExtra(service.deleteSign, {}, callConfig)

      window.sessionStorage.clear();
      yield put(routerRedux.push('/login'));
      window.location.reload();
    },
    *redirect({ payload }, { call, put, select }) {
      const user = yield select(state => state.user);
      if (user.signin) {
        yield put(routerRedux.push('/'));
      }

    },
    *redirectMain({ payload }, { call, put, select }) {
      yield put(routerRedux.push('/'));
    },
    /*
     *
     * */
    *checkLogin({ payload }, { call, put, select }) {
      const user = yield select(state => state.user);

      if (!user.signin) {
        yield put(routerRedux.push('/login'));
      }

    },
    *checkAdmin({ payload }, { call, put, select }) {
      const user = yield select(state => state.user);

      if (!user.userData.isAdmin) {
        yield put(routerRedux.push('/'));
      }

    },
    *getVerificationCode({ payload, resolve }, { callWithExtra }) {
      const res = yield callWithExtra(service.getVerificationCode, {}, callConfig)

      if (res.status === 1) {
        resolve(res.payload)
      }
    }
  },
  subscriptions: {
    setup({ history, dispatch }) {
      // 监听 history 变化，当进入 `/` 时触发 `load` action

      const adminOnlyRoutes = ["/sys-config", "/user-manager", "/sys-log/login"];

      const idsRouteBlackList = shouldIdsHideRouteList

      const nodeRouteBlackList = shouldNodeHideRouteList

      const productType = (tools.getTemp("productType") || {}).type

      const snort = (tools.getTemp("productType") || {}).snort === 1

      return history.listen(({ pathname }) => {

        if ((!snort) && pathname === "/snort") {
          return dispatch({
            type: "redirect"
          })
        }

        if (pathname === "/login") {
          return dispatch({
            type: "redirect"
          });
        }

        if (shouldIdsStandAloneHideRouteList.includes(pathname) && productType === IDS_STAND_ALONE)

          if (nodeRouteBlackList.includes(pathname) && productType === NODE) {
            return dispatch({
              type: "redirectMain"
            });
          }

        if (idsRouteBlackList.includes(pathname) && productType === IDS) {
          return dispatch({
            type: "redirectMain"
          });
        }

        if (adminOnlyRoutes.includes(pathname)) {
          return dispatch({
            type: "checkAdmin"
          })
        }


        dispatch({
          type: "checkLogin"
        });

      });
    },
  },
};

export default baseModel;


// user active listener , send a request to server for keep active status
// debounceTime:number   judge active 
const initActiveListener = (debounceTime = 10) => {

  let lastActiveTime = new Date().getTime()

  window.addEventListener("click", () => {
    // console.info("click")
    lastActiveTime = new Date().getTime()
  })

  window.addEventListener("keydown", () => {
    // console.info("keydown")
    lastActiveTime = new Date().getTime()
  })

  setInterval(() => {

    const timeDiff = Math.floor((new Date().getTime() - lastActiveTime) / 1000)

    if (timeDiff < debounceTime) {
      service.postUserActive({}).catch(e => console.error(e))
    }
    // timeDiff < debounceTime
    //   ?
    //   console.info("is active")
    //   :
    //   console.info("is not active")

  }, 1000 * debounceTime);

}


const DE_BOUNCE_TIME_SECOND = 10

try {
  const userData = tools.getTemp("userData")
  if (userData) {
    initActiveListener(DE_BOUNCE_TIME_SECOND);
  }


} catch (e) {
  console.info('active', e)
}


/******************Heart beat / Admin **************/


const heartBeatListener = (time) => {

  setInterval(() => {

    service.postAdminHeartBeat({}).catch(e => console.info(e))

  }, time * 1000)

}

const HEART_BEAT_TIMING = 30;


try {
  const { isAdmin } = tools.getTemp("userData")
  if (isAdmin) {
    heartBeatListener(HEART_BEAT_TIMING)
  }
} catch (e) {
  console.info(`heart beat:`, e)
}
