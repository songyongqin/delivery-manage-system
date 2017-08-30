/**
 * Created by jojo on 2017/8/23.
 */


const routesZHCN={
    "overview":{
      title:"威胁概览"
    },
    "analyse":{
      title:"威胁分析",
      items:{
        "event":{
          title:"事件分析",
        },
        "attack-chain":{
          title:"攻击链分析",
        },
        "fall-host":{
          title:"失陷主机分析"
        },
        "ranking":{
          title:"图表分析"
        },
        "threat-distribution":{
          title:"威胁分布"
        },
        "overall":{
          title:"全局分析"
        }
      }
    },
    "early-warning":{
      title:"威胁预警",
      items:{
        email:{
          title:"邮件通知"
        }
      }
    },
    "report":{
      title:"威胁报告",
    },
    "handle":{
      title:"威胁处理",
    },
    "sys-config":{
      title:"系统配置"
    },
    "honeypot-manager":{
      title:"蜜罐管理",
      items:{
        "device":{
          title:"设备管理"
        },
        "virtual-machine":{
          title:"虚拟蜜罐管理"
        }
      }
    }
};

const routesENUS={
  "overview":{
    title:"OVERVIEW"
  },
  "analyse":{
    title:"ANALYSE",
    items:{
      "event":{
        title:"EVENT",
      },
      "attack-chain":{
        title:"ATTACK CHIAN",
      },
      "fall-host":{
        title:"FALL HOST"
      },
      "ranking":{
        title:"CHART"
      },
      "threat-distribution":{
        title:"DISTRIBUTION"
      },
      "overall":{
        title:"OVERALL"
      }
    }
  },
  "early-warning":{
    title:"WARNING",
    items:{
      "email":{
        title:"NOTIFICATION"
      }
    }
  },
  "report":{
    title:"REPORT",
  },
  "handle":{
    title:"HANDLE",
  },
  "sys-config":{
    title:"SYSTEM CONFIG"
  },
  "honeypot-manager":{
    title:"MANAGER",
    items:{
      "device":{
        title:"DEVICE"
      },
      "virtual-machine":{
        title:"HONEYPOT"
      }
    }
  }
};



const statisticTextConfigZHCN={

}

const tableTextConfigZHCN={
  analyseEvent:{
    tableTitle:"威胁事件分析",
    title:{
      attackStage:"攻击阶段",
      action:"行为",
      level:"威胁等级",
      actionStatus:"操作状态",
      description:"威胁描述",
      counts:"次数",
      attackTimes:"攻击时间"
    },
    expandedRow:{
      title:"详细信息",
      rows:{
        details:"详情",
        advice:"修补建议"
      }
    },
    filter:{
      attackStage:{
        scan:"扫描",
        invade:"入侵",
        install:"安装",
        control:"控制"
      },
      level:{
        middle:"中危",
        high:"高危",
        low:"低危"
      },
      actionStatus:{
        "1":"成功",
        "0":"失败",
        "-1":"未知"
      }

    }
  }
};


const pageTextConfig={
  analyseEvent:{
    statistics:{
      title:"威胁事件分类",
      items:{
        "counts":"攻击次数",
        "highEvents":"攻击高危次数",
        "exploits":"攻击利用漏洞",
        "tools":"攻击武器",
        "threatInfos":"威胁情报",
        "fallHosts":"失陷主机"
      },
      units:{
        counts: "次",
        highEvents: "起",
        exploits: "个",
        tools:"个",
        threatInfos: "条",
        fallHosts: "台"
      }
    },
    table:{
      tableTitle:"威胁事件分析",
      title:{
        attackStage:"攻击阶段",
        action:"行为",
        level:"威胁等级",
        actionStatus:"操作状态",
        description:"威胁描述",
        counts:"次数",
        attackTimes:"攻击时间"
      },
      expandedRow:{
        title:"详细信息",
        rows:{
          details:"详情",
          advice:"修补建议"
        }
      },
      filter:{
        attackStage:{
          scan:"扫描",
          invade:"入侵",
          install:"安装",
          control:"控制"
        },
        level:{
          middle:"中危",
          high:"高危",
          low:"低危"
        },
        actionStatus:{
          "1":"成功",
          "0":"失败",
          "-1":"未知"
        }

      }
    }
  }
};


export default {
  "en-us":{
    title:"ATTACK CAPTURE SYSTEM",
    routes:routesENUS,
  },
  "zh-cn":{
    title:"安天捕风蜜罐系统",
    routes:routesZHCN,
    tableTextConfig:tableTextConfigZHCN

  },
  pageTextConfig
}
