import createQueryModel from 'utils/models/query'
import * as service from './Service';
import { NAMESPACE, STATISTICS_NAMESPACE } from './ConstConfig'
const model = {
  namespace: NAMESPACE,
  state: {
    filters: {
      timestampRange: [],
      mergeCounts: 10,
      attackStage: [],
      action: [],
      level: [],
      actionStatus: [],
      limit: 20,
      page: 1,
    },
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
            type: `${STATISTICS_NAMESPACE}/queryInit`
          })

          dispatch({
            type: `queryInit`,
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
