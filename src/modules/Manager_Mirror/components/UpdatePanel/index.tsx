import React from 'react';
import { Modal, Menu, Badge, Button, Breadcrumb, Upload, Icon, Progress, Row, Col, Radio } from 'antd';

import { connect } from 'dva'
import {
  UPLOAD_STATUS,
  MERGE_STATUS,
  COMMON_STATUS,
  INIT_STATUS,
} from '../../ConstConfig.js'
import classnames from 'classnames';
import EnhanciveTable from 'domainComponents/Table';
import { getFileMD5 } from 'utils'
import JoSpin from 'domainComponents/Spin'
import JoTag from 'components/Tag'
const { Dragger } = Upload;
import LocalUpdatePanel from '../LocalUpdatePanel'
import RemoteUpdatePanel from '../RemoteUpdatePanel'
import extraConnect from 'domainUtils/extraConnect'
import { MANAGER_MIRROR_OPERATION_NAMESPACE as OPERATION_NAMESPACE } from 'constants/model'



const mapStateToProps = state => ({
  activePanel: state[OPERATION_NAMESPACE].activePanel,
  panelVisible: state[OPERATION_NAMESPACE].panelVisible
})

const mapDispatchToProps = dispatch => {
  return {
    postSave: payload => {
      // ownProps.hideOptionPanel()
      return dispatch({
        type: `${OPERATION_NAMESPACE}/postSave`,
        payload
      })
    },
    initLocalUploadInfo: payload => dispatch({
      type: `${OPERATION_NAMESPACE}/initLocalUploadInfo`,
      payload
    }),
    changeActivePanel: payload => dispatch({
      type: `${OPERATION_NAMESPACE}/changeActivePanel`,
      payload,
    }),
    changePanelVisible: payload => dispatch({
      type: `${OPERATION_NAMESPACE}/changePanelVisible`,
      payload,
    })
  }
}

const REMOTE_METHOD = "remote",
  LOCAL_METHOD = "local"

@connect(mapStateToProps, mapDispatchToProps)
class UpdatePanel extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      // method: REMOTE_METHOD,
      // visible: true,
      lastUpdateTime: 0,
      shouldReload: false,
    }
  }
  hideOptionPanel = () => this.props.changePanelVisible(false)
  methodOnChange = e => {
    this.props.changeActivePanel(e.target.value)
    this.props.initLocalUploadInfo()
    // this.setState({
    //   method,
    // })

  }
  render() {


    // const { visible } = this.state;
    const visible = this.props.panelVisible

    const lblClasses = classnames({
      // ["lbl-dark"]: this.props.isDark
    })

    const activeMethod = this.props.activePanel;

    const { modalVisible } = this.props

    return (
      <div key="local" >
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          {
            visible
              ?
              <Radio.Group
                style={{ margin: "0 auto" }}
                value={activeMethod}
                onChange={this.methodOnChange}>
                <Radio
                  value={REMOTE_METHOD}>
                  <span className={lblClasses}>在线升级</span>
                </Radio>
                <Radio
                  value={LOCAL_METHOD}>
                  <span className={lblClasses}>本地升级</span>
                </Radio>
              </Radio.Group>
              :
              null
          }
        </div>
        {
          activeMethod === REMOTE_METHOD
          &&
          <RemoteUpdatePanel
            onCancel={_ => {
              this.props.onCancel()
              this.props.changePanelVisible(true)
              this.props.initLocalUploadInfo(),
              this.props.postSave(0)
            }}
            hideOptionPanel={this.hideOptionPanel}>
          </RemoteUpdatePanel>
        }
        {
          activeMethod === LOCAL_METHOD
          &&
          <LocalUpdatePanel
            onCancel={_ => {
              this.props.onCancel()
              this.props.changePanelVisible(true)
              this.props.initLocalUploadInfo()
            }}
            hideOptionPanel={this.hideOptionPanel}>
          </LocalUpdatePanel>
        }
      </div>
    )
  }
}

export default UpdatePanel;
