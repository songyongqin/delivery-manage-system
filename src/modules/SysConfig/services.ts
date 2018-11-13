import commonRequestCreator from 'domainUtils/commonRequestCreator'
import ApiConfig from 'services/apiConfig'
const httpApi = ApiConfig.http

export const fetchWarningEmail = commonRequestCreator.get(httpApi.WARNING_EMAIL)

export const putWarningEmail = commonRequestCreator.put(httpApi.WARNING_EMAIL)

export const testEmail = commonRequestCreator.post(httpApi.TEST_EMAIL)

export const fetchWarningEmailConfig = commonRequestCreator.get(httpApi.WARNING_EMAIL_CONFIG)

export const putWarningEmailConfig = commonRequestCreator.put(httpApi.WARNING_EMAIL_CONFIG)

export const getExportNetConfig = commonRequestCreator.get(httpApi.CONFIG_SYS_CONFIG_EXPORT_NET)

export const postExportNetConfig = commonRequestCreator.post(httpApi.CONFIG_SYS_CONFIG_EXPORT_NET)