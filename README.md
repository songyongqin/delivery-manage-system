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

[配置文件]('./config/app.json')        

[配置说明]('./config/README.md')

配置后构建完毕，会自动复制 app.json 内容到 dist 目录 ，
可以通过配置多个app.json来部署不同的产品形态


### 如何给通过配置文件修改表格的布局和过滤信息？

[布局相关配置]('./config/layout')

在该文件夹下添加对应的json文件，格式规范参考目录下的README

请参看[示例]('./src/modules/Analyse_Event/index.tsx')

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

### 用户登录信息的相关api

/src/domain/user.ts

## 文件结构说明

```
  
Attack-capture-system
└───buildConfig   /* 输出构建信息到浏览器控制台的配置，构建时会自动将buildDate改为构建的时间点 */
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
|   
```

