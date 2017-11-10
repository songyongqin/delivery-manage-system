import React from 'react';
import { Menu, Button, Breadcrumb, Table, Icon, Row, Col, Card, Badge, message as Message } from 'antd';
import { queryContainerGenerator } from '../../Generators/QueryContainerrGenerator/QueryContainerGenerator';
import EnhanciveTable from '../../domainComponents/EnhanciveTable/index';
import * as tableConfig from '../Manager_Device/components/TableConfig/index';
import { NAMESPACE, ID_DATAINDEX } from './ConstConfig'
import styles from './styles.css';
import { createMapDispatchWithPromise } from '../../utils/dvaExtraDispatch'
import { curry } from '../../utils/tools'
import LicenceForm from '../Manager_Device/components/LicenceForm';
import Modal from '../../domainComponents/Modal';
import JoSpin from '../../components/JoSpin';



function mapStateToProps(state) {
  const { commonLayout } = state.layout;
  return {
    commonLayout,
    userData: state.user.userData,
    postLicenceLoading: state.loading.effects[`${NAMESPACE}/postLicence`]
  }
}

const mapDispatchToProps = dispatch => ({
  postLicence: payload => dispatch({
    type: `${NAMESPACE}/postLicence`,
    payload
  })
})

@queryContainerGenerator({
  namespace: NAMESPACE,
  mapStateToProps,
  mapDispatchToProps: createMapDispatchWithPromise(mapDispatchToProps)
})
class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
      shouldReload: true
    })
    return result;
  })


  getResultsPanel = () => {

    const { commonLayout, userData, postLicenceLoading } = this.props;
    const { queryResults, lastReqTime } = this.props[NAMESPACE];

    const isDark = commonLayout.darkTheme;

    const tableProps = {
      onChange: this.tableOnChange,
      columns: tableConfig.getColumns({
        isDark,
        isAdmin: userData.isAdmin,
        isNode: false,
        handle: {
          licenceHandle: this.switchModal
        }
      }),
      dataSource: [
        {
          ...queryResults,
          key: "device-control"
        }
      ]
    };


    return (
      <div>
        <EnhanciveTable key={`${lastReqTime}-device-table`}
          inverse={true}
          tableProps={tableProps}
          isDark={commonLayout.darkTheme}
          pagination={false} />
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
              loading={postLicenceLoading}
              isDark={isDark}
              onSubmit={this.postLicenceHandle}
              defaultValue={{ data: [queryResults] }}>
            </LicenceForm>
          </JoSpin>
        </Modal>
      </div>

    )
  };
  render = () => {

    return this.getResultsPanel()
  }
}

export default Page;
