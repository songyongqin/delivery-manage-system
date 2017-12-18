/**
 * Created by jojo on 2017/8/23.
 */
import React from 'react';
import { Menu } from 'antd';
import styles from './Nav.css';
import classnames from 'classnames';
import { Link } from 'dva/router';
import {
  IDS,
  NODE,
  DISTRIBUTION,
  STAND_ALONE,
  IDS_STAND_ALONE,
  OVER_DUE_NAMESPACE,
} from 'configs/ConstConfig'
import { shouldIdsHideRouteList, shouldNodeHideRouteList, shouldIdsStandAloneHideRouteList } from 'configs/RouteConfig'
const SubMenu = Menu.SubMenu;
const Item = Menu.Item;
import app from '../../../index.js'
import { routerRedux } from 'dva/router'


const getItem = (item, isAdmin = false, activeKeys, isOuter, productType, changeOverdueTipVisible) => {
  const { adminOnly, items, link, icon, title, idsHide, nodeHide } = item;
  if (adminOnly && !isAdmin) {
    return null;
  }
  if (productType === IDS && shouldIdsHideRouteList.includes(link)) {
    return null;
  }
  if (productType === NODE && shouldNodeHideRouteList.includes(link)) {
    return null;
  }
  if (productType === IDS_STAND_ALONE && shouldIdsStandAloneHideRouteList.includes(link)) {
    return null
  }

  const classes = classnames({
    [styles["item"]]: true,
    [styles["active"]]: activeKeys.indexOf(link) !== -1 && isOuter,
    [styles['secondary-active']]: activeKeys.indexOf(link) !== -1 && !items,
  });

  const clickHandle = e => {

    if (window.sessionStorage.getItem(OVER_DUE_NAMESPACE)) {
      e.preventDefault()
      app._store.dispatch(routerRedux.push("/manager/device"))
      changeOverdueTipVisible && changeOverdueTipVisible(true)
    }
    if (activeKeys.includes(link)) {
      e.preventDefault()
    }
  }

  if (items) {

    const subMenuTitle = (
      <Link to={link} className={styles["link"]} onClick={clickHandle}>
        <span>
          <span style={{ padding: "0 10px" }}>{icon}</span>
          <span>{title}</span>
        </span>
      </Link>
    );

    return (
      <SubMenu key={link}
        className={classes}
        title={subMenuTitle}>
        {getMenu(items, isAdmin, activeKeys, false, productType, changeOverdueTipVisible)}
      </SubMenu>
    )
  }

  return (
    <Item key={link} className={classes}>
      <Link to={link} className={styles["link"]} onClick={clickHandle}>
        <span style={{ padding: "0 10px" }}>{icon}</span>
        <span>{title}</span>
      </Link>
    </Item>
  )

};

const getMenu = (routeConfig, isAdmin = true, activeKeys, isOuter, productType, changeOverdueTipVisible) => {
  const keys = Object.keys(routeConfig);

  return keys.map(k => {
    return getItem(routeConfig[k], isAdmin, activeKeys, isOuter, productType, changeOverdueTipVisible)
  })


};



export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openKeys: []
    }
  }
  onOpenChange = openKeys => this.setState({ openKeys: openKeys.reverse().slice(0, 1) })
  render() {

    const {
      className,
      style = {},
      isMini = false,
      isDark = false,
      titleConfig,
      activeKey = "",
      routeConfig,
      isAdmin = false,
      productType,
      changeOverdueTipVisible
    } = this.props;

    const classes = classnames({
      [styles["nav"]]: true,
      [className]: true && !!className,
      [styles["nav-dark"]]: isDark,
    })
    const rootKeys = Object.keys(routeConfig);

    let activeKeys = [], lastPath = "";

    activeKey.split("/").forEach((i, index) => {
      if (index === 0) {
        return;
      }
      let path = lastPath + "/" + i;
      activeKeys.push(path);
      lastPath = path;
    });



    rootKeys.forEach(rk => {
      routeConfig[rk].title = titleConfig[rk].title;
      if (routeConfig[rk].items) {
        Object.keys(routeConfig[rk].items).forEach(ik => {
          routeConfig[rk].items[ik].title = titleConfig[rk].items[ik].title;
        })
      }
    });


    let config = { ...routeConfig };
    if (isMini) {
      Object.keys(config).forEach(k => {
        config[k] = { ...config[k] };
        config[k].title = "";
      })
    }

    return (
      <nav className={classes} style={style}>
        <Menu mode={isMini ? "vertical" : "inline"}
          openKeys={this.state.openKeys}
          onOpenChange={this.onOpenChange}
          style={{ height: "100%", width: "100%" }}
          theme="dark">
          {getMenu(config, isAdmin, activeKeys, true, productType, changeOverdueTipVisible)}
        </Menu>
      </nav>
    )
  }
}