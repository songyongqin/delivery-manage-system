import { ANALYSE_THREAT_INTELLIGENCE } from 'constants/model'
import {  fetchAnalyseThreatIntelligenceCount,
          fetchAnalyseThreatIntelligenceTable,
          postAnalyseThreatIntelligenceDownload  } from './services'
import commonEffectCreator from 'domainUtils/commonEffectCreator'

export default {
  namespace: ANALYSE_THREAT_INTELLIGENCE,
  effects: {
    fetchCount: commonEffectCreator(fetchAnalyseThreatIntelligenceCount),
    fetchTable:commonEffectCreator(fetchAnalyseThreatIntelligenceTable),
    postDownload: commonEffectCreator(postAnalyseThreatIntelligenceDownload),
  }
}


