import * as React from 'react'
import extraConnect from 'domainUtils/extraConnect'
import WithCommonProps from 'domainComponents/WithCommonProps'
import WithAnimateRender from 'components/WithAnimateRender'
const styles = require("./styles.less")
import { FILE_NAMESPACE } from 'constants/model'
import Spin from 'domainComponents/Spin'
import {Icon,Input, Button, Select, Pagination, Popover} from 'antd'
import ComTable from 'components/ComTable'
import TimestampPicker from 'components/TimestampPicker'
import moment from 'moment'
const {Option} = Select
import AddFile from './components/AddFile'
import UpdateFile from './components/UpdateFile'
import getAuthURL from 'utils/getAuthURL'

const mapStateToProps = state => {
  return {
    state,
    loading: state.loading.effects[`${FILE_NAMESPACE}/fetchTable`] || state.loading.effects[`${FILE_NAMESPACE}/addFile`]
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchTable: payload => dispatch({
      type: `${FILE_NAMESPACE}/fetchTable`,
      payload
    }),
    addFile: payload => dispatch({
      type: `${FILE_NAMESPACE}/addFile`,
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
      limit: 30,
      page: 1,
      fileName: '',
    },
    data:[],
    total:0,
    addPopVisible: false,
    updatePopVisible: false,
    updateData:{
      fileName:'',
      enclosures:[],
      download:'',
      
    }
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
  addFile = () => {
    this.openAddPop()
  }
  closeAddPop = ()=> {
    this.setState({
      addPopVisible: false
    })
  }
  openAddPop = ()=> {
    this.setState({
      addPopVisible: true
    })
  }
  closeUpdatePop = ()=> {
    this.setState({
      updatePopVisible: false
    })
  }
  openUpdatePop = ()=> {
    this.setState({
      updatePopVisible: true
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
  download = () => {

  }

  update = (text,record) => {
    let updateData = {...this.state.updateData, ...record}
    this.setState({
      updateData
    },()=>{
      this.openUpdatePop()
    })
  }
  render() {
    const { loading } = this.props
    const {data, total, addPopVisible, updatePopVisible, updateData} = this.state
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
        title: '文档名称',
        dataIndex: 'fileName',
        align:'center',
        key:'fileName',
        ...this.getColumnSearchProps('fileName','文档名称')
      },
      {
        title: '附件',
        dataIndex: 'enclosures',
        align:'center',
        key:'enclosures',
        render: (text, record) => {
          return record.enclosures.map((el, index) => {
            const content = <img style={{width:500,height:500}} src={el} key={index}></img>
            return  <Popover title={null} content={content} key={index}>
                      <img src={el} className={styles['img']} ></img>
                    </Popover>
          })
        }
      },
      {
        title: '最新修改时间',
        dataIndex: 'updateTime',
        align:'center',
        key:'updateTime',
        render: (text, record) => 
          <span>{moment(record.updateTime*1000).format("YYYY-MM-DD HH:mm:ss")}</span>
      },
      {
        title: '操作行为',
        dataIndex: 'operationBehavior',
        align:'center',
        key:'operationBehavior',
        render: (text, record) => 
          <div>
            <Button type='primary' disabled={ this.props.state.domainUser.userData.role===3 }>
              <a href = {getAuthURL(record.download)} download>下载文档</a>
            </Button>
            <Button style={{marginLeft:15}} type='primary' disabled={ this.props.state.domainUser.userData.role===3 } onClick={_ => this.update(text, record)}>
              修改文档
            </Button>
          </div>
      },
    ]
    const {role} = this.props.state.domainUser.userData
    return (
      <Spin spinning={ loading }>
        <div key="system">
            <Button style={{marginBottom: 20}} disabled={ role===3 } type='primary' onClick={this.addFile}>+新增文档类型</Button>
            <AddFile closeAddPop = {this.closeAddPop} addPopVisible={addPopVisible} getTable={this.getTable} />
            <UpdateFile closeUpdatePop = {this.closeUpdatePop} data = {updateData} getTable={this.getTable} updatePopVisible={updatePopVisible} />
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
