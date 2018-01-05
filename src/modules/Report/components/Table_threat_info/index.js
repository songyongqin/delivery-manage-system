
import { connect } from 'dva';
import styles from './index.css';
import { Table, Input, Button, Icon, Pagination, Spin } from 'antd';
import { routerRedux } from 'dva/router';
import EnhanciveTable from '../../../../domainComponents/EnhanciveTable';
import JoSpin from '../../../../components/JoSpin';
import { WithContainerHeader, WithAnimateRender } from '../../../../components/HOSComponents'
import { NAMESPACE_THREATINFO } from '../../ConstConfig'
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
      type: `${NAMESPACE_THREATINFO}/fetch`,
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
      threatinfo:
      {
        limit: 10,
        page
      }
    };
    this.props.dispatch({
      type: `${NAMESPACE_THREATINFO}/onExport`,
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
      title: '威胁类型',
      dataIndex: 'threatType',
      key: 'threatType',
    }, {
      title: '情报特征',
      dataIndex: 'feature',
      key: 'feature',
    }, {
      title: '威胁名称',
      dataIndex: 'threatName',
      key: 'threatName',
    }, {
      title: '特征准确度',
      dataIndex: 'accuracy',
      key: 'accuracy',
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
          <h4 className={classnames({ "lbl-dark": isDark })} style={{ textAlign: "center", marginBottom: "25px", marginTop: "50px" }}>威胁情报</h4>
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
  const { data, loading, timestampRange, page, limit, total } = state[NAMESPACE_THREATINFO];
  return {
    data,
    loading: state.loading.effects[`${NAMESPACE_THREATINFO}/fetch`],
    timestampRange,
    page,
    limit,
    total,
    isDark: state.layout.commonLayout.darkTheme,
  };
}
export default connect(mapStateToProps)(Tableevent);
