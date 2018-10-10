import * as React from 'react'
import classnames from 'classnames'
const styles = require("./styles.less")
import { Menu } from 'antd'
import { Link } from 'dva/router'
import { getNavConfig } from 'navConfig'
import { getAppConfig } from 'domain/app'
import { last } from 'utils'
import { If, Choose, When, Otherwise } from 'components/ControlStatements'
import $ from 'jquery'
import 'jquery.nicescroll'
import { CONFIG_DEVICE_MANAGER_URL } from 'routes/config/path'
import { getAppInstance } from 'domain/instance'
import { isLicenceOverdue, showOverdueTipModal } from 'domain/licence'
import { routerRedux } from 'dva/router'

const getItemLink = config => {
  if( "items" in config ){
    // let obj = config.items&&config.items.length ? config.items
    return  getItemLink(config.items[0])
  }
  else return config.link
} 

const getFinalLink = config => {
  console.log(getItemLink(config))
  try {
    // return "items" in config ? config.items[0].link : config.link
    return getItemLink(config)
  } catch (e) {
    return config.link
  }
}

const getMenuContent = ({ navConfig = [], mini = true, selectedKeys, innerItem = false, active }) => {
  return navConfig.map(i => {



    // console.info(i["icon"], mini, i.link)

    const link = getFinalLink(i)

    // const title = (
    //   <Link to={link} className={classes} onClick={e => {
    //     //授权过期 跳转到device路由
    //     if (isLicenceOverdue()) {
    //       //阻止默认跳转行为
    //       e.preventDefault()
    //       //跳转到设备管理
    //       getAppInstance()._store.dispatch(routerRedux.push(MANAGER_DEVICE_URL))
    //       //弹出消息框
    //       getAppInstance()._store.dispatch({
    //         type: "layout/saveOverdueTipVisible",
    //         payload: true
    //       })
    //     }
    //   }}>
    //     <Choose>
    //       <When condition={i["icon"]} >
    //         {i.icon}
    //       </When>
    //       <When condition={(!i["icon"]) && (!mini)}>
    //         <span style={{ display: "inline-block", width: "26px" }}></span>
    //       </When>
    //     </Choose>
    //     <If condition={!mini || innerItem}>
    //       <p style={{
    //         // textAlignLast: "justify",
    //         display: "inline-block",
    //         width: "80px"
    //       }}>
    //         {i.title}
    //       </p>
    //     </If>
    //   </Link >
    // )


    const Title = ({ selected = false }) =>
      <Link to={link} className={classnames({
        [styles["link-mini"]]: mini,
        [styles["link"]]: !mini,
        [styles["bg"]]: selected
      })} onClick={e => {
        //授权过期 跳转到device路由
        if (isLicenceOverdue()) {
          //阻止默认跳转行为
          e.preventDefault()
          //跳转到设备管理
          getAppInstance()._store.dispatch(routerRedux.push(CONFIG_DEVICE_MANAGER_URL))
          //弹出消息框
          getAppInstance()._store.dispatch({
            type: "layout/saveOverdueTipVisible",
            payload: true
          })
        }
      }}>
        <Choose>
          <When condition={i["icon"]} >
            {i.icon}
          </When>
          <When condition={(!i["icon"]) && (!mini)}>
            <span style={{ display: "inline-block", width: "26px" }}></span>
          </When>
        </Choose>
        <If condition={!mini || innerItem}>
          <p style={{
            // textAlignLast: "justify",
            display: "inline-block",
            width: "80px"
          }}>
            {i.title}
          </p>
        </If>
      </Link >


    if ("items" in i) {
      return (
        <Menu.SubMenu key={i.link}
          className={classnames({
            // [styles["active"]]: selectedKeys.includes(i.link),
            [styles["active"]]: active.includes(i.link),
            // [styles["active"]]: active===i.link,
            [styles["title-wrapper"]]: true
          })}
          title={<Title selected={active.includes(i.link)} />}>
          {getMenuContent({ navConfig: i.items, mini, selectedKeys, innerItem: true, active })}
        </Menu.SubMenu>
      )
    } else {
      return (
        <Menu.Item key={i.link}>
          <Title />
        </Menu.Item>
      )
    }

  })
}

export default class extends React.Component {
  constructor(props) {
    super(props)
  }
  state = {
    openKeys: [],
    selectedKeys: []
  }
  onOpenChange = openKeys => {
    //授权过期不进行展开操作
    // console.log(openKeys)
    if (isLicenceOverdue()) {
      return
    }
    this.setState({
      // 此方法不适用与多层导航栏嵌套
      // openKeys: [last(openKeys)]
      // openKeys // 为了多层嵌套做的修改
      openKeys: this.checkKey(openKeys)
    })
    setTimeout(() => {
      this.resizeNiceScroll()
    }, 300)
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.mini !== this.props.mini) {
      this.setState({
        openKeys: []
      })
    }
  }
  con = null
  componentDidMount() {
    this.initNiceScroll()
  }
  componentWillUnmount() {
    this.removeNiceScroll()
  }
  componentDidUpdate() {
    setTimeout(() => {
      this.resizeNiceScroll()
    }, 300)
  }
  initNiceScroll = () => {
    try {
      $(this.con).niceScroll({
        cursorborder: "",
        cursorcolor: "#cccccc",
        boxzoom: false,
        autohidemode: true
      })
    } catch (e) {
    }
  }
  resizeNiceScroll = () => {
    try {
      $(this.con).getNiceScroll().resize()
    } catch (e) {

    }
  }
  removeNiceScroll = () => {
    try {
      $(this.con).getNiceScroll().remove()
    } catch (e) {

    }
  }

  checkKey = arr => {
    if (!Array.isArray(arr)) {
      console.error('type error, need array but recived: ' + typeof arr)
      return []
    }
    else {
      if (!arr.length) return []
      let array = [...arr]
      let str = array[0].split('/')[1]
      let arrays = array.filter(i => i.split('/')[1] === str)
      if (arrays.length === array.length) {
        return array
      }
      else return [last(array)]
    }
  }



  render() {
    const { theme, mini = true, animate = true, active = "", isAdmin = false, appConfig } = this.props
    const wrapperClasses = classnames({
      [styles["nav"]]: true,
      [styles["animate"]]: animate,
      [styles["mini"]]: mini,
      [styles[theme]]: true,
    })

    const navConfig = getNavConfig({ admin: isAdmin, appConfig: getAppConfig() })

    const selectedKeys = active.split("/").slice(1).reduce((target, item) => {
      return target.length === 0
        ?
        [...target, `/${item}`]
        :
        target = [...target, `${target[target.length - 1]}/${item}`]

    }, [])

    // const selectedKeys =[ active]

    // console.log(active, selectedKeys)
    return (
      <nav className={wrapperClasses} ref={con => this.con = con}>
        <Menu
          // openKeys={ mini ? this.state.openKeys : selectedKeys }
          openKeys={mini ? this.state.openKeys : selectedKeys}
          onOpenChange={this.onOpenChange}
          mode={mini ? "vertical" : "inline"}
          inlineIndent={10}
          selectedKeys={[active]}
        >
          {getMenuContent({ navConfig, mini, selectedKeys, active })}
        </Menu>
      </nav>
    )
  }

}