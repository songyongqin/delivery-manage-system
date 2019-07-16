import { ANALYSE_THREAT_VIEW } from 'constants/model'
import {  fetchAnalyseThreatCount,
          fetchAnalyseThreatFamily,
          fetchAnalyseThreatLoophole  } from './services'
import commonEffectCreator from 'domainUtils/commonEffectCreator'

export default {
  namespace: ANALYSE_THREAT_VIEW,
  effects: {
    fetchCount: commonEffectCreator(fetchAnalyseThreatCount),
    fetchFamily:commonEffectCreator(fetchAnalyseThreatFamily),
    fetchLoophole: commonEffectCreator(fetchAnalyseThreatLoophole),
  }
}


