import { USER_DATA_CACHE_NAMESPACE, 
         TOKEN_DATA_INDEX, 
         VISIT_ROLE, ROLE_DATA_INDEX, 
         ACCESS_TOKEN_NAMESPACE } from './analyse-report/ConstConfig'
import { getCache, setCache, delCache } from 'utils'
import Cookies from 'js-cookie'


export const getUserData = () => {
  try {
    const cache = getCache(USER_DATA_CACHE_NAMESPACE)
    if (cache) {
      Cookies.set(ACCESS_TOKEN_NAMESPACE, cache[TOKEN_DATA_INDEX], { expires: 365 })
    }
    return cache || { [ROLE_DATA_INDEX]: VISIT_ROLE, }
  } catch (e) {
    console.error(e)
    return {}
  }
}

export const setUserData = (data) => {
  try {
    setCache(USER_DATA_CACHE_NAMESPACE, data)
    Cookies.set(ACCESS_TOKEN_NAMESPACE, data[TOKEN_DATA_INDEX], { expires: 365 })
  } catch (e) {
    console.error(e)
  }
}

export const delUserData = () => {
  try {
    delCache(USER_DATA_CACHE_NAMESPACE)
    Cookies.remove(ACCESS_TOKEN_NAMESPACE)
  } catch (e) {
    console.error(e)
  }
}

export const getToken = () => {
  try {
    return getUserData()[TOKEN_DATA_INDEX]
  } catch (e) {
    console.error(e)
    return ""
  }
}

export const getUserKey = () => {
  try {
    return getUserData()["userkey"]
  } catch (e) {
    console.error(e)
    return ''
  }
}