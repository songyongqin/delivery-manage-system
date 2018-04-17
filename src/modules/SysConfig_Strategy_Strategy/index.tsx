import * as React from 'react';
import styles from './styles.css';
import {
  Menu,
  Button,
  Breadcrumb,
  Icon,
  message as Message,
  Popover,
  Modal
} from 'antd';
import Spin from 'domainComponents/Spin'
import { connect } from 'dva';
import classnames from 'classnames';
import * as tableConfig from './components/TableConfig';
import Table from 'domainComponents/Table'
import Card from 'domainComponents/Card';
import {
  NAMESPACE,
  USERFUL_VALUE,
  UN_USEFUL_VALUE,
  PROTOCOLTYPE_DATAINDEX,
} from './ConstConfig'
import {
  THREAT_NAME_NAME_DATAINDEX,
  THREAT_NAME_KEY_DATAINDEX,
  NAMESPACE as THREAT_NAME_NAMESPACE,
} from '../SysConfig_Strategy_Threatname/ConstConfig'
import {
  RULE_THREAT_TYPE_DATAINDEX,
  NAMESPACE as RULE_NAMESPACE,
  protocolTypeList
} from '../SysConfig_Strategy_Rule/ConstConfig'
import StrategyThreatnameModule from 'modules/SysConfig_Strategy_Threatname'
import * as tools from 'utils'
import RuleForm from '../SysConfig_Strategy_Rule/components/RuleForm';


const CardTitle = ({ selectedRows = [], createPutStrategy, applyHandle, switchExpandPage, switchCreateModal }) => (
  <div style={{ overflow: "hidden" }}>
    <div style={{ float: "left" }}>
      <Button.Group>
        <Button type="primary"
          onClick={createPutStrategy(USERFUL_VALUE)}
          disabled={selectedRows.length === 0}>
          <Icon type="check" />启用
        </Button>
        <Button type="danger"
          onClick={createPutStrategy(UN_USEFUL_VALUE)}
          disabled={selectedRows.length === 0}
          className="btn-danger">
          关闭<Icon type="close" />
        </Button>
      </Button.Group>
      <Button type="primary"
        icon="plus"
        onClick={switchCreateModal}
        style={{ marginLeft: "15px" }}>
        新增特征
      </Button>
    </div>
    <div style={{ float: "right" }}>
      <Button type="primary"
        onClick={applyHandle}
        icon="save">
        应用
      </Button>
      <Button type="primary"
        onClick={switchExpandPage}
        style={{ marginLeft: "15px" }}
        icon="setting">
        威胁等级配置
      </Button>
    </div>
  </div>
)



const mapStateToProps = state => {
  const effectLoading = state.loading.effects;

  return {
    [NAMESPACE]: state[NAMESPACE],
    loading: false,
    threatnames: []
    // commonLayout: state.layout.commonLayout,
    // loading: effectLoading[`${NAMESPACE}/query`] ||
    //   effectLoading[`${NAMESPACE}/put`] ||
    //   effectLoading[`${NAMESPACE}/apply`],
    // postRuleLoaidng: effectLoading[`${RULE_NAMESPACE}/post`],
    // threatnames: state[THREAT_NAME_NAMESPACE].queryResults.data,
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
  postRule: payload => dispatch({
    type: `${RULE_NAMESPACE}/post`,
    payload,
  }),
  apply: () => dispatch({
    type: `${NAMESPACE}/apply`
  }),
  getThreatname: () => dispatch({
    type: `${NAMESPACE}/getThreatname`
  })
})

const getTableRowKey = (index, lastReqTime) => `item-${index}-${lastReqTime}`



