# TableWithRemote

## 此处新增了筛选用户账号与姓名

> 该组件主要用于纯展示类的表格组件 省去手动控制的麻烦 配置好后可以自动处理发送对应请求

典型的使用例子 [系统日志-登录日志](../../modules/SystemLog_Login/index.tsx)

**model.ts**
```javascript
import { SYSTEM_LOG_LOGIN_NAMESPACE } from 'constants/model'
import { fetchSystemLogLogin, exportSystemLogLogin } from './services'
import commonEffectCreator from 'domainUtils/commonEffectCreator'

export default {
  namespace: SYSTEM_LOG_LOGIN_NAMESPACE,//model全局唯一的namespace
  effects: {
    //这里的 effect 方法名必须为 fetch
    fetch: commonEffectCreator(fetchSystemLogLogin),
  }
}
```

**index.tsx**

```jsx
    ....//省略代码若干
   <TableWithRemote
      onChange={this.onChange}
      //初始化参数查询
      initialFilters={this.state.initialFilters}
      key={`${this.state.lastReqTime}-table`}
      //这里填函数 返回columns
      getColumns={option => {
        return combineColumnsConfig(getColumns(option), this.props.config.columns)
      }}
      //这里填model的名字
      remoteNamespace={SYSTEM_LOG_LOGIN_NAMESPACE}>
    </TableWithRemote>
    ....//省略代码若干

```

## API

| 成员                  | 说明                                  | 类型                                                    | 默认值                |
| --------------------- | ------------------------------------- | ------------------------------------------------------- | --------------------- |
| remoteNamespace(必填) | 对应 model 的 namespace               | string                                                  | 无                    |
| getColumns (必填)     | 设置表格的列属性                      | Function(options)     返回内容为antd Table组件的columns | 无                    |
| initialFilters        | 初始化的filters的内容                 | Object                                                  | { limit: 10,page: 1 } |
| onChange              | table 所有的 filters 改变时的回调函数 | Function(filters)                                       | 无                    |
| onDataChange          | table 的 Data请求返回后的回调函数     | Function(data)                                          | 无                    |
| onFinal               | table数据请求结束后的回调函数         | Function()                                              | 无                    |
| tableProps            | 参考 antd 的 table属性                | Object                                                  | 无                    |
