import { CONFIG_SYS_CONFIG_EXPORT_NET_NAMESPACE } from 'constants/model'
import { postExportNetConfig, getExportNetConfig, testEmail } from '../services'
import commonEffectCreator from 'domainUtils/commonEffectCreator'

export default {
  namespace: CONFIG_SYS_CONFIG_EXPORT_NET_NAMESPACE,
  effects: {
    get: commonEffectCreator(getExportNetConfig),
    post: commonEffectCreator(postExportNetConfig)
  }
}