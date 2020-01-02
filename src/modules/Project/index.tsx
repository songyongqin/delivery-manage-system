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
import { PROJECT_DETAIL_URL } from 'routes/config/path'
import domainQueryStringParse from 'utils/domainQueryStringParse'

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
    }),
    changeState: payload => dispatch({
      type: `${PROJECT_NAMESPACE}/changeState`,
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
      proMsg:''
    },
    data: [],
    total: 0,
    popVisible:false
  }
  componentDidMount() {
    this.getTable()
  }
  timestampRangeOnChange = ({ timestampRange }) => {
    let reqTable = {...this.state.reqTable,timestampRange}
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
  changeState = (projectState,id)=>{
    this.props.changeState({projectState,id})
    .then(res => {
      Message.success('修改成功')
      this.getTable()
    })

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
        dataIndex: 'proMsg',
        align:'center',
        key:'proMsg',
        ...this.getColumnSearchProps('proMsg','产品信息'),
        width:400,
        ellipsis: true,
        render: (text, record) => {
          return (
            <div style={{display:'flex',justifyContent:'center'}}>
              {
                record.proMsg.map((el, index) => {
                  return <Tooltip  title={el} key={index}>
                            <span className={styles['item']}>{el}</span>
                          </Tooltip>
                })
              }
            </div>
          )
        }
      },
      {
        width:100,
        title: '开始时间',
        dataIndex: 'startTime',
        align:'center',
        key:'startTime',
        render: (text, record) => 
          <span>{moment(record.startTime*1000).format("YYYY-MM-DD")}</span>
      },
      {
        width:150,
        title: '最新修改时间',
        dataIndex: 'updateTime',
        align:'center',
        key:'updateTime',
        render: (text, record) => 
          <span>{moment(record.updateTime*1000).format("YYYY-MM-DD HH:mm:ss")}</span>
      },
      {
        width:150,
        title: '项目状态',
        dataIndex: 'state',
        align:'center',
        key:'state',
        filters: [
          {
            text: '进行中',
            value: 1,
          },
          {
            text: '售后',
            value: 2,
          }],
          onFilter: (value, record) => record.state === value ? 1 : 0,
        render: (text, record) => 
          <Select defaultValue = {record.state} onChange={value=>this.changeState(value,record.id)}>
            <Option value={1}>进行中</Option>
            <Option value={2}>售后</Option>
          </Select>
      },
      {
        width:100,
        title: '操作',
        dataIndex: 'delete',
        key: 'delete',
        render: (text, record) =>{
          const payload = {
            id: record.id
          }
          return <a href={'/#'+PROJECT_DETAIL_URL + domainQueryStringParse(payload)} style={{  textDecoration: "underline" }}>查看详情</a>
        }
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
        <Pagination
            style={{marginTop: 20}}
            showTotal= {total => `共找到${total}个结果`}
            defaultCurrent={1}
            total={total}
            onChange = {this.pageChange}
          />
      </Spin>
    )
  }
}
export default Page;
