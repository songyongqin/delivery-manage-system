import { SYS_CONFIG_MONITOR_MASTER_NAMESPACE } from 'constants/model'
import { fetchMonitorConfig, putMonitorConfig, fetchMonitorLog } from '../services'
import commonEffectCreator from 'domainUtils/commonEffectCreator'

export default {
  namespace: SYS_CONFIG_MONITOR_MASTER_NAMESPACE,
  effects: {
    fetch: commonEffectCreator(fetchMonitorLog),
    putConfig: commonEffectCreator(putMonitorConfig, 1000),
    fetchConfig: commonEffectCreator(fetchMonitorConfig)
  }
}