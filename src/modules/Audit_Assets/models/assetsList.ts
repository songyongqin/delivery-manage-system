import { AUDIT_ASSETS_NAMESPACE } from 'constants/model'
import { fetchAuditAssets, fetchAuditAssetsList, fetchAuditConfig, fetchAuditEdit } from '../services'
import commonEffectCreator from 'domainUtils/commonEffectCreator'

export default {
  namespace: AUDIT_ASSETS_NAMESPACE,
  effects: {
    fetchAuditAssets: commonEffectCreator(fetchAuditAssets),
    fetch: commonEffectCreator(fetchAuditAssetsList),
    fetchAuditConfig: commonEffectCreator(fetchAuditConfig),
    fetchAuditEdit: commonEffectCreator(fetchAuditEdit)
  }
}