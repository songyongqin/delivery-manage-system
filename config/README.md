# app.json 配置说明

```javascript
{
  "title": "attack-capture-system",//应用的标题

  "secret":true //生产环境下是否启用加密

  "vmCreateNotification": true,//虚拟机创建通知
  
  "routerRegister": {//路由注册，决定加载哪些路由
    "/overview": true,
    "/analyse": true,
    "/snort":true,
    //注：若路由为嵌套关系 父路由设置为false,全部子路由会覆盖为 false
    // 若子路由全部为false 父路由会自动覆盖为false
    "/analyse": false,
    "/analyse/event": true,
  },
  
  "adminOnly": [//只允许管理员访问的路由
    "/device"
  ],

  "overview": {
    "captureFlow": true,
    "threatFlow": true
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
    "masterIPConfig": true,
    "cloudDetection": true
  },
  "strategyConfig": {
    "white": true
  },
  "monitor": {
    "master": true,
    "honeypotNode": true,
    "idsNode": true,
    "honeypot": true,
    "ids": true
  },
  "deviceManager": {
    "master": true,
    "honeypotNode": true,
    "idsNode": true,
    "honeypot": true,
    "ids": true
  },
  "mirrorImageManager": {
    "collection": true,
    "honeypotNode": true,
    "honeypot": true
  }
}
``` 