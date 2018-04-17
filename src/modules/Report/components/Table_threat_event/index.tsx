
import { connect } from 'dva';
import styles from './index.css';
import { Table, Input, Button, Icon, Pagination, Spin } from 'antd';
import { routerRedux } from 'dva/router';
import EnhanciveTable from 'domainComponents/Table'
import JoSpin from 'domainComponents/Spin'
import * as React from 'react'
import { NAMESPACE_THREATEVENT } from '../../ConstConfig'
import classnames from 'classnames'
import TimesLabel from 'components/TimeLabel'
import JoTag from 'components/Tag'
// import { levelTextConfig, actionStatusTextConfig, attackStageTextConfig } from 'configs/ConstConfig'

const levelTextConfig = {}, actionStatusTextConfig = {}, attackStageTextConfig = {}

import { getKeyText } from 'utils'

class Tableevent extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  pageChangeHandler = (page) => {
    const { timestampRange, limit } = this.props;
    this.props.dispatch({
      type: `${NAMESPACE_THREATEVENT}/fetch`,
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
      threatEvent:
        {
          limit: 10,
          page,
          level: ["high", "middle", "low"]
        }
    };
    this.props.dispatch({
      type: `${NAMESPACE_THREATEVENT}/onExport`,
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
      title: '攻击阶段',
      dataIndex: 'attackStage',
      key: 'attackStage',
      render: (record) => {
        return getKeyText(record, attackStageTextConfig)
      }
    }, {
      title: '行为',
      dataIndex: 'action',
      key: 'action',
    }, {
      title: '威胁等级',
      dataIndex: 'level',
      key: 'level',
      render: (record) => {
        return getKeyText(record, levelTextConfig)
      }
    }, {
      title: '攻击状态',
      dataIndex: 'actionStatus',
      key: 'actionStatus',
      render: (record) => {
        return getKeyText(record, actionStatusTextConfig)
      }

    }, {
      title: '威胁描述',
      dataIndex: 'description',
      key: 'description',
      render: value => {

        const color = "#108ee9";

        try {
          return <div>
            {
              value.map((i, index) => {
                return <div key={`${index}-des`}
                  style={{ marginBottom: "8px" }}>
                  <JoTag color={color}>
                    {i}
                  </JoTag>
                </div>
              })
            }
          </div>
        } catch (e) {
          console.info(e);
        }
      },
    }, {
      title: '次数',
      dataIndex: 'counts',
      key: 'counts',
    }, {
      title: '攻击时间',
      dataIndex: 'attackTimes',
      key: 'attackTimes',
      render: (time) => {
        return <TimesLabel value={time}></TimesLabel>
      }
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
      total: this.props.total,
      current: this.props.page,
      onChange: this.pageChangeHandler,
      pageSize: this.props.limit,
    };
    return (
      <div>
        <JoSpin spinning={this.props.loading}>

          <h4 className={classnames({ "lbl-dark": isDark })} style={{ textAlign: "center", marginBottom: "25px", marginTop: "30px" }}>威胁事件</h4>
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
  const { data, loading, timestampRange, page, limit, total } = state[NAMESPACE_THREATEVENT];
  return {
    data,
    loading: state.loading.effects[`${NAMESPACE_THREATEVENT}/fetch`],
    timestampRange,
    page,
    limit,
    total,
    isDark: false,
    productType: "standAlone",
  };
}
export default connect(mapStateToProps)(Tableevent);
