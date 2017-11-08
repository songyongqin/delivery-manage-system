import React from 'react';
import { Menu, Button, Card, Dropdown, Select } from 'antd';
import { WithBreadcrumb, WithAnimateRender } from '../../components/HOSComponents/index'
import ControlDisk from '../Manager_Device_Control_Disk/Page';
import DeviceControl from '../Manager_Device_Control/Page';
import NodeDisk from '../Manager_Device_Node_Disk/Page';
import DeviceNode from '../Manager_Device_Node/Page';
import {
  ID_DATAINDEX,
  CONTROL_PANEL_TITLE,
  NODE_PANEL_TITLE,
  LICENCE_STATUS_DATAINDEX
} from './ConstConfig'
import classnames from 'classnames';
import { connect } from 'dva';
import JoSpin from '../../components/JoSpin/index';
import { NAMESPACE as MANAGER_DEVICE_NAMESPACE } from '../Manager_Device_Control/ConstConfig'
import { NAMESPACE as MANAGER_DEVICE_DISK_NAMESPACE } from '../Manager_Device_Control_Disk/ConstConfig';
import { NAMESPACE as MANAGER_DEVICE_NODE_DISK_NAMESPACE } from '../Manager_Device_Node_Disk/ConstConfig'
import { NAMESPACE as MANAGER_DEVICE_NODE_NAMESPACE } from '../Manager_Device_Node/ConstConfig';
import { createMapDispatchWithPromise } from '../../utils/dvaExtraDispatch'

import LicenceForm from './components/LicenceForm';
import Modal from '../../domainComponents/Modal';

function mapStateToProps(state) {
  const { commonLayout } = state.layout;
  const { effects: effectsLoading } = state.loading;

  return {
    commonLayout,
    userData: state.user.userData,
    productType: state.user.productType,
    controlLoading: effectsLoading[`${MANAGER_DEVICE_DISK_NAMESPACE}/query`]
    || effectsLoading[`${MANAGER_DEVICE_DISK_NAMESPACE}/put`]
    || effectsLoading[`${MANAGER_DEVICE_NAMESPACE}/query`],
    nodeLoading: effectsLoading[`${MANAGER_DEVICE_NODE_DISK_NAMESPACE}/query`]
    || effectsLoading[`${MANAGER_DEVICE_NODE_DISK_NAMESPACE}/put`]
    || effectsLoading[`${MANAGER_DEVICE_NODE_NAMESPACE}/query`],
    postLicenceLoading: state.loading.effects[`${MANAGER_DEVICE_NODE_NAMESPACE}/postLicence`]
  }
}

function mapDispatchToProps(dispatch) {
  return {
    postLicence: payload => dispatch({
      type: `${MANAGER_DEVICE_NODE_NAMESPACE}/postLicence`,
      payload
    })
  }
}


@connect(mapStateToProps, createMapDispatchWithPromise(mapDispatchToProps))
@WithAnimateRender
@WithBreadcrumb
class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRows: [],
      visible: false,
      shouldReload: false,
    }
  }

  switchModal = () => {
    if (this.state.shouldReload) {
      window.location.reload();
    }
    this.setState({
      visible: !this.state.visible,
    })
  }

  postLicenceHandle = payload => this.props.postLicence(payload).then(result => {
    this.setState({
      shouldReload: result.some(i => i.status === 1)
    })
    return result;
  })

  getBreadcrumb = () => {
    return (
      <div key="bread-crumb" style={{ marginTop: "15px" }}>
        {this.props.getBreadcrumb(this.props.routes)}
      </div>
    )
  }
  getContent = () => {
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
  getControlPanel = () => {

    const { commonLayout, controlLoading, userData } = this.props;
    const { isAdmin } = userData;
    const classes = classnames({
      ["card-dark"]: commonLayout.darkTheme
    });


    return (
      <div key="control-panel">
        <Card className={classes}
          title={CONTROL_PANEL_TITLE}
          style={{ marginTop: "15px" }}>
          <JoSpin spinning={controlLoading}>
            {
              isAdmin
                ?
                <div>
                  <ControlDisk />
                </div>
                :
                null
            }
            <div style={{ marginTop: "15px" }}>
              <DeviceControl />
            </div>
          </JoSpin>
        </Card>
      </div>
    )
  }
  setSelectedRows = (selectedRows) => {
    this.setState({
      selectedRows
    })
  }
  getNodePanel = () => {

    const { commonLayout, nodeLoading, productType, userData, postLicenceLoading } = this.props;

    /*是否为单机版本*/
    if (productType.standalone === 1) {
      return;
    }

    const { isAdmin } = userData;
    const isDark = commonLayout.darkTheme;
    const classes = classnames({
      ["expanded-row-dark"]: commonLayout.darkTheme
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
          style={{ marginTop: "15px" }}>
          <JoSpin spinning={nodeLoading}>
            <div style={{ overflow: "hidden" }}>
              {
                isAdmin
                  ?
                  <div style={{ display: "inline-block" }}>
                    <NodeDisk />
                  </div>
                  :
                  null
              }
              {
                isAdmin
                  ?
                  <div style={{ display: "inline-block", marginLeft: "15px" }}>
                    <Dropdown.Button overlay={menu}
                      onClick={this.switchModal}
                      disabled={this.state.selectedRows.length === 0}
                      type="primary">
                      批量授权
                    </Dropdown.Button>
                  </div>

                  :
                  null
              }
            </div>
            <div style={{ marginTop: "15px" }}>
              <DeviceNode setSelectedRows={this.setSelectedRows} />
            </div>
            <Modal
              width="800px"
              key={`${this.state.visible}-licence-modal`}
              onCancel={this.switchModal}
              title="设备授权"
              maskClosable={false}
              visible={this.state.visible}
              footer={null}>
              <JoSpin spinning={postLicenceLoading}>
                <LicenceForm
                  onCancel={this.switchModal}
                  loading={postLicenceLoading}
                  isDark={isDark}
                  onSubmit={this.postLicenceHandle}
                  defaultValue={{
                    data: this.state.selectedRows.map(i => ({
                      [ID_DATAINDEX]: i[ID_DATAINDEX],
                      [LICENCE_STATUS_DATAINDEX]: i[LICENCE_STATUS_DATAINDEX].value
                    }))
                  }}>
                </LicenceForm>
              </JoSpin>
            </Modal>
          </JoSpin>
        </Card>
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

