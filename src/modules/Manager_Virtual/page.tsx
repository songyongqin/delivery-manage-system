import * as  React from 'react'
import classnames from 'classnames'
import { Menu, Button, Icon, Row, Col, Card, Modal, Dropdown, message as Message } from 'antd'
// import { queryContainerGenerator } from '../../Generators/QueryContainerrGenerator/QueryContainerGenerator';
import Spin from 'domainComponents/Spin'
import Table from 'domainComponents/Table'
import * as tableConfig from './components/TableConfig'
// import WithOnQuery from '../../Generators/QueryContainerDecorator/WithOnQuery';
// import WithPageOnChange from '../../Generators/QueryContainerDecorator/WithPageOnChangeQuery';
// import { WithBreadcrumb } from '../../components/HOSComponents/index'
import styles from './styles.css'
// import { createMapDispatchWithPromise } from '../../utils/dvaExtraDispatch'
import CreateHoneypotForm from './components/CreateHoneypotForm';
// import { curry } from '../../utils/tools'
// import Modal from 'domainComponents/Modal'
import OperationResultPanel from './components/OperationResultPanel'
import WithModal from 'components/WithModal'
// import { DISTRIBUTION, STAND_ALONE } from 'configs/ConstConfig'

import {
  tableTextConfig,
  NAMESPACE,
  HOST_IP_DATAINDEX,
  HONEYPOT_IP_DATAINDEX,
  HONEYPOT_NAME_DATAINDEX,
  OPERATION_INIT_VALUE,
  OPERATION_SHUTDOWN_VALUE,
  OPERATION_START_VALUE,
  ID_DATAINDEX,
  MAIN_NAMESPACE,
  VM_ENUM_CONFIG_DATA_INDEX,
  HONEYPOT_TYPE_ROW_KEY,
  NODE,
  SERVICES_DATAINDEX,
  PORTS_DATAINDEX,
  HONEYPOT_STATUS_DATAINDEX

} from './ConstConfig';

const HONEYPOT_TYPE = "honeypotType"

import { initFilters } from './Model'

function mapStateToProps(state) {
  const { commonLayout } = state.layout;
  return {
    commonLayout,
    userData: state.user.userData,
    productType: state.user.productType.type,
    postLoading: state.loading.effects[`${NAMESPACE}/postVM`],
    options: state[NAMESPACE].options,
    honeypotTypeList: state[MAIN_NAMESPACE].queryResults[HONEYPOT_TYPE] || {},
    services: state[MAIN_NAMESPACE].queryResults[SERVICES_DATAINDEX] || {},
    ports: state[MAIN_NAMESPACE].queryResults[PORTS_DATAINDEX] || {}
    // vmOptions: state[MAIN_NAMESPACE].queryResults[VM_ENUM_CONFIG_DATA_INDEX] || {}
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getNodeIpList: () => {
      return dispatch({
        type: `${NAMESPACE}/getNodeIpList`
      })
    },
    getVMIpList: (payload) => {
      return dispatch({
        type: `${NAMESPACE}/getVMIpList`,
        payload
      })
    },
    getVMNameList: () => {
      return dispatch({
        type: `${NAMESPACE}/getVMNameList`
      })
    },
    validate: payload => dispatch({
      type: `${NAMESPACE}/validate`,
      payload,
    }),
    postVM: payload => dispatch({
      type: `${NAMESPACE}/postVM`,
      payload,
    }),
    deleteVM: payload => dispatch({
      type: `${NAMESPACE}/deleteVM`,
      payload,
    }),
    putVM: payload => dispatch({
      type: `${NAMESPACE}/putVM`,
      payload,
    }),
    getVMOption: payload => dispatch({
      type: `${NAMESPACE}/getVMOption`,
      payload,
    })
  }
}

