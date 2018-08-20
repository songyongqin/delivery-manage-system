

import { NAMESPACE } from './ConstConfig'
import { DvaModel } from 'interfaces/index';
import * as Services from './Services'


const model: DvaModel<any> = {

  namespace: NAMESPACE,

  state: {
    data: [],
    urlCount: 0,
    fileCount: 0,
    total: 0,
  },

  subscriptions: {
    setup({ dispatch, history }) {
    },
  },

  effects: {
    * fetch({ resolve, payload }, { select, call, put }) {
      const result = yield call(Services.get_mail, payload);
      const data = result.payload.data;
      const urlCount = data.urlList.length;
      const fileCount = data.fileList.length;
      const total = result.payload.total;
      if (result.status === 1) {
        yield put({
          type: 'save',
          payload:
            {
              ...payload,
              data: data,
              urlCount,
              fileCount,
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