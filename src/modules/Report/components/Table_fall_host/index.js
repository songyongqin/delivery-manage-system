
import { connect } from 'dva';
import styles from './index.css';
import { Table, Input, Button, Icon, Pagination, Spin } from 'antd';
import { routerRedux } from 'dva/router';
import EnhanciveTable from '../../../../domainComponents/EnhanciveTable';
import JoSpin from '../../../../components/JoSpin';
import { WithContainerHeader, WithAnimateRender } from '../../../../components/HOSComponents'
import { NAMESPACE_FALL_HOST, VALUE_FALL_HOST } from '../../ConstConfig'
import classnames from 'classnames';
import TimesLabel from 'components/TimesLabel'
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
      type: `${NAMESPACE_FALL_HOST}/fetch`,
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
      fallhost:
      {
        limit: 10,
        page: 1
      }
    };
    this.props.dispatch({
      type: `${NAMESPACE_FALL_HOST}/onExport`,
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
      title: '失陷主机IP',
      dataIndex: 'ip',
      key: 'ip',
    }, {
      title: '攻击次数',
      dataIndex: 'attackCounts',
      key: 'attackCounts',
    }, {
      title: '攻击事件类型',
      dataIndex: 'attackEventType',
      key: 'attackEventType',
    }, {
      title: '攻击时间范围',
      dataIndex: 'attackTimes',
      key: 'attackTimes',
      render: (time) => {
        return <TimesLabel times={[time]}></TimesLabel>
      }
    }];
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
      total: this.props.total,
      current: this.props.page,
      onChange: this.pageChangeHandler,
      pageSize: this.props.limit,
    };

    return (
      <div>
        <JoSpin spinning={this.props.loading}>

          <h4 className={classnames({ "lbl-dark": isDark })} style={{ textAlign: "center", marginBottom: "25px", marginTop: "50px" }}>失陷主机</h4>
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
  const { data, loading, timestampRange, page, limit, total } = state[NAMESPACE_FALL_HOST];
  return {
    data,
    loading: state.loading.effects[`${NAMESPACE_FALL_HOST}/fetch`],
    timestampRange,
    page,
    limit,
    total,
    isDark: state.layout.commonLayout.darkTheme,
  };
}
export default connect(mapStateToProps)(Tableevent);
