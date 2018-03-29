import { SYS_CONFIG_CLOUD_DETECTION_NAMESPACE } from 'constants/model'
import { fetchCloudDetectionConfig, putCloudDetectionConfig } from '../services'
import commonEffectCreator from 'domainUtils/commonEffectCreator'

export default {
  namespace: SYS_CONFIG_CLOUD_DETECTION_NAMESPACE,
  effects: {
    fetch: commonEffectCreator(fetchCloudDetectionConfig),
    put: commonEffectCreator(putCloudDetectionConfig, 1000),
  }
}