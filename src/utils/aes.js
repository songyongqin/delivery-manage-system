
import CryptoJS from "crypto-js";
import { iv } from 'configs/SecretKey'


export const encrypt = (message, key) => CryptoJS.AES.encrypt(
  message,
  CryptoJS.enc.Latin1.parse(key),
  {
    mode: CryptoJS.mode.CBC,
    iv: CryptoJS.enc.Latin1.parse(iv),
    padding: CryptoJS.pad.ZeroPadding
  }
)

export const decrypt = (message, key) => CryptoJS.AES.decrypt(
  message,
  CryptoJS.enc.Latin1.parse(key),
  {
    mode: CryptoJS.mode.CBC,
    iv: CryptoJS.enc.Latin1.parse(iv),
    padding: CryptoJS.pad.ZeroPadding
  }
).toString(CryptoJS.enc.Utf8)