const modalTitleConfig = {
  [OPERATION_INIT_VALUE]: "初始化操作",
  [OPERATION_SHUTDOWN_VALUE]: "關機操作",
  [OPERATION_START_VALUE]: "開機操作",
  ["delete"]: "刪除操作"
}


class Page extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      [HOST_IP_DATAINDEX]: [],
      [HONEYPOT_IP_DATAINDEX]: [],
      [HONEYPOT_NAME_DATAINDEX]: [],
      visible: false,
      selectedRows: [],
      vmOptions: {},
      activeOperation: null,
      results: [],
      vmIpList: [],
      nodeIpList: [],
      activeFilter: ""
    }
  }
  switchModal = () => {
    this.setState({
      visible: !this.state.visible
    })
  }
  componentDidMount() {
    const { productType } = this.props
    const { queryFilters } = this.props[NAMESPACE];
    if (queryFilters[HOST_IP_DATAINDEX].length !== 0) {
      // this.getVMIpList();
    }
    // if (productType === DISTRIBUTION || productType === STAND_ALONE) {
    //   this.props.getVMOption()
    //     .then(result => this.setState({ vmOptions: result }))
    // }


    // this.getNodeIpList()
    // this.getVMIpList()

  }
  getNodeIpList = () => {
    this.props.getNodeIpList().then(result => {
      this.setState({
        nodeIpList: result,
      })
    })
  }
  getVMIpList = (hostIp) => {
    this.props.getVMIpList({ [HOST_IP_DATAINDEX]: hostIp }).then(result => {
      this.setState({
        vmIpList: result,
      })
    })
  }
  getVMNameList = () => {
    this.props.getVMNameList().then(result => {
      this.setState({
        [HONEYPOT_NAME_DATAINDEX]: result,
      })
    })
  }
  tableOnChange = (pagination, filters, sorter) => {

    const dataIndexes = [HOST_IP_DATAINDEX,
      HONEYPOT_IP_DATAINDEX,
      HONEYPOT_TYPE_ROW_KEY,
      SERVICES_DATAINDEX,
      PORTS_DATAINDEX,
      HONEYPOT_STATUS_DATAINDEX]

    const finalFilters = dataIndexes.reduce((_finalFilters, dataIndex) => {
      _finalFilters[dataIndex] = []
      return _finalFilters
    }, {})

    finalFilters[this.state.activeFilter] = filters[this.state.activeFilter]
    this.props.onQuery(finalFilters)
  };
  setActiveFilter = (dataIndex) => {
    this.setState({
      activeFilter: dataIndex
    })
  }
  getQueryPanel = () => {
    return (
      <div key={"query-panel"} style={{ margin: "15px 0" }}>
        {this.props.getBreadcrumb(this.props.routes)}
      </div>
    )
  };
  getResultsPanel = () => {

    return (
      <div key="results-panel">
        {this.getDataResultPanel()}
      </div>
    )
  };
  onFilter = (value) => {
    // this.onQuery({ attackCounts: value })
  };
  setSelectedRows = (selectedRows) => {
    this.setState({
      selectedRows
    })
  }

  onSubmit = payload => this.props.postVM(payload)
    .then(this.switchModal)
  // .then(curry(Message.success, "創建蜜罐操作成功，請耐心等待蜜罐創建成功"))

  getDelHandle = payload => () => this.props.deleteVM(payload)
    .then(result => {
      const { selectedRows } = this.state
      const { data } = this.props[NAMESPACE].queryResults
      this.setState({
        activeOperation: "delete",
        results: result.map(item => {
          return {
            ...item,
            [HONEYPOT_IP_DATAINDEX]: (data.find(i => i[ID_DATAINDEX] === item[ID_DATAINDEX]) || {})[HONEYPOT_IP_DATAINDEX]
          }

        })
      })

      setTimeout(() => {
        this.props.switchModal("delete")
      }, 300)

      this.setSelectedRows([])
      this.getNodeIpList()
      // this.getVMIpList()
      return this.props.query(initFilters)
    })

  onOperationConfirm = () => {
    this.props.switchModal(this.state.activeOperation)
    setTimeout(() => {
      this.setState({
        activeOperation: null,
        results: []
      })
    }, 300)
  }

  getPutHandle = payload => () => this.props.putVM(payload)
    .then(result => {

      const { selectedRows } = this.state
      const { data } = this.props[NAMESPACE].queryResults

      this.setState({
        activeOperation: payload.value,
        results: result.map(item => {
          return {
            ...item,
            [HONEYPOT_IP_DATAINDEX]: (data.find(i => i[ID_DATAINDEX] == item[ID_DATAINDEX]) || {})[HONEYPOT_IP_DATAINDEX]
          }

        })
      })

      setTimeout(() => {
        this.props.switchModal(payload.value)
      }, 300)

      this.setSelectedRows([])
      // this.getNodeIpList()
      // this.getVMIpList()
      return this.props.query(initFilters)
    })



  getOperationSelectedHandle = (operation, message) => ModalHandle.confirm({
    title: message,
    onOk: this.getPutHandle({
      value: operation,
      honeypotList: this.state.selectedRows.map(i => i[ID_DATAINDEX])
    })
  })

  // getDelSelectedHandle = message => ModalHandle.confirm({
  //   title: message,
  //   onOk: this.getDelHandle({
  //     [ID_DATAINDEX]: this.state.selectedRows.map(i => i[ID_DATAINDEX])
  //   })
  // })

  startSelectedHandle = () => this.getPutHandle({
    value: OPERATION_START_VALUE,
    honeypotList: this.state.selectedRows.map(i => i[ID_DATAINDEX])
  })()


  getDataResultPanel = () => {

    const { commonLayout, pageOnChange, userData, options, productType, honeypotTypeList, services, ports } = this.props;
    const { queryResults, queryFilters, lastReqTime } = this.props[NAMESPACE];
    const { data } = queryResults;
    const isDark = commonLayout.darkTheme,
      { isAdmin } = userData;
    const { vmOptions, vmIpList, nodeIpList } = this.state
    const filterOptions = {
      // ...options,
      [HONEYPOT_IP_DATAINDEX]: vmIpList,
      [HOST_IP_DATAINDEX]: nodeIpList,
      [HONEYPOT_TYPE_ROW_KEY]: Object.keys(honeypotTypeList),
      [SERVICES_DATAINDEX]: Object.keys(services),
      [PORTS_DATAINDEX]: Object.keys(ports)
    };

    const filterTextConfigs = {
      [HONEYPOT_TYPE_ROW_KEY]: honeypotTypeList,
      [SERVICES_DATAINDEX]: services,
      [PORTS_DATAINDEX]: ports
    }

    const tableProps = {
      className: classnames({
        [styles["table"]]: true,
        // [styles["table-selectable"]]:isAdmin
      }),
      onChange: this.tableOnChange,
      columns: tableConfig.getColumns({
        filterOptions,
        queryFilters,
        isAdmin,
        productType,
        filterTextConfigs,
        onSubmit: this.onFilter,
        setActiveFilter: this.setActiveFilter,
        handle: {
          getDelHandle: this.getDelHandle,
          getPutHandle: this.getPutHandle
        }
      }),
      dataSource: data.map((i, index) => {
        return {
          ...i,
          key: `item-${index}-${lastReqTime}`
        }
      })
    };

    if (isAdmin && productType !== NODE) {
      tableProps.rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
          this.setSelectedRows(selectedRows);
        },
      };
    }

    const paginationProps = {
      total: queryResults.total,
      current: queryFilters.page,
      onChange: pageOnChange,
      pageSize: queryFilters.limit,
    };

    const menu = (
      <Menu onClick={({ key }) => {
        if (key === "poweroff") {
          return this.getOperationSelectedHandle(OPERATION_SHUTDOWN_VALUE, "批量關機後，選中的蜜罐將無法再感知威脅信息")
        }
        if (key === "reload") {
          return this.getOperationSelectedHandle(OPERATION_INIT_VALUE, "批量還原蜜罐初始鏡像後，將無法返回蜜罐當前狀態")
        }
        if (key === "delete") {
          return this.getDelSelectedHandle("批量刪除蜜罐後，將無法再恢復")
        }

      }}>
        <Menu.Item key="poweroff" >
          批量關機
        </Menu.Item>
        <Menu.Item key="delete">
          批量刪除蜜罐
        </Menu.Item>
        <Menu.Item key="reload">
          批量還原蜜罐鏡像
        </Menu.Item>
      </Menu>
    );

    const classes = classnames({
      ["card-dark"]: commonLayout.darkTheme
    });

    return (
      <div key={"results-panel"}>
        <Card title={"虛擬蜜罐"}
          className={classes}>
          {
            isAdmin && productType !== NODE
              ?
              <Button style={{ marginBottom: "15px" }}
                onClick={this.switchModal}
                type="primary"
                icon="plus">創建蜜罐</Button>
              :
              null
          }
          {
            isAdmin && productType !== NODE
              ?
              <Dropdown.Button
                style={{ marginLeft: "20px" }}
                className={classnames({
                  ["dropdown-disabled"]: this.state.selectedRows.length === 0
                })}
                disabled={this.state.selectedRows.length === 0}
                overlay={menu}
                onClick={this.startSelectedHandle}
                type="primary">
                批量開機
              </Dropdown.Button>
              :
              null
          }

          <EnhanciveTable title={tableTextConfig.title}
            tableProps={tableProps}
            inverse={true}
            isDark={isDark}
            paginationProps={paginationProps} />
        </Card>
      </div>
    )
  };
  render = () => {

    const { commonLayout, options, productType } = this.props;
    const { vmOptions } = this.state;
    const isDark = commonLayout.darkTheme;

    const pageClasses = classnames({
      // [styles["page"]]:true,
      // [styles["page-dark"]]:this.props.commonLayout.darkTheme
    });


    return (
      <div className={pageClasses}>
        <JoSpin spinning={this.props.queryLoading}>
          {this.props.animateRender([
            this.getQueryPanel(),
            this.getResultsPanel(),
          ])}
        </JoSpin>
        <Modal title={<p><Icon type="plus" />&nbsp;創建新的蜜罐</p>}
          key={`${this.state.visible}-modal-create`}
          visible={this.state.visible}
          className={styles["vm-modal"]}
          onCancel={this.switchModal}
          maskClosable={false}
          closable={this.props.loading}
          style={{ position: "absolute", top: "30px", bottom: "30px", left: "50%", right: "50px", marginLeft: "-350px", marginRight: "0", maxHeight: "750px" }}
          footer={null}
          width={700}>
          <Spin
            spinning={this.props.postLoading}
            style={{ height: "100%" }}
            contentWrapperStyle={{ height: "100%" }}>
            <CreateHoneypotForm
              key={`${Object.keys(vmOptions).length}-create-vm`}
              validatorHandle={this.props.validate}
              vmOptions={vmOptions}
              onSubmit={this.onSubmit}
              loading={this.props.postLoading}
              options={options} />
          </Spin>
        </Modal>
        <Modal
          onCancel={this.onOperationConfirm}
          title={modalTitleConfig[this.state.activeOperation]}
          style={{ top: "50px" }}
          visible={this.props.modalVisible[this.state.activeOperation]}
          footer={null}>
          <OperationResultPanel
            type={this.state.activeOperation}
            data={this.state.results}>
          </OperationResultPanel>
          <div style={{ textAlign: "center", marginTop: "15px" }}>
            <Button type="primary" onClick={this.onOperationConfirm}>確定</Button>
          </div>
        </Modal>
      </div>
    )
  }
}

export default Page;
