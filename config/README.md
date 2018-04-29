# app.json 配置说明

```javascript
{
  "title": "安天捕风蜜罐系统", //应用的标题

  "secret": true, //生产环境下是否启用加密
  
  "routerRegister": {//路由注册，决定加载哪些路由
    "/overview": true,
     //注：若路由为嵌套关系 父路由设置为false,全部子路由会覆盖为 false
    // 若子路由全部为false 父路由会自动覆盖为false
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


  "adminOnly": [//只允许管理员访问的路由
    "/sys-config",
    "/sys-config/network",
    "/sys-config/monitor",
    "/sys-config/strategy",
    "/sys-log",
    "/sys-log/login",
    "/user-manager",
    "/snort"
  ],


  "routerTitleConfig": {//路由标题修改
    "/manager":"流量检测设备"
  },

  //虚拟机创建通知
  "recordOfCreatingVM": true,
  
  //头部IP信息的显示
  "ipInfo": {
    "idsNode": false,
    "honeypotNode": false
  },


  "overview": {//威胁概览
    "captureFlow": true,//捕获流量
    "threatEvent": true//威胁事件
  },

  "analyse": {},

  "overall": {//全局分析
    "capture": true,//捕获文件
    "netBasic": true,//网络基础数据
    "limitNetBasic": true,//异常可疑网络数据
    "pcap": true,//pcap
    "system": true//系统行为
  },

  "networkConfig": {//网络配置
    "dns": true,//dns
    "network": true,//网络配置
    "systemLog": true,//系统日志服务器配置
    "networkAuth": true,//802.1x认证配置
    "masterIPConfig": true,//控制中心ip配置
    "cloudDetection": true//云检测配置
  },

  "strategyConfig": {
    "white": true//白名单
  },

  "monitor": {//自我监控模块显示
    "master": true,
    "honeypotStandalone": true,
    "honeypot": true,
    "ids": true
  },

  "mainDevice": "master",//设置主设备 决定授权过期时 授权行为的目标
  
  "deviceManager": {
    "master": true,
    "honeypot": true,
    "ids": true,
    "honeypotNode": true,
    "idsNode": true,
    "honeypotStandalone": true,
    "idsStandalone": true
  },

  "mirrorImageManager": {
    "collection": true,//是否显示蜜罐汇总
    "node": true,//是否显示节点镜像
    "nodeReadOnly": false//节点镜像是否为只读
  },
  "contactInfo": {
    "phoneNumber": "0755-26806561",
    "email": "antiy_shenzhen@antiy.cn"
  }
}
``` 