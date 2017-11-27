
import { connect } from 'dva';
import { Table, Input, Button, Icon, Pagination, Spin } from 'antd';
import { routerRedux } from 'dva/router';
import EnhanciveTable from '../../../../domainComponents/EnhanciveTable';
import JoSpin from '../../../../components/JoSpin';
import { WithContainerHeader, WithAnimateRender } from '../../../../components/HOSComponents'
import { NAMESPACE } from '../../ConstConfig'
import classnames from 'classnames'
import styles from './index.css'

@WithAnimateRender
class mirrorsummary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  pageChangeHandler = (page) => {
    const { limit } = this.props;
    this.props.dispatch({
      type: `${NAMESPACE}/fetch`,
      payload:
      {
        page,
        limit,
      }
    })
  }
  render() {
    const data = this.props.data;
    const { isDark } = this.props;
    const columns = [{
      title: '镜像ID',
      dataIndex: 'id',
      key: 'id',
    }, {
      title: '镜像名称',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '镜像种类',
      dataIndex: 'type',
      key: 'type',
    }, {
      title: '操作系统',
      dataIndex: 'sys',
      key: 'sys',
    }, {
      title: '交互程度',
      dataIndex: 'interaction',
      key: 'interaction',
    }, {
      title: '镜像版本',
      dataIndex: 'version',
      key: 'version',
    }, {
      title: '镜像MD5',
      dataIndex: 'md5',
      key: 'md5',
    }, {
      title: '服务类型',
      dataIndex: 'seviceType',
      key: 'seviceType',
    }, {
      title: '属性',
      dataIndex: 'props',
      key: 'props',
    }, {
      title: '依赖版本',
      dataIndex: 'dependVersion',
      key: 'dependVersion',
    }, {
      title: '镜像大小',
      dataIndex: 'size',
      key: 'size',
    }, {
      title: '创建时间',
      dataIndex: 'creatTime',
      key: 'creatTime',
    }, {
      title: '详情',
      dataIndex: '',
      key: 'c',
      render: () => {
        return "+"
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

          <h4 className="line" className={classnames({ "lbl-dark": isDark })} style={{ marginBottom: "25px", marginTop: "30px" }}>镜像汇总</h4>

          <EnhanciveTable key="table" tableProps={tableProps} paginationProps={paginationProps}> </EnhanciveTable>

        </JoSpin>

      </div>
    )

  }
}

function mapStateToProps(state) {
  const { data, loading, page, limit, total } = state[NAMESPACE];
  return {
    data,
    loading: state.loading.effects[`${NAMESPACE}/fetch`],
    page,
    limit,
    total,
    isDark: state.layout.commonLayout.darkTheme,
  };
}
export default connect(mapStateToProps)(mirrorsummary);
