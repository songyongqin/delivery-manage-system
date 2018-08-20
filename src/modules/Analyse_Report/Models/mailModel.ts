
import { NAMESPACE, NAMESPACE_MAIL, FETCH_FILE_REPORT_ACTION, MAIL_ACCOUNT_DATAINDEX, MAIL_IP_DATAINDEX, MAIL_SENDER_DATAINDEX, MAIL_RECEIVER_DATAINDEX, FETCH_DETECTION_OPTION_ACTION } from '../ConstConfig'
import { DvaModel } from 'interfaces/index'
import * as Services from '../Services'
import moment from 'moment'
import { COMMON_SUCCESS_STATUS } from 'configs/ConstConfig'
import { FETCH_DETECTION_ACTION } from 'modules/Detection/ConstConfig'
import { HOME_URL } from 'configs/RouteConfig'
export const initData = {
  timestampRange: [],
  page: 1,
  limit: 30,
  total: 0,
  emailTheme: "",
  fileMd5: "",
  threatType: "",
  senderAccount: "",
  // senderIp: "",
  receiverAccount: "",
  // receiverIp: "",
}
const model: DvaModel<any> = {

  namespace: NAMESPACE_MAIL,

  state: {
    data: [],
    timestampRange: [],
    page: 1,
    limit: 30,
    total: 0,
    emailTheme: "",
    fileMd5: "",
    threatType: "",
    judge: [],
    senderAccount: "",
    // senderIp: "",
    receiverAccount: "",
    // receiverIp: "",
    loading: false,
    lastChangeTime: -1,
    initData,
  },

  subscriptions: {

  },

  effects: {
    * fetch({ resolve, payload }, { select, call, put }) {
      const timestampRange = yield select(state => state[NAMESPACE].timestampRange);
      const result = yield call(Services.get_mail, payload);
      const data = result.payload.data;
      const total = result.payload.total;
      if (result.status === 1) {
        yield put({
          type: 'save',
          payload:
            {
              ...payload,
              timestampRange,
              data,
              total,
            }
        });
        resolve && resolve(result.payload);
      };

    },
  },

  reducers: {

    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};


export default model;