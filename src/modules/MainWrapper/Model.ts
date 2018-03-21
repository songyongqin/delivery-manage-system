import { NAMESPACE } from './ConstConfig'
import { DvaModel } from 'interfaces/index';

interface State {
  initRoutes: string[]
}

const model: DvaModel<State> = {

  namespace: NAMESPACE,

  state: {
    initRoutes: []
  },

  reducers: {
    saveInitRoutes: (preState, { payload }) => {
      return {
        ...preState,
        initRoutes: [...new Set([...preState.initRoutes, payload])]
      };
    },
  },

  effects: {

  },

  subscriptions: {

  },
};


export default model;