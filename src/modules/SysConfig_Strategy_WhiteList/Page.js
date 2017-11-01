import React from 'react';
import styles from './styles.css';
import {
  Menu,
  Button,
  Breadcrumb,
  Icon,
  message as Message,
  Popover
} from 'antd';
import { WithAnimateRender, WithBreadcrumb } from '../../components/HOSComponents/index'
import { createMapDispatchWithPromise } from '../../utils/dvaExtraDispatch'
import JoSpin from '../../components/JoSpin';
import { connect } from 'dva';
import classnames from 'classnames';
import * as tableConfig from './components/TableConfig';
import EnhanciveTable from '../../domainComponents/EnhanciveTable';
import Card from '../../domainComponents/Card';
import {
  NAMESPACE,
  OPEN_VALUE,
  UN_OPEN_VALUE,
  ID_DATAINDEX,
} from './ConstConfig'

import StrategyThreatnameModule from '../SysConfig_Strategy_Threatname/Page';
import * as tools from '../../utils/tools';
import Modal from '../../domainComponents/Modal';
import PostForm from './components/PostForm';
const { curry } = tools;

const CardTitle = ({ selectedRows = [], createPutStrategy, applyHandle, switchExpandPage, switchCreateModal }) => (
  <div style={{ overflow: "hidden" }}>
    <div style={{ float: "left" }}>
      <Button.Group>
        <Button type="primary"
          onClick={createPutStrategy(OPEN_VALUE)}
          disabled={selectedRows.length === 0}>
          <Icon type="check" />启用
        </Button>
        <Button type="danger"
          onClick={createPutStrategy(UN_OPEN_VALUE)}
          disabled={selectedRows.length === 0}
          className="btn-danger">
          关闭<Icon type="close" />
        </Button>
      </Button.Group>
      <Button type="primary"
        icon="plus"
        onClick={switchCreateModal}
        style={{ marginLeft: "15px" }}>
        新增系统日志白名单
      </Button>
    </div>
    <div style={{ float: "right" }}>
      <Button type="primary"
        onClick={applyHandle}
        icon="save">
        应用
      </Button>
    </div>
  </div>
)



const mapStateToProps = state => {
  const effectLoading = state.loading.effects;

  return {
    [NAMESPACE]: state[NAMESPACE],
    commonLayout: state.layout.commonLayout,
    loading: effectLoading[`${NAMESPACE}/query`] ||
    effectLoading[`${NAMESPACE}/put`] ||
    effectLoading[`${NAMESPACE}/apply`] ||
    effectLoading[`${NAMESPACE}/post`] ||
    effectLoading[`${NAMESPACE}/delete`],
  }

}

const mapDispatchToProps = dispatch => ({
  get: () => dispatch({
    type: `${NAMESPACE}/query`
  }),
  put: payload => dispatch({
    type: `${NAMESPACE}/put`,
    payload,
  }),
  delete: payload => dispatch({
    type: `${NAMESPACE}/delete`,
    payload,
  }),
  post: payload => dispatch({
    type: `${NAMESPACE}/post`,
    payload,
  }),
  apply: () => dispatch({
    type: `${NAMESPACE}/apply`
  }),

})

const getTableRowKey = (index, lastReqTime) => `item-${index}-${lastReqTime}`