@connect(mapStateToProps, mapDispatchToProps)
class Page extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      selectedRows: [],
      expanded: false,
      expandedRowIndexes: [],
      threatnames: [],
      createVisible: false,
      isFormDependInit: false,
      offsetBottom: 0,
      height: 500,
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
    this.setOffsetBottom()
  }
  getBreadcrumb = () => {
    return (
      <div key="breadcrumb-panel" style={{ margin: "15px 0" }}>
        {this.props.getBreadcrumb(this.props.routes)}
      </div>
    )
  }

  componentDidMount() {
    this.props.get();
    this.props.getThreatname().then(result => {
      this.setState({
        threatnames: result.map(i => ({
          text: i[THREAT_NAME_NAME_DATAINDEX],
          value: i[THREAT_NAME_KEY_DATAINDEX]
        })),
        isFormDependInit: true,
      })
    });
    // this.setOffsetBottom();
    window.addEventListener("resize", this.setOffsetBottom);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.setOffsetBottom);
  }
  setOffsetBottom = () => {
    let dom = document.querySelector("#strategy-expand-page")
    let wrapper = document.querySelector("#main-children-wrapper")
    let offsetBottom = wrapper.scrollHeight - dom.offsetHeight
    this.setState({
      height: wrapper.scrollHeight
    })
  }
  setSelectedRows = (selectedRows) => this.setState({
    selectedRows
  })

  getUsefulOnChangeHandle = protocolType => value => {

    this.clearExpandRow()
    this.props.put({
      [protocolType]: value ? USERFUL_VALUE : UN_USEFUL_VALUE
    })
      .then(this.props.get)
      .catch(this.props.get)
  }

  createPutStrategy = value => () => {
    this.clearExpandRow();
    let payload = {};
    this.state.selectedRows.forEach(i => payload[i[PROTOCOLTYPE_DATAINDEX]] = value)
    this.props.put(payload)
      .then(_ => Message.success("修改成功"))
      .then(this.props.get)
      .then(this.initSelected)
  }

  applyHandle = () => this.props.apply()
    .then(_ => Message.success("应用成功"))
    .then(this.props.get)


  initSelected = () => this.setState({
    selectedRows: []
  })

  switchCreateModal = () => this.setState({
    createVisible: !this.state.createVisible,
  })

  onSubmit = payload => this.props.postRule(payload)
    .then(_ => Message.success("添加成功"))
    .then(this.switchCreateModal)
    .then(this.props.get)

  getContentPanel = () => {

    const { queryResults, lastReqTime } = this.props[NAMESPACE];
    const { data } = queryResults;
    const {
      getUsefulOnChangeHandle,
      createPutStrategy,
      applyHandle,
      switchExpandPage,
      getExpandRowOnChange,
      switchCreateModal
    } = this;

    const { selectedRows, expandedRowIndexes } = this.state;
    const tableProps = {
      expandIconAsCell: false,
      expandIconColumnIndex: -1,
      expandedRowKeys: expandedRowIndexes.map(index => getTableRowKey(index, lastReqTime)),
      columns: tableConfig.getColumns({
        getUsefulOnChangeHandle,
        getExpandRowOnChange,
        expandedRowIndexes
      }),
      dataSource: data.map((i, index) => ({
        ...i,
        key: getTableRowKey(index, lastReqTime)
      })),
      rowSelection: {
        onChange: (selectedRowKeys, selectedRows) => this.setSelectedRows(selectedRows)
      },
      expandedRowRender: tableConfig.getExpandedRowRenderer({ expandedRowIndexes, getProtocol: this.props.get })
    };

    const title = <CardTitle selectedRows={selectedRows}
      applyHandle={applyHandle}
      switchCreateModal={switchCreateModal}
      switchExpandPage={switchExpandPage}
      createPutStrategy={createPutStrategy} />


    return (
      <div key="content-panel" style={{ padding: "15px 0" }}>
        <Card title={title}>
          <Table title={null}
            expanded={false}
            key={`${lastReqTime}-table`}
            inverse={true}
            tableProps={tableProps}
            pagination={false} />
        </Card>
      </div>
    )
  }
  render() {


    const { commonLayout, postRuleLoading, threatnames } = this.props,
      {
        expanded,
        createVisible,
        offsetBottom,
        height,
      } = this.state
    // const { queryResults } = this.props[NAMESPACE];
    const queryResults = { total: 0 }
    const { data } = queryResults

    const expandPageClasses = classnames({
      [styles["expand-page"]]: true,
      // [styles["expand-page-dark"]]: isDark,
      [styles["expanded"]]: expanded,
    })


    const contentClasses = classnames({
      [styles["content"]]: true,
      [styles["content-shrink"]]: expanded
    })

    return (
      <div>
        <div className={expandPageClasses}
          style={{
            height,
          }}
          id="strategy-expand-page">
          <StrategyThreatnameModule switchExpandPage={this.switchExpandPage} />
        </div>
        <div className={contentClasses}>
          <Spin spinning={this.props.loading}>
            {
              this.props.animateRender([
                this.getContentPanel()
              ])
            }
          </Spin>
        </div>
        <Modal visible={createVisible}

          onCancel={this.switchCreateModal}
          key={`${createVisible}-modal-visible`}
          footer={null}
          title={<p><Icon type="plus" />&nbsp;新增特征</p>}>
          <Spin spinning={postRuleLoading}>
            <RuleForm onSubmit={this.onSubmit}
              protocolTypes={data.map(i => i[PROTOCOLTYPE_DATAINDEX])}
              threatTypes={threatnames.map(i => ({
                text: i.name,
                value: i.key,
              }))} />
          </Spin>
        </Modal>
      </div>
    )
  }
}

export default Page;