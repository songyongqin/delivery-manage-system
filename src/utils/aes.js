
import CryptoJS from "crypto-js";



export const encrypt = (message, key) => CryptoJS.AES.encrypt(message, key)

export const decrypt = (message, key) => CryptoJS.AES.decrypt(message, key).toString(CryptoJS.enc.Utf8)