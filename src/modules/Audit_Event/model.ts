import { AUDIT_EVENT_NAMESPACE } from 'constants/model'
import { fetchAuditEvent } from './services'
import commonEffectCreator from 'domainUtils/commonEffectCreator'

export default {
  namespace: AUDIT_EVENT_NAMESPACE,
  effects: {
    fetch: commonEffectCreator(fetchAuditEvent)
  }
}