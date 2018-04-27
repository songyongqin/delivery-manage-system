import CryptoJS from "crypto-js"
import isDev from 'utils/isDev'
import combineNamespace from 'domainUtils/combineNamespace'
import { getAppConfig } from './app'

const SECRET_NAMESPACE = combineNamespace("@@__secret__@@")

export const isSecret = () => {
  try {
    //生产环境下是否加密解密
    if (isDev()) {
      return false
    }
    //根据app.json中的配置来判断是否需要加密解密
    return (getAppConfig() as any).secret
  } catch (e) {
    return false
  }
}
//加密的密钥
const getSecretKey = () => {
  return "1234567812345678"
}
//加密的IV
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
//将输入的字符串内容进行加密
export const encrypt = (message: any) => CryptoJS.AES.encrypt(
  message,
  getFinalKey(),
  getOption()
).toString()
//将输入的字符串进行解密
export const decrypt = (message: any) => CryptoJS.AES.decrypt(
  message,
  getFinalKey(),
  getOption()
).toString(CryptoJS.enc.Utf8)