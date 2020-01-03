import * as React from 'react'
import extraConnect from 'domainUtils/extraConnect'
import WithCommonProps from 'domainComponents/WithCommonProps'
import WithAnimateRender from 'components/WithAnimateRender'
const styles = require("./styles.less")
import { USER_NAMESPACE } from 'constants/model'
import Spin from 'domainComponents/Spin'
import TimestampPicker from 'components/TimestampPicker'
import AddUser from './components/AddUser'
import {Icon, Button, Select, Pagination, Popconfirm, Input, message as Message} from 'antd'
import ComTable from 'components/ComTable'
import moment from 'moment'
const {Option} = Select

const mapStateToProps = state => {
  return {
    state,
    loading: state.loading.effects[`${USER_NAMESPACE}/fetchTable`]
  }
}
const mapDispatchToProps = dispatch => {
  return {
    fetchTable: payload => dispatch({
      type: `${USER_NAMESPACE}/fetchTable`,
      payload
    }),
    deleteUser: payload => dispatch({
      type: `${USER_NAMESPACE}/deleteUser`,
      payload
    }),
  }
}

@extraConnect(mapStateToProps, mapDispatchToProps)
@WithAnimateRender
@WithCommonProps
class Page extends React.Component<any, any> {

  state = {
    reqTable: {
      timestampRange:[],
      limit: 30,
      page: 1,
      accountName: '',
    },
    data: [],
    total: 0,
    popVisible: false,
    passwordType:"password"
  }
  getTable = () => {
    this.props.fetchTable(this.state.reqTable)
    .then(res => {
      const {total,data} = res
      this.setState({total,data})
    })
  }
  componentDidMount() {
    this.getTable()
  }
  handleSearch = () => {
    this.getTable()
  };
  getColumnSearchProps = (dataIndex,colunmName) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }} >
        <Input
          placeholder={`${colunmName}搜索`}
          value = {this.state.reqTable[dataIndex]}
          onChange = {e => {
            let reqTable =  { ...this.state.reqTable, [dataIndex] : e.target.value }
            this.setState({
              reqTable
            })
          }
          }
          onPressEnter={this.handleSearch}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={this.handleSearch}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          搜索
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
  });
  confirm = (id)=>{
    this.props.deleteUser({id})
    .then(_ => {
      Message.success('删除成功')
      this.getTable()
    })
  }
  initTable = () => {
    let reqTable = {...this.state.reqTable, page:1}
    this.setState({
      reqTable
    },()=>{
      this.getTable()
    })
  }
  handleChangeSelect = (value) => {
    let reqTable = {...this.state.reqTable, limit: value}
    this.setState({
      reqTable
    },()=>{
      this.initTable()
    })
  }
  timestampRangeOnChange = ({ timestampRange }) => {
    // let timeArr = timestampRange.map(el => {
    //   return moment(el, 'YYYY-MM-DD HH:mm:ss').valueOf()
    //   console.log(el)
    //   return el
    // })
    let reqTable = {...this.state.reqTable,timestampRange}
    this.setState({reqTable},()=>{
      this.initTable()
    })
  }
  closePop = ()=> {
    this.setState({
      popVisible: false
    })
  }
  openPop = ()=> {
    this.setState({
      popVisible: true
    })
  }
  changeType = () => {
    const {passwordType} = this.state
    if (passwordType === "password") {
      this.setState({passwordType:"text"})
    }else{
      this.setState({passwordType:"password"})
    }
  }
  pageChange = (page) => {
    let reqTable = {...this.state.reqTable, page}
    this.setState({
      reqTable
    },()=>{
      this.getTable()
    })
  }
  render() {
    const { loading } = this.props
    const {data, total, popVisible, passwordType} = this.state
    const dataSource = data.map((i,index) => {
      i.key = index + 1
      return i
    })
    const columns = [
      {
        title: '序号',
        dataIndex: 'key',
        align:'center',
        key:'key',
        sorter: (a, b) => a.key - b.key,
      },
      {
        title: '账号名称',
        dataIndex: 'accountName',
        align:'center',
        key:'accountName',
        ...this.getColumnSearchProps('accountName','账号名称')
      },
      {
        title:(
          <div>
            <span>账号密码</span>
            <span className={styles['password']} onClick = {this.changeType}></span>
          </div>
        ),
        dataIndex: 'accountPassword',
        align:'center',
        key:'accountPassword',
        render:(text, record) => {
          let paassword = record.accountPassword.replace(/\d/g,'*')
          return passwordType === "password" ? <div>{paassword}</div> : <div>{record.accountPassword}</div>
        }
      },
      {
        title: '用户类型',
        dataIndex: 'userType',
        align:'center',
        key:'userType',
        filters: [
          {
            text: '管理员',
            value: 1,
          },
          {
            text: '普通用户',
            value: 2,
          },
          {
            text: '权限用户',
            value: 3,
          }],
          onFilter: (value, record) => record.userType === value ? 1 : 0,
          render:(text, record) => {
            let userType = record.userType
            return <div>{ userType === 1 ? "管理员" : userType === 2 ? "普通用户" : "权限用户"}</div>
          }
      },
      {
        title: '添加时间',
        dataIndex: 'addTime',
        align:'center',
        key:'addTime',
        render: (text, record) => 
          <span>{moment(record.addTime).format("YYYY-MM-DD HH:mm:ss")}</span>
      },
      {
        title: '操作',
        dataIndex: 'delete',
        key: 'delete',
        render: (text, record) => 
          <Popconfirm
        title={`是否删除用户${record.accountName}`}
        onConfirm={_ => this.confirm(record.id)}
        okText="Yes"
        cancelText="No"
      >
        <a href="#">删除用户</a>
      </Popconfirm>
        
        
      }
    ]
    const { timestampRange } = this.state.reqTable
    
    return (
      <Spin spinning = {loading}>
        <div key = "user">
          <div className={styles['wrap']}>
            <div style={{width:300, marginRight:20}} className={styles["timestampPicker"]} key="timestampPicker"> <TimestampPicker onChange={this.timestampRangeOnChange} defaultValue={ timestampRange } ></TimestampPicker></div>,
            <div>
              <span style={{fontSize:14,marginRight:10}}>每页条数:</span>
              <Select defaultValue="30" style={{ width: 80 }} onChange={this.handleChangeSelect}>
                <Option value="10">10</Option>
                <Option value="15">15</Option>
                <Option value="20">20</Option>
                <Option value="30">30</Option>
                <Option value="50">50</Option>
              </Select>
            </div>
            <Button style={{marginLeft:400}} type='primary' onClick={this.openPop} >+添加新用户</Button>
          </div>
          <AddUser closePop = {this.closePop} popVisible={popVisible} getTable = {this.getTable} />
          <ComTable data = {dataSource} columns = {columns}/>
          <Pagination
            style={{marginTop: 20}}
            showTotal= {total => `共找到${total}个结果`}
            defaultCurrent={1}
            total={total}
            onChange = {this.pageChange}
          />
        </div>
      </Spin>   
    )
  }
}
export default Page;
