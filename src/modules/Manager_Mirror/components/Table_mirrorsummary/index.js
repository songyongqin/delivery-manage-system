
import { connect } from 'dva';
import { Table, Input, Button, Icon, Pagination, Spin, Modal, Collapse, Tooltip,Popover } from 'antd';
import { routerRedux } from 'dva/router';
import EnhanciveTable from '../../../../domainComponents/EnhanciveTable';
import JoSpin from '../../../../components/JoSpin';
import { WithContainerHeader, WithAnimateRender } from '../../../../components/HOSComponents'
import { NAMESPACE_SUMMARY } from '../../ConstConfig'
import classnames from 'classnames'
import styles from './index.css'
import TimesLabel from '../../../../components/TimesLabel'
import JoTag from '../../../../components/JoTag'
import TagList from 'components/TagList'
const Panel = Collapse.Panel;
@WithAnimateRender
class mirrorsummary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  callback = (key) => {
    console.log(key);
  }
  pageChangeHandler = (page) => {
    const { limit } = this.props;
    this.props.dispatch({
      type: `${NAMESPACE_SUMMARY}/fetch`,
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
      render:record=>{
        return record>=1024?(record/1024.0).toFixed(1)+"G":record+"Mb"
      }
    }, {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render: value => {
        return <TimesLabel times={[value]}></TimesLabel>
      }
    },
    ];




    const tableProps = {
      columns: columns,
      expandedRowRender:
      record => {
        const services = record.services;
        const port = record.port;
        return <table>
          <tbody>
          <tr>
            <td style={{ width: "10%" }}>支持的服务</td>
            <td>          
            <TagList data={services} maxCount={8}></TagList>
            </td>
          </tr>
          <tr>
            <td>支持的端口</td>
            <td>          
            <TagList data={port} maxCount={8}></TagList>
            </td>
          </tr>
          </tbody>
        </table>
      },
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
          <EnhanciveTable key="table" tableProps={tableProps} paginationProps={paginationProps}> </EnhanciveTable>

        </JoSpin>

      </div>
    )

  }
}

function mapStateToProps(state) {
  const { data, loading, page, limit, total } = state[NAMESPACE_SUMMARY];
  return {
    data,
    loading: state.loading.effects[`${NAMESPACE_SUMMARY}/fetch`],
    page,
    limit,
    total,
    isDark: state.layout.commonLayout.darkTheme,
  };
}
export default connect(mapStateToProps)(mirrorsummary);
