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

function mapStateToProps(state) {
  const { commonLayout } = state.layout;
  return {
    commonLayout,
    userData: state.user.userData,
    postLicenceLoading: state.loading.effects[`${NAMESPACE}/postLicence`]
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
      activeItems: []
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

  onSubmit = payload => this.props.get(payload)

  licenceModalOpenHandle = payload => {
    this.switchModal();
    this.setActiveItems(payload);
  }

  setActiveItems = activeItems => this.setState({
    activeItems
  })

  getResultsPanel = () => {

    const { commonLayout, userData, postLicenceLoading } = this.props;
    const { queryResults, lastReqTime, queryFilters } = this.props[NAMESPACE];
    const { isAdmin } = userData;
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
      </div>
    )
  };
  render = () => {

    return this.getResultsPanel()
  }
}

export default Page;
