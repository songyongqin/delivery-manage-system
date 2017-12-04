
import { connect } from 'dva';
import styles from './index.css';
import { Table, Input, Button, Icon, Pagination, Spin } from 'antd';
import { routerRedux } from 'dva/router';
import EnhanciveTable from '../../../../domainComponents/EnhanciveTable';
import JoSpin from '../../../../components/JoSpin';
import { WithContainerHeader, WithAnimateRender } from '../../../../components/HOSComponents'
import { NAMESPACE_MALDOMAIN } from '../../ConstConfig'
import TimesLabel from 'components/TimesLabel'
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
      type: `${NAMESPACE_MALDOMAIN}/fetch`,
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
      maldomain:
      {
        limit: 10,
        page: 1
      }
    };
    this.props.dispatch({
      type: `${NAMESPACE_MALDOMAIN}/onExport`,
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
      render: (time) => {
        return <TimesLabel times={[time]}></TimesLabel>
      }
    }, {
      title: '恶意域名',
      dataIndex: 'domain',
      key: 'domain',
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
          <h4 className={classnames({ "lbl-dark": isDark })} style={{ textAlign: "center", marginBottom: "25px", marginTop: "50px" }}>恶意域名</h4>
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
  const { data, loading, timestampRange, page, limit, total } = state[NAMESPACE_MALDOMAIN];
  return {
    data,
    loading: state.loading.effects[`${NAMESPACE_MALDOMAIN}/fetch`],
    timestampRange,
    page,
    total,
    limit,
    isDark: state.layout.commonLayout.darkTheme,
  };
}
export default connect(mapStateToProps)(Tableevent);
