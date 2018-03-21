import * as React from 'react'
import classnames from 'classnames'
const styles = require("./styles.less")
import { Menu } from 'antd'
import routeConfig from 'configs/RouteConfig'
import { Link } from 'dva/router'
import { adminOnlyRoute } from 'configs/RouteConfig'


export default ({ theme, mini = true, animate = true, active = "", isAdmin = false }) => {

  const wrapperClasses = classnames({
    [styles["nav"]]: true,
    [styles["animate"]]: animate,
    [styles["mini"]]: mini,
    [styles[theme]]: true,
  })

  return (
    <nav className={wrapperClasses}>
      <Menu mode="inline" selectedKeys={[active]}>
        {
          routeConfig
            .filter(i => isAdmin || !adminOnlyRoute.includes(i.link))
            .map((i, index) => (
              <Menu.Item key={i.link}>
                <Link to={i.link} className={mini ? "" : styles["link"]}>
                  {i.icon}
                  {
                    mini
                      ?
                      null
                      :
                      <p style={{
                        textAlignLast: "justify",
                        display: "inline-block",
                        width: "80px"
                      }}>
                        {i.title}
                      </p>
                  }
                </Link>
              </Menu.Item>
            ))
        }
      </Menu>
    </nav>
  )
}