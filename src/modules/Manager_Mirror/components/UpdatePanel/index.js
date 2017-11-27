import React from 'react';
import { Menu, Badge, Button, Breadcrumb, Upload, Icon, Progress, Row, Col, Radio } from 'antd';
import {
  WithAnimateRender,
  WithBreadcrumb
} from 'components/HOSComponents';
import { connect } from 'dva'
import {
  OPERATION_NAMESPACE,
  UPLOAD_STATUS,
  MERGE_STATUS,
  COMMON_STATUS,
  INIT_STATUS,
} from '../../ConstConfig.js'
import { createMapDispatchWithPromise } from 'utils/dvaExtraDispatch'
import classnames from 'classnames';
import EnhanciveTable from 'domainComponents/EnhanciveTable';
import { getFileMd5 } from 'utils/tools'
import JoSpin from 'components/JoSpin'
import JoTag from 'components/JoTag'
const { Dragger } = Upload;
import LocalUpdatePanel from '../LocalUpdatePanel'
import RemoteUpdatePanel from '../RemoteUpdatePanel'
import Modal from 'domainComponents/Modal'
import { WithModal } from 'domainComponents/HOSComponents'

const mapStateToProps = state => ({
  isDark: state.layout.commonLayout.darkTheme,
  activePanel: state[OPERATION_NAMESPACE].activePanel,
  panelVisible: state[OPERATION_NAMESPACE].panelVisible
})

const mapDispatchToProps = dispatch => {
  return {
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

@connect(mapStateToProps, createMapDispatchWithPromise(mapDispatchToProps))
class UpdatePanel extends React.Component {
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
  render = () => {


    // const { visible } = this.state;
    const visible = this.props.panelVisible

    const lblClasses = classnames({
      ["lbl-dark"]: this.props.isDark
    })

    const activeMethod = this.props.activePanel;

    const { modalVisible } = this.props;

    return (
      <div key="local" >
        <div style={{ textAlgin: "center", marginBottom: "30px" }}>
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
            onCancel={this.props.onCancel}
            hideOptionPanel={this.hideOptionPanel}>
          </RemoteUpdatePanel>
        }
        {
          activeMethod === LOCAL_METHOD
          &&
          <LocalUpdatePanel
            onCancel={this.props.onCancel}
            hideOptionPanel={this.hideOptionPanel}>
          </LocalUpdatePanel>
        }
      </div>
    )
  }
}

export default UpdatePanel;
