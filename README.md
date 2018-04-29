# Attack-capture-system

以下内容基于读者对整个产品有了解，熟悉 Git 和 NPM 基本操作， 以及 React / Dva相关的 API

## 如何使用代码？
环境: Git / Node
克隆仓库代码
```shell
git clone https://git.antiy.org.cn/chenxinzhou/Attack-Capture-System.git
```
安装依赖 
```shell
npm install # 或者 cnpm install
```
运行本地开发环境
```shell
npm run dev 
```
构建输出静态文件
```
npm run build
```
⚠️⚠️⚠️ 在 linux 上执行 build 之前，需要为 roadhog.sh 添加执行权限

```
chomod +x ./bin/roadhog.sh
```
## 常见问题

* [如何改变产品形态？](/docs/HOW_TO_CHANGE_PRODUCT_TYPE.md)
* [想输出多个产品形态配置？](/docs/HOW_OUTPUT_MUL_APP_CONFIG.md)
* [如何给通过配置文件修改表格的布局和过滤信息？](/docs/HOW_CONFIG_LAYOUT.md)
* [如何添加一个路由级别的新模块？](/docs/HOW_TO_ADD_ROUTE_MODULE.md)
* [内存溢出 JavaScript heap out of memory](/docs/OUT_OF_MEMORY.md)
* [TableWithRemote 组件使用方法](./src/domainComponents/TableWithRemote/README.md)
* [关于授权过期在前端处理的思路](/docs/ABOUT_LICENCE_OVERDUE_HANDLE.md)

## 文件结构说明
```
Attack-capture-system
└───buildConfig   /* 输出构建信息到浏览器控制台的配置，构建时会自动将buildDate改为构建的时间点 */
└───bin /*命令相关配置 目前主要用于解决node内存限制问题*/
└───config  /* 产品模块加载配置 */
│   │   app.json /* 模块加载配置 */
│   │   README.md /* 说明文档 */
│   └───layout /*与 table 相关的配置*/
└───src
|   | index.ejs /* 构建的HTML模板 */
|   | index.tsx /* 整个应用的入口 */
|   | router.tsx /* 整个应用的路由配置 */ 
|   | ... 
|   └───components /*公共组件*/
|   └───domainComponents /*与业务直接相关的公共组件*/
|   └───domainUtils /*与业务相关的工具函数*/
│   │    │ ...   
│   │    └─── request /*业务数据相关的所有http请求管道*/
|   └───models /*公共的model位置*/
|   └───modules /*所有业务功能模块 */
|   └───public /*该文件夹内所有内容构建时 会被复制到输出的static文件夹中 */
|   └───routes /*所有路由的模块 此处配置各个路由加载的内容（懒加载）*/
|   └───themes /*与主题颜色相关的内容*/
|   └───utils /*常用工具函数*/
|   └───navConfig /*页面左侧导航栏的配置 如何修改和使用请查看里面注释*/
```

