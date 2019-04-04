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
import WithPagination from 'components/WithPagination'
import tranformTime from 'utils/tranformTime'
import TabelTime from 'components/TableTime'
import path from 'constants/path'
import WithTableConfig from 'domainComponents/WithTableConfig'
import combineColumnsConfig from 'domainUtils/combineColumnsConfig'
import LevelTag from 'components/LevelTag'
import ResetIcon from 'components/ResetIcon' 
import {
  // assetStateFilter,
  // levelFilter,
  limit
} from './constants'
import { getWeekTime, getTodayTime } from 'utils/getInitTime'
import InputSearch from 'components/InputSearch'
const styles = require('./index.less')

const mapStateToprops = state => {
  return {
    state,
    tableLoading: state.loading.effects[`${ANALYSE_ATTACKED_VIEW}/fetchSearch`]
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
  // page:1,
  limit:limit,
  // searchValue:'',
  attatcedAssetIp:'',
  attackedCount:'',
  assetStates:'',
  level:'',
  timestampRange:[]
}


@WithTableConfig(path.layoutConfig.analyseAttackedAssets)
@WithAnimateRender
@extraConnect(mapStateToprops, mapDispatchToprops)
class Page extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      lastChangeTime: 0,
      filters: {
        timestampRange:getTodayTime()|| []
      },
      tableData:[],
      reqArg: {...initArg, page:1, searchValue:"", timestampRange:getTodayTime()|| []},
      tableKey: '0attacked',
      countKey: 'oattackedcount',
      total:0,
      timestampRange:getTodayTime()|| []
    }
  }

  timestampRangeOnChange = filters => {
    let timestampRange = filters.timestampRange
    let time = this.getNowTime()
    // let reqArg = {...this.state.reqArg, timestampRange, page:1 }
    // console.log()
    this.setState({  countKey: time + 'attackedcount', timestampRange })
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
    console.log('obj',obj)
    this.fetchTable(obj)
  }

  fetchTable = obj => {
    
    let arg = {  ...this.state.reqArg , ...obj }
    this.search(arg)
    // if(arg['searchValue']){
    //   this.search(arg)
    // }
    // else {
    //   this.fetch(arg)
    // }
  }

// 搜索
  search = arg => {
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
    let reqArg =  { ...this.state.reqArg, ...initArg, page:1 }
    this.setState({ tableKey: time +'attacked-table',
    reqArg })
    this.search(reqArg)
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
    this.fetchTable({ page:1 })
  }


  render() {

    const {  timestampRange, filters, tableData } = this.state
    let columns = [
      { title:<ResetIcon onClick={ this.reset } />, 
        dataIndex:'index',
        render:  (text, record, index) => <div>{index +1}</div>
        },
      { title:'首次受攻击时间', 
        dataIndex:'attackedFirstTime',
        render: text => <TabelTime num={ text } />
        },
      { title:'最近受攻击时间', 
        dataIndex:'attackedLatelyTime',
        render: text => <TabelTime num={ text } />
      },
      { title:'受攻击资产IP', 
        dataIndex:'attatcedAssetIp',
        searchRule: 'ip', 
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
        types:['filters'],
        render: text => <LevelTag text={text} />
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

    let constants = this.props.config.constants
    
    return (
      <div style={{ position: "relative" }}>
        <div style={{ float: "right", position: "absolute", right: "0", top: "-45px" }}>
          <InputSearch searchEnter={ this.searchEnter } onChange={ this.getSearchValue } value={ this.state.reqArg.searchValue }   />
          <DateRangePicker
            value={timestampRange}
            key={ +new Date() }
            onChange={this.timestampRangeOnChange}>
          </DateRangePicker>  
        </div>
        {
          this.props.animateRender([
            <div key='event-attacked-count' >
            {/* 统计数据 */}
              <Count  key={ this.state.countKey } timestampRange={ timestampRange }  />
            </div>,
            <div key="event-attacked-table">
            {/* <button onClick={ this.reset } >重置筛选</button> */}
            <Spin spinning={ this.props.tableLoading  }  >
              <div className={ styles.container } >
                <WithTable  tableData={ tableData }
                          key = { this.state.tableKey }
                          constants={ constants }
                          config={ combineColumnsConfig(columns,this.props.config.columns) }
                          tableBeforeFetch={ this.tableBeforeFetch } />
                <WithPagination total={this.state.total}
                                limit={ limit }
                                onChange={ this.paginationOnchange }
                                current={this.state.reqArg.page}  />
              </div>
            </Spin>
            </div>
          ])
        }
      </div>
    )
  }
}

export default Page