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
  REMOTE_METHOD,
  LOCAL_METHOD
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
import UpdatePanel from './components/UpdatePanel'
import Table_mirrorsummary from './components/Table_mirrorsummary'

const mapStateToProps = state => ({
  isDark: state.layout.commonLayout.darkTheme,
  shouldReload: state[OPERATION_NAMESPACE].shouldReload
})

const mapDispatchToProps = dispatch => {
  return {
    initLocalUploadInfo: payload => dispatch({
      type: `${OPERATION_NAMESPACE}/initLocalUploadInfo`,
      payload
    }),
    changeReloadStatus: payload => dispatch({
      type: `${OPERATION_NAMESPACE}/changeReloadStatus`,
      payload
    }),
    changePanelVisible: payload => dispatch({
      type: `${OPERATION_NAMESPACE}/changePanelVisible`,
      payload,
    })
  }
}

@WithModal()
@connect(mapStateToProps, createMapDispatchWithPromise(mapDispatchToProps))
@WithAnimateRender
@WithBreadcrumb
class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lastChangeTime: 0,
    }
  }

  updateModalSwitchHandle = () => {
    if (this.props.shouldReload && this.props.modalVisible["update"]) {
      setTimeout(() => {
        this.props.changePanelVisible(true)
        this.props.changeReloadStatus(false)
        this.props.initLocalUploadInfo()
        this.setState({
          lastChangeTime: new Date().getTime()
        })
      }, 300)
    }
    this.props.switchModal("update")
  }
  getHeader = () => {
    return <div key="header" style={{ margin: "15px 0" }}>
      {this.props.getBreadcrumb(this.props.routes)}
    </div>
  }
  getOperationPanel = () => {
    return <div key="operation" style={{ overflow: "hidden" }}>
      <Button type="primary" style={{ float: "right" }} onClick={this.updateModalSwitchHandle}>
        升级控制中心镜像
      </Button>
    </div>
  }
  render = () => {

    const lblClasses = classnames({
      ["lbl-dark"]: this.props.isDark
    })

    const { modalVisible } = this.props;

    return (
      <div>
        {this.props.animateRender([
          this.getHeader(),
          this.getOperationPanel(),
          <Table_mirrorsummary key="Table_mirrorsummary" />
        ])}
        <Modal
          key={`${this.state.lastChangeTime}-update-modal`}
          title="升级控制中心镜像"
          footer={null}
          onCancel={this.updateModalSwitchHandle}
          visible={modalVisible["update"]}
          width={"800px"}>
          <UpdatePanel
            onCancel={this.updateModalSwitchHandle}>

          </UpdatePanel>
        </Modal>
      </div>
    )
  }
}

export default Page;
