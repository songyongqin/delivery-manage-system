import React from 'react';
import styles from './styles.css'
import { Menu, Button,Breadcrumb,Tabs } from 'antd';
import {
  sysConfigTextConfig,
  sysConfigKeys,
  SYS_CONFIG_WHITE_LIST,
  SYS_CONFIG_STRATEGY,
  SYS_CONFIG_MONITOR,
  SYS_CONFIG_USER_MANAGER
} from './ConstConfig';
import {WithAnimateRender,WithBreadcrumb} from '../../components/HOSComponents/index'
import {connect} from 'dva';
import classnames from 'classnames';
import UserManager from '../UserManager/Page';

const TabPane = Tabs.TabPane;

function mapStateToProps(state) {
  const {commonLayout}=state.layout;
  return {
    commonLayout,
  }
}

@WithBreadcrumb
@WithAnimateRender
@connect(mapStateToProps)
class Page extends React.Component{
  constructor(props) {
    super(props);
  }
  getBreadcrumb=()=>{
    return (
      <div key="bread-crumb" style={{margin:"15px 0"}}>
        {this.props.getBreadcrumb(this.props.routes)}
      </div>
    )
  }
  getTabsPanel=()=>{
    return (
      <div key="tabs-panel">
        <Tabs defaultActiveKey={sysConfigKeys[0]} >
          {
            sysConfigKeys.map(k=>{
              return (
                <TabPane tab={sysConfigTextConfig.title[k]} key={k} >
                  {this.getPane(k)}
                </TabPane>
              )
            })
          }

        </Tabs>
      </div>
    )
  }
  getPane=(key)=>{

    if(key===SYS_CONFIG_MONITOR){
      return
    }
    if(key===SYS_CONFIG_STRATEGY){
      return
    }
    if(key===SYS_CONFIG_WHITE_LIST){
      return
    }

  }
  render=()=> {

    const pageClasses=classnames({
      [styles["page"]]:true,
      [styles["page-dark"]]:this.props.commonLayout.darkTheme
    })

    return (
      <div className={pageClasses}>
        {
          this.props.animateRender([
            this.getBreadcrumb(),
            this.getTabsPanel(),
          ])
        }
      </div>
    )
  }
}

export default Page;
