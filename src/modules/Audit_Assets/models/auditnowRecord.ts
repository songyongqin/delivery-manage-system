import { ASSETS_NEWRECORD_NAMESPACE } from 'constants/model'
import { getfetchAuditnewRecord } from '../services'
import commonEffectCreator from 'domainUtils/commonEffectCreator'

export default {
  namespace: ASSETS_NEWRECORD_NAMESPACE,
  effects: {
    fetch: commonEffectCreator(getfetchAuditnewRecord),
  }
}