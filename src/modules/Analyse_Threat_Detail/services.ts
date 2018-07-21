import commonRequestCreator from 'domainUtils/commonRequestCreator'
import ApiConfig from 'services/apiConfig'
const httpApi = ApiConfig.http




export const fetchThreatFamilyEventDetail = commonRequestCreator.getWithQueryString(httpApi.ANALYSE_THREAT_FAMILY_DETAIL_EVENT)

export const fetchThreatFamilyAssetsDetail = commonRequestCreator.getWithQueryString(httpApi.ANALYSE_THREAT_FAMILY_DETAIL_ASSETS)

export const fetchThreatFamilyCcDetail= commonRequestCreator.getWithQueryString(httpApi.ANALYSE_THREAT_FAMILY_DETAIL_CC)

export const fetchThreatLoopholeEventDetail = commonRequestCreator.getWithQueryString(httpApi.ANALYSE_THREAT_LOOPHOLE_DETAIL_EVENT)

export const fetchThreatLoopholeAssetsDetail = commonRequestCreator.getWithQueryString(httpApi.ANALYSE_THREAT_LOOPHOLE_DETAIL_ASSETS)

export const fetchThreatLoopholeCcDetail= commonRequestCreator.getWithQueryString(httpApi.ANALYSE_THREAT_LOOPHOLE_DETAIL_CC)


