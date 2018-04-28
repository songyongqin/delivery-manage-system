# 想输出多个产品形态配置？

由于重构后没有产品形态概念，构建后再重复修改app.json的配置是相当浪费精力的事情。

该系统提供了输出了多个产品形态的功能

[配置文件](../buildConfig/appConfigOutput/app.config.js)

大致格式如下 default 为默认的配置， master为自定义的配置

```javascript
module.exports = {
  //默认全部配置
  "default": require("../../config/app.json"),
  //控制中心的默认配置
  "master": {
    "title": "安天捕风蜜罐系统Master",
    .... //省略配置
  }
}
```

执行 ```npm run build``` 后 ，会在dist文件夹下得到如下结构
```
dist
└───default   //默认形态
└───master  //控制中心形态
```

直接copy整个对应的产品形态文件夹，就可以使用，配置CI的时候也可以简单通过文件夹名字来区分产品形态