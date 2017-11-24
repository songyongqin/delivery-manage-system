
import { connect } from 'dva';
import styles from './index.css';
import { Table, Input, Button, Icon, Pagination, Spin } from 'antd';
import { routerRedux } from 'dva/router';
import EnhanciveTable from '../../../../domainComponents/EnhanciveTable';
import JoSpin from '../../../../components/JoSpin';
import { WithContainerHeader, WithAnimateRender } from '../../../../components/HOSComponents'
import { NAMESPACE_SUFFERHOSTCALLONRECORD } from '../../ConstConfig'
import classnames from 'classnames';
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
      type: `${NAMESPACE_SUFFERHOSTCALLONRECORD}/fetch`,
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
      sufferhostcallonrecord:
      {
        limit: 10,
        page: 1
      }
    };
    this.props.dispatch({
      type: `${NAMESPACE_SUFFERHOSTCALLONRECORD}/onExport`,
      payload:
      {
        option,
        timestampRange
      }
    });
  }
  render() {
    const data = this.props.data;
    const { isDark } = this.props;
    const columns = [{
      title: '序号',
      dataIndex: 'key',
      key: 'key',
    }, {
      title: '时间',
      dataIndex: 'time',
      key: 'time',
    }, {
      title: '内网受害主机',
      dataIndex: 'insideSufferHostIP',
      key: 'insideSufferHostIP',
    }, {
      title: '访问的恶意域名/IP',
      dataIndex: 'malCallOnRecord',
      key: 'malCallOnRecord',
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
      total: this.props.total,
      current: this.props.page,
      onChange: this.pageChangeHandler,
      pageSize: this.props.limit,
    };

    return (
      <div>
        <JoSpin spinning={this.props.loading}>
          <h4 className={classnames({ "lbl-dark": isDark })} style={{ textAlign: "center", marginBottom: "25px", marginTop: "50px" }}>内网受害主机访问外网恶意域名/IP</h4>
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
  const { data, loading, timestampRange, page, limit, total } = state[NAMESPACE_SUFFERHOSTCALLONRECORD];
  return {
    data,
    loading: state.loading.effects[`${NAMESPACE_SUFFERHOSTCALLONRECORD}/fetch`],
    timestampRange,
    page,
    limit,
    total,
    isDark: state.layout.commonLayout.darkTheme,
  };
}
export default connect(mapStateToProps)(Tableevent);
