import { ASSETS_PORT_NAMESPACE } from 'constants/model'
import { fetchdetailPort } from '../services'
import commonEffectCreator from 'domainUtils/commonEffectCreator'

export default {
  namespace: ASSETS_PORT_NAMESPACE,
  effects: {
    fetch: commonEffectCreator(fetchdetailPort),
  }
}