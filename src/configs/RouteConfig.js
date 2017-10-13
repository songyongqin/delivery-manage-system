/**
 * Created by jojo on 2017/8/23.
 */
import Icon from '../components/JoIcon';

const OVERVIEW_PATH="/overview",
      ANALYSE_PATH="/analyse",
      ANALYSE_EVENT_PATH="/analyse/event",
      ANALYSE_ATTACK_CHAIN_PATH="/analyse/attack-chain",
      ANALYSE_FALL_HOST_PATH="/analyse/fall-host",
      ANALYSE_RANKING_PATH="/analyse/ranking",
      ANALYSE_THREAT_DISTRIBUTION="/analyse/threat-distribution",
      ANALYSE_OVERALL="/analyse/overall";



import * as tools from '../utils/tools';
import {
  IDS
} from '../configs/ConstConfig'


const producType=(tools.getTemp("productType")||{}).type


export default {
  "overview":{
    order:1,
    title:"威胁概览",
    link:"/overview",
    icon: <Icon type="home4"/>
  },
  "analyse":{
    order:2,
    title:"威胁分析",
    link:"/analyse",
    icon: <Icon type="fork"/>,
    items:{
      "event":{
        order:1,
        title:"事件分析",
        link:"/analyse/event",

      },
      "attack-chain":{
        order:2,
        link:"/analyse/attack-chain",
        title:"攻击链分析",
      },
      "fall-host":{
        order:3,
        link:"/analyse/fall-host",
        title:"失陷主机分析"
      },
      "ranking":{
        order:4,
        link:"/analyse/ranking",
        title:"图表分析",
        nodeHide:true,
      },
      "threat-distribution":{
        order:5,
        link:"/analyse/threat-distribution",
        title:"威胁分布",
        nodeHide:true,
      },
      "overall":{
        order:6,
        link:"/analyse/overall",
        title:"全局分析"
      }
    }
  },
  "early-warning":{
    order:3,
    title:"威胁预警",
    link:"/early-warning",
    icon: <Icon type="bells"/>,
    nodeHide:true,
    idsHide:true,
    items:{
      "email":{
        order:1,
        link:"/early-warning/email",
        title:"邮件通知"
      }
    }
  },
  "report":{
    order:4,
    title:"威胁报告",
    link:"/report",
    nodeHide:true,
    idsHide:true,
    icon: <Icon type="filetext1"/>
  },
  "sys-config":{
    order:6,
    title:"系统配置",
    link:"/sys-config",
    adminOnly:true,
    icon: <Icon type="setting"/>,
    items:{
      "network":{
        title:"网络设置",
        link:"/sys-config/network",
      },
      "monitor":{
        title:"自我监控",
        link:"/sys-config/monitor",
      },
      "strategy":{
        title:"策略配置",
        link:"/sys-config/strategy",
        nodeHide:true,
        idsHide:true,
      }
    }
  },
  "user-manager":{
    title:"用户管理",
    link:"/user-manager",
    adminOnly:true,
    nodeHide:true,
    icon: <Icon type="team"/>
  },
  "manager":{
    order:7,
    // title:producType===IDS?"流量监测管理":"蜜罐管理",
    link:"/manager",
    icon: <Icon type="database2"/>,
    items:{
      device:{
        order:1,
        link:"/manager/device",
        title:"设备管理"
      },
      "virtual-machine":{
        order:2,
        link:"/manager/virtual-machine",
        title:"虚拟蜜罐管理",
        idsHide:true,
      },
      "mirror":{
        order:2,
        link:"/manager/mirror",
        title:"镜像管理",
        idsHide:true,
      }
    }
  }
}
