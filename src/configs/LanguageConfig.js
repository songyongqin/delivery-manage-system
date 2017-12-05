/**
 * Created by jojo on 2017/8/23.
 */
import * as tools from '../utils/tools';
import {
  IDS
} from '../configs/ConstConfig'
const producType = (tools.getTemp("productType") || {}).type
const routesZHCN = {
  "overview": {
    title: "威胁概览"
  },
  "analyse": {
    title: "威胁分析",
    items: {
      "event": {
        title: "事件分析",
      },
      "attack-chain": {
        title: "攻击链分析",
      },
      "fall-host": {
        title: "失陷主机分析"
      },
      "ranking": {
        title: "图表统计"
      },
      "threat-distribution": {
        title: "威胁分布"
      },
      "overall": {
        title: "全局分析"
      }
    }
  },
  "early-warning": {
    title: "威胁预警",
    items: {
      email: {
        title: "邮件通知"
      }
    }
  },
  "report": {
    title: "威胁报告",
  },
  "handle": {
    title: "威胁处理",
  },
  "sys-config": {
    title: "系统配置",
    items: {
      "network": {
        title: "网络设置",
      },
      "monitor": {
        title: "自我监控",
      },
      "strategy": {
        title: "策略配置",
      },
      "white-list": {
        title: "白名单策略配置"
      }
    }
  },
  "user-manager": {
    title: "用户管理"
  },
  "sys-log": {
    title: "系统日志",
    items: {
      "login": {
        title: "登录日志"
      }
    }
  },
  "manager": {
    title: producType === IDS ? "流量监测管理" : "蜜罐管理",
    items: {
      "device": {
        title: "设备管理"
      },
      "virtual-machine": {
        title: "虚拟蜜罐管理"
      },
      "mirror": {
        title: "镜像管理"
      }
    }
  }
};

const routesENUS = {
  "overview": {
    title: "OVERVIEW"
  },
  "analyse": {
    title: "ANALYSE",
    items: {
      "event": {
        title: "EVENT",
      },
      "attack-chain": {
        title: "ATTACK CHIAN",
      },
      "fall-host": {
        title: "FALL HOST"
      },
      "ranking": {
        title: "CHART"
      },
      "threat-distribution": {
        title: "DISTRIBUTION"
      },
      "overall": {
        title: "OVERALL"
      }
    }
  },
  "user-manager": {
    title: "USER MANAGER"
  },
  "early-warning": {
    title: "WARNING",
    items: {
      "email": {
        title: "NOTIFICATION"
      }
    }
  },
  "report": {
    title: "REPORT",
  },
  "handle": {
    title: "HANDLE",
  },
  "sys-config": {
    title: "SYSTEM CONFIG",
    items: {
      "network": {
        title: "NETWORK",
      },
      "monitor": {
        title: "MONITOR",
      },
      "strategy": {
        title: "STRATEGY",
      }
    }
  },
  "honeypot-manager": {
    title: "MANAGER",
    items: {
      "device": {
        title: "DEVICE"
      },
      "virtual-machine": {
        title: "HONEYPOT"
      },
      "mirror": {
        title: "MIRROR"
      }
    }
  }
};





export default {
  "en-us": {
    title: "ATTACK CAPTURE SYSTEM",
    routes: routesENUS,
  },
  "zh-cn": {
    title: producType === IDS ? "安天捕风蜜罐流量监测系统" : "安天捕风蜜罐系统",
    routes: routesZHCN,

  }
}
