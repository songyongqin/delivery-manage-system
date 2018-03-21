# app.json 配置说明

```javascript
{
  "title": "attack-capture-system",//应用的标题

  "vmCreateNotification": true,//虚拟机创建通知
  
  "routerRegister": {//路由注册，决定加载哪些路由
    "/overview": true,
    "/analyse": true,
    "/snort":true
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