import { EARLY_WARNING_EMAIL_SEND_NAMESPACE } from 'constants/model'
import { putWarningEmailConfig, fetchWarningEmailConfig, testEmail } from '../services'
import commonEffectCreator from 'domainUtils/commonEffectCreator'

export default {
  namespace: EARLY_WARNING_EMAIL_SEND_NAMESPACE,
  effects: {
    fetch: commonEffectCreator(fetchWarningEmailConfig),
    put: commonEffectCreator(putWarningEmailConfig, 1000),
    test: commonEffectCreator(testEmail, 1000)
  }
}