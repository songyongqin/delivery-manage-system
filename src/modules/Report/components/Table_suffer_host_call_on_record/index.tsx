
import { connect } from 'dva';
import styles from './index.css';
import { Table, Input, Button, Icon, Pagination, Spin } from 'antd';
import { routerRedux } from 'dva/router';
import EnhanciveTable from 'domainComponents/Table'
import JoSpin from 'domainComponents/Spin'
import * as React from 'react'
import TimesLabel from 'components/TimeLabel'

import { NAMESPACE_SUFFERHOSTCALLONRECORD } from '../../ConstConfig'
import classnames from 'classnames';

class Tableevent extends React.Component<any, any> {
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

    const { timestampRange, page } = this.props;
    const option = {
      sufferhostcallonrecord:
        {
          limit: 10,
          page
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
    const { isDark, page, limit } = this.props;
    const columns = [{
      title: '序号',
      dataIndex: 'key',
      key: 'key',
      render: (key, record) => {
        const key_ = ((page - 1) * limit) + (++key)
        return key_
      }
    }, {
      title: '时间',
      dataIndex: 'time',
      key: 'time',
      render: (time) => {
        return <TimesLabel value={time}></TimesLabel>
      }
    }, {
      title: '内网受害主机',
      dataIndex: 'insideSufferHostIP',
      key: 'insideSufferHostIP',
    }, {
      title: '访问的恶意IP',
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
          <h4 className={classnames({ "lbl-dark": isDark })} style={{ textAlign: "center", marginBottom: "25px", marginTop: "50px" }}>内网受害主机访问外网恶意IP</h4>
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
    isDark: false,
    productType: "standAlone",
  };
}
export default connect(mapStateToProps)(Tableevent);