@connect(mapStateToProps, createMapDispatchWithPromise(mapDispatchToProps))
@WithAnimateRender
@WithBreadcrumb
class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRows: [],
      expanded: false,
      expandedRowIndexes: [],
      threatnames: [],
      createVisible: false,
      isFormDependInit: false,
    }
  }
  /***************************************/
  getExpandRowOnChange = index => () => this.state.expandedRowIndexes.includes(index)
    ?
    this.removeExpandedRow(index)
    :
    this.addExpandedRow(index)
  /***************************************/
  addExpandedRow = index => this.setState({
    expandedRowIndexes: [...this.state.expandedRowIndexes, index]
  })
  /***************************************/
  removeExpandedRow = index => this.setState({
    expandedRowIndexes: this.state.expandedRowIndexes.filter(i => i !== index)
  })
  /***************************************/
  clearExpandRow = () => this.setState({
    expandedRowIndexes: []
  })
  /***************************************/

  switchExpandPage = () => {
    this.setState({
      expanded: !this.state.expanded
    })
  }
  getBreadcrumb = () => {
    return (
      <div key="breadcrumb-panel" style={{ margin: "15px 0" }}>
        {this.props.getBreadcrumb(this.props.routes)}
      </div>
    )
  }

  componentDidMount = () => {
    this.props.get();
  }

  setSelectedRows = (selectedRows) => this.setState({
    selectedRows
  })

  getUsefulOnChangeHandle = protocolType => value => {

    this.clearExpandRow()
    this.props.put({
      [protocolType]: value ? OPEN_VALUE : UN_OPEN_VALUE
    })
      .then(this.props.get)
      .catch(this.props.get)
  }

  createPutStrategy = value => () => {
    this.clearExpandRow();
    let payload = {};
    this.state.selectedRows.forEach(i => payload[i[ID_DATAINDEX]] = value)
    this.props.put(payload)
      .then(curry(Message.success, "修改成功"))
      .then(this.props.get)
      .then(this.initSelected)
  }

  applyHandle = () => this.props.apply()
    .then(curry(Message.success, "应用成功"))
    .then(this.props.get)


  initSelected = () => this.setState({
    selectedRows: []
  })

  switchCreateModal = () => this.setState({
    createVisible: !this.state.createVisible,
  })

  onSubmit = payload => this.props.post(payload)
    .then(curry(Message.success, "添加成功"))
    .then(this.switchCreateModal)
    .then(this.props.get)


  getDelHandle = id => () => this.props.delete({
    [ID_DATAINDEX]: id,
  })
    .then(curry(Message.success, "删除成功"))
    .then(this.props.get)

  getContentPanel = () => {

    const { queryResults, lastReqTime } = this.props[NAMESPACE];
    const { data } = queryResults;
    const {
      getUsefulOnChangeHandle,
      createPutStrategy,
      applyHandle,
      switchExpandPage,
      getDelHandle,
      switchCreateModal
    } = this;

    const { selectedRows, expandedRowIndexes } = this.state;
    const tableProps = {
      expandIconAsCell: false,
      expandIconColumnIndex: -1,
      expandedRowKeys: expandedRowIndexes.map(index => getTableRowKey(index, lastReqTime)),
      columns: tableConfig.getColumns({
        getUsefulOnChangeHandle,
        getDelHandle,
      }),
      dataSource: data.map((i, index) => ({
        ...i,
        key: getTableRowKey(index, lastReqTime)
      })),
      rowSelection: {
        onChange: (selectedRowKeys, selectedRows) => this.setSelectedRows(selectedRows)
      },
    };

    const title = <CardTitle selectedRows={selectedRows}
      applyHandle={applyHandle}
      switchCreateModal={switchCreateModal}
      switchExpandPage={switchExpandPage}
      createPutStrategy={createPutStrategy} />


    return (
      <div key="content-panel" style={{ padding: "15px 0" }}>
        <Card title={title}>
          <EnhanciveTable title={null}
            expanded={false}
            key={`${lastReqTime}-table`}
            inverse={true}
            tableProps={tableProps}
            pagination={false} />
        </Card>
      </div>
    )
  }
  render = () => {


    const { commonLayout, loading } = this.props,
      isDark = commonLayout.darkTheme,
      {
            expanded,
        createVisible,
          } = this.state

    const { queryResults } = this.props[NAMESPACE];

    const expandPageClasses = classnames({
      [styles["expand-page"]]: true,
      [styles["expand-page-dark"]]: isDark,
      [styles["expanded"]]: expanded,
    })


    const contentClasses = classnames({
      [styles["content"]]: true,
      [styles["content-shrink"]]: expanded
    })

    return (
      <div>
        <div className={expandPageClasses}
          id="strategy-expand-page">
          <StrategyThreatnameModule />
        </div>
        <div className={contentClasses}>
          <JoSpin spinning={this.props.loading}>
            {
              this.props.animateRender([
                this.getContentPanel()
              ])
            }
          </JoSpin>
        </div>
        <Modal visible={createVisible}
          isDark={isDark}
          onCancel={this.switchCreateModal}
          key={`${createVisible}-modal-visible`}
          footer={null}
          title={<p><Icon type="plus" />&nbsp;新增系统日志白名单</p>}>
          <JoSpin spinning={loading}>
            {/*<RuleForm onSubmit={this.onSubmit}*/}
            {/*isDark={isDark}*/}
            {/*protocolTypes={data.map(i=>i[PROTOCOLTYPE_DATAINDEX])}*/}
            {/*threatTypes={threatnames}/>*/}
            <PostForm isDark={isDark} onSubmit={this.onSubmit} />

          </JoSpin>
        </Modal>
      </div>
    )
  }
}

export default Page;
