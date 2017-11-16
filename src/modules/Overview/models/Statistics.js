import createQueryModel from 'utils/models/query'
import * as service from '../Service';
import { STATISTICS_NAMESPACE } from '../ConstConfig'
const model = {
  namespace: STATISTICS_NAMESPACE,
  state: {
    filters: {
      timestampRange: [],
    },
    results: {
      statistics: {},
    }
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
