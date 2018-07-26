import { ASSETS_DETAIL_NAMESPACE } from 'constants/model'
import { getfetchRecordDetail } from '../services'
import commonEffectCreator from 'domainUtils/commonEffectCreator'

export default {
  namespace: ASSETS_DETAIL_NAMESPACE,
  effects: {
    fetch: commonEffectCreator(getfetchRecordDetail),
  }
}