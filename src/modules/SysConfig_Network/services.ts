import commonRequestCreator from 'domainUtils/commonRequestCreator'
import ApiConfig from 'services/apiConfig'
const httpApi = ApiConfig.http

export const fetchDNSConfig = commonRequestCreator.get(httpApi.SYS_CONFIG_NETWORK)

export const putDNSConfig = commonRequestCreator.put(httpApi.SYS_CONFIG_NETWORK)

export const fetchNetworkConfig = commonRequestCreator.get(httpApi.SYS_CONFIG_NETWORK)

export const putNetworkConfig = commonRequestCreator.put(httpApi.SYS_CONFIG_NETWORK)

export const fetchSysLogConfig = commonRequestCreator.get(httpApi.SYS_LOG_CONFIG)

export const putSysLogConfig = commonRequestCreator.put(httpApi.SYS_LOG_CONFIG)

export const fetchAuthNetworkConfig = commonRequestCreator.get(httpApi.AUTH_NETWORK_802)

export const putAuthNetworkConfig = commonRequestCreator.put(httpApi.AUTH_NETWORK_802)

export const fetchCloudDetectionConfig = commonRequestCreator.get(httpApi.SYS_CONFIG_CLOUD_DETECTION)

export const putCloudDetectionConfig = commonRequestCreator.put(httpApi.SYS_CONFIG_CLOUD_DETECTION)

export const fetchNetworkMasterConfig = commonRequestCreator.get(httpApi.SYS_CONFIG_NETWORK_MASTER)

export const putNetworkMasterConfig = commonRequestCreator.put(httpApi.SYS_CONFIG_NETWORK_MASTER)