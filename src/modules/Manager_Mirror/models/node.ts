import { MANAGER_MIRROR_NODE_NAMESPACE } from 'constants/model'
import {
  fetchMirrorNode
} from '../services'
import commonEffectCreator from 'domainUtils/commonEffectCreator'

export default {
  namespace: MANAGER_MIRROR_NODE_NAMESPACE,
  effects: {
    fetch: commonEffectCreator(fetchMirrorNode),
  }
}