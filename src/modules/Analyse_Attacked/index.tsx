import * as React from 'react'
import WithAnimateRender from 'components/WithAnimateRender'
import DateRangePicker from 'domainComponents/DateRangePicker'
import WithTable from 'components/WithTable'
import Count from './components/Count'
import { ANALYSE_ATTACKED_VIEW } from 'constants/model'
import extraConnect from 'domainUtils/extraConnect'
import Spin from 'domainComponents/Spin'
import { Pagination ,Tag, Input } from 'antd'
import { ANALYSE_ATTACKED_ASSETS_DETAL_URL } from 'routes/config/path'
import {
  assetStateFilter,
  levelFilter
} from './constants'


const mapStateToprops = state => {
  return {
    state,
    tableLoading: state.loading.effects[`${ANALYSE_ATTACKED_VIEW}/fetchView`]
  }
}

const mapDispatchToprops = dispatch => {
  return {
    dispatch,
    fetch: payload => dispatch({
      type: `${ANALYSE_ATTACKED_VIEW}/fetchView`,
      payload
    }),
    search: payload => dispatch({
      type: `${ANALYSE_ATTACKED_VIEW}/fetchSearch`,
      payload
    })
  }
}
//初始参数
const initArg = {
  page:1,
  limit:10,
  searchValue:'',
  attatcedAssetIp:'',
  attackedCount:'',
  assetStates:'',
  level:'',
  timestampRange:[]
}


@WithAnimateRender
@extraConnect(mapStateToprops, mapDispatchToprops)
class Page extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      lastChangeTime: 0,
      filters: {
        timestampRange: []
      },
      tableData:[],
      reqArg: {...initArg},
      tableKey: '0attacked',
      countKey: 'oattackedcount',
      total:0,
    }
  }

  timestampRangeOnChange = filters => {
    let timestampRange = filters.timestampRange
    let time = this.getNowTime()
    // let reqArg = {...this.state.reqArg, timestampRange, page:1 }
    // console.log()
    this.setState({  countKey: time + 'attackedcount' })
    this.fetchTable({ timestampRange, page:1 })
    // this.setState({
    //   filters,
    //   lastChangeTime: new Date().getTime()
    // })
  }

  componentDidMount(){
    this.fetchTable({})
  }

  getNowTime = () => new Date().getTime()

  tableBeforeFetch = obj => {

    this.fetchTable(obj)
  }

  fetchTable = obj => {
    
    let arg = {  ...this.state.reqArg , ...obj }

    if(arg['searchValue']){
      this.search(arg)
    }
    else {
      this.fetch(arg)
    }
  }

  fetch = arg => {
    console.log('fetch')
    this.props.fetch(arg)
    .then(res => {
      let tableData = res.data 
      let total = res.total 
      this.setState( { reqArg: arg, tableData, total } )  
    })
    .catch(err => console.error(err))
  }
// 搜索
  search = arg => {
    console.log('search')
    this.props.search(arg)
    .then(res => {
      let tableData = res.data 
      let total = res.total 
      this.setState( { reqArg: arg, tableData, total } )  
    })
    .catch(err => console.error(err))
  }

  reset = () => {
    let time = this.getNowTime()
    this.setState({ tableKey: time +'attacked-table', reqArg: { ...initArg } })
  }

  paginationOnchange = (page)=> {
    this.fetchTable({page})
  }

  getSearchValue =e => {
    let searchValue = e.target.value
    let reqArg = { ...this.state.reqArg, searchValue  } 
    this.setState({ reqArg })
  }

  searchEnter = () => {
    // let { reqArg } = this.state
    this.fetchTable({})
  }

  render() {

    const { visible, activeKey, lastChangeTime, filters, tableData } = this.state

    let columns = [
      { title:'首次受攻击时间', 
        dataIndex:'attackedFirstTime'
        },
      { title:'最近受攻击时间', 
        dataIndex:'attackedLatelyTime'
      },
      { title:'受攻击资产IP', 
        dataIndex:'attatcedAssetIp', 
        types:['search']
      },
      { title:'受攻击次数', 
        dataIndex:'attackedCount', 
        types:['sorter']
      },
      { title:'资产状态',   
        dataIndex:'assetStates', 
        types:['filters']
      },
      { title:'威胁等级', 
        dataIndex:'level', 
        types:['filters']
      },
      { title:'操作', 
        dataIndex:'actions', 
        render: (text,record,index) =>
          <div style={{ textAlign:'center' }}  >
          {/* 此处通过dva router里面的link路由跳转将会强制转换，但是通过a标签就可以执行 */}
            <a  href={ `/#${ANALYSE_ATTACKED_ASSETS_DETAL_URL}?attatcedAssetIp=${record.attatcedAssetIp}` }
                  style={{ cursor:'pointer', marginBottom:10, color:'#1890ff' }} >查看</a>
          </div>
      },
    ]

    let constants = {
      filter: {
        level: levelFilter,
        assetStates: assetStateFilter
      }
    }

    return (
      <div style={{ position: "relative" }}>
        <div style={{ float: "right", position: "absolute", right: "0", top: "-45px" }}>
          <Input.Search placeholder="输入待搜索的值"
                        enterButton
                        onSearch = { this.searchEnter }
                        value = { this.state.reqArg.searchValue }
                        onChange = { this.getSearchValue } 
                        style={{ width:240, marginRight:20 }}  />
          <DateRangePicker
            value={filters.timestampRange}
            onChange={this.timestampRangeOnChange}>
          </DateRangePicker>
        </div>
        {
          this.props.animateRender([
            <div key='event-count' >
            {/* 统计数据 */}
              <Count  key={ this.state.countKey } />
            </div>,
            <div key="event-attacked-table">
            <button onClick={ this.reset } >重置筛选</button>
            <Spin spinning={ this.props.tableLoading  } >
              <WithTable  tableData={ tableData }
                        key = { this.state.tableKey }
                        constants={ constants }
                        config={ columns }
                        tableBeforeFetch={ this.tableBeforeFetch } />
              <Pagination total={this.state.total}
                        onChange={ this.paginationOnchange } 
                        current={this.state.reqArg.page}
                        showTotal={ total=> <div>共找到 &nbsp;<Tag color="#108ee9">{total}</Tag>结果</div>  } />
            </Spin>
            </div>
          ])
        }
      </div>
    )
  }
}

export default Page