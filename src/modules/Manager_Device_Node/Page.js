import React from 'react';
import { Menu, Button, Breadcrumb, Table, Icon, Row, Col, Card, Badge } from 'antd';
import { queryContainerGenerator } from '../../Generators/QueryContainerrGenerator/QueryContainerGenerator';
import EnhanciveTable from '../../domainComponents/EnhanciveTable/index';
import * as tableConfig from '../Manager_Device/components/TableConfig/index';
import { NAMESPACE } from './ConstConfig'
import styles from './styles.css';
import WithOnQuery from '../../Generators/QueryContainerDecorator/WithOnQuery';
import WithPageOnChange from '../../Generators/QueryContainerDecorator/WithPageOnChangeQuery';
import classnames from 'classnames';
import { createMapDispatchWithPromise } from '../../utils/dvaExtraDispatch'
import LicenceForm from '../Manager_Device/components/LicenceForm';
import Modal from '../../domainComponents/Modal';
import JoSpin from '../../components/JoSpin';
import UpdateForm from '../Manager_Device/components/UpdateForm'

function mapStateToProps(state) {
  const { commonLayout } = state.layout;
  const effectLoading = state.loading.effects;
  return {
    commonLayout,
    userData: state.user.userData,
    postLicenceLoading: state.loading.effects[`${NAMESPACE}/postLicence`],
    updateLoading: effectLoading[`${NAMESPACE}/getUpdateInfoLocal`]
    || effectLoading[`${NAMESPACE}/getUpdateInfoRemote`]
    || effectLoading[`${NAMESPACE}/updateRemote`]
    || effectLoading[`${NAMESPACE}/updateLocal`]
  }
}

function mapDispatchToProps(dispatch) {
  return {
    get: payload => dispatch({
      type: `${NAMESPACE}/query`,
      payload,
    }),
    postLicence: payload => dispatch({
      type: `${NAMESPACE}/postLicence`,
      payload
    }),
    getUpdateInfoLocal: payload => dispatch({
      type: `${NAMESPACE}/getUpdateInfoLocal`,
      payload
    }),
    getUpdateInfoRemote: payload => dispatch({
      type: `${NAMESPACE}/getUpdateInfoRemote`,
      payload
    }),
    updateRemote: payload => dispatch({
      type: `${NAMESPACE}/updateRemote`,
      payload
    }),
    updateLocal: payload => dispatch({
      type: `${NAMESPACE}/updateLocal`,
      payload,
    })
  }
}

@queryContainerGenerator({
  namespace: NAMESPACE,
  mapStateToProps,
  mapDispatchToProps: createMapDispatchWithPromise(mapDispatchToProps)
})
@WithOnQuery(NAMESPACE)
@WithPageOnChange(NAMESPACE)
class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      shouldReload: false,
      activeItems: [],
      updateVisible: false,
      hasGetVersion: false,

    }
  }
  initGetVersion = () => {
    this.setState({
      hasGetVersion: false,
    })
  }
  switchUpdateModal = () => {
    this.setState({
      updateVisible: !this.state.updateVisible,
    })
    this.initGetVersion()
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

  onSubmit = payload => this.props.get(payload)

  licenceModalOpenHandle = payload => {
    this.switchModal();
    this.setActiveItems(payload);
  }

  setActiveItems = activeItems => this.setState({
    activeItems
  })
  getUpdateInfoRemote = payload => this.props.getUpdateInfoRemote(payload)
    .then(result => {
      this.setState({ hasGetVersion: true })
      return result;
    })

  getUpdateInfoLocal = payload => this.props.getUpdateInfoLocal(payload)
    .then(result => {
      this.setState({ hasGetVersion: true })
      return result;
    })

  updateRemote = payload => this.props.updateRemote(payload)

  updateLocal = payload => this.props.updateLocal(payload)

  getResultsPanel = () => {

    const { commonLayout, userData, postLicenceLoading, updateLoading } = this.props;
    const { queryResults, lastReqTime, queryFilters } = this.props[NAMESPACE];
    const { isAdmin } = userData;
    const { hasGetVersion } = this.state;
    const isDark = commonLayout.darkTheme;

    const tableProps = {
      columns: tableConfig.getColumns({
        isAdmin,
        queryFilters,
        isDark,
        onSubmit: this.onSubmit,
        handle: {
          licenceHandle: this.licenceModalOpenHandle
        }
      }),
      dataSource: queryResults.data.map((i, index) => {
        return {
          ...i,
          key: `item-${index}-${lastReqTime}`
        }
      }),
      className: classnames({
        [styles["table-selectable"]]: isAdmin
      })
    };


    if (isAdmin) {
      tableProps.rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
          this.props.setSelectedRows(selectedRows)
        },
      };
    }

    const paginationProps = {
      total: queryResults.total,
      current: queryFilters.page,
      onChange: this.props.pageOnChange,
      pageSize: queryFilters.limit,
    };

    const {
      getUpdateInfoLocal,
      getUpdateInfoRemote,
      updateLocal,
      updateRemote
    } = this;

    return (
      <div>
        <EnhanciveTable
          key={`${lastReqTime}-device-table`}
          inverse={true}
          tableProps={tableProps}
          paginationProps={paginationProps}
          isDark={commonLayout.darkTheme} />
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
              defaultValue={{ data: this.state.activeItems }}>
            </LicenceForm>
          </JoSpin>
        </Modal>
        <Modal
          width={hasGetVersion ? "1200px" : "900px"}
          key={`${this.state.updateVisible}-update-modal`}
          onCancel={this.switchUpdateModal}
          title="设备更新"
          maskClosable={false}
          visible={this.state.updateVisible}
          footer={null}>
          <JoSpin spinning={updateLoading}>
            <UpdateForm
              handle={{ getUpdateInfoLocal, getUpdateInfoRemote, updateLocal, updateRemote }}
              loading={updateLoading}
              isDark={isDark}
              onSubmit={this.postLicenceHandle}
              defaultValue={{ data: queryResults.data }}>
            </UpdateForm>
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
