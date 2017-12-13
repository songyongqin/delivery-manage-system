import createQueryModel from 'utils/models/query'
import * as service from '../Service';
import { STATISTICS_NAMESPACE } from '../ConstConfig'

export const initFilters = {
  timestampRange: [],
}

const model = {
  namespace: STATISTICS_NAMESPACE,
  state: {
    filters: initFilters,
    results: {
      statistics: {},
    }
  },
  subscriptions: {
    initData({ history, dispatch }) {


      return history.listen(({ pathname }) => {
        if (pathname === "/overview") {
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
  service: service.queryStatistics,
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
