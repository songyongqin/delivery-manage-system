# 如何给通过配置文件修改表格的布局和过滤信息？

[布局相关配置](../config/layout/README.md)

在该文件夹下添加对应的json文件，格式规范参考目录下的README

请参看[示例](../src/modules/Analyse_Event/index.tsx)

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