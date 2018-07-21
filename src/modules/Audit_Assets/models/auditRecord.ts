import { ASSETS_RECORD_NAMESPACE } from 'constants/model'
import { getfetchAuditRecord, getfetchRecordDetail } from '../services'
import commonEffectCreator from 'domainUtils/commonEffectCreator'

export default {
  namespace: ASSETS_RECORD_NAMESPACE,
  effects: {
    fetch: commonEffectCreator(getfetchAuditRecord),
    fetchRecordDetail: commonEffectCreator(getfetchRecordDetail),
  }
}