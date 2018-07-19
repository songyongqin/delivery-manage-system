import { ASSETS_RECORD_NAMESPACE } from 'constants/model'
import { getfetchAuditRecord } from '../services'
import commonEffectCreator from 'domainUtils/commonEffectCreator'

export default {
  namespace: ASSETS_RECORD_NAMESPACE,
  effects: {
    fetch: commonEffectCreator(getfetchAuditRecord),
  }
}