import isSuccess from 'domainUtils/isSuccess'
import { LICENCE_STATUS_DATAINDEX, LICENCE_STATUS_EXPIRATION_DATAINDEX, LICENCE_VALID_VALUE, ALLOW_AHEAD_LICENCE_DAY, CONNECT_STATUS_DATAINDEX } from './constants'
import { CONNECT } from '../SysConfig_Network/constants';


export const fetchDiskResPipeCreator = (key) => {
  return res => {
    try {
      if (isSuccess(res)) {
        return {
          ...res,
          payload: res.payload[key]
        }
      }
      return res
    } catch (e) {
      return res
    }
  }
}

const isConnect = (info) => {
  try {
    return info[CONNECT_STATUS_DATAINDEX] === CONNECT
  } catch (e) {
    return false
  }
}

const canAheadLicence = (info) => {
  try {
    const licenceExpiration = info[LICENCE_STATUS_DATAINDEX][LICENCE_STATUS_EXPIRATION_DATAINDEX]
    return licenceExpiration - new Date().getTime() / 1000 <= ALLOW_AHEAD_LICENCE_DAY * 3600 * 24

  } catch (e) {
    return false
  }
}

const isLicenceValid = (info) => {
  try {
    return info[LICENCE_STATUS_DATAINDEX].value === LICENCE_VALID_VALUE
  } catch (e) {
    return false
  }
}

export const canLicenceDevice = (info) => {
  try {
    if (!isConnect(info)) {
      return false
    }

    if (isLicenceValid(info) && !canAheadLicence(info)) {
      return false
    }

    return true

  } catch (e) {
    return false
  }
}


export const getCanNotLicenceReason = (info) => {
  try {
    if (!isConnect(info)) {
      return "该设备连接异常，无法进行授权"
    }
    if (isLicenceValid(info)) {
      return "该设备已授权且授权未即将过期，无需重新授权"
    }
    if (!canAheadLicence(info)) {
      return "该设备已授权且授权未即将过期，无需重新授权"
    }
    return ""
  } catch (e) {
    return ""
  }
}