
import { connect } from 'dva';
import styles from './index.css';
import { Table, Input, Button, Icon, Pagination, Spin } from 'antd';
import { routerRedux } from 'dva/router';
import EnhanciveTable from '../../components/EnhanciveTable'
import JoSpin from '../../../../components/JoSpin';
import { WithContainerHeader, WithAnimateRender } from '../../../../components/HOSComponents'
import { MAMESPACE_CALL_ON_IP } from '../../ConstConfig'

@WithAnimateRender
class Tableevent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  pageChangeHandler = (page) => {
    this.props.dispatch({
      type: `${MAMESPACE_CALL_ON_IP}/fetch`,
      payload:
      { page }
    })

  }
  onExport = () => {

    const { timestampRange, exportdata } = this.props;
    this.props.dispatch({
      type: `${MAMESPACE_CALL_ON_IP}/onExport`,
      payload:
      {
        exportdata,
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
        title: '访问的外网IP',
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
    const title = "访问的外网IP"

    return (
      <div>
        <JoSpin spinning={this.props.loading}>
          {
            this.props.animateRender([
              <EnhanciveTable key="table" tableProps={tableProps} paginationProps={paginationProps} title={title}> </EnhanciveTable>,
              <div key="operation-panel" style={{ position: "absolute", top: "0px", right: "0px" }} >
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
  const { data, loading, timestampRange, page, limit, exportdata } = state[MAMESPACE_CALL_ON_IP];
  return {
    data,
    loading: state.loading.effects[`${MAMESPACE_CALL_ON_IP}/fetch`],
    timestampRange,
    page,
    limit,
    exportdata
  };
}
export default connect(mapStateToProps)(Tableevent);
