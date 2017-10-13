/**
 * Created by jojo on 2017/8/23.
 */
import React from 'react';
import { Menu} from 'antd';
import styles from './Nav.css';
import classnames from 'classnames';
import {Link} from 'dva/router';
import {
  IDS,
  NODE,
  DISTRIBUTION,
  STAND_ALONE,
} from '../../../configs/ConstConfig'
const SubMenu = Menu.SubMenu;
const Item=Menu.Item;


const getItem=(item,isAdmin=false,activeKeys,isOuter,productType)=>{
  const {adminOnly,items,link,icon,title,idsHide,nodeHide}=item;
  if(adminOnly&&!isAdmin){
    return null;
  }
  console.info(link,productType,idsHide,nodeHide)
  if(productType===IDS&&idsHide){
    return null;
  }
  if(productType===NODE&&nodeHide){
    return null;
  }


  const classes=classnames({
    [styles["item"]]:true,
    [styles["active"]]:activeKeys.indexOf(link)!==-1&&isOuter,
    [styles['secondary-active']]:activeKeys.indexOf(link)!==-1&&!items,
  });
  if(items){

    const subMenuTitle=(
        <span>
         <span style={{padding:"0 10px"}}>{icon}</span>
         <span>{title}</span>
        </span>
    );

    return (
      <SubMenu key={link}
               className={classes}
               title={subMenuTitle}>
      {getMenu(items,isAdmin,activeKeys,false,productType)}
    </SubMenu>
    )
  }
  return (
    <Item key={link} className={classes}>
      <Link to={link} className={styles["link"]}>
        <span style={{padding:"0 10px"}}>{icon}</span>
        <span>{title}</span>
      </Link>
    </Item>
  )

};

const getMenu=(routeConfig,isAdmin=true,activeKeys,isOuter,productType)=>{
 const keys=Object.keys(routeConfig);

 return keys.map(k=>{
   return getItem(routeConfig[k],isAdmin,activeKeys,isOuter,productType)
 })


};



export default ({
                  className,
                  style={},
                  isMini=false,
                  isDark=false,
                  titleConfig,
                  activeKey="",
                  routeConfig,
                  isAdmin=false,
                  productType
})=>{



  const classes=classnames({
    [styles["nav"]]:true,
    [className]:true&&!!className,
    [styles["nav-dark"]]:isDark,
  })
  const rootKeys=Object.keys(routeConfig);

  let activeKeys=[],lastPath="";

  activeKey.split("/").forEach((i,index)=>{
    if(index===0){
      return;
    }
    let path=lastPath+"/"+i;
    activeKeys.push(path);
    lastPath=path;
  });



  rootKeys.forEach(rk=>{
    routeConfig[rk].title=titleConfig[rk].title;
    if(routeConfig[rk].items){
      Object.keys(routeConfig[rk].items).forEach(ik=>{
        routeConfig[rk].items[ik].title=titleConfig[rk].items[ik].title;
      })
    }
  });


  let config={...routeConfig};
  if(isMini){
    Object.keys(config).forEach(k=>{
      config[k]={...config[k]};
      config[k].title="";
    })
  }

  return (
    <nav className={classes} style={style}>
      <Menu mode={isMini?"vertical":"inline"}
            style={{height:"100%",width:"100%"}}
            theme="dark">
        {getMenu(config,isAdmin,activeKeys,true,productType)}
      </Menu>
    </nav>
  )
}
