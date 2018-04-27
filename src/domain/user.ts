/*
该文件为用户存储在本地的身份信息相关内容
*/
import { getTemp, setTemp, delTemp } from 'utils'
import { USER_ACCOUNT_DATA_INDEX, ROLE_DATA_INDEX, COMMON_ROLE, VISIT_ROLE, TOKEN_DATA_INDEX } from 'constants/user'
import combineNamespace from 'domainUtils/combineNamespace'

const USER_DATA_CACHE_NAMESPACE = combineNamespace("@@__user_data__@@")
//获取存储在浏览器的用户信息
export const getUserData = () => {
  try {
    return getTemp(USER_DATA_CACHE_NAMESPACE) || { [ROLE_DATA_INDEX]: VISIT_ROLE, }
  } catch (e) {
    console.error(e)
    return {}
  }
}
//保存用户信息在浏览器
export const setUserData = (data) => {
  try {
    setTemp(USER_DATA_CACHE_NAMESPACE, data)
  } catch (e) {
    console.error(e)
  }
}
//删除保存在浏览器的用户信息
export const delUserData = () => {
  try {
    delTemp(USER_DATA_CACHE_NAMESPACE)
  } catch (e) {
    console.error(e)
  }
}
//获取保存在浏览器的token信息
export const getToken = () => {
  try {
    return getUserData()[TOKEN_DATA_INDEX]
  } catch (e) {
    console.error(e)
    return ""
  }
}