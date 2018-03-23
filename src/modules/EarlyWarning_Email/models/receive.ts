import { EARLY_WARNING_EMAIL_RECEIVE_NAMESPACE } from 'constants/model'
import { fetchWarningEmail, putWarningEmail, putWarningEmailConfig } from '../services'
import commonEffectCreator from 'domainUtils/commonEffectCreator'

export default {
  namespace: EARLY_WARNING_EMAIL_RECEIVE_NAMESPACE,
  effects: {
    fetch: commonEffectCreator(fetchWarningEmail),
    put: commonEffectCreator(putWarningEmail, 1000)
  }
}