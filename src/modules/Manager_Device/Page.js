import React from 'react';
import { Menu, Button,Breadcrumb,Card } from 'antd';
import {WithBreadcrumb,WithAnimateRender} from '../../components/HOSComponents/HOSComponents'
import ControlDisk from '../Manager_Device_Control_Disk/Page';
import DeviceControl from '../Manager_Device_Control/Page';
import {CONTROL_PANEL_TITLE,NODE_PANEL_TITLE} from './ConstConfig'
import classnames from 'classnames';
import {connect} from 'dva';
import JoSpin from '../../components/JoSpin/JoSpin';
import {NAMESPACE as MANAGER_DEVICE_NAMESPACE} from '../Manager_Device_Control/ConstConfig'
import {NAMESPACE as MANAGER_DEVICE_DISK_NAMESPACE} from '../Manager_Device_Control_Disk/ConstConfig';
function  mapStateToProps(state) {
  const {commonLayout}=state.layout;
  const {loading}=state;
  return {
    commonLayout,
    userData:state.user.userData,
    controlLoading:loading[`${MANAGER_DEVICE_DISK_NAMESPACE}/query`]
    ||loading[`${MANAGER_DEVICE_DISK_NAMESPACE}/put`]
    ||loading[`${MANAGER_DEVICE_NAMESPACE}/query`]
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
          ])
        }
      </div>
    )
  }
  getControlPanel=()=>{


    const {commonLayout,controlLoading}=this.props;

    const classes=classnames({
      ["expanded-row-dark"]:commonLayout.darkTheme
    });

    return (
      <Card className={classes}
            key="control-panel"
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

