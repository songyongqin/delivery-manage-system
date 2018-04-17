import request from 'utils/request'
import { getTemp, setTemp } from 'utils'
import combineNamespace from 'domainUtils/combineNamespace'

const APP_CONFIG = "/config/app.json"

const PRODUCTION_STORAGE_NAMESPACE = combineNamespace("@@__production__@@")

let appConfig = {}


const saveConfig = _appConfig => {
  appConfig = _appConfig
}

export const getAppConfig = () => {
  return appConfig
}

const initHTMLTitle = () => {
  try {
    document.title = (getAppConfig() as any).title
  } catch (e) {
    console.error(e)
  }
}

export const initAppConfig = () => {
  return request(APP_CONFIG, {
    method: "GET",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    }
  }).then(data => {
    saveConfig(data)
    initHTMLTitle()
    return data
  })
}

