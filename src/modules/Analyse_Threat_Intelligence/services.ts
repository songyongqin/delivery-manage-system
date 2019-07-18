import commonRequestCreator from 'domainUtils/commonRequestCreator'
import ApiConfig from 'services/apiConfig'

const httpApi = ApiConfig.http




export const fetchAnalyseThreatIntelligenceCount = commonRequestCreator.getWithQueryString(httpApi.ANALYSE_THREAT_INTELLIGENCE_COUNT)

export const fetchAnalyseThreatIntelligenceTable = commonRequestCreator.getWithQueryString(httpApi.ANALYSE_THREAT_INTELLIGENCE_TABLE)

export const postAnalyseThreatIntelligenceDownload= commonRequestCreator.post(httpApi.ANALYSE_THREAT_INTELLIGENCE_TABLE)



