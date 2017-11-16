import React from 'react';
import { Menu, Button, Breadcrumb, Table, Icon, Row, Col, Badge, Dropdown } from 'antd';
import { queryContainerGenerator } from 'Generators/QueryContainerrGenerator/QueryContainerGenerator';
import EnhanciveTable from 'domainComponents/EnhanciveTable/index';
import * as tableConfig from './components/TableConfig/index';
import WithOnQuery from 'Generators/QueryContainerDecorator/WithOnQuery';
import WithPageOnChange from 'Generators/QueryContainerDecorator/WithPageOnChangeQuery';
import classnames from 'classnames';
import { createMapDispatchWithPromise } from 'utils/dvaExtraDispatch'
import Modal from 'domainComponents/Modal';
import JoSpin from 'components/JoSpin';
import UpdateForm from './components/UpdateForm'
import LicenceForm from './components/LicenceForm';
import CleanForm from './components/CleanForm';
import Card from 'domainComponents/Card'


export default ({
  namespace,
  mapStateToProps,
  mapDispatchToProps,
  title,
  getNodeDiskComponent,
  isNode = true,
  productType = "distribution"
}) => {

  const NAMESPACE = namespace;

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
        selectedRows: [],
        updateVisible: false,
        hasGetVersion: false,
        cleanVisible: false
      }
    }

    setSelectedRows = (selectedRows) => {
      this.setState({
        selectedRows
      })
    }

    initGetVersion = () => {
      this.setState({
        hasGetVersion: false,
      })
    }
    switchCleanModal = () => {
      if (this.state.shouldReload) {
        this.props.onQuery()
        this.setSelectedRows([])
        this.setState({
          shouldReload: false,
        })
      }
      if (this.state.cleanVisible) {
        this.setState({
          activeItems: [],
        })
      }
      this.setState({
        cleanVisible: !this.state.cleanVisible,
      })
    }
    switchUpdateModal = () => {
      if (this.state.shouldReload) {
        window.location.reload();
      }
      if (this.state.updateVisible) {
        this.setState({
          activeItems: [],
        })
      }
      this.setState({
        updateVisible: !this.state.updateVisible,
      })
      this.initGetVersion()
    }
    switchModal = () => {
      if (this.state.shouldReload) {
        window.location.reload();
      }
      if (this.state.visible) {
        this.setState({
          activeItems: [],
        })
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

    onSubmit = payload => this.props.get(payload).then(() => this.setSelectedRows([]))

    licenceModalOpenHandle = payload => {
      this.switchModal();
      this.setActiveItems(payload);
    }

    updateModalOpenHandle = payload => {
      this.switchUpdateModal();
      this.setActiveItems(payload);
    }

    cleanModalOpenHandle = payload => {
      this.switchCleanModal();
      this.setActiveItems(payload);
    }

    setActiveItems = activeItems => this.setState({
      activeItems
    })

    getUpdateInfoRemote = payload => this.props.getUpdateInfoRemote(payload)
      .then(result => {
        this.setState({
          hasGetVersion: true,
          shouldReload: result.some(i => i.status === 1)
        })
        return result;
      })

    getUpdateInfoLocal = payload => this.props.getUpdateInfoLocal(payload)
      .then(result => {
        this.setState({
          hasGetVersion: true,
          shouldReload: result.some(i => i.status === 1)
        })
        return result;
      })

    clean = payload => this.props.clean(payload)
      .then(result => {
        this.setState({
          shouldReload: result.some(i => i.status === 1)
        })
        return result;
      })

    updateRemote = payload => this.props.updateRemote(payload)

    updateLocal = payload => this.props.updateLocal(payload)

    getOperationPanel = () => {
      const menu = (
        <Menu onClick={({ key }) => {
          if (key === "update") {
            this.switchUpdateModal();
          }

          if (key === "clean") {
            this.switchCleanModal()
          }

        }}>
          <Menu.Item key="clean">批量磁盘清理</Menu.Item>
          <Menu.Item key="update">批量检查更新</Menu.Item>
        </Menu>
      );

      const dropDownDisabled = this.state.selectedRows.length === 0;

      return (
        <div style={{ marginBottom: "15px" }}>
          <div style={{ display: "inline-block" }}>
            {getNodeDiskComponent()}
          </div>
          <div style={{ display: "inline-block", marginLeft: "15px" }}>
            {
              isNode
                ?
                <Dropdown.Button
                  overlay={menu}
                  className={classnames({
                    ["dropdown-disabled"]: dropDownDisabled
                  })}
                  onClick={this.switchModal}
                  disabled={dropDownDisabled}
                  type="primary">
                  批量授权
            </Dropdown.Button>
                :
                null
            }
          </div>
        </div>
      )

    }

    getResultsPanel = () => {

      const { commonLayout, userData, postLicenceLoading, updateLoading, cleanLoading, versionColExpanded, loading } = this.props;
      const { queryResults, lastReqTime, queryFilters } = this.props[NAMESPACE];
      const { isAdmin } = userData;
      const { hasGetVersion } = this.state;
      const isDark = commonLayout.darkTheme;

      const tableProps = {
        columns: tableConfig.getColumns({
          isAdmin,
          queryFilters,
          isDark,
          isNode,
          onSubmit: this.onSubmit,
          versionColExpanded,
          handle: {
            licenceHandle: this.licenceModalOpenHandle,
            updateHandle: this.updateModalOpenHandle,
            cleanHandle: this.cleanModalOpenHandle
          }
        }),
        dataSource: queryResults.data.map((i, index) => {
          return {
            ...i,
            key: `item-${index}-${lastReqTime}`
          }
        }),
      };


      if (isAdmin && isNode) {
        tableProps.rowSelection = {
          onChange: (selectedRowKeys, selectedRows) => {
            this.setSelectedRows(selectedRows)
          },
        };
      }

      const paginationProps = {
        total: queryResults.total,
        current: queryFilters.page,
        onChange: current => {
          this.setSelectedRows([]);
          this.props.pageOnChange(current)
        },
        pageSize: queryFilters.limit,
      };

      const {
        getUpdateInfoLocal,
        getUpdateInfoRemote,
        updateLocal,
        updateRemote
      } = this;

      const operationList = this.state.activeItems.length !== 0
        ?
        {
          data: this.state.activeItems
        }
        :
        {
          data: this.state.selectedRows
        }

      return (
        <Card title={title}>
          <JoSpin spinning={loading}>
            {this.getOperationPanel()}
            <EnhanciveTable
              key={`${lastReqTime}-device-table`}
              inverse={true}
              pagination={isNode}
              tableProps={tableProps}
              paginationProps={paginationProps}
              isDark={commonLayout.darkTheme} />
          </JoSpin>
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
                defaultValue={operationList}>
              </LicenceForm>
            </JoSpin>
          </Modal>
          <Modal
            width={"1200px"}
            key={`${this.state.updateVisible}-update-modal`}
            onCancel={this.switchUpdateModal}
            title="检测更新"
            maskClosable={false}
            visible={this.state.updateVisible}
            footer={null}>
            <JoSpin spinning={updateLoading}>
              <UpdateForm
                onCancel={this.switchUpdateModal}
                handle={{ getUpdateInfoLocal, getUpdateInfoRemote, updateLocal, updateRemote }}
                loading={updateLoading}
                isDark={isDark}
                onSubmit={this.postLicenceHandle}
                defaultValue={operationList}>
              </UpdateForm>
            </JoSpin>
          </Modal>
          <Modal
            width={"800px"}
            title="清理磁盘"
            key={`${this.state.cleanVisible}-clean-modal`}
            onCancel={this.switchCleanModal}
            maskClosable={false}
            visible={this.state.cleanVisible}
            footer={null}>
            <JoSpin spinning={cleanLoading}>
              <CleanForm
                productType={productType}
                onSubmit={this.clean}
                onCancel={this.switchCleanModal}
                defaultValue={operationList}
                isDark={isDark}>

              </CleanForm>
            </JoSpin>
          </Modal>
        </Card>
      )
    };
    render = () => {

      return this.getResultsPanel()
    }
  }

  return Page;

}
