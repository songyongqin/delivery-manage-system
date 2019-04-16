

import React, { Component } from 'react'
import { Table } from 'antd'
import { getColumns } from './config'
import classnames from 'classnames'
import { Tooltip  } from 'antd';
const style = require('./index.less')

interface props {
  constants?: constants,
  minPadding?: boolean,
  config: Array<object>,
  tableData: Array<object>,
  // whichSelect: boolean,
  Detail?: any,
  tableBeforeFetch?: (any) => any
}

interface constants {
  filter: object
  selectDetail: Array<string>
}

class WithTable extends Component<props, any>{
  constructor(props) {
    super(props)
    this.state = {
      data: [{
        firstTime: 'firstTime',
        latelyTime: 'latelyTime',
        actionBehavior: 'actionBehavior',
        actionType: 'actionType',
        key: 0
      }],
      filter: props.objConstants || {},
      whichSelect: '',
      tableChangeData: {},
      searchValue: {},
      isSearchValue:[],
    }
  }

  setTableState = obj => {
    console.log('set')
    this.setState({...obj,})
  }

  getTableState = () => {
    return this.state
  }

  // tableFetch = () =>{
  //   this.hiddenSearch()
  // }
  //获取到表格中搜索框的值
  getSearchValue = obj => {
    let searchValue = this.state.searchValue
    searchValue = { ...searchValue, ...obj }
    this.setState({ searchValue })
  }

  preTableSearch = obj => {
    // let tableChangeData = this.state.tableChangeData
    // let objs = {}
    // objs[obj['searchType']] =obj['searchValue'] 
    // tableChangeData = { ...tableChangeData, ...objs }
    this.getSearchIcon(obj)
    //添加上多条搜索的值
    let objs = this.state.searchValue
    objs.page = 1
    console.log(objs)
    this.props.tableBeforeFetch && this.props.tableBeforeFetch(objs)
    this.hiddenSearch()
  }

  tableFetch = obj => {
    this.props.tableBeforeFetch(obj)
  }

  getSearchIcon = obj => {
    const {  searchType, searchValue } = obj
    let isSearchValue = this.state.isSearchValue
    let arr = [...new Set([...isSearchValue, searchType ])]
    console.log(this.state.searchValue)
    if(!searchValue){
      arr = arr.filter(i => i!==searchType)
    }
    this.setState({ isSearchValue: arr })
  }

  hiddenSearch = () => {
    this.setState({ whichSelect: '' })
  }

  tableOnChange = (pagination, filters, sorter) => {
    //点击表头的筛选，搜索，排序会触发这个函数
    let obj = { ...pagination, ...filters, ...sorter }
    // console.log('xx', {...pagination, ...filters, ...sorter})
    if (obj['columnKey']) {
      obj[obj['columnKey']] = obj['order'] !== "descend"  //降序
      delete obj['columnKey']
      delete obj['column']
      delete obj['field']
      delete obj['order']
    }
    //去掉不需要的参数
    // for (let key in obj) {
    //   if (obj[key].length === 0 || typeof obj[key] === 'string') delete obj[key]

    // }
    //添加search的值
    let searchValue = this.state.searchValue
    obj = { ...obj, ...searchValue, page: 1 }
    //转换为string
    //  for(let keys in obj){
    //    obj[keys] = obj[keys].toString() 
    //  }
    // console.log('obj',obj)
    this.setState({ tableChangeData: obj })
    this.props.tableBeforeFetch && this.props.tableBeforeFetch(obj)
    this.hiddenSearch()
  }

  render() {

    let { tableData, Detail, minPadding= true } = this.props
    tableData = tableData && tableData.map((item, index) => {
      item['key'] = index + ''
      return item
    })
    let columns = getColumns({
      config: this.props.config,
      filters: this.props.constants ? this.props.constants['filter'] : [],
      whichSelect: this.state.whichSelect,
      handle: {
        preTableSearch: this.preTableSearch,
        getTableSearchValue: this.getSearchValue,
        getTableState: this.getTableState,
        setTableState: this.setTableState,
        // isSearchValue: this.state.isSearchValue
        isSearchValue: this.state.searchValue  //修复table组件不能正确显示筛选参数
      }
    })
    
    // let classes = 
    columns = columns.map(i => {
      i['className'] =  classnames(style.default)
      if(!i['render']){
        i['render'] = text => ( text + '' ).length>15 ? <Tooltip  title={ text } >{ text }</Tooltip > : text
      }
      return i
    } )
    console.log(columns)
    return (
      // <div style={{ minWidth:1300, overflow:'auto' }} >
      <div  className={ minPadding ? style['min-situation-table'] : {} }  >
        {
          this.props.Detail ?
            <Table dataSource={tableData} columns={columns}
              onChange={this.tableOnChange}
              pagination={false}
              expandedRowKeys={this.props.constants['selectDetail'] || ['']}
              expandIconAsCell={false}
              expandIconColumnIndex={-1}
              // scroll={{ x:true} }
              expandedRowRender={
                record => <Detail record={record} />
              } /> :
            <Table dataSource={tableData} columns={columns}
              onChange={this.tableOnChange}
              pagination={false} />
        }
      </div>
    )
  }
}


export default WithTable