import fetch from 'dva/fetch';
import requestExtraOptionsHandle from '../configs/requestExtraOptionsHandle';
import { encrypt, decrypt, getTemp, setTemp, compose } from './tools.js'
import secretKey from 'configs/SecretKey'
import { DEBUG_MODE } from 'configs/ConstConfig'
// console.info(encrypt("123456", "antiy test").toString())

// console.info(decrypt(encrypt("123456", "antiy test").toString(), "antiy test"))
function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

//根据key加密数据
const encryptData = (data) => {
  try {
    if (sessionStorage.getItem(DEBUG_MODE)) {
      return data;
    }
    return encrypt(data, secretKey)
  } catch (e) {
    console.warn(e)
    return data;
  }
}
//加密option中body的数据
const encryptBodyString = (options) => {
  let finalOptions = { ...options }
  if (typeof options.body === "string") {
    finalOptions.body = encryptData(options.body)
  }
  console.info(finalOptions)
  return finalOptions
}
//解密res中的数据
const decryptResponse = response => {
  return new Promise((resolve, reject) => {
    if (sessionStorage.getItem(DEBUG_MODE)) {
      return resolve(response.json())
    }

    response.text()
      .then(text => {
        let data = JSON.parse(decrypt(text, secretKey))
        resolve(data)
      })
      .catch(e => reject(e))
  })


}

export default function request(url, options) {

  const finalOptions = compose(encryptBodyString, requestExtraOptionsHandle)(url.split("?")[0], options)

  return fetch(url, finalOptions)
    .then(checkStatus)
    .then(decryptResponse)
    // .then(parseJSON)
    .then(data => (data))
    .catch(err => ({ status: -1, message: err.message }));
}
