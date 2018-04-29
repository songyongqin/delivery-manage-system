# 关于授权过期在前端处理的思路

⚠️⚠️⚠️ 请在阅读该部分内容前 先熟悉授权方面的需求

以下内容基于读者了解 React / Dva

需求大致分为以下几点要点

* 希望授权过期时，跳转到设备管理中，并提示过期信息
* 希望授权过期后，无法跳转到其他非设备管理路由，并提示过期信息
* 希望不同的产品类型有不同的设备授权过期提示内容 
* 希望不同的用户身份有不同的设备授权过期提示内容

为了实现以上需求，我们做了下面这些事情

### 前端如何知道设备授权已经过期？

通过任意 http 请求返回的 status 是否等于```-10```来判断设备授权是否过期，该部分的逻辑在```src/domainUtils/request/final```中


### 过期后弹出的提示内容配置

通知配置```DeviceInfo```组件的参数来决定显示的内容,具体的使用例子可以参考```src/modules/Manager_Device/components/Master/index.tsx```,不同的用户类型需要提示不同的文本。


### DeviceInfo组件如何知道需要弹出消息框？

有一个```src/models/layout.ts```的公共 model ，其state中```overdueTipVisible```的值决定了DeviceInfo组件在``` componentDidMount``` 、```componentDidUpdate```两个生命周期中是否弹出提示框，
细节请查看```src/modules/Manager_Device/components/DeviceInfo/index.tsx``` 。

若你看了DeviceInfo组件内的细节，会发现还有一个```mainDevice```的props, 是因为在设备管理中，不止一个```DeivceInfo```的实例，可能会导致多个弹出框实例被调用，由于所有事件都是异步的，我们无法确定到底哪一个```DeviceInfo```的授权弹出框会被调用，结果肯定不是我们预期想要的。

设置```mainDevice```就是为了区分到底哪一台才是当前web的主设备，该部分可以在```config/app.json```的```mainDevice```中设置，默认为```master```。逻辑上的细节可以查看```src/modules/Manager_Device/index.tsx```


### 过期后路由限制的实现

该部分实现的主要为两点
* 点击侧边导航栏，阻止链接跳转，并弹出设备授权过期消息框
* 通过手动修改URL来跳转路由，直接重定向到设备管理，并弹出设备授权过期消息框

前者的实现逻辑在```src/modules/MainWrapper/components/Nav/index.tsx```中可以找到如下代码片段

```javascript
    //授权过期 跳转到device路由
        if (isLicenceOverdue()) {
          //阻止默认跳转行为
          e.preventDefault()
          //跳转到设备管理
          getAppInstance()._store.dispatch(routerRedux.push(MANAGER_DEVICE_URL))
          //弹出消息框
          getAppInstance()._store.dispatch({
            type: "layout/saveOverdueTipVisible",
            payload: true
          })
        }
```

```javascript
  onOpenChange = openKeys => {
    //授权过期不进行展开操作
    if (isLicenceOverdue()) {
      return
    }
    this.setState({
      openKeys: [last(openKeys)]
    })
    setTimeout(() => {
      this.resizeNiceScroll()
    }, 300)
  }
```


后者的逻辑处理部分在```src/modules/MainWrapper/index.tsx```


```javascript
   //若进入的路由不是/manager/device 且设备授权已过期
    if (activeRoute !== MANAGER_DEVICE_URL && isLicenceOverdue()) {
      this.props.dispatch(routerRedux.push(MANAGER_DEVICE_URL))
      this.props.dispatch({
        type: "layout/saveOverdueTipVisible",
        payload: true
      })
      return <div></div>
    }

```