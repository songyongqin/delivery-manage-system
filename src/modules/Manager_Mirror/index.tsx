import React from 'react';
// import styles from './styles.css'
// import { Menu, Badge, Button, Breadcrumb, Upload, Icon, Progress, Row, Col, Radio, Modal } from 'antd';

// import { connect } from 'dva'
// import {
//   OPERATION_NAMESPACE,
//   UPLOAD_STATUS,
//   MERGE_STATUS,
//   COMMON_STATUS,
//   INIT_STATUS,
//   REMOTE_METHOD,
//   LOCAL_METHOD
// } from './ConstConfig'
// import classnames from 'classnames';
// import EnhanciveTable from 'domainComponents/Table'
// import { getFileMD5 } from 'utils'
// import JoSpin from 'domainComponents/Spin'
// import JoTag from 'components/Tag'
// const { Dragger } = Upload;
// import LocalUpdatePanel from './components/LocalUpdatePanel'
// import RemoteUpdatePanel from './components/RemoteUpdatePanel'
// import UpdatePanel from './components/UpdatePanel'
// import Table_mirrorsummary from './components/Table_mirrorsummary'
// import Table_mirrornode from './components/Table_mirrornode'
import extraConnect from 'domainUtils/extraConnect'
import WithModal from 'components/WithModal'
import WithAnimateRender from 'components/WithAnimateRender'
import Summary from './components/Summary'
import NodeMirror from './components/NodeMirror'


// const mapStateToProps = state => {
//   const effectsLoading = state.loading.effects

//   return {
//     isDark: state.layout.commonLayout.darkTheme,
//     // shouldReload: state[OPERATION_NAMESPACE].shouldReload,
//     mirrorUpdateLoading: effectsLoading[`${OPERATION_NAMESPACE}/initUploadTask`] ||
//       effectsLoading[`${OPERATION_NAMESPACE}/putFileChunk`] ||
//       effectsLoading[`${OPERATION_NAMESPACE}/initUploadTask`] ||
//       effectsLoading[`${OPERATION_NAMESPACE}/mergeUploadTask`] ||
//       effectsLoading[`${OPERATION_NAMESPACE}/updateRemote`] ||
//       state[OPERATION_NAMESPACE].updateLoading,
//     // productType: state.user.productType.type,
//     // productInfo: state.user.productType,
//     // userData: state.user.userData
//   }
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     initLocalUploadInfo: payload => dispatch({
//       type: `${OPERATION_NAMESPACE}/initLocalUploadInfo`,
//       payload
//     }),
//     changeReloadStatus: payload => dispatch({
//       type: `${OPERATION_NAMESPACE}/changeReloadStatus`,
//       payload
//     }),
//     changePanelVisible: payload => dispatch({
//       type: `${OPERATION_NAMESPACE}/changePanelVisible`,
//       payload,
//     }),
//     changeUpdateLoadingStatus: payload => dispatch({
//       type: `${OPERATION_NAMESPACE}/changeUpdateLoadingStatus`,
//       payload
//     })
//   }
// }

@WithModal()
// @extraConnect(mapStateToProps, (mapDispatchToProps))
@WithAnimateRender
class Page extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  render() {

    return (
      <div>
        {this.props.animateRender([
          <div key="summary" style={{ marginBottom: "15px" }}>
            <Summary></Summary>,
          </div>,
          <div key="node">
            <NodeMirror></NodeMirror>
          </div>
        ])}
      </div>
    )
  }
}
export default Page;