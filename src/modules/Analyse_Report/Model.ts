

import { NAMESPACE, NAMESPACE_FILE } from './ConstConfig'
import { DvaModel } from 'interfaces/index';



const model: DvaModel<any> = {
  namespace: NAMESPACE,
  state: {
    limit: 10,
    page: 1,
    timestampRange: [],
    lastChangeTime: 0,
    keyValue: 'file'
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
    changeLastChangeTime: (preState, { payload }) => {
      return {
        ...preState,
        lastChangeTime: payload,
      }
    }
  },
  effects: {
  },
  subscriptions: {
  }
};


export default model;