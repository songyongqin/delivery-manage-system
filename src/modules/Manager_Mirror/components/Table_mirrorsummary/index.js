
import { connect } from 'dva';
import { Table, Input, Button, Icon, Pagination, Spin, Modal, Collapse,Tooltip } from 'antd';
import { routerRedux } from 'dva/router';
import EnhanciveTable from '../../../../domainComponents/EnhanciveTable';
import JoSpin from '../../../../components/JoSpin';
import { WithContainerHeader, WithAnimateRender } from '../../../../components/HOSComponents'
import { NAMESPACE_SUMMARY } from '../../ConstConfig'
import classnames from 'classnames'
import styles from './index.css'
import TimesLabel from '../../../../components/TimesLabel'
import JoTag from '../../../../components/JoTag'
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
        const services=record.services;
        const port=record.port;
        return <div>
        <div style={{width:"100%"}}>
         <h4 className={classnames({["lbl-dark"]: this.props.isDark})} style={{ float: "left",width:"10%",marginTop:"10px" }}>支持的服务</h4>
               <ul style={{width:"90%",float:"left"}}>              
                 {services.map((n,index)=>{
                   return <li key={`${index}-item`} style={{ float: "left",marginRight:"20px",marginTop:"10px" }}><JoTag>{n}</JoTag></li>
                 })}
                       
               </ul>
        </div>
        <div style={{width:"100%"}}>
               <h4 className={classnames({["lbl-dark"]: this.props.isDark})} style={{ float: "left",width:"10%",marginTop:"10px" }}>支持的端口</h4>
               <ul style={{width:"90%",float:"left",marginTop:"20px"}}>
                 {port.map((n,index)=>{
                   return <li key={`${index}-n`} style={{ float: "left",marginRight:"20px",marginTop:"10px" }}><JoTag>{n}</JoTag></li>
                 })}
               </ul>
        </div>     
        </div>
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
