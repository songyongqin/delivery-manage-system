/*
该部分为导航栏内容
需在入口文件处 在应用完整载入前初始化（fetchNavConfig）
*/
import React from 'react'
import { Icon } from 'antd'
import { head } from 'utils'
import {
  LOGIN_URL,

  OVERVIEW_URL,

  ANALYSE_URL,
  ANALYSE_EVENT_URL,
  ANALYSE_ATTACK_CHAIN_URL,
  ANALYSE_FALL_HOST_URL,
  ANALYSE_RANKING_URL,
  ANALYSE_THREAT_DIS_URL,
  ANALYSE_OVERALL_URL,

  EARLY_WARNING_URL,
  EARLY_WARNING_EMAIL_URL,

  REPORT_URL,

  SYS_CONFIG_URL,
  SYS_CONFIG_NETWORK_URL,
  SYS_CONFIG_MONITOR_URL,
  SYS_CONFIG_STRATEGY_URL,

  USER_MANAGER_URL,

  MANAGER_URL,
  MANAGER_DEVICE_URL,
  MANAGER_VM_URL,
  MANAGER_MIRROR_URL,

  SYS_LOG_URL,
  SYS_LOG_LOGIN_URL,
  ROOT_URL,
  SNORT_URL,
  FILE_RESTORE
} from 'routes/config/path'
import {
  shouldHoneypotNodeHide,
  shouldIdsNodeHide,
  shouldIdsStandAloneHide,
  adminOnly,
  openRouteList
} from 'routes/config/auth'

import { getAppConfig } from 'domain/app'
import router from 'router';

export const _navConfig = [
  {
    link: OVERVIEW_URL,
    title: "威胁概览",
    icon: <Icon type="home" />
  },
  {
    link: ANALYSE_URL,
    title: "威胁分析",
    icon: <Icon type="fork" />,
    items: [
      {
        title: "事件分析",
        link: ANALYSE_EVENT_URL,
      },
      {
        link: ANALYSE_ATTACK_CHAIN_URL,
        title: "攻击链分析",
      },
      {
        link: ANALYSE_FALL_HOST_URL,
        title: "失陷主机分析"
      },
      {
        link: ANALYSE_RANKING_URL,
        title: "图表分析",
      },
      {
        link: ANALYSE_THREAT_DIS_URL,
        title: "威胁分布",
      },
      {
        link: ANALYSE_OVERALL_URL,
        title: "全局分析"
      }
    ]
  },
  {
    link: EARLY_WARNING_URL,
    title: "威胁预警",
    icon: <Icon type="bell" />,
    items: [
      {
        link: EARLY_WARNING_EMAIL_URL,
        title: "邮箱通知"
      }
    ]
  },
  {
    link: REPORT_URL,
    title: "威胁报告",
    icon: <Icon type="file-text"></Icon>
  },
  {
    link: SYS_CONFIG_URL,
    title: "系统配置",
    icon: <Icon type="setting" />,
    items: [
      {
        link: SYS_CONFIG_NETWORK_URL,
        title: "网络配置"
      },
      {
        link: SYS_CONFIG_MONITOR_URL,
        title: "自我监控",
      },
      {
        link: SYS_CONFIG_STRATEGY_URL,
        title: "策略配置"
      }
    ]
  },
  {
    link: USER_MANAGER_URL,
    title: "用户管理",
    icon: <Icon type="team" />
  },
  {
    link: MANAGER_URL,
    icon: <Icon type="database" />,
    title: "蜜罐管理",
    items: [
      {
        link: MANAGER_DEVICE_URL,
        title: "设备管理"
      },
      {
        link: MANAGER_VM_URL,
        title: "虚拟蜜罐管理"
      },
      {
        link: MANAGER_MIRROR_URL,
        title: "镜像管理"
      }
    ]
  },
  {
    link: SYS_LOG_URL,
    icon: <Icon type="file-text"></Icon>,
    title: "系统日志",
    items: [
      {
        link: SYS_LOG_LOGIN_URL,
        title: "登录日志"
      }
    ]
  },
  {
    link: SNORT_URL,
    title: "Snort"
  },
  {
    link: FILE_RESTORE,
    title: "文件还原"
  }
]

interface RemoveShouldHideNavOption {
  navConfig: any[],
  // admin: boolean,
  shouldHideNav: string[]
}

interface RemoveShouldHideNav {
  (option: RemoveShouldHideNavOption): any[]
}


//根据shouldHideNav 移除 navConfig 中匹配 的 nav项
const removeShouldHideNav: RemoveShouldHideNav = ({ navConfig = [], shouldHideNav = [] }) => {
  try {
    return navConfig
      .filter(i => !shouldHideNav.includes(i.link))
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

const navLinkList = [...getNavLink(_navConfig), SNORT_URL, FILE_RESTORE]

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

    const navConfig = removeItemsEmptyNav(removeShouldHideNav({ navConfig: _navConfig, shouldHideNav: [...shouldHideNav, SNORT_URL, FILE_RESTORE] }))

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

    if (link === ROOT_URL) {
      return head(navConfig).link
    }

    return head(navConfig.find(item => item.link === link).items).link

  } catch (e) {
    return ROOT_URL
  }
}