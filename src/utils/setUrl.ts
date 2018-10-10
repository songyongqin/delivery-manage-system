


import { getAppConfig } from 'domain/app'

const setUrl = (url:string) => {
  let isSecret =getAppConfig()? getAppConfig()['secret'] :true
  // let host = getCache('host') || ''
  // let configHost = getAppConfig()['host']
  let host = localStorage.getItem('host') || getAppConfig()['host']||  ''
  let needAdd = !(/\/static/.test(url))
  
  let str = !isSecret&&!!host&&needAdd ? host+url : url
  return str
}

export default setUrl
