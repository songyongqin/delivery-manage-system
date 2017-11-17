import React from 'react';
import classnames from 'classnames';
import { Menu, Button, Table, Icon, Row, Col, Card, Modal, Dropdown, message as Message } from 'antd';
import { queryContainerGenerator } from '../../Generators/QueryContainerrGenerator/QueryContainerGenerator';
import JoSpin from '../../components/JoSpin/index';
import EnhanciveTable from '../../domainComponents/EnhanciveTable/index';
import * as tableConfig from './components/TableConfig/index';
import WithOnQuery from '../../Generators/QueryContainerDecorator/WithOnQuery';
import WithPageOnChange from '../../Generators/QueryContainerDecorator/WithPageOnChangeQuery';
import { WithBreadcrumb } from '../../components/HOSComponents/index'
import styles from './styles.css'
import { createMapDispatchWithPromise } from '../../utils/dvaExtraDispatch'
import CreateHoneypotForm from './components/CreateHoneypotForm';
import { curry } from '../../utils/tools'
import {
  tableTextConfig,
  NAMESPACE,
  HOST_IP_DATAINDEX,
  HONEYPOT_IP_DATAINDEX,
  HONEYPOT_NAME_DATAINDEX,
  OPERATION_INIT_VALUE,
  OPERATION_SHUTDOWN_VALUE,
  OPERATION_START_VALUE,
  ID_DATAINDEX
} from './ConstConfig';



function mapStateToProps(state) {
  const { commonLayout } = state.layout;
  return {
    commonLayout,
    userData: state.user.userData,
    productType: state.user.productType.type,
    postLoading: state.loading.effects[`${NAMESPACE}/postVM`],
    options: state[NAMESPACE].options,
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
        type: `${NAMESPACE}/getVMIpList`
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
  }
}


@queryContainerGenerator({
  namespace: NAMESPACE,
  mapStateToProps,
  mapDispatchToProps: createMapDispatchWithPromise(mapDispatchToProps)
})

