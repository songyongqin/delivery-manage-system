import { NODE_MONITOR_NAMESPACE } from 'constants/model'
import { fetchNodeMonitor } from './services'
import commonEffectCreator from 'domainUtils/commonEffectCreator'


export default {
  namespace: NODE_MONITOR_NAMESPACE,
  effects: {
    fetch: commonEffectCreator(fetchNodeMonitor),
  }
}
