import { ASSETS_PORTDETAIL_NAMESPACE } from 'constants/model'
import { getfetchRecordDetailPort } from '../services'
import commonEffectCreator from 'domainUtils/commonEffectCreator'

export default {
  namespace: ASSETS_PORTDETAIL_NAMESPACE,
  effects: {
    fetch: commonEffectCreator(getfetchRecordDetailPort),
  }
}