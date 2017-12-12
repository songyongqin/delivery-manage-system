import createQueryModel from 'utils/models/query'
import * as service from './Service';
import { EVENT_NAMESPACE, STATISTICS_NAMESPACE, FLOW_NAMESPACE, RANKING_NAMESPACE } from './ConstConfig'
import { NODE, STAND_ALONE } from 'configs/ConstConfig'
import { getTemp } from 'utils/tools'

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
  },
  subscriptions: {
    initData({ history, dispatch }) {


      return history.listen(({ pathname }) => {

        let productType = (getTemp("productType") || {}).type


        if (pathname === "/overview") {

          dispatch({
            type: `${STATISTICS_NAMESPACE}/queryInit`
          })

          dispatch({
            type: `queryInit`,
          })

          if (productType !== NODE && productType !== STAND_ALONE) {
            dispatch({
              type: `${RANKING_NAMESPACE}/queryInit`
            })

            dispatch({
              type: `${FLOW_NAMESPACE}/queryInit`
            })
          }

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

