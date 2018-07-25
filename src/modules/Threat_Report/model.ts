import { THREAT_REPORT } from 'constants/model'
import {  fetchAnalyseAttackerSearch} from './services'
import commonEffectCreator from 'domainUtils/commonEffectCreator'

export default {
  namespace: THREAT_REPORT,
  effects: {
    fetchSearch: commonEffectCreator(fetchAnalyseAttackerSearch),
  }
}


