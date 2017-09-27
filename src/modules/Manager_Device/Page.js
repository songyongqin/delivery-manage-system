import React from 'react';
import { Menu, Button,Card,Dropdown } from 'antd';
import {WithBreadcrumb,WithAnimateRender} from '../../components/HOSComponents/index'
import ControlDisk from '../Manager_Device_Control_Disk/Page';
import DeviceControl from '../Manager_Device_Control/Page';
import NodeDisk from '../Manager_Device_Node_Disk/Page';
import DeviceNode from '../Manager_Device_Node/Page';

import {CONTROL_PANEL_TITLE,NODE_PANEL_TITLE} from './ConstConfig'
import classnames from 'classnames';
import {connect} from 'dva';
import JoSpin from '../../components/JoSpin/index';
import {NAMESPACE as MANAGER_DEVICE_NAMESPACE} from '../Manager_Device_Control/ConstConfig'
import {NAMESPACE as MANAGER_DEVICE_DISK_NAMESPACE} from '../Manager_Device_Control_Disk/ConstConfig';
import {NAMESPACE as MANAGER_DEVICE_NODE_DISK_NAMESPACE} from '../Manager_Device_Node_Disk/ConstConfig'
import {NAMESPACE as MANAGER_DEVICE_NODE_NAMESPACE} from '../Manager_Device_Node/ConstConfig';

function  mapStateToProps(state) {
  const {commonLayout}=state.layout;
  const {effects:effectsLoading}=state.loading;

  return {
    commonLayout,
    userData:state.user.userData,
    productType:state.user.productType,
    controlLoading:effectsLoading[`${MANAGER_DEVICE_DISK_NAMESPACE}/query`]
    ||effectsLoading[`${MANAGER_DEVICE_DISK_NAMESPACE}/put`]
    ||effectsLoading[`${MANAGER_DEVICE_NAMESPACE}/query`],
    nodeLoading:effectsLoading[`${MANAGER_DEVICE_NODE_DISK_NAMESPACE}/query`]
    ||effectsLoading[`${MANAGER_DEVICE_NODE_DISK_NAMESPACE}/put`]
    ||effectsLoading[`${MANAGER_DEVICE_NODE_NAMESPACE}/query`]
  }
}

@connect(mapStateToProps)
@WithAnimateRender
@WithBreadcrumb
class Page extends React.Component{
  constructor(props) {
    super(props);

  }
  getBreadcrumb=()=>{
    return (
      <div key="bread-crumb" style={{marginTop:"15px"}}>
        {this.props.getBreadcrumb(this.props.routes)}
      </div>
    )
  }
  getContent=()=>{
    return (
      <div key="content">
        {
          this.props.animateRender([
            this.getControlPanel(),
            this.getNodePanel(),
          ])
        }
      </div>
    )
  }
  getControlPanel=()=>{

    const {commonLayout,controlLoading}=this.props;

    const classes=classnames({
      ["card-dark"]:commonLayout.darkTheme
    });

    return (
      <div key="control-panel">
        <Card className={classes}
              title={CONTROL_PANEL_TITLE}
              style={{marginTop:"15px"}}>
          <JoSpin spinning={controlLoading}>
            <div>
              <ControlDisk/>
            </div>
            <div style={{marginTop:"15px"}}>
              <DeviceControl/>
            </div>
          </JoSpin>
        </Card>
      </div>
    )
  }
  getNodePanel=()=>{

    const {commonLayout,nodeLoading,productType}=this.props;
    if(productType.standalone===1){
      return;
    }

    const classes=classnames({
      ["expanded-row-dark"]:commonLayout.darkTheme
    });
    const menu = (
      <Menu >
        <Menu.Item key="clear">批量磁盘清理</Menu.Item>
        <Menu.Item key="update">批量检查更新</Menu.Item>
      </Menu>
    );
    return (
      <div key="node-panel">
        <Card className={classes}
              title={NODE_PANEL_TITLE}
              style={{marginTop:"15px"}}>
          <JoSpin spinning={nodeLoading}>
            <div style={{overflow:"hidden"}}>
              <div style={{display:"inline-block"}}>
                <NodeDisk/>
              </div>
              <div style={{display:"inline-block",marginLeft:"15px"}}>
                <Dropdown.Button overlay={menu} type="primary">
                  批量授权
                </Dropdown.Button>
              </div>
            </div>
            <div style={{marginTop:"15px"}}>
              <DeviceNode/>
            </div>
          </JoSpin>
        </Card>
      </div>
    )
  }
  render=()=>{

    return (
      <div>
        {
          this.props.animateRender(
            [
              this.getBreadcrumb(),
              this.getContent(),
            ]
          )
        }
      </div>
    )
  }
}

export default Page;

