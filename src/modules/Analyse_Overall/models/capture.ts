import { ANALYSE_OVERALL_CAPTURE_NAMESPACE } from 'constants/model'
import { fetchOverallCapture } from '../services'
import commonEffectCreator from 'domainUtils/commonEffectCreator'

export default {
  namespace: ANALYSE_OVERALL_CAPTURE_NAMESPACE,
  effects: {
    fetch: commonEffectCreator(fetchOverallCapture)
  }
}