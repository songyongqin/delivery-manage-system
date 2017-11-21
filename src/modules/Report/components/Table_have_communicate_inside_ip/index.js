
import { connect } from 'dva';
import styles from './index.css';
import { Table, Input, Button, Icon, Pagination, Spin } from 'antd';
import { routerRedux } from 'dva/router';
import EnhanciveTable from '../../../../domainComponents/EnhanciveTable';
import JoSpin from '../../../../components/JoSpin';
import { WithContainerHeader, WithAnimateRender } from '../../../../components/HOSComponents'
import { NAMESPACE_HAVECOMMUNICATEINSIDEIP } from '../../ConstConfig'

@WithAnimateRender
class Tableevent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  pageChangeHandler = (page) => {
    const { timestampRange, limit } = this.props;
    this.props.dispatch({
      type: `${NAMESPACE_HAVECOMMUNICATEINSIDEIP}/fetch`,
      payload:
      {
        page,
        limit,
        timestampRange

      }
    })
  }
  onExport = () => {

    const { timestampRange } = this.props;
    const option = {
      havecommunicateinsideip:
      {
        limit: 10,
        page: 1
      }
    };
    this.props.dispatch({
      type: `${NAMESPACE_HAVECOMMUNICATEINSIDEIP}/onExport`,
      payload:
      {
        option,
        timestampRange
      }
    });
  }
  render() {
    const data = this.props.data;
    const columns = [
      {
        title: '序号',
        dataIndex: 'key',
        key: 'key',
      },
      {
        title: '时间',
        dataIndex: 'time',
        key: 'time',
      },
      {
        title: '有通讯记录的内网IP',
        dataIndex: 'ip',
        key: 'ip',
      }];
    const tableProps = {
      columns: columns,
      dataSource: data.map((i, index) => {
        return {
          ...i,
          key: `${index}`
        }
      }),
    }
    const paginationProps = {
      total: 500,
      current: this.props.page,
      onChange: this.pageChangeHandler,
      pageSize: this.props.limit,
    };
    const title = "有通讯记录的内网IP"

    return (
      <div>
        <JoSpin spinning={this.props.loading}>
          <h4 style={{ textAlign: "center", marginBottom: "25px", marginTop: "50px" }}>有通讯记录的内网IP</h4>
          <div style={{ position: "absolute", top: "0px", right: "0px" }} >
            <Button type="primary" onClick={this.onExport}>导出</Button>
          </div>
          <EnhanciveTable key="table" tableProps={tableProps} paginationProps={paginationProps}> </EnhanciveTable>
        </JoSpin>

      </div>
    )

  }
}

function mapStateToProps(state) {
  const { data, loading, timestampRange, page, limit } = state[NAMESPACE_HAVECOMMUNICATEINSIDEIP];
  return {
    data,
    loading: state.loading.effects[`${NAMESPACE_HAVECOMMUNICATEINSIDEIP}/fetch`],
    timestampRange,
    page,
    limit,
  };
}
export default connect(mapStateToProps)(Tableevent);
