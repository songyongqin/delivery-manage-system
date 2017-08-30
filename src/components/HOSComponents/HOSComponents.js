/**
 * Created by jojo on 2017/7/21.
 */

import React from 'react';
import {Menu,Affix} from 'antd';
import {Link} from 'dva/router';
import QueueAnim from 'rc-queue-anim'
import styles from './HOSComponents.css';
const SubMenu = Menu.SubMenu;
const Item=Menu.Item;
const MenuItemGroup = Menu.ItemGroup;
export const WithStateHandle=(WrappedComponent,initState={loading:{},visible:{}})=>{
  return class extends React.Component{
    constructor(props) {
      super(props);
      this.state=initState;
    }
    getStateHandle=(stateType)=>{
      return (state,value)=>{
        return ()=>{
          this.setState({
            [stateType]:{
              ...this.state[stateType]||{},
              [state]:value,
            }
          })
        }
      }
    }
    render() {
      return (
        <WrappedComponent {...this.props} getStateHandle={this.getStateHandle}/>
      )
    }
  }

};


/*
*
*
*
*
* */


export const WithMenus=(WrappedComponent)=>{
  return class extends React.Component{
    constructor(props) {
      super(props);
    }
    getMenus=(items,selectedKeys,defaultOpenKeys)=>{
      if(items.constructor!==[].constructor){
        throw new Error(`items should type of array`);
      }

      return (
        <Affix offsetTop={70}>
          <Menu selectedKeys={selectedKeys}
                mode="inline"
                defaultOpenKeys={defaultOpenKeys}>
            {this.renderItems(items)}
          </Menu>
        </Affix>
      )

    }
    renderItems=(items)=>{
      return items.map(i=>{

        const content=i.link
          ?
          <Link to={i.link} >
            {i.icon}
            <span>{i.text}</span>
          </Link>
          :
          <span style={{cursor:"default"}}>
            {i.icon}
            <span >{i.text}</span>
          </span>

        return (i.items||{}).constructor===[].constructor
          ?
          <MenuItemGroup key={i.key}
                   title={content}>
            {this.renderItems(i.items)}
          </MenuItemGroup>
          :
          <Item key={i.key}>
            {content}
          </Item>

      })
    }

    render() {
      return (
        <WrappedComponent {...this.props} getMenus={this.getMenus}/>
      )
    }
  }
}
/*
*
*
*
* */

export const WithDefaultValueHandle=(WrappedComponent)=>{
  return class extends React.Component{
    constructor(props) {
      super(props);
      this.state={
        updateDefaultValue:1
      }
    }
    componentWillReceiveProps=(newProps)=>{
      if(this.props.defaultValue===newProps.defaultValue){
        this.setState({
          updateDefaultValue:this.state.updateDefaultValue+1,
        })
      }
    }
    render() {
      return <WrappedComponent key={`${this.state.updateDefaultValue}-update`} {...this.props}/>
    }
  }
}

/*
*
*
*
* */

export const WithAnimateRender=(WrappedComponent)=>{
  return class extends React.Component{
    constructor(props) {
      super(props);
    }
    animateRender=(childrens,options={})=>{

      const {isAnimate=true,className,duration=1000,type="right"}=options;


      if(!isAnimate){
        return <div className={className}>
          {childrens};
        </div>
      }

      return (
        <QueueAnim type={type}
                   className={className}
                   duration={duration}>
          {childrens}
        </QueueAnim>
      )

    }
    render() {
      return <WrappedComponent {...this.props} animateRender={this.animateRender} />
    }
  }
}
