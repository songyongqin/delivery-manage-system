/*
该部分为导航栏内容
需在入口文件处 在应用完整载入前初始化（fetchNavConfig）
*/
import React from 'react'
import { Icon } from 'antd'
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
  SYS_LOG_LOGIN_URL
} from 'routes/config/path'
import {
  shouldHoneypotNodeHide,
  shouldIdsNodeHide,
  shouldIdsStandAloneHide,
  adminOnly,
  openRouteList
} from 'routes/config/auth'
import {
  MASTER,
  IDS_NODE,
  IDS_STANDALONE,
  HONEYPOT_STANDALONE,
  HONEYPOT_NODE
} from 'constants/production'

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
  }
]

interface RemoveShouldHideNavOption {
  navConfig: any[],
  admin: boolean,
  shouldHideNav: string[]
}

interface RemoveShouldHideNav {
  (option: RemoveShouldHideNavOption): any[]
}



const removeShouldHideNav: RemoveShouldHideNav = ({ navConfig = [], admin = false, shouldHideNav = [] }) => {
  try {
    return navConfig
      .filter(i => !shouldHideNav.includes(i.link))
      .filter(i => admin || (!adminOnly.includes(i.link)))
      .map(i => (
        "items" in i
          ?
          {
            ...i,
            items: removeShouldHideNav({ navConfig: i.items, admin, shouldHideNav })
          }
          :
          i
      ))
  } catch (e) {
    console.error(e)
    return navConfig
  }
}



export const getNavConfig = ({ production, admin = false }) => {
  switch (production) {
    case MASTER:
      return removeShouldHideNav({ navConfig: _navConfig, admin, shouldHideNav: [] })
    case HONEYPOT_NODE:
      return removeShouldHideNav({ navConfig: _navConfig, admin, shouldHideNav: shouldHoneypotNodeHide })
    case IDS_NODE:
      return removeShouldHideNav({ navConfig: _navConfig, admin, shouldHideNav: shouldIdsNodeHide })
    case HONEYPOT_STANDALONE:
      return removeShouldHideNav({ navConfig: _navConfig, admin, shouldHideNav: [] })
    case IDS_STANDALONE:
      return removeShouldHideNav({ navConfig: _navConfig, admin, shouldHideNav: shouldIdsStandAloneHide })
    default:
      return _navConfig
  }
}
