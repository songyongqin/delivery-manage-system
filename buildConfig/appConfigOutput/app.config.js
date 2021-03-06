module.exports = {
  //默认全部配置
  "default": require("../../config/app.json"),
  //控制中心的默认配置
  "master": {
    "title": "安天捕风蜜罐系统",
    "secret": true,
    "heartBeat": false,
    "routerRegister": {
      "/overview": true,
      "/analyse": true,
      "/analyse/event": true,
      "/analyse/attack-chain": true,
      "/analyse/fall-host": true,
      "/analyse/ranking": true,
      "/analyse/threat-distribution": true,
      "/analyse/overall": true,
      "/early-warning": true,
      "/early-warning/email": true,
      "/report": true,
      "/sys-config": true,
      "/sys-config/network": true,
      "/sys-config/monitor": true,
      "/sys-config/strategy": true,
      "/user-manager": true,
      "/manager": true,
      "/manager/device": true,
      "/manager/virtual-machine": true,
      "/manager/mirror": true,
      "/sys-log": true,
      "/sys-log/login": true,
      "/snort": true,
      "/file-restore": true
    },
    "adminOnly": [
      "/sys-config",
      "/sys-config/network",
      "/sys-config/monitor",
      "/sys-config/strategy",
      "/sys-log",
      "/sys-log/login",
      "/user-manager",
      "/snort"
    ],
    "routerTitleConfig": {},
    "recordOfCreatingVM": true,
    "ipInfo": {
      "idsNode": false,
      "honeypotNode": false
    },
    "overview": {
      "captureFlow": true,
      "threatEvent": true
    },
    "analyse": {},
    "overall": {
      "capture": true,
      "netBasic": true,
      "limitNetBasic": true,
      "pcap": true,
      "system": true
    },
    "networkConfig": {
      "dns": true,
      "network": true,
      "systemLog": true,
      "networkAuth": true,
      "masterIPConfig": false,
      "cloudDetection": true
    },
    "strategyConfig": {
      "simpleFeature": true,
      "snortFeature": true
    },
    "monitor": {
      "master": true,
      "honeypotStandalone": false,
      "honeypot": true,
      "ids": true
    },
    "mainDevice": "master",
    "deviceManager": {
      "master": true,
      "honeypot": true,
      "ids": true,
      "honeypotNode": true,
      "idsNode": true,
      "honeypotStandalone": true,
      "idsStandalone": true,
      "serverUrl": "qqqqqq"
    },
    "mirrorImageManager": {
      "collection": true,
      "node": true,
      "nodeReadOnly": false
    },
    "contactInfo": {
      "phoneNumber": "0755-26806561",
      "email": "antiy_shenzhen@antiy.cn"
    }
  },
  //蜜罐单机版
  "honeypotStandalone": {
    "title": "安天捕风蜜罐系统",
    "secret": true,
    "heartBeat": false,
    "routerRegister": {
      "/overview": true,
      "/analyse": true,
      "/analyse/event": true,
      "/analyse/attack-chain": true,
      "/analyse/fall-host": true,
      "/analyse/ranking": true,
      "/analyse/threat-distribution": true,
      "/analyse/overall": true,
      "/early-warning": true,
      "/early-warning/email": true,
      "/report": true,
      "/sys-config": true,
      "/sys-config/network": true,
      "/sys-config/monitor": true,
      "/sys-config/strategy": true,
      "/user-manager": true,
      "/manager": true,
      "/manager/device": true,
      "/manager/virtual-machine": true,
      "/manager/mirror": true,
      "/sys-log": true,
      "/sys-log/login": true,
      "/snort": true
    },
    "adminOnly": [
      "/sys-config",
      "/sys-config/network",
      "/sys-config/monitor",
      "/sys-config/strategy",
      "/sys-log",
      "/sys-log/login",
      "/user-manager",
      "/snort"
    ],
    "recordOfCreatingVM": true,
    "ipInfo": {
      "idsNode": false,
      "honeypotNode": false
    },
    "overview": {
      "captureFlow": true,
      "threatEvent": true
    },
    "analyse": {},
    "overall": {
      "capture": true,
      "netBasic": true,
      "limitNetBasic": false,
      "pcap": true,
      "system": true
    },
    "networkConfig": {
      "dns": true,
      "network": true,
      "systemLog": true,
      "networkAuth": true,
      "masterIPConfig": false,
      "cloudDetection": false
    },
    "strategyConfig": {
      "simpleFeature": true,
      "snortFeature": true
    },
    "monitor": {
      "master": false,
      "honeypotStandalone": true,
      "honeypot": false,
      "ids": false
    },
    "mainDevice": "honeypotStandalone",
    "deviceManager": {
      "master": false,
      "honeypot": false,
      "ids": false,
      "honeypotNode": false,
      "idsNode": false,
      "honeypotStandalone": true,
      "idsStandalone": false,
      "serverUrl": "https://update.ithreat.cn/acs"
    },
    "mirrorImageManager": {
      "collection": true,
      "node": false,
      "nodeReadOnly": false,
      "updateUrl": "https://update.ithreat.cn/acs/imgs"
    },
    "contactInfo": {
      "phoneNumber": "0755-26806561",
      "email": "antiy_shenzhen@antiy.cn"
    }
  },
  //IDS单机版
  "idsStandalone": {
    "title": "安天捕风流量监测系统",
    "secret": false,
    "heartBeat": false,
    "host":"http://172.31.50.41:7300/mock/5b3ae25f3a04b867a240d558/ids",
    "routerRegister": {
      "/overview": true,
      "/analyse": true,
      "/analyse/event": true,
      "/analyse/attack-chain": false,
      "/analyse/fall-host": true,
      "/analyse/ranking": true,
      "/analyse/threat-distribution": true,
      "/analyse/overall": true,
      "/early-warning": true,
      "/early-warning/email": true,
      "/report": true,
      "/sys-config": true,
      "/sys-config/network": true,
      "/sys-config/monitor": true,
      "/sys-config/strategy": true,
      "/user-manager": true,
      "/manager": true,
      "/config/device-manager": true,
      "/manager/virtual-machine": false,
      "/manager/mirror": false,
      "/sys-log": true,
      "/sys-log/login": true,
      "/snort": true,
      "/file-restore": true
    },
    "adminOnly": [
      "/sys-config",
      "/sys-config/network",
      "/sys-config/monitor",
      "/sys-config/strategy",
      "/sys-log",
      "/sys-log/login",
      "/user-manager",
      "/snort"
    ],
    "routerTitleConfig": {
      "/manager": "流量监测管理"
    },
    "recordOfCreatingVM": false,
    "ipInfo": {
      "idsNode": false,
      "honeypotNode": false
    },
    "overview": {
      "captureFlow": true,
      "threatEvent": true
    },
    "analyse": {},
    "overall": {
      "capture": false,
      "netBasic": true,
      "limitNetBasic": true,
      "pcap": false,
      "system": false
    },
    "networkConfig": {
      "dns": true,
      "network": true,
      "systemLog": true,
      "networkAuth": true,
      "masterIPConfig": false,
      "cloudDetection": true
    },
    "strategyConfig": {
      "simpleFeature": true,
      "snortFeature": true
    },
    "monitor": {
      "master": false,
      "honeypotStandalone": false,
      "honeypot": false,
      "ids": true
    },
    "mainDevice": "master",
    "deviceManager": {
      "master": false,
      "honeypot": false,
      "ids": false,
      "honeypotNode": false,
      "idsNode": false,
      "honeypotStandalone": false,
      "idsStandalone": true,
      "serverUrl": "https://update.ithreat.cn/ids"
    },
    "mirrorImageManager": {
      "collection": true,
      "node": true,
      "nodeReadOnly": false
    },
    "contactInfo": {
      "phoneNumber": "0755-26806561",
      "email": "antiy_shenzhen@antiy.cn"
    }
  }
}


