
import { connect } from 'dva';
import styles from './index.css';
import { Table, Input, Button, Icon, Pagination, Spin } from 'antd';
import { routerRedux } from 'dva/router';
import EnhanciveTable from 'domainComponents/Table'
import JoSpin from 'domainComponents/Spin'
import * as React from 'react'
import { NAMESPACE_HAVECOMMUNICATEINSIDEIP } from '../../ConstConfig'
import classnames from 'classnames';
import TimesLabel from 'components/TimeLabel'

class Tableevent extends React.Component<any, any> {
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

    const { timestampRange, page } = this.props;
    const option = {
      havecommunicateinsideip:
        {
          limit: 10,
          page
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
      total: this.props.total,
      current: this.props.page,
      onChange: this.pageChangeHandler,
      pageSize: this.props.limit,
    };

    return (
      <div>
        <JoSpin spinning={this.props.loading}>
          <h4 className={classnames({ "lbl-dark": isDark })} style={{ textAlign: "center", marginBottom: "25px", marginTop: "50px" }}>有通讯记录的内网IP</h4>
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
  const { data, loading, timestampRange, page, limit, total } = state[NAMESPACE_HAVECOMMUNICATEINSIDEIP];
  return {
    data,
    loading: state.loading.effects[`${NAMESPACE_HAVECOMMUNICATEINSIDEIP}/fetch`],
    timestampRange,
    page,
    total,
    limit,
    isDark: false,
    productType: "standAlone",
  };
}
export default connect(mapStateToProps)(Tableevent);