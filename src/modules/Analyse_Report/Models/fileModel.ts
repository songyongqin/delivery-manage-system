
import { NAMESPACE, NAMESPACE_FILE, FETCH_FILE_REPORT_ACTION } from '../ConstConfig'
import { DvaModel } from 'interfaces/index'
import * as Services from '../Services'
import moment from 'moment'
// import { COMMON_SUCCESS_STATUS } from 'configs/ConstConfig'
// import { FETCH_DETECTION_ACTION } from 'modules/Detection/ConstConfig'
// import { HOME_URL } from 'configs/RouteConfig'  无效
const model: DvaModel<any> = {

  namespace: NAMESPACE_FILE,

  state: {
    data: [],
    loading: false,
    timestampRange: [],
    page: 1,
    limit: 30,
    total: 0,
    fileName: "",
    md5: "",
    fileType: [],
    threatType: [],
    judge: [],
    sate:0,
    reportData: [],
    lastChangeTime: -1
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        // if (pathname === HOME_URL) {

        //   dispatch({
        //     type: FETCH_FILE_REPORT_ACTION,
        //     payload: {
        //       page: 1,
        //       timestampRange: [],
        //       limit: 3
        //     }
        //   })
        // }
      });
    },

  },

  effects: {
    * fetch({ payload }, { select, call, put }) {
      const fileName = yield select(state => state[NAMESPACE_FILE].fileName);
      const md5 = yield select(state => state[NAMESPACE_FILE].md5);
      const fileType = yield select(state => state[NAMESPACE_FILE].fileType);
      const threatType = yield select(state => state[NAMESPACE_FILE].threatType);
      const judge = yield select(state => state[NAMESPACE_FILE].judge);
      const state = yield select(state => state[NAMESPACE_FILE].state);
      const timestampRange = yield select(state => state[NAMESPACE].timestampRange);
      const page = payload.page ? payload.page : 1;
      const limit = payload.limit ? payload.limit : yield select(state => state[NAMESPACE_FILE].limit);
      const addPayload = {
        fileName, md5, fileType, threatType, judge, timestampRange, limit, page, state
      };
      const result = yield call(Services.get, addPayload);
      const data = result.payload&&result.payload.data||[];
      const total = result.payload&&result.payload.total||0;
      if (result.status === 1) {
        yield put({
          type: 'save',
          payload:
            {
              ...addPayload,
              total,
              limit,
              data,
            }
        });
      };
    },
    [FETCH_FILE_REPORT_ACTION]: [
      function* ({ payload = {}, resolve, reject }, { call, put }) {
        const res = yield call(Services.get, payload)
        if (res.status === 1) {
          yield put({
            type: "saveReportData",
            payload: res.payload.data
          })
        }
      },
      {
        type: "takeLatest"
      }
    ]
  },

  reducers: {
    saveReportData: (preState, { payload }) => {
      return {
        ...preState,
        reportData: payload
      }
    },
    save(state, action) {
      console.info(state,action)
      return { ...state, ...action.payload };
    },
  },

};


export default model;