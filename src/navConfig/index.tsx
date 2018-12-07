/*
该部分为导航栏内容
需在入口文件处 在应用完整载入前初始化（fetchNavConfig）
*/
import React from 'react'
import { Icon } from 'antd'
import { head } from 'utils'
import { find, flattenDeep } from 'lodash'
import {
  LOGIN_URL,

  OVERVIEW_URL,

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
  MANAGER_DEVICE_URL,
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

  AUDIT_URL,

  TOPO_URL,

  AUDIT_EVENT_URL,

  AUDIT_ASSETS_URL,

  AUDIT_CAUGHT_URL,

  STRATEGY_URL,

  CONFIG_URL,

  CONFIG_USER_MANAGER_URL,

  CONFIG_DEVICE_MANAGER_URL,

  CONFIG_SYS_LOG_URL,

  CONFIG_SYS_LOG_LOGIN_URL,

  CONFIG_SYS_CONFIG_URL,

  CONFIG_SYS_CONFIG_NETWORK_URL,

  CONFIG_SYS_CONFIG_MONITOR_URL,

  CONFIG_SYS_CONFIG_WARN_URL,


} from 'routes/config/path'
// import {
//   shouldHoneypotNodeHide,
//   shouldIdsNodeHide,
//   shouldIdsStandAloneHide,
//   adminOnly,
//   openRouteList
// } from 'routes/config/auth'

import { getAppConfig } from 'domain/app'
// import router from 'router';


