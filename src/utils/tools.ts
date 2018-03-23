
import { Moment } from 'moment'

export const ipReg = /^((25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))$/

export const portReg = /^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/

const isIp = (ip = "") => {
  try {
    return ipReg.test(ip)
  } catch (e) {
    return false
  }
}

const isPort = (port = "") => {
  try {
    return portReg.test(port)
  } catch (e) {
    return false
  }
}