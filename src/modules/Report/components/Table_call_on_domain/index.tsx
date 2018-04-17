
import { connect } from 'dva';
import styles from './index.css';
import { Table, Input, Button, Icon, Pagination, Spin } from 'antd';
import { routerRedux } from 'dva/router';
import BarChart from 'domainComponents/BarCharts'
import EnhanciveTable from 'domainComponents/Table'
import JoSpin from 'domainComponents/Spin'
import { NAMESPACE_CALL_ON_DOMAIN } from '../../ConstConfig'
import classnames from 'classnames';
import TimesLabel from 'components/TimeLabel'
import Tooltip_ from '../Tooltip_'
import { TOOLTIP_TITLE_DOMAIN } from '../../ConstConfig'
import * as React from 'react'

class Tableevent extends React.Component<any, any> {
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
    const { isDark, page, limit } = this.props;
    const columns = [
      {
        title: '序号',
        dataIndex: 'key',
        key: 'key',
        render: (key, record) => {
          const key_ = ((page - 1) * limit) + (++key)
          return key_
        }
      },
      {
        title: '时间',
        dataIndex: 'time',
        key: 'time',
        render: (time) => {
          return <TimesLabel value={time}></TimesLabel>
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
            <Tooltip_ title={TOOLTIP_TITLE_DOMAIN} placement="left">
              <Button type="primary" onClick={this.onExport}>导出</Button>
            </Tooltip_>
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
    isDark: false,
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

