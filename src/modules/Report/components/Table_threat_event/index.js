
import { connect } from 'dva';
import styles from './index.css';
import { Table, Input, Button, Icon, Pagination, Spin } from 'antd';
import { routerRedux } from 'dva/router';
import EnhanciveTable from '../../components/EnhanciveTable'
import JoSpin from '../../../../components/JoSpin';
import { WithContainerHeader, WithAnimateRender } from '../../../../components/HOSComponents'
import { NAMESPACE_THREATEVENT } from '../../ConstConfig'

@WithAnimateRender
class Tableevent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  pageChangeHandler = (page) => {
    this.props.dispatch({
      type: `${NAMESPACE_THREATEVENT}/fetch`,
      payload:
      { page }
    })
  }
  onExport = () => {

    const { timestampRange, exportdata } = this.props;
    this.props.dispatch({
      type: `${NAMESPACE_THREATEVENT}/onExport`,
      payload:
      {
        exportdata,
        timestampRange
      }
    });
  }
  render() {
    const data = this.props.data;
    const columns = [{
      title: '攻击阶段',
      dataIndex: 'attackStage',
      key: 'attackStage',
    }, {
      title: '行为',
      dataIndex: 'action',
      key: 'action',
    }, {
      title: '威胁等级',
      dataIndex: 'level',
      key: 'level',
    }, {
      title: '攻击状态',
      dataIndex: 'actionStatus',
      key: 'actionStatus',
    }, {
      title: '威胁描述',
      dataIndex: 'description',
      key: 'description',
    }, {
      title: '次数',
      dataIndex: 'counts',
      key: 'counts',
    }, {
      title: '攻击时间',
      dataIndex: 'attackTimes',
      key: 'attackTimes',
    },];
    const tableProps = {
      columns: columns,
      dataSource: data.map((i, index) => {
        return {
          ...i,
          key: `${index}-item`
        }
      }),
    }
    const paginationProps = {
      total: 500,
      current: this.props.page,
      onChange: this.pageChangeHandler,
      pageSize: this.props.limit,
    };
    const title = ["二、事件报告", "威胁事件"]

    return (
      <div>
        <JoSpin spinning={this.props.loading}>
          {
            this.props.animateRender([
              <EnhanciveTable key="table" tableProps={tableProps} paginationProps={paginationProps} title={title}> </EnhanciveTable>,
              <div key="operation-panel" style={{ position: "absolute", top: "40px", right: "0px" }} >
                <Button type="primary" onClick={this.onExport}>导出</Button>
              </div>
            ])
          }
        </JoSpin>

      </div>
    )

  }
}

function mapStateToProps(state) {
  const { data, loading, timestampRange, page, limit, exportdata } = state[NAMESPACE_THREATEVENT];

  return {
    data,
    loading: state.loading.effects[`${NAMESPACE_THREATEVENT}/fetch`],
    timestampRange,
    page,
    limit,
    exportdata
  };
}
export default connect(mapStateToProps)(Tableevent);
