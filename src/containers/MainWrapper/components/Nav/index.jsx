import * as React from 'react'
import classnames from 'classnames'
const styles = require("./styles.less")
import { Menu } from 'antd'
import { Link } from 'dva/router'
import { getNavConfig } from 'navConfig'
import { getProduction } from 'domain/production'
import { last } from 'utils'
import { If, Choose, When, Otherwise } from 'components/ControlStatements'

const getMenuContent = ({ navConfig = [], mini = true, selectedKeys, innerItem = false }) => {
  return navConfig.map(i => {

    const classes = classnames({
      [styles["link-mini"]]: mini,
      [styles["link"]]: !mini,
    })

    // console.info(i["icon"], mini, i.link)
    const title = (
      <Link to={i.link} className={classes}>
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
      <nav className={wrapperClasses}>
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