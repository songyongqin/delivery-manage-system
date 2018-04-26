# Attack-capture-system

以下内容基于读者对整个产品有了解，熟悉 Git 和 NPM 基本操作， 以及 React / Dva相关的 API

## 常见问题



### 如何使用代码？
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


### 如何改变产品形态？

重构后的acs前端版本内部移除了产品形态的概念，使用feature trigger的方式来控制模块的加载，配置方式请查看下方

[配置文件](./config/app.json)        

[配置说明](./config/README.md)

配置后构建完毕，会自动复制 app.json 内容到 dist 目录

### 想输出多个产品形态配置？

由于重构后没有产品形态概念，构建后再重复修改app.json的配置是相当浪费精力的事情。

该系统提供了输出了多个产品形态的功能

[配置文件](./buildConfig/appConfigOutput/app.config.js)

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

### 如何给通过配置文件修改表格的布局和过滤信息？

[布局相关配置](./config/layout)

在该文件夹下添加对应的json文件，格式规范参考目录下的README

请参看[示例](./src/modules/Analyse_Event/index.tsx)

```javascript
import WithConfig from 'domainComponents/WithConfig'
import combineColumnsConfig from 'domainUtils/combineColumnsConfig'
import path from 'constants/path'

@WithConfig(path.layoutConfig.analyseEvent) //使用WithConfig装饰器 参数为配置文件路径
export default class EventPanel extends React.Component<any, any> {
  static defaultProps = {
    initialFilters: {}
  }
  render() {

    return (
      <TableWithRemote
        initialFilters={{
          ...initialFilters,
          ...this.props.initialFilters,
        }}
        getExpandedRowRenderer={tableConfig.getExpandedRowRender}
        getColumns={options => {
                //可以从 props 里获取layoutConfig 
                //调用combineColumnsConfig 可以将两个 columns结合
          return combineColumnsConfig(tableConfig.getColumns(options), this.props.config.columns)
        }}
        remoteNamespace={NAMESPACE}
      />
    )
  }
}
```
### TableWithRemote 组件使用方法

[TableWithRemote README.md](./src/domainComponents/TableWithRemote/README.md)

### 内存溢出 JavaScript heap out of memory
由于NodeJS本身默认内存限制为1G 在打包内容过多的情况下 会出现内存溢出问题
解决方法如下：
修改 /bin/roadhog 文件中 ```--max_old_space_size=4096``` 的值

```shell
if [ -x "$basedir/node" ]; then
  "$basedir/node" "--max_old_space_size=4096"  "$basedir/../node_modules/._roadhog@2.3.0@roadhog/bin/roadhog.js" "$@"
  ret=$?
else 
  node "--max_old_space_size=4096" "$basedir/../node_modules/._roadhog@2.3.0@roadhog/bin/roadhog.js" "$@"
  ret=$?
fi
exit $ret
```


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
│        │ ...   
│        └─── request /*业务数据相关的所有http请求管道*/
```