@WithBreadcrumb
@WithOnQuery(NAMESPACE)
@WithPageOnChange(NAMESPACE)
class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      [HOST_IP_DATAINDEX]: [],
      [HONEYPOT_IP_DATAINDEX]: [],
      [HONEYPOT_NAME_DATAINDEX]: [],
      visible: false,
      selectedRows: [],
    }
  }
  switchModal = () => {
    this.setState({
      visible: !this.state.visible
    })
  }
  componentDidMount = () => {

    const { queryFilters } = this.props[NAMESPACE];
    if (queryFilters[HOST_IP_DATAINDEX].length !== 0) {
      // this.getVMIpList();
    }
    // this.getNodeIpList();
    // this.getVMNameList();
  }
  getNodeIpList = () => {
    this.props.getNodeIpList().then(result => {
      this.setState({
        [HOST_IP_DATAINDEX]: result,
      })
    })
  }
  getVMIpList = (hostIp) => {
    this.props.getVMIpList({ hostIp }).then(result => {
      this.setState({
        [HONEYPOT_IP_DATAINDEX]: result,
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
    //判断主机IP是否与上一次相同 不同则清空蜜罐ip选项
    const { queryFilters } = this.props[NAMESPACE],
      lastHostIP = queryFilters[HOST_IP_DATAINDEX][0],
      newHostIP = filters[HOST_IP_DATAINDEX][0],
      shouldInit = lastHostIP !== newHostIP,
      finalFilter = shouldInit ? { ...filters, [HONEYPOT_IP_DATAINDEX]: [] } : { ...filters };

    this.props.onQuery(finalFilter)
    this.getVMIpList(filters[HOST_IP_DATAINDEX]);
  };
  getQueryPanel = () => {
    // const {onQuery,routes}=this.props;
    // const {queryFilters,lastReqTime}=this.props[NAMESPACE];

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
    this.onQuery({ attackCounts: value })
  };
  setSelectedRows = (selectedRows) => {
    this.setState({
      selectedRows
    })
  }

  onSubmit = payload => this.props.postVM(payload)
    .then(this.switchModal)
    .then(curry(Message.success, "创建蜜罐操作成功，请耐心等待蜜罐创建成功"))

  getDelHandle = payload => () => this.props.deleteVM(payload)
    .then(curry(Message.success, "删除蜜罐虚拟机成功"))
    .then(curry(this.props.onQuery))
    .then(result => this.setSelectedRows([]))

  getPutHandle = payload => () => this.props.putVM(payload)
    .then(curry(Message.success, "操作蜜罐虚拟机成功"))
    .then(curry(this.props.onQuery))
    .then(result => this.setSelectedRows([]))

  getOperationSelectedHandle = (operation, message) => Modal.confirm({
    title: message,
    onOk: this.getPutHandle({
      value: operation,
      honeypotList: this.state.selectedRows.map(i => i[ID_DATAINDEX])
    })
  })

  getDelSelectedHandle = message => Modal.confirm({
    title: message,
    onOk: this.getDelHandle({
      [ID_DATAINDEX]: this.state.selectedRows.map(i => i[ID_DATAINDEX])
    })
  })

  startSelectedHandle = () => this.getPutHandle({
    value: OPERATION_START_VALUE,
    honeypotList: this.state.selectedRows.map(i => i[ID_DATAINDEX])
  })()


  getDataResultPanel = () => {

    const { commonLayout, pageOnChange, userData, options } = this.props;
    const { queryResults, queryFilters, lastReqTime } = this.props[NAMESPACE];
    const { data } = queryResults;
    const isDark = commonLayout.darkTheme,
      { isAdmin } = userData;

    const filterOptions = {
      ...options,
    };


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
        onSubmit: this.onFilter,
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

    if (isAdmin) {
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
          return this.getOperationSelectedHandle(OPERATION_SHUTDOWN_VALUE, "批量关机后，选中的蜜罐将无法再感知威胁信息")
        }
        if (key === "reload") {
          return this.getOperationSelectedHandle(OPERATION_INIT_VALUE, "批量还原蜜罐初始镜像后，将无法返回蜜罐当前状态")
        }
        if (key === "delete") {
          return this.getDelSelectedHandle("批量删除蜜罐后，将无法再恢复")
        }

      }}>
        <Menu.Item key="poweroff" >
          批量关机
        </Menu.Item>
        <Menu.Item key="delete">
          批量删除蜜罐
        </Menu.Item>
        <Menu.Item key="reload">
          批量还原蜜罐镜像
        </Menu.Item>
      </Menu>
    );

    const classes = classnames({
      ["card-dark"]: commonLayout.darkTheme
    });

    return (
      <div key={"results-panel"}>
        <Card title={"虚拟蜜罐"}
          className={classes}>
          {
            isAdmin
              ?
              <Button style={{ marginBottom: "15px" }}
                onClick={this.switchModal}
                type="primary"
                icon="plus">创建蜜罐</Button>
              :
              null
          }
          {
            isAdmin
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
                批量开机
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

    const { commonLayout } = this.props;

    const isDark = commonLayout.darkTheme;


    const pageClasses = classnames({
      // [styles["page"]]:true,
      // [styles["page-dark"]]:this.props.commonLayout.darkTheme
    });

    const modalClasses = classnames({
      ["modal"]: true,
      ["modal-dark"]: isDark
    });

    return (
      <div className={pageClasses}>
        <JoSpin spinning={this.props.queryLoading}>
          {this.props.animateRender([
            this.getQueryPanel(),
            this.getResultsPanel(),
          ])}
        </JoSpin>
        <Modal title={<p><Icon type="plus" />&nbsp;创建新的蜜罐</p>}
          key={`${this.state.visible}-modal-create`}
          visible={this.state.visible}
          className={modalClasses}
          onCancel={this.switchModal}
          footer={null}
          width={700}>
          <CreateHoneypotForm isDark={isDark}
            validatorHandle={this.props.validate}
            onSubmit={this.onSubmit}
            loading={this.props.postLoading}
            options={{
              [HONEYPOT_NAME_DATAINDEX]: this.state[HONEYPOT_NAME_DATAINDEX],
              [HOST_IP_DATAINDEX]: this.state[HOST_IP_DATAINDEX]
            }} />
        </Modal>
      </div>
    )
  }
}

export default Page;
