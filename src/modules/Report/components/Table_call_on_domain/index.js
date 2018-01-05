
import { connect } from 'dva';
import styles from './index.css';
import { Table, Input, Button, Icon, Pagination, Spin } from 'antd';
import { routerRedux } from 'dva/router';
import EnhanciveTable from '../../../../domainComponents/EnhanciveTable';
import JoSpin from '../../../../components/JoSpin';
import { WithContainerHeader, WithAnimateRender } from '../../../../components/HOSComponents'
import { NAMESPACE_CALL_ON_DOMAIN } from '../../ConstConfig'
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
    this.props.fetch({
      page,
      limit,
      timestampRange

    })
  }
  onExport = () => {
    const { timestampRange, page } = this.props;
    const option = {
      callondomain:
      {
        limit: 10,
        page
      }
    }
    this.props.onExport({ option, timestampRange })
  }
  render() {
    const data = this.props.data;
    const { isDark } = this.props;
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
        render: (time) => {
          return <TimesLabel times={[time]}></TimesLabel>
        }

      },
      {
        title: '访问的域名',
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
          <h4 className={classnames({ "lbl-dark": isDark })} style={{ textAlign: "center", marginBottom: "25px", marginTop: "50px" }}>访问的域名</h4>
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
  const { data, loading, timestampRange, page, limit, total } = state[NAMESPACE_CALL_ON_DOMAIN];
  return {
    data,
    loading: state.loading.effects[`${NAMESPACE_CALL_ON_DOMAIN}/fetch`],
    timestampRange,
    page,
    limit,
    total,
    isDark: state.layout.commonLayout.darkTheme,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    fetch: payload => dispatch({
      type: `${NAMESPACE_CALL_ON_DOMAIN}/fetch`,
      payload,
    }),
    onExport: payload => dispatch({
      type: `${NAMESPACE_CALL_ON_DOMAIN}/onExport`,
      payload,
    })

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Tableevent);

