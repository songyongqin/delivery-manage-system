import CryptoJS from "crypto-js"
import isDev from 'utils/isDev'
import combineNamespace from 'domainUtils/combineNamespace'

const SECRET_NAMESPACE = combineNamespace("@@__secret__@@")

export const isSecret = () => {
  if (isDev()) {
    return false
  }
  return false
}

const getSecretKey = () => {
  return "1234567812345678"
}

const getIV = () => {
  return "1234567812345678"
}

const getFinalKey = () => CryptoJS.enc.Latin1.parse(getSecretKey())

const getOption = () => (
  {
    mode: CryptoJS.mode.CBC,
    iv: CryptoJS.enc.Latin1.parse(getIV()),
    padding: CryptoJS.pad.ZeroPadding
  }
)

export const encrypt = (message: any) => CryptoJS.AES.encrypt(
  message,
  getFinalKey(),
  getOption()
).toString()

export const decrypt = (message: any) => CryptoJS.AES.decrypt(
  message,
  getFinalKey(),
  getOption()
).toString(CryptoJS.enc.Utf8)