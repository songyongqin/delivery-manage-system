import createQueryModel from 'utils/models/query'
import * as service from './Service';
import { NAMESPACE, STATISTICS_NAMESPACE } from './ConstConfig'


const initFilters = {
  timestampRange: [],
  mergeCounts: 10,
  attackStage: [],
  action: [],
  level: [],
  actionStatus: [],
  limit: 20,
  page: 1,
}

const model = {
  namespace: NAMESPACE,
  state: {
    filters: initFilters,
    results: {
      total: 0,
      statistics: {},
      data: []
    }
  },
  subscriptions: {
    initData({ history, dispatch }) {
      return history.listen(({ pathname }) => {
        if (pathname === "/analyse/event") {
          dispatch({
            type: `query`,
            payload: initFilters
          })
        }
      });
    },
  }
}


export default createQueryModel({
  model,
  service: service.query,
  isSuccess: res => res.status === 1,
  resultFilter: ({ payload }) => {
    const { total, data, statistics } = payload;
    return {
      total,
      data,
      statistics,
    }
  },
})
