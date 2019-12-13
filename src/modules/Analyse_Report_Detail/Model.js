// import { routerRedux } from 'dva/router';
import * as service from './Service';
// import * as tools from '../../utils/tools';
// import { commonCallConfig } from '../../configs/extraEffectsOptions';




export default {
  namespace: 'report',
  state: {
    data: {},
  },
  reducers: {
    saveResult(preState, { payload }) {
      return {
        ...preState,
        data: payload,
      }
    },
  },
  effects: {
    /*
    *
    * */
    *getReport({ payload, resolve, reject }, { call, put, select, callWithExtra, callWithStatusHandle }) {
      const res = yield call(service.queryDetail, payload);
      if (res.status === 1) {
        const data = res.payload.data[0].data;
        resolve && resolve(data)
      }
      else {
        reject && reject(res.payload)
      }

    },
    

    // *getResult({ payload, resolve, reject }, { call, put, select, callWithExtra, callWithStatusHandle }) {
    //   const fileResult = yield select(state => state.detail.fileResult);

    //   const detail = JSON.stringify(fileResult) == '{}';
    //   if (!detail) {
    //     return yield put({
    //       type: "saveResult",
    //       payload: fileResult
    //     })
    //   }
    //   else {
    //     return null
    //   }
    // },
    /*
    *
    * */

  },
  subscriptions: {
    // setup({ history, dispatch }) {
    //   // 监听 history 变化，当进入 `/` 时触发 `load` action
    //   return history.listen(({ pathname, search }) => {

    //     if (pathname === "/query/detail/") {

    //       dispatch({
    //         type: "getResult"
    //       });
    //     }
    //   });
    // },
  },
};
