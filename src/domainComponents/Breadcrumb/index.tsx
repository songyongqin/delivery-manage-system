import * as React from 'react'
import classnames from 'classnames'
import { Link } from 'dva/router'
const styles = require("./styles.less")
import { LIGHT_THEME, DARK_THEME } from 'constants/theme'
import WithCommonProps from 'domainComponents/WithCommonProps'
import { _navConfig as navConfig } from 'navConfig'
import { Icon } from 'antd'

const getPathConfig = (navConfig, pathConfig = {}, path = []) => {
  navConfig.map(i => {
    const { link } = i
    pathConfig[link] = [...path, i]
    if ("items" in i) {
      getPathConfig(i.items, pathConfig, pathConfig[link])
    }
  })
  return pathConfig
}

const pathConfig = getPathConfig(navConfig)


const getRoutePathList = (route) => {

  const target = pathConfig[route] || []

  const list = [
    {
      path: "/",
      title: <Icon type="home"></Icon>
    },
    ...target.map(i => {
      return {
        path: i.link,
        title: i.title
      }
    })

  ]

  return list

}


const Breadcrumb = ({ theme = DARK_THEME, title, route }) => {
  const classes = classnames({
    [styles["breadcrumb-list"]]: true,
    [styles[theme]]: true
  })
  let arr = getRoutePathList(route)
  return (
    <ul className={classes}>
      {
        arr.map((i, index) => {
          console.log(arr, arr.length, index )
          return (
            <li className={styles["item"]} key={`${index}-item`}>
              
              <Link to={i.path}>
              <span>{i.title || ""}</span>
              <span>{
                index===0||index===arr.length-1 ? null : <Icon type="right" style={{ marginLeft: 15, color: 'rgba(0,0,0,0.35)' }} />
              }</span>
              </Link>
              
              
            </li>
          )
        })
      }
    </ul>
  )

}



export default WithCommonProps(Breadcrumb)