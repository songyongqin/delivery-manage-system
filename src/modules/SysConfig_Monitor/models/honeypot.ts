import { SYS_CONFIG_MONITOR_HONEYPOT_NODE_NAMESPACE } from 'constants/model'
import { fetchMonitorConfig, putMonitorConfig, fetchMonitorLog } from '../services'
import commonEffectCreator from 'domainUtils/commonEffectCreator'

export default {
  namespace: SYS_CONFIG_MONITOR_HONEYPOT_NODE_NAMESPACE,
  effects: {
    fetch: commonEffectCreator(fetchMonitorLog),
    putConfig: commonEffectCreator(putMonitorConfig, 1000),
    fetchConfig: commonEffectCreator(fetchMonitorConfig)
  }
}