import createQueryModel from 'utils/models/query'
import * as service from './Service';
import { EVENT_NAMESPACE } from './ConstConfig'
const model = {
  namespace: EVENT_NAMESPACE,
  state: {
    filters: {
      timestampRange: [],
      mergeCounts: 10,
      attackStage: [],
      action: [],
      level: [],
      actionStatus: [],
      limit: 5,
      page: 1,
    },
    results: {
      total: 0,
      statistics: {},
      data: []
    }
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
  initPath: "/overview",
})

