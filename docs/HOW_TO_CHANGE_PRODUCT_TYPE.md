# 如何改变产品形态？

重构后的acs前端版本内部移除了产品形态的概念，使用feature trigger的方式来控制模块的加载，配置方式请查看下方

[配置文件](../config/app.json)        

[配置说明](../config/README.md)

配置后构建完毕，会自动复制 app.json 内容到 dist 目录