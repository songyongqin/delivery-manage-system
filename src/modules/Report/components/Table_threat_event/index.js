
import { connect } from 'dva';
import styles from './index.css';
import { Table, Input, Button, Icon, Pagination, Spin } from 'antd';
import { routerRedux } from 'dva/router';
import EnhanciveTable from '../../../../domainComponents/EnhanciveTable';
import JoSpin from '../../../../components/JoSpin';
import { WithContainerHeader, WithAnimateRender } from '../../../../components/HOSComponents'
import { NAMESPACE_THREATEVENT } from '../../ConstConfig'
import classnames from 'classnames'
import TimesLabel from 'components/TimesLabel'
import { levelTextConfig, actionStatusTextConfig, attackStageTextConfig } from 'configs/ConstConfig'
import { getKeyText } from 'utils/tools'

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

    const { timestampRange } = this.props;
    const option = {
      threatEvent:
      {
        limit: 10,
        page: 1,
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
    }, {
      title: '次数',
      dataIndex: 'counts',
      key: 'counts',
    }, {
      title: '攻击时间',
      dataIndex: 'attackTimes',
      key: 'attackTimes',
      render: (time) => {
        return <TimesLabel times={time}></TimesLabel>
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
    isDark: state.layout.commonLayout.darkTheme,
  };
}
export default connect(mapStateToProps)(Tableevent);
