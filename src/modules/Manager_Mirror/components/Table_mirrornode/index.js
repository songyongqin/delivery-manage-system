
import { connect } from 'dva';
import { Table, Input, Button, Icon, Pagination, Spin, Modal, Collapse } from 'antd';
import { routerRedux } from 'dva/router';
import EnhanciveTable from '../../../../domainComponents/EnhanciveTable';
import JoSpin from '../../../../components/JoSpin';
import { WithContainerHeader, WithAnimateRender } from '../../../../components/HOSComponents'
import { NAMESPACE_NODE } from '../../ConstConfig'
import classnames from 'classnames'
import styles from './index.css'
import TagList from 'components/TagList'
import JoTag from 'components/JoTag'
const Panel = Collapse.Panel;
@WithAnimateRender
class mirrornode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [],
      loading: false,
    };
  }
  start = () => {
    this.setState({ loading: true });
    // ajax request after empty completing
    setTimeout(() => {
      this.setState({
        selectedRowKeys: [],
        loading: false,
      });
    }, 1000);
  }
  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
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
    const { isDark } = this.props;
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
      render:record=>{

        return <TagList data={record} maxCount={4}></TagList>
      }
    }, {
      title: '操作',
      dataIndex: 'interaction',
      key: 'interaction',
      render: () => {
        return <Button type="primary">升级镜像</Button>
      }
    },
    ];
    const { loading, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    const tableProps = {
      columns: columns,
      rowSelection: rowSelection,
      dataSource: data.map((i, index) => {
        return {
          ...i,
          key: `${index}-item`
        }
      }),
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
          <div style={{overflow: "hidden" }}>
            <Button
              type="primary"
              onClick={this.start}
              loading={loading}
              style={{ float: "right",marginBottom:"20px" }}
            >
              升级蜜罐节点镜像
          </Button>
          </div>
          <EnhanciveTable key="table" tableProps={tableProps} paginationProps={paginationProps} rowSelection={rowSelection}> </EnhanciveTable>

        </JoSpin>

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
  };
}
export default connect(mapStateToProps)(mirrornode);
