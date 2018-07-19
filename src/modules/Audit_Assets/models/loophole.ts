import { ASSETS_LOOPHOLE_NAMESPACE } from 'constants/model'
import { fetchdetailLoophole } from '../services'
import commonEffectCreator from 'domainUtils/commonEffectCreator'

export default {
  namespace: ASSETS_LOOPHOLE_NAMESPACE,
  effects: {
    fetch: commonEffectCreator(fetchdetailLoophole),
  }
}