import commonRequestCreator from 'domainUtils/commonRequestCreator'
import ApiConfig from 'services/apiConfig'
const httpApi = ApiConfig.http

export const fetchAuditAssets = commonRequestCreator.getWithQueryString(httpApi.AUDIT_ASSETS)

export const fetchAuditAssetsList = commonRequestCreator.getWithQueryString(httpApi.AUDIT_ASSETS_LIST)

export const fetchdetailLoophole = commonRequestCreator.getWithQueryString(httpApi.AUDIT_ASSETS_DETAIL_LOOPHLE)

export const fetchdetailPort = commonRequestCreator.getWithQueryString(httpApi.AUDIT_ASSETS_DETAIL_PORT)

export const fetchAuditConfig = commonRequestCreator.post(httpApi.AUDIT_ASSETS_CONFIG)

export const getfetchAuditConfig = commonRequestCreator.get(httpApi.AUDIT_ASSETS_CONFIG)

export const fetchAuditEdit = commonRequestCreator.post(httpApi.AUDIT_ASSETS_EDIT_PORT)

export const getfetchAuditRecord = commonRequestCreator.getWithQueryString(httpApi.AUDIT_ASSETS_RECORD)

export const getfetchAuditnewRecord = commonRequestCreator.get(httpApi.AUDIT_ASSETS_NEWRECORD)




