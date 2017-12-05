
import { connect } from 'dva';
import { Table, Input, Button, Icon, Pagination, Spin, Collapse } from 'antd';
import { routerRedux } from 'dva/router';
import EnhanciveTable from '../../../../domainComponents/EnhanciveTable';
import JoSpin from '../../../../components/JoSpin';
import { WithContainerHeader, WithAnimateRender } from '../../../../components/HOSComponents'
import { NAMESPACE_NODE, OPERATION_NAMESPACE, HOST_IP_DATA_INDEX } from '../../ConstConfig'
import classnames from 'classnames'
import styles from './index.css'
import TagList from 'components/TagList'
import JoTag from 'components/JoTag'
import Modal from 'domainComponents/Modal'
import NodeUpdateResultPanel from '../NodeUpdateResultPanel'
import { WithModal } from 'domainComponents/HOSComponents'
import { createMapDispatchWithPromise } from 'utils/dvaExtraDispatch'
import { HOST_DATA_INDEX } from 'modules/Analyse_Overall_NetBasic/ConstConfig';
const Panel = Collapse.Panel;
import { NODE } from 'configs/ConstConfig'


@WithAnimateRender
@WithModal()
class mirrornode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRows: [],
      result: []
    };
  }
  getOnUpdateHandle = payload => () => {
    const selectedRows = [payload];
    this.props.switchModal("nodeUpdate")
    this.props.updateNodeMirror({ idList: selectedRows.map(i => i.id) })
      .then(result => this.setState({
        result: result.map(item => ({
          [HOST_IP_DATA_INDEX]: (selectedRows.find(i => i.id === item.id) || {})[HOST_IP_DATA_INDEX],
          ...item,
          add: (item.payload || {}).add || [],
          remove: (item.payload || {}).remove || []
        }))
      }))
  }
  start = () => {
    const { selectedRows } = this.state;

    this.props.switchModal("nodeUpdate")

    this.props.updateNodeMirror({ idList: selectedRows.map(i => i.id) })
      .then(result => this.setState({
        result: result.map(item => ({
          [HOST_IP_DATA_INDEX]: (selectedRows.find(i => i.id === item.id) || {})[HOST_IP_DATA_INDEX],
          ...item,
          add: (item.payload || {}).add || [],
          remove: (item.payload || {}).remove || []
        }))
      }))

  }
  onSelectChange = (selectedRowKeys, selectedRows) => {
    this.setState({ selectedRows });
  }
  onConfirm = () => {

    this.props.switchModal("nodeUpdate")
    this.props.fetch({
      limit: this.props.limit,
      page: 1
    })
    setTimeout(() => {
      this.setState({
        selectedRows: [],
        result: []
      })
    }, 300)

  }

  pageChangeHandler = (page) => {
    const { limit } = this.props;
    this.props.dispatch({
      type: `${NAMESPACE}/fetch`,
      payload:
        {
          page,
          limit,
        }
    })
  }
  render() {
    const data = this.props.data;
    const { isDark, lastReqTime } = this.props;
    const columns = [{
      title: '主机IP',
      dataIndex: 'hostIp',
      key: 'hostIp',
    }, {
      title: '本机镜像种类数量',
      dataIndex: 'nodeMirrorCounts',
      key: 'nodeMirrorCounts',
    }, {
      title: '控制中心镜像种类数量',
      dataIndex: 'controlMirrorCounts',
      key: 'controlMirrorCounts',
    }, {
      title: '未更新镜像名称列表',
      dataIndex: 'notUpdateList',
      key: 'notUpdateList',
      render: record => {

        return <TagList data={record} maxCount={4}></TagList>
      }
    }, {
      title: '操作',
      key: 'interaction',
      render: records => {
        return <Button type="primary" onClick={this.getOnUpdateHandle(records)}>升级镜像</Button>
      }
    },
    ];
    const { loading } = this.state;
    const rowSelection = {
      onChange: this.onSelectChange,
    };

    const tableProps = {
      columns: columns,
      // rowSelection: rowSelection,
      dataSource: data.map((i, index) => {
        return {
          ...i,
          key: `${index}-item-${lastReqTime}`
        }
      }),
    }

    if (this.props.productType !== NODE) {
      tableProps.rowSelection = rowSelection
    }

    const paginationProps = {
      total: this.props.total,
      current: this.props.page,
      onChange: this.pageChangeHandler,
      pageSize: this.props.limit,
    };
    return (
      <div>
        <JoSpin spinning={this.props.loading}>

          <h4 className="line" className={classnames({ "lbl-dark": isDark })} style={{ marginBottom: "25px", marginTop: "50px" }}>蜜罐节点镜像状态</h4>
          <div style={{ overflow: "hidden" }}>
            {
              this.props.productType !== NODE
                ?
                <Button
                  type="primary"
                  onClick={this.start}
                  loading={this.props.updateNodeLoading}
                  disabled={this.state.selectedRows.length === 0}
                  style={{ float: "right", marginBottom: "20px" }}
                >
                  升级蜜罐节点镜像
                </Button>
                :
                null
            }


          </div>
          <EnhanciveTable key="table" tableProps={tableProps} paginationProps={paginationProps} rowSelection={rowSelection}> </EnhanciveTable>

        </JoSpin>
        <Modal
          width={"700px"}
          closable={!this.props.updateNodeLoading}
          maskClosable={false}
          title={"升级蜜罐节点镜像"}
          onCancel={() => this.state.result.length !== 0 ? this.onConfirm() : this.props.switchModal("nodeUpdate")}
          visible={this.props.modalVisible["nodeUpdate"]}
          footer={null}>
          {
            this.props.updateNodeLoading
              ?
              <p style={{ textAlign: "center" }} className={classnames({
                ["lbl-dark"]: isDark
              })}>
                <Icon type="loading"></Icon>&nbsp;
                正在升级...
              </p>
              :
              <NodeUpdateResultPanel
                onConfirm={this.onConfirm}
                data={this.state.result}>
              </NodeUpdateResultPanel>
          }
        </Modal>
      </div>
    )

  }
}

function mapStateToProps(state) {
  const { data, loading, page, limit, total } = state[NAMESPACE_NODE];
  return {
    data,
    loading: state.loading.effects[`${NAMESPACE_NODE}/fetch`],
    page,
    limit,
    total,
    isDark: state.layout.commonLayout.darkTheme,
    updateNodeLoading: state.loading.effects[`${OPERATION_NAMESPACE}/updateNodeMirror`],
    lastReqTime: state.lastEffectTime.effects[`${NAMESPACE_NODE}/fetch`],
    productType: state.user.productType.type,
    productInfo: state.user.productType,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    updateNodeMirror: payload => dispatch({
      type: `${OPERATION_NAMESPACE}/updateNodeMirror`,
      payload
    }),
    fetch: payload => dispatch({
      type: `${NAMESPACE_NODE}/fetch`,
      payload
    })
  }
}

export default connect(mapStateToProps, createMapDispatchWithPromise(mapDispatchToProps))(mirrornode);
