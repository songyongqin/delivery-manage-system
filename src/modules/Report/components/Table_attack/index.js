
import { connect } from 'dva';
import * as moment from 'moment';
import styles from './index.css';
import { Table, Input, Button, Icon, Pagination, Spin } from 'antd';
import { routerRedux } from 'dva/router';
import EnhanciveTable from '../../../../domainComponents/EnhanciveTable';
import Modal from '../../../../domainComponents/Modal';
import JoSpin from '../../../../components/JoSpin';
import { WithContainerHeader, WithAnimateRender } from '../../../../components/HOSComponents';
import classnames from 'classnames';
import { NAMESPACE_ATTACK } from '../../ConstConfig'
class Tableattack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      loading: false,
      indeterminate: true,
      checkAll: false,
      checkedListNew: []
    };
  }
  onExport = () => {
    const { timestampRange } = this.props;
    const option = { eventStatistic: 1 }
    this.props.dispatch({
      type: `${NAMESPACE_ATTACK}/onExport`,
      payload:
      {
        option,
        timestampRange
      }
    });
  }
  render() {
    const data = this.props.data;
    const { timestampRange, isDark, productType } = this.props;
    const columns = [{
      title: '攻击次数',
      dataIndex: 'attackCount',
      key: 'attackCount',
    }, {
      title: '攻击成功事件',
      dataIndex: 'attackSucessEvent',
      key: 'attackSucessEvent',
    }, {
      title: '攻击高危事件',
      dataIndex: 'attackHighLevelEvent',
      key: 'attackHighLevelEvent',
    }, {
      title: '攻击武器',
      dataIndex: 'tool',
      key: 'tool',
    }, {
      title: '失陷主机',
      dataIndex: 'fallHost',
      key: 'fallHost',
    }, {
      title: '威胁情报',
      dataIndex: 'threatInfo',
      key: 'threatInfo',
    }, {
      title: '攻击链',
      dataIndex: 'attackChain',
      key: 'attackChain',
    },];
    const dataSource = [{
      key: '1',
      attackCount: data.attackCount + "次",
      attackSucessEvent: data.attackSucessEvent + "起",
      attackHighLevelEvent: data.attackHighLevelEvent + "起",
      tool: data.tool + "个",
      fallHost: data.fallHost + "个",
      threatInfo: data.threatInfo + "条",
      attackChain: data.attackChain + "条",
    }]
    const tableProps = {
      columns: columns,
      dataSource: dataSource,
      pagination: false
    }

    const paginationProps = false;
    return (
      <div>
        <JoSpin spinning={this.props.loading}>
          <div style={{ height: "40px" }} >
            <Button style={{ float: "right" }} type="primary" onClick={this.onExport}>导出</Button>
          </div>
          <EnhanciveTable key="table" tableProps={tableProps} pagination={false}> </EnhanciveTable>

        </JoSpin>

      </div>
    )

  }

}

function mapStateToProps(state) {
  const { data, loading, timestampRange } = state[NAMESPACE_ATTACK];

  return {
    data,
    loading: state.loading.effects[`${NAMESPACE_ATTACK}/fetch`],
    timestampRange,
    isDark: state.layout.commonLayout.darkTheme,
    productType: state.user.productType.type,
  };
}



export default connect(mapStateToProps)(Tableattack);
