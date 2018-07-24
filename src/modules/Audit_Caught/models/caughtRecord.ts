import { AUDIT_CAUGHTRECORD_NAMESPACE } from 'constants/model'
import { fetchcaughtRecord } from '../services'
import commonEffectCreator from 'domainUtils/commonEffectCreator'

export default {
  namespace: AUDIT_CAUGHTRECORD_NAMESPACE,
  effects: {
    fetch: commonEffectCreator(fetchcaughtRecord),
  }
}