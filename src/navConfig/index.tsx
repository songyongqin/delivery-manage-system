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

  AITUATION_URL,

  ANALYSE_URL,
  ANALYSE_EVENT_URL,
  ANALYSE_ATTACK_CHAIN_URL,
  ANALYSE_FALL_HOST_URL,
  ANALYSE_RANKING_URL,
  ANALYSE_THREAT_DIS_URL,
  ANALYSE_OVERALL_URL,
  CONFIG_NODE_MONITOR_URL,

  EARLY_WARNING_URL,
  EARLY_WARNING_EMAIL_URL,

  REPORT_URL,

  SYS_CONFIG_URL,
  SYS_CONFIG_NETWORK_URL,
  SYS_CONFIG_MONITOR_URL,
  SYS_CONFIG_STRATEGY_URL,

  USER_MANAGER_URL,

  MANAGER_URL,
  // MANAGER_DEVICE_URL,
  MANAGER_VM_URL,
  MANAGER_MIRROR_URL,

  SYS_LOG_URL,
  SYS_LOG_LOGIN_URL,
  ROOT_URL,
  SNORT_URL,
  FILE_RESTORE,

  // ANALYSE_EVENT_URL,

  ANALYSE_ATTACKED_ASSETS_URL,

  ANALYSE_ATTACKED_ASSETS_DETAL_URL,

  ANALYSE_ATTACK_URL,

  ANALYSE_ATTACK_DETAL_URL,

  ANALYSE_THREAT_URL,

  ANALYSE_REPORT_URL,

  ANALYSE_REPORT_DETAIL_URL,

  ANALYSE_THREAT_FAMILY_DETAIL_URL,

  ANALYSE_THREAT_LOOPHOLE_DETAIL_URL,

  ANALYSE_THREAT_INTELLIGENCE_URL,

  AUDIT_URL,

  TOPO_URL,

  AUDIT_EVENT_URL,

  AUDIT_ASSETS_URL,

  AUDIT_CAUGHT_URL,

  STRATEGY_URL,

  CONFIG_URL,
  TYPICAL_CASE_URL,

  CONFIG_USER_MANAGER_URL,

  CONFIG_DEVICE_MANAGER_URL,

  CONFIG_SYS_LOG_URL,

  CONFIG_SYS_LOG_LOGIN_URL,

  CONFIG_SYS_CONFIG_URL,

  CONFIG_SYS_CONFIG_NETWORK_URL,

  CONFIG_SYS_CONFIG_MONITOR_URL,

  CONFIG_SYS_CONFIG_WARN_URL,
  CONFIG_WHITE_LIST,
  SAMPLE_X86,
  SAMPLE_NON_X86

} from 'routes/config/path'
import { getAppConfig } from 'domain/app'
import { Situation , ThreatReport } from 'components/IconSvg'


const Indent = ({ space = 0 }) =>
  <div style={{ display: 'inline-block', width: `${(space + 1) * 14 + 20}px`, height: 20 }}  ></div>

export const _navConfig = [
  {
    link: HOME_URL,
    title: "首页",
    icon: <Icon type="home" />
  },
  {
    link: HOME_URL,
    title: "项目管理",
    icon: <Icon type="home" />
  },
  {
    link: HOME_URL,
    title: "客户管理",
    icon: <Icon type="home" />
  },
  {
    link: HOME_URL,
    title: "文档类型管理",
    icon: <Icon type="home" />
  },
  {
    link: ANALYSE_URL,
    title: "系统日志",
    icon: <Icon type="fork" />,
  },
  {
    link: AITUATION_URL,
    title: "用户管理",
    icon: <Situation  style={{ width:'16', height:'16', verticalAlign:"middle",  marginRight: 10  }}  />
  },
  {
    link: TOPO_URL,
    title: "拓扑图",
    icon: <Icon type="share-alt" />
  },
  {
    link: REPORT_URL,
    title: "威胁报告",
    icon: <ThreatReport style={{ width:'16', height:'16', verticalAlign:"middle",  marginRight: 10  }} />
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