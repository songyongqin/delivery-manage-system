module.exports = {
  //默认全部配置
  "default": require("../../config/app.json"),
  //控制中心的默认配置
  "master": {
    "title": "安天捕风蜜罐系统Master",
    "secret": true,
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
      "masterIPConfig": true,
      "cloudDetection": true
    },
    "strategyConfig": {
      "white": true
    },
    "monitor": {
      "master": true,
      "honeypotStandalone": true,
      "honeypot": true,
      "ids": true
    },
    "deviceManager": {
      "master": true,
      "honeypot": true,
      "ids": true,
      "honeypotNode": false,
      "idsNode": false,
      "honeypotStandalone": false,
      "idsStandalone": false
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

