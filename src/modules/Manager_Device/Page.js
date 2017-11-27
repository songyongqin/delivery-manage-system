import React from 'react';
import { WithBreadcrumb, WithAnimateRender } from '../../components/HOSComponents/index'
import DeviceControl from '../Manager_Device_Control/Page';
import DeviceNode from '../Manager_Device_Node/Page';
import DeviceNodeIDS from '../Manager_Device_Node_IDS/Page';

import { NAMESPACE as MANAGER_DEVICE_NAMESPACE } from '../Manager_Device_Control/ConstConfig'
import { NAMESPACE as MANAGER_DEVICE_DISK_NAMESPACE } from '../Manager_Device_Control_Disk/ConstConfig';
import { NAMESPACE as MANAGER_DEVICE_NODE_DISK_NAMESPACE } from '../Manager_Device_Node_Disk/ConstConfig'
import { NAMESPACE as MANAGER_DEVICE_NODE_NAMESPACE } from '../Manager_Device_Node/ConstConfig';
import { NAMESPACE as MANAGER_DEVICE_NODE_IDS_NAMESPACE } from '../Manager_Device_Node_IDS/ConstConfig'
import { createMapDispatchWithPromise } from '../../utils/dvaExtraDispatch'
import { NODE } from './ConstConfig'
import { connect } from 'dva'
import { STAND_ALONE, IDS } from 'configs/ConstConfig';

const mapStateToProps = state => ({
  productType: state.user.productType.type,
})


@connect(mapStateToProps)
@WithAnimateRender
@WithBreadcrumb
class Page extends React.Component {
  constructor(props) {
    super(props);
  }
  getBreadcrumb = () => {
    return (
      <div key="bread-crumb" style={{ marginTop: "15px" }}>
        {this.props.getBreadcrumb(this.props.routes)}
      </div>
    )
  }
  getContent = () => {
    const { productType } = this.props;

    if (productType === NODE || productType === STAND_ALONE) {
      return <div key="content" >
        {
          this.props.animateRender([
            this.getNodeHoneypotPanel(),
          ])
        }
      </div>
    }

    if (productType === IDS) {
      return (
        <div key="content" >
          {
            this.props.animateRender([
              this.getNodeIDSPanel()
            ])
          }
        </div>
      )
    }

    return (

      <div key="content" >
        {
          this.props.animateRender([
            this.getControlPanel(),
            this.getNodeHoneypotPanel(),
            this.getNodeIDSPanel()
          ])
        }
      </div>
    )
  }
  getControlPanel = () => {

    return (
      <div key="control-panel" style={{ marginTop: "15px" }}>
        <DeviceControl></DeviceControl>
      </div>
    )
  }

  getNodeHoneypotPanel = () => {
    return (
      <div key="node-panel-honeypot" style={{ marginTop: "15px" }}>
        <DeviceNode></DeviceNode>
      </div>
    )
  }
  getNodeIDSPanel = () => {

    return (
      <div key="node-panel-ids" style={{ marginTop: "15px" }}>
        <DeviceNodeIDS></DeviceNodeIDS>
      </div>
    )
  }
  render = () => {

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

