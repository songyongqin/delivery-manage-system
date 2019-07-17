import { ANALYSE_THREAT_INTELLIGENCE } from 'constants/model'
import {  fetchAnalyseThreatIntelligenceCount,
          fetchAnalyseThreatFamily,
          fetchAnalyseThreatLoophole  } from './services'
import commonEffectCreator from 'domainUtils/commonEffectCreator'

export default {
  namespace: ANALYSE_THREAT_INTELLIGENCE,
  effects: {
    fetchCount: commonEffectCreator(fetchAnalyseThreatIntelligenceCount),
    fetchFamily:commonEffectCreator(fetchAnalyseThreatFamily),
    fetchLoophole: commonEffectCreator(fetchAnalyseThreatLoophole),
  }
}


