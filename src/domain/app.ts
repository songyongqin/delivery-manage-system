import request from 'utils/request'
import { getTemp, setTemp } from 'utils'
import combineNamespace from 'domainUtils/combineNamespace'
import path from 'constants/path'

const APP_CONFIG = path.layoutConfig.app

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
/*
通过 http 方式加载 app.json内容 
改内容必须在整个应用开启前进行加载
*/
export const initAppConfig = () => {
  return request(APP_CONFIG + `?${new Date().getTime()}`, {
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

