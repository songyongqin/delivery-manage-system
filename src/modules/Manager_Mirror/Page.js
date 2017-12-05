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
import Table_mirrornode from './components/Table_mirrornode'
import { NODE, STAND_ALONE } from 'configs/ConstConfig'

const mapStateToProps = state => {
  const effectsLoading = state.loading.effects

  return {
    isDark: state.layout.commonLayout.darkTheme,
    shouldReload: state[OPERATION_NAMESPACE].shouldReload,
    mirrorUpdateLoading: effectsLoading[`${OPERATION_NAMESPACE}/initUploadTask`] ||
      effectsLoading[`${OPERATION_NAMESPACE}/putFileChunk`] ||
      effectsLoading[`${OPERATION_NAMESPACE}/initUploadTask`] ||
      effectsLoading[`${OPERATION_NAMESPACE}/mergeUploadTask`] ||
      effectsLoading[`${OPERATION_NAMESPACE}/updateRemote`] ||
      state[OPERATION_NAMESPACE].updateLoading,
    productType: state.user.productType.type,
    productInfo: state.user.productType,
  }
}

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
    }),
    changeUpdateLoadingStatus: payload => dispatch({
      type: `${OPERATION_NAMESPACE}/changeUpdateLoadingStatus`,
      payload
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
      <Button type="primary" style={{ float: "right", marginBottom: "20px" }} onClick={this.updateModalSwitchHandle}>
        {this.props.productType === STAND_ALONE ? "升级蜜罐镜像" : "升级控制中心镜像"}
      </Button>
    </div>
  }
  render = () => {

    const lblClasses = classnames({
      ["lbl-dark"]: this.props.isDark
    })

    const { modalVisible, mirrorUpdateLoading, productType } = this.props;

    return (
      <div>
        {this.props.animateRender([
          this.getHeader(),
          productType === NODE ? null : <h4 key="h4" className={lblClasses} style={{ marginBottom: "25px", marginTop: "30px" }}>镜像汇总</h4>,
          productType === NODE ? null : this.getOperationPanel(),
          productType === NODE ? null : <Table_mirrorsummary key="Table_mirrorsummary" />,
          productType === STAND_ALONE ? null : < Table_mirrornode key="Table_mirrornode" />
        ])}
        <Modal
          maskClosable={false}
          closable={!mirrorUpdateLoading}
          key={`${this.state.lastChangeTime}-update-modal`}
          title={productType === STAND_ALONE ? "升级蜜罐镜像" : "升级控制中心镜像"}
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