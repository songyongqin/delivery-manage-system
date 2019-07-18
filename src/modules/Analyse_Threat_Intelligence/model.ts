import { ANALYSE_THREAT_INTELLIGENCE } from 'constants/model'
import {  fetchAnalyseThreatIntelligenceCount,
          fetchAnalyseThreatIntelligenceTable,
          postAnalyseThreatIntelligenceDownload,
          postAnalyseThreatIntelligenceInfo ,
          putAnalyseThreatIntelligenceInfo,
          delAnalyseThreatIntelligenceInfo } from './services'
import commonEffectCreator from 'domainUtils/commonEffectCreator'

export default {
  namespace: ANALYSE_THREAT_INTELLIGENCE,
  effects: {
    fetchCount: commonEffectCreator(fetchAnalyseThreatIntelligenceCount),
    fetchTable:commonEffectCreator(fetchAnalyseThreatIntelligenceTable),
    postDownload: commonEffectCreator(postAnalyseThreatIntelligenceDownload),
    addThreatIntelligence: commonEffectCreator(postAnalyseThreatIntelligenceInfo),
    editThreatIntelligence: commonEffectCreator(putAnalyseThreatIntelligenceInfo),
    delThreatIntelligence: commonEffectCreator(delAnalyseThreatIntelligenceInfo)
  }
}


