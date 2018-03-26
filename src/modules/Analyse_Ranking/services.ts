import commonRequestCreator from 'domainUtils/commonRequestCreator'
import ApiConfig from 'services/apiConfig'
const httpApi = ApiConfig.http

export const fetchRankingOption = commonRequestCreator.get(httpApi.ANALYSE_RANKING_OPTION)

export const fetchRanking = payload =>
  commonRequestCreator.getWithQueryString(httpApi.ANALYSE_RANKING + payload.option)(payload)