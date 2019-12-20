/*
该部分为导航栏内容
需在入口文件处 在应用完整载入前初始化（fetchNavConfig）
*/
import React from 'react'
import { Icon } from 'antd'
import ExtraIcon from 'components/Icon'
import { head } from 'utils'
import { find, flattenDeep } from 'lodash'
import {
  LOGIN_URL,

  HOME_URL,
  PROJECT_URL,
  CUSTOMER_URL,
  FILE_URL,
  SYSTEM_URL,
  USER_URL,

  AITUATION_URL,

  

  REPORT_URL,


  MANAGER_URL,

  TOPO_URL,


} from 'routes/config/path'
import { getAppConfig } from 'domain/app'
import { SysIoc, Situation, ThreatReport } from 'components/IconSvg'


const Indent = ({ space = 0 }) =>
  <div style={{ display: 'inline-block', width: `${(space + 1) * 14 + 20}px`, height: 20 }}  ></div>

export const _navConfig = [
  {
    link: HOME_URL,
    title: "首页",
    icon: <Icon type="home" />
  },
  // {
  //   link: HOME_URL,
  //   title: "项目管理",
  //   icon: <Icon type="home" />
  // },
  // {
  //   link: HOME_URL,
  //   title: "客户管理",
  //   icon: <Icon type="home" />
  // },
  // {
  //   link: HOME_URL,
  //   title: "文档类型管理",
  //   icon: <Icon type="home" />
  // },
  {
    link: SYSTEM_URL,
    title: "系统日志",
    icon: <SysIoc  style={{ width:'16', height:'16', verticalAlign:"middle",  marginRight: 10  }}  />
  },
  {
    link: AITUATION_URL,
    title: "用户管理",
    icon: <SysIoc  style={{ width:'16', height:'16', verticalAlign:"middle",  marginRight: 10  }}  />
  },
]

interface RemoveShouldHideNavOption {
  navConfig: any[],
  // admin: boolean,
  shouldHideNav: string[]
}

interface RemoveShouldHideNav {
  (option: RemoveShouldHideNavOption): any[]
}

const hiddenURLList = _navConfig.filter(item =>  item.hidden).map(item => item.link)

export const getHiddenRouter = () => {
  let { hiddenRouter } = getAppConfig() as any 
  return hiddenRouter
}

//根据shouldHideNav 移除 navConfig 中匹配 的 nav项
const removeShouldHideNav: RemoveShouldHideNav = ({ navConfig = [], shouldHideNav = [] }) => {
  try {
    let array = getHiddenRouter()||[]
    let arr = [...shouldHideNav,...array]
    return navConfig
      .filter(i => !arr.includes(i.link))
      // .filter(i => admin || (!adminOnly.includes(i.link)))
      .map(i => (
        "items" in i
          ?
          {
            ...i,
            items: removeShouldHideNav({ navConfig: i.items, shouldHideNav })
          }
          :
          i
      ))
  } catch (e) {
    console.error(e)
    return navConfig
  }
}

//根据appConfig  routerTitleConfig 修改路由的名字
const getNavCombineTitleConfig = (navConfig) => {
  try {
    const { routerTitleConfig = {} } = getAppConfig() as any

    return navConfig
      .map(i => (
        i.link in routerTitleConfig
          ?
          {
            ...i,
            title: routerTitleConfig[i.link]
          }
          :
          i
      ))
      .map(i => (
        "items" in i
          ?
          {
            ...i,
            items: getNavCombineTitleConfig(i.items)
          }
          :
          i
      ))
  } catch (e) {
    console.error(e)
    return navConfig
  }
}

//将拥有items且数量为0的nav移除
const removeItemsEmptyNav = (navConfig) => {
  try {
    return navConfig.filter(navItem => {
      if ('items' in navItem && navItem["items"].length === 0) {
        return false
      }
      return true
    })
  } catch (e) {
    return navConfig
  }
}

//获取所有导航中的路由连接
export const getNavLink = (navConfig, total = []) => {

  return navConfig.reduce((_total, navItem) => {

    _total.push(navItem.link)

    if ("items" in navItem) {
      getNavLink(navItem.items, _total)
    }

    return _total

  }, total)
}

const navLinkList = [...getNavLink(_navConfig), ...hiddenURLList]

//获取 linkList 中拥有嵌套关系的 nav link 包括自身
const getNestLinkList = (linkList) => {
  return [...new Set(navLinkList.filter(link => linkList.some(innerLink => link.startsWith(innerLink))))]
}

export const getShouldHideNav = ({ admin = false }) => {
  try {
    const { routerRegister = {}, adminOnly = [] } = getAppConfig() as any
    //根据appConfig中配置获取应该隐藏的nav项
    const shouldHideNav = [
      ...Object.entries(routerRegister).filter(([link, open]) => !open).map(([link]) => link),
      ...(admin ? [] : adminOnly)
    ]
    //获取嵌套关系的子路由应该隐藏的项
    const extraHideNav = getNestLinkList(shouldHideNav)
    return [
      ...new Set([
        ...shouldHideNav,
        ...extraHideNav
      ])
    ]

  } catch (e) {
    return []
  }
}


//获取 nav 所需要使用的navConfig
export const getNavConfig = ({ admin = false }) => {
  try {
    const { routerRegister = {}, adminOnly = [] } = getAppConfig() as any

    const shouldHideNav = getShouldHideNav({ admin })

    const navConfig = removeItemsEmptyNav(removeShouldHideNav({ navConfig: _navConfig, shouldHideNav: [...shouldHideNav, ...hiddenURLList, ] }))

    return getNavCombineTitleConfig(navConfig)
  } catch (e) {
    return _navConfig
  }
}


//根据用户身份获取可以授权的路由
export const getAuthRoutes = ({ admin = false }) => {
  try {
    const { routerRegister = {}, adminOnly = [] } = getAppConfig() as any

    const shouldHideNavList = getShouldHideNav({ admin })

    return navLinkList.filter(link => !shouldHideNavList.includes(link))
  } catch (e) {
    return []
  }
}


//根据父路由 获取 默认路由的地址
export const getDefaultRoute = (link = ROOT_URL) => {
  try {
    const navConfig = getNavConfig({ admin: false })
    // getMultiRoute(link, navConfig)
    if (link === ROOT_URL) {
      return head(navConfig).link
    }
    // return head(navConfig.find(item => item.link === link).items).link
    const str = getMultiRoute(link, navConfig)
    return str

  } catch (e) {
    console.error('getDefaultRoute error /n',e)
    return ROOT_URL
  }
}

const getMultiRoute = (path, arr) => {
  const getArr =(arr, link )=> {
    return arr.map(i => {
      if(i.link===link){
        return i.items
      }
      else if(link.indexOf(i.link)!==-1){
        return getArr(i.items, link)
      }
      else return false
    }).filter(i =>i)
  }
  return head(flattenDeep(getArr(arr, path))).link
}