import React from 'react';
import styles from './styles.css'
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
} from './ConstConfig'
import { createMapDispatchWithPromise } from 'utils/dvaExtraDispatch'
import classnames from 'classnames';
import EnhanciveTable from 'domainComponents/EnhanciveTable';
import { getFileMd5 } from 'utils/tools'
import JoSpin from 'components/JoSpin'
import JoTag from 'components/JoTag'
const { Dragger } = Upload;
import LocalUpdatePanel from './components/LocalUpdatePanel'
import RemoteUpdatePanel from './components/RemoteUpdatePanel'
import Modal from 'domainComponents/Modal'
import { WithModal } from 'domainComponents/HOSComponents'

const mapStateToProps = state => ({
  isDark: state.layout.commonLayout.darkTheme,
})

const mapDispatchToProps = dispatch => {
  return {
    initLocalUploadInfo: payload => dispatch({
      type: `${OPERATION_NAMESPACE}/initLocalUploadInfo`,
      payload
    }),
  }
}

const REMOTE_METHOD = "remote",
  LOCAL_METHOD = "local"


@WithModal()
@connect(mapStateToProps, createMapDispatchWithPromise(mapDispatchToProps))
@WithAnimateRender
@WithBreadcrumb
class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      method: REMOTE_METHOD,
      visible: true,
    }

  }
  hideOptionPanel = () => this.setState({
    visible: false
  })
  methodOnChange = e => {
    let method = e.target.value;
    this.props.initLocalUploadInfo()
    this.setState({
      method
    })
  }
  getHeader = () => {
    return <div key="header">
      {this.props.getBreadcrumb(this.props.routes)}
    </div>
  }
  getOperationPanel = () => {
    return <div key="operation" style={{ marginBottom: "15px", overflow: "hidden" }}>
      <Button type="primary" style={{ float: "right" }} onClick={() => this.props.switchModal("update")}>
        升级控制中心镜像
      </Button>
    </div>
  }
  render = () => {

    // const activeStyle = {
    //   background: "#108ee9",
    //   color: "white"
    // }
    const { visible } = this.state;

    const lblClasses = classnames({
      ["lbl-dark"]: this.props.isDark
    })

    const activeMethod = this.state.method;

    const { modalVisible } = this.props;

    return (
      <div>
        {this.props.animateRender([
          this.getHeader(),
          this.getOperationPanel()
        ])}
        <Modal
          title="升级控制中心镜像"
          footer={null}
          onCancel={() => this.props.switchModal("update")}
          visible={modalVisible["update"]}
          width={"800px"}>
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
              <RemoteUpdatePanel hideOptionPanel={this.hideOptionPanel}></RemoteUpdatePanel>
            }
            {
              activeMethod === LOCAL_METHOD
              &&
              <LocalUpdatePanel hideOptionPanel={this.hideOptionPanel}></LocalUpdatePanel>
            }

          </div>
        </Modal>
      </div>
    )
  }
}

export default Page;