const Indent = ({ space = 0 }) =>
  <div style={{ display: 'inline-block', width: `${(space + 1) * 14 + 20}px`, height: 20 }}  ></div>

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
        title: "事件视图",
        link: ANALYSE_EVENT_URL,
        icon: <Indent />,
      },
      {
        link: ANALYSE_ATTACKED_ASSETS_URL,
        title: "受攻击资产视图",
        icon: <Indent />,
      },
      {
        link: ANALYSE_ATTACK_URL,
        title: "攻击者视图",
        icon: <Indent />,
      },
      {
        link: ANALYSE_THREAT_URL,
        title: "威胁视图",
        icon: <Indent />,
      },
      {
        link: ANALYSE_REPORT_URL,
        title: "文件检测列表",
        icon: <Indent />,
      }
    ]
  },
  {
    link: AITUATION_URL,
    title: "安全态势",
    icon: <Icon type="customer-service" />
  },
  // {
  //   link: TOPO_URL,
  //   title: "拓扑图",
  //   icon: <Icon type="share-alt" />
  // },
  {
    link: ANALYSE_REPORT_DETAIL_URL,
    title: "威胁报告xxxx",
    hidden: true,
    icon: <Icon type="file-text"></Icon>
  },
  {
    // 受害资产详细情况
    link: ANALYSE_URL + '?',
    title: "威胁分析",
    hidden: true,
    icon: <Icon type="fork" />,
    items: [
      {
        link: ANALYSE_ATTACKED_ASSETS_URL,
        title: "受攻击资产视图",
        hidden: true,
        items: [{
          link: ANALYSE_ATTACKED_ASSETS_DETAL_URL,
          title: '受害资产详细情况',
          hidden: true
        }]
      }
    ]
  },
  {
    // 攻击者详细情况
    link: ANALYSE_URL + '?',
    title: "威胁分析",
    hidden: true,
    icon: <Icon type="fork" />,
    items: [
      {
        link: ANALYSE_ATTACK_URL,
        title: "攻击者视图",
        hidden: true,
        items: [{
          link: ANALYSE_ATTACK_DETAL_URL,
          title: '攻击者视图详细情况',
          hidden: true
        }]
      }
    ]
  },
  {
    // 威胁视图  威胁家族详细情况
    link: ANALYSE_URL + '?',
    title: "威胁分析",
    hidden: true,
    icon: <Icon type="fork" />,
    items: [
      {
        link: ANALYSE_THREAT_URL,
        title: "威胁视图",
        hidden: true,
        items: [{
          link: ANALYSE_THREAT_URL + '?type=family',
          title: '威胁家族',
          hidden: true,
          items: [{
            link: ANALYSE_THREAT_FAMILY_DETAIL_URL,
            title: '详细信息',
            hidden: true
          }]
        }]
      }
    ]
  },
  {
    // 威胁视图  攻击利用漏洞详细情况
    link: ANALYSE_URL + '?',
    title: "威胁分析",
    hidden: true,
    icon: <Icon type="fork" />,
    items: [
      {
        link: ANALYSE_THREAT_URL,
        title: "威胁视图",
        hidden: true,
        items: [{
          link: ANALYSE_THREAT_URL + '?type=loophole',
          title: '攻击利用漏洞',
          hidden: true,
          items: [{
            link: ANALYSE_THREAT_LOOPHOLE_DETAIL_URL,
            title: '详细信息',
            hidden: true
          }]
        }]
      }
    ]
  },
  {
    link: EARLY_WARNING_URL,
    title: "威胁预警",
    icon: <Icon type="bell" />,
    hidden: true,
    items: [
      {
        link: EARLY_WARNING_EMAIL_URL,
        title: "邮箱通知"
      }
    ]
  },
  {
    link: AUDIT_URL,
    title: "审计记录",
    icon: <Icon type="setting" />,
    items: [
      {
        link: AUDIT_EVENT_URL,
        title: "基本事件审计",
        icon: <Indent />,
      },
      {
        link: AUDIT_ASSETS_URL,
        title: "资产审计",
        icon: <Indent />,
      },
      // {
      //   link: AUDIT_CAUGHT_URL,
      //   title: "抓包记录",
      //   icon: <Indent />,
      // }
    ]
  },
  {
    link: REPORT_URL,
    title: "威胁报告",
    icon: <Icon type="file-text"></Icon>
  },
  {
    link: STRATEGY_URL,
    title: "策略配置",
    hidden: true,
    icon: <Icon type="file-text"></Icon>
  },
  {
    link: SYS_CONFIG_URL,
    title: "系统配置",
    icon: <Icon type="setting" />,
    hidden: true,
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
    icon: <Icon type="team" />,
    hidden: true
  },
  {
    link: MANAGER_URL,
    icon: <Icon type="database" />,
    title: "蜜罐管理",
    hidden: true,
    items: [
      {
        link: CONFIG_DEVICE_MANAGER_URL,
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
  // {
  //   link: SYS_LOG_URL,
  //   icon: <Icon type="file-text"></Icon>,
  //   title: "系统日志",
  //   hidden: true,
  //   items: [
  //     {
  //       link: SYS_LOG_LOGIN_URL,
  //       title: "登录日志",
  //       icon: <Indent  />,
  //     }
  //   ]
  // },
  {
    link: SNORT_URL,
    title: "Snort",
    hidden: true
  },
  {
    link: FILE_RESTORE,
    title: "文件还原",
    hidden: true
  },
  {
    link: CONFIG_URL+'?',
    title: "配置管理",
    hidden: true, //ids，在态势中隐藏
    icon: <Icon type="database" />,
    items: [
      {
        link: CONFIG_USER_MANAGER_URL,
        title: "用户管理",
        icon: <Indent />,
      },
      {
        link: CONFIG_DEVICE_MANAGER_URL,
        icon: <Indent />,
        title: "设备管理",
      },
      {
        link: CONFIG_SYS_LOG_URL,
        icon: <Indent />,
        title: "系统日志",
        items: [
          {
            link: CONFIG_SYS_LOG_LOGIN_URL,
            title: "登录日志",
            icon: <Indent space={1} />,
          }
        ]
      }, {
        link: CONFIG_SYS_CONFIG_URL,
        title: "系统配置",
        icon: <Indent />,
        items: [
          {
            link: CONFIG_SYS_CONFIG_NETWORK_URL,
            title: "网卡配置",
            icon: <Indent space={1} />,
          },
          {
            link: CONFIG_SYS_CONFIG_WARN_URL,
            title: "告警配置",
            icon: <Indent space={1} />,
          },
          {
            link: CONFIG_SYS_CONFIG_MONITOR_URL,
            title: "自我监控",
            icon: <Indent space={1} />,
          }
        ]
      },
    ]
  },
  {
    link: CONFIG_URL,
    title: "配置管理",
    icon: <Icon type="database" />,
    items: [
      {
        link: CONFIG_NODE_MONITOR_URL,
        title: "节点监控",
        icon: <Indent />,
      },
      {
        link: CONFIG_USER_MANAGER_URL,
        title: "用户管理",
        icon: <Indent />,
      },
      {
        link: CONFIG_SYS_LOG_URL, 
        icon: <Indent />,
        title: "系统日志",
        items: [
          {
            link: CONFIG_SYS_LOG_LOGIN_URL,
            title: "登录日志",
            icon: <Indent space={1} />,
          }
        ]
      }, {
        link:  CONFIG_SYS_CONFIG_URL,
        title: "系统配置",
        icon: <Indent />,
        // items: [
        //   {
        //     link: CONFIG_SYS_CONFIG_WARN_URL,
        //     title: "告警配置",
        //     icon: <Indent space={1} />,
        //   }
        // ]
      },
    ]
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