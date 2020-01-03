import * as React from 'react'
import extraConnect from 'domainUtils/extraConnect'
import WithCommonProps from 'domainComponents/WithCommonProps'
import WithAnimateRender from 'components/WithAnimateRender'
const styles = require("./styles.less")
import { SYSTEM_NAMESPACE } from 'constants/model'
import Spin from 'domainComponents/Spin'
import {Icon,Input, Button, Select, Pagination} from 'antd'
import ComTable from 'components/ComTable'
import TimestampPicker from 'components/TimestampPicker'
import moment from 'moment'
const {Option} = Select
import { download } from 'utils'

const mapStateToProps = state => {
  return {
    state,
    loading: state.loading.effects[`${SYSTEM_NAMESPACE}/fetchTable`] || state.loading.effects[`${SYSTEM_NAMESPACE}/fetchExport`]
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchTable: payload => dispatch({
      type: `${SYSTEM_NAMESPACE}/fetchTable`,
      payload
    }),
    fetchExport: payload => dispatch({
      type: `${SYSTEM_NAMESPACE}/fetchExport`,
      payload
    }),
  }
}

@extraConnect(mapStateToProps, mapDispatchToProps)
@WithAnimateRender
@WithCommonProps
class Page extends React.Component<any, any> {

  state = {
    reqTable:{
      timestampRange:[],
      limit: 30,
      page: 1,
      accountName: '',
      loginIP: '',
    },
    data:[],
    total:0
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
  timestampRangeOnChange = ({ timestampRange }) => {
    let reqTable = {...this.state.reqTable,timestampRange}
    this.setState({reqTable},()=>{
      this.initTable()
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
  onExportClick = () => {
    this.props.fetchExport().then(res => {
      download(res)
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
    const { loading } = this.props
    const {data, total} = this.state
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
        title: '登录IP',
        dataIndex: 'loginIP',
        align:'center',
        key:'loginIP',
        ...this.getColumnSearchProps('loginIP','登录IP')
      },
      {
        title: '登录时间',
        dataIndex: 'loginTime',
        align:'center',
        key:'loginTime',
        render: (text, record) => 
          <span>{moment(record.loginTime).format("YYYY-MM-DD HH:mm:ss")}</span>
      },
      {
        title: '操作行为',
        dataIndex: 'operationBehavior',
        align:'center',
        key:'operationBehavior'
      },
    ]
    const { timestampRange } = this.state.reqTable
    const {role} = this.props.state.domainUser.userData
    return (
      <Spin spinning={ loading }>
        <div key="system">
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
            
            <Button style={{marginLeft:400}} disabled={ role===3 } type='primary' onClick={this.onExportClick} >导出日志</Button>
          </div>
          <ComTable data = {dataSource} columns = {columns} />
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
