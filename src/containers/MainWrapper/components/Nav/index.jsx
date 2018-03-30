import * as React from 'react'
import classnames from 'classnames'
const styles = require("./styles.less")
import { Menu } from 'antd'
import { Link } from 'dva/router'
import { getNavConfig } from 'navConfig'
import { getProduction } from 'domain/production'
import { last } from 'utils'
import { If, Choose, When, Otherwise } from 'components/ControlStatements'
import $ from 'jquery'
import 'jquery.nicescroll'

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
      <Link to={link} className={classes}>
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
    this.setState({
      openKeys: [last(openKeys)]
    })
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
    this.resizeNiceScroll()
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
    const { theme, mini = true, animate = true, active = "", isAdmin = false } = this.props
    const wrapperClasses = classnames({
      [styles["nav"]]: true,
      [styles["animate"]]: animate,
      [styles["mini"]]: mini,
      [styles[theme]]: true,
    })

    const navConfig = getNavConfig({ production: getProduction(), admin: isAdmin })

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