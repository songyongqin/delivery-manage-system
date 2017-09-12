/**
 * Created by jojo on 2017/7/21.
 */

import React from 'react';
import {Menu,Affix} from 'antd';
import {Link} from 'dva/router';
import QueueAnim from 'rc-queue-anim'
import styles from './HOSComponents.css';
import JoBreadcrumb from '../JoBreadcrumb/JoBreadcrumb';
import QueryForm from '../TimestampForm';
import Icon from '../JoIcon';
import {connect} from 'dva';
import {Row,Col} from 'antd';
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
    };
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
    animateRender=(childrens,options={})=>{

      const {isAnimate=true,className,type="bottom",interval=200}=options;


      if(!isAnimate){
        return <div className={className}>
          {childrens};
        </div>
      }

      return (
        <QueueAnim {...options} type={type} interval={interval}>
          {childrens}
        </QueueAnim>
      )

    };
    render() {
      return <WrappedComponent {...this.props} animateRender={this.animateRender} />
    }
  }
};

function mapStateToProps(state) {
  return {
    commonLayout:state.layout.commonLayout,
    languageConfig:state.layout.languageConfig
  }
}


export const WithBreadcrumb=(WrappedComponent)=>{

  @connect(mapStateToProps)
  class WrapperComponent extends React.Component{
    getBreadcrumb=(routes)=>{

      const {languageConfig,commonLayout}=this.props;
      const {language,darkTheme}=commonLayout;
      const {routes:routesTitleConfig}=languageConfig[language];

      return (
        <JoBreadcrumb routes={routes}
                      isDark={darkTheme}
                      routesTitleConfig={routesTitleConfig}
                      title={<Icon type="home4"/>}/>
      )
    };
    render=()=>{
      return (
        <WrappedComponent {...this.props} getBreadcrumb={this.getBreadcrumb}/>
      )
    }
  }

  return WrapperComponent;
};



export const WithContainerHeader=(WrappedComponent)=>{

  @WithBreadcrumb
  class WrapperComponent extends React.Component{
    getContainerHeader=({routes,onQuery,queryFilters})=>{
      return (
        <div style={{overflow:"hidden"}}>
          <div style={{float:"left"}}>
            {this.props.getBreadcrumb(routes)}
          </div>
          <div style={{float:"right"}}>
            <QueryForm defaultValue={queryFilters}
                       onSubmit={onQuery}/>
          </div>
        </div>
      )
    };
    render=()=>{
      return (
        <WrappedComponent {...this.props} getContainerHeader={this.getContainerHeader}/>
      )
    }
  }


  return WrapperComponent;

};


export const WithModal=(WrappedComponent)=>{
  class WrapperComponent extends React.Component{
    state={

    }
    modalHandle=(type,value)=>{

    }
    getModal=()=>{

    }
    render=()=>{
      return (
        <WrappedComponent modalHandle={this.state.modalHandle}/>
      )
    }
  }
}
