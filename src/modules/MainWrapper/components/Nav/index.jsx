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
import { MANAGER_DEVICE_URL } from 'routes/config/path'
import { getAppInstance } from 'domain/instance'
import { isLicenceOverdue, showOverdueTipModal } from 'domain/licence'
import { routerRedux } from 'dva/router'

const getFinalLink = config => {
  try {
    return "items" in config ? config.items[0].link : config.link
  } catch (e) {
    return config.link
  }
}

const getMenuContent = ({ navConfig = [], mini = true, selectedKeys, innerItem = false }) => {
  return navConfig.map(i => {

    const classes = classnames({
      [styles["link-mini"]]: mini,
      [styles["link"]]: !mini,
    })

    // console.info(i["icon"], mini, i.link)
    const link = getFinalLink(i)

    const title = (
      <Link to={link} className={classes} onClick={e => {
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
    )


    if ("items" in i) {
      return (
        <Menu.SubMenu key={i.link}
          className={classnames({
            [styles["active"]]: selectedKeys.includes(i.link),
            [styles["title-wrapper"]]: true
          })}
          title={title}>
          {getMenuContent({ navConfig: i.items, mini, selectedKeys, innerItem: true })}
        </Menu.SubMenu>
      )
    } else {
      return (
        <Menu.Item key={i.link}>
          {title}
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
    openKeys: []
  }
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

    return (
      <nav className={wrapperClasses} ref={con => this.con = con}>
        <Menu
          openKeys={this.state.openKeys}
          onOpenChange={this.onOpenChange}
          mode={mini ? "vertical" : "inline"}
          selectedKeys={selectedKeys}>
          {getMenuContent({ navConfig, mini, selectedKeys })}
        </Menu>
      </nav>
    )
  }

}