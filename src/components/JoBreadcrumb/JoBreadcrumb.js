/**
 * Created by jojo on 2017/8/23.
 */
import React from 'react';
import styles from './JoBreadcrumb.css';
import {Link} from 'dva/router'
// import JoIcon from '../'
import classnames from 'classnames';

const getRoutePathList=(routes,routesTitleConfig,title)=>{
  // const {routes}=this.props;
  // const {routes:routesTitleConfig,title}=languageConfig[this.state.isChinese?"zh-cn":"en-us"];
  let lastPathTitleConfig=routesTitleConfig,
      lastPath="/",
      breadcrumbs=[
        {
          path:"/",
          title:title,
        }
      ];

  routes.forEach((r,index)=>{
    if(index===0){
      return;
    }

    lastPath+=r.path;


    breadcrumbs.push({
      path:index===routes.length-1?null:lastPath,
      title:(lastPathTitleConfig[r.path]||{}).title
    });

    lastPathTitleConfig=(lastPathTitleConfig[r.path]||{}).items;




  });
  return breadcrumbs;

};



export default ({routes,isDark=false,routesTitleConfig={},title})=>{

  const classes=classnames({
    [styles["breadcrumb-list"]]:true,
    [styles["breadcrumb-list-dark"]]:isDark,
  });

  return <ul className={classes}>
    {
      getRoutePathList(routes,routesTitleConfig,title).map(i=>{



        return (
          <li className={styles["item"]} key={i.path}>
            <Link to={i.path}>{i.title||""}</Link>
          </li>
        )
      })
    }
  </ul>
}
