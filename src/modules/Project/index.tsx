import * as React from 'react'
import extraConnect from 'domainUtils/extraConnect'
import WithCommonProps from 'domainComponents/WithCommonProps'
import WithAnimateRender from 'components/WithAnimateRender'
const styles = require("./styles.less")
import { PROJECT_NAMESPACE } from 'constants/model'
import TimestampPicker from 'components/TimestampPicker'
import Spin from 'domainComponents/Spin'
import {Table, Col,Icon, Button, Select, Pagination, Popconfirm, Input, message as Message, Tooltip} from 'antd'
import moment from 'moment'
const {Option} = Select
import AddProject from './components/AddProject'
import ComTable from 'components/ComTable'


const mapStateToProps = state => {
  return {
    state,
    loading: state.loading.effects[`${PROJECT_NAMESPACE}/fetchTable`]
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchTable: payload => dispatch({
      type: `${PROJECT_NAMESPACE}/fetchTable`,
      payload
    })
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
      proName: '',
      cusName: '',
      prpMsg:''
    },
    data: [],
    total: 0,
    popVisible:false
  }
  componentDidMount() {
    this.getTable()
  }
  timestampRangeOnChange = ({ timestampRange }) => {
    let timeArr = timestampRange.map(el => {
      return moment(el, 'YYYY-MM-DD HH:mm:ss').valueOf();
    })
    let reqTable = {...this.state.reqTable,timestampRange:timeArr}
    this.setState({reqTable},()=>{
      this.initTable()
    })
  }
  getTable = () => {
    this.props.fetchTable(this.state.reqTable)
    .then(res => {
      const {total,data} = res
      this.setState({total,data})
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
  })

  render() {
    const { timestampRange } = this.state.reqTable
    const {data, total, popVisible} = this.state
    const { loading } = this.props
    const dataSource = data.map((i,index) => {
      i.key = index + 1
      return i
    })
    const columns = [
      {
        title: '序号',
        width:100,
        dataIndex: 'key',
        align:'center',
        key:'key',
        sorter: (a, b) => a.key - b.key,
      },
      {
        title: '项目名称',
        dataIndex: 'proName',
        align:'center',
        key:'proName',
        ...this.getColumnSearchProps('proName','项目名称'),
        width:200,
        ellipsis: true,
        render: (text, record) => 
        <Tooltip title={record.proName}>
          <span>{record.proName}</span>
        </Tooltip>
      },
      {
        title: '客户名称',
        dataIndex: 'cusName',
        align:'center',
        key:'cusName',
        ...this.getColumnSearchProps('cusName','客户名称'),
        width:200,
        ellipsis: true,
        render: (text, record) => 
        <Tooltip title={record.cusName}>
          <span>{record.cusName}</span>
        </Tooltip>
      },
      {
        title: '产品信息',
        dataIndex: 'prpMsg',
        align:'center',
        key:'prpMsg',
        ...this.getColumnSearchProps('prpMsg','产品信息'),
        width:400,
        ellipsis: true,
        render: (text, record) => {
          return (
            <div style={{overflow:'hidden'}}>
              {
                record.prpMsg.map((el, index) => {
                  return <Tooltip  title={el}>
                            <span style={{marginRight:15}}>{el}</span>
                          </Tooltip>
                })
              }
            </div>
          )
        }
        // <Tooltip title={record.prpMsg}>
        //   <span>{record.prpMsg}</span>
        // </Tooltip>
      },
      {
        width:100,
        title: '开始时间',
        dataIndex: 'startTime',
        align:'center',
        key:'startTime'
      },
      {
        width:150,
        title: '最新修改时间',
        dataIndex: 'updateTime',
        align:'center',
        key:'updateTime'
      },
      {
        width:150,
        title: '项目状态',
        dataIndex: 'state',
        align:'center',
        key:'state',
        ...this.getColumnSearchProps('state','项目状态'),
        render: (text, record) => 
          <Select defaultValue = {record.state}>
            <Option value={1}>进行中</Option>
            <Option value={2}>售后</Option>
          </Select>
      },
      {
        width:100,
        title: '操作',
        dataIndex: 'delete',
        key: 'delete',
        render: (text, record) => 
        <a href="#">查看详情</a>
      }
    ]
    return (
      <Spin spinning={ loading }>
        <div key="project">
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
              <Button style={{marginLeft:400}} type='primary' onClick={this.openPop} >+创建项目</Button>
            </div>
        </div>
        <AddProject closePop={this.closePop} getTable={this.getTable}  popVisible={popVisible} />
        <ComTable className={styles['comTable']} data = {dataSource} columns = {columns}/>
      </Spin>
    )
  }
}
export default Page;
