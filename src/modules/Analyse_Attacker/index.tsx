import * as React from 'react'
import WithAnimateRender from 'components/WithAnimateRender'
import DateRangePicker from 'domainComponents/DateRangePicker'
import WithTable from 'components/WithTable'
import Count from './components/Count'
import { ANALYSE_ATTACKER_VIEW } from 'constants/model'
import extraConnect from 'domainUtils/extraConnect'
import Spin from 'domainComponents/Spin'
import { Pagination ,Tag, Input } from 'antd'
import { ANALYSE_ATTACK_DETAL_URL } from 'routes/config/path'
import WithPagination from 'components/WithPagination'
import tranformTime from 'utils/tranformTime'
import WithConfig from 'domainComponents/WithConfig'
import WithTableConfig from 'domainComponents/WithTableConfig'
import path from 'constants/path'
import combineColumnsConfig from 'domainUtils/combineColumnsConfig'
import ArrayTag from './components/ArrayTag'
import {
  limit
} from './constants'
import { getWeekTime } from 'utils/getInitTime'



const mapStateToprops = state => {
  return {
    state,
    tableLoading: state.loading.effects[`${ANALYSE_ATTACKER_VIEW}/fetchSearch`]
  }
}

const mapDispatchToprops = dispatch => {
  return {
    dispatch,
    search: payload => dispatch({
      type: `${ANALYSE_ATTACKER_VIEW}/fetchSearch`,
      payload
    }),
    fetchConstants: payload => dispatch({
      type: `${ANALYSE_ATTACKER_VIEW}/fetchConstants`,
      payload
    })
  }
}
//初始参数
const initArg = {
  // page:1,
  limit:limit,
  attackerWhere:'',
  attackGroup:'',
  attackerIP:'',
  attackerDomainName:'',
  family:'',
  timestampRange:[]
}

@WithTableConfig(path.layoutConfig.analyseAttacker)
// @WithConfig(path.layoutConfig.analyseAttacker)
@WithAnimateRender
@extraConnect(mapStateToprops, mapDispatchToprops)
class Page extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      lastChangeTime: 0,
      filters: {
        timestampRange: getWeekTime()||[]
      },
      tableData:[],
      reqArg: {...initArg, page:1, searchValue:'', },
      tableKey: '0attacked',
      countKey: 'oattackercount',
      total:0,
      timestampRange:[],
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

    this.fetchTable(obj)
  }

  fetchTable = obj => {
    
    let arg = {  ...this.state.reqArg , ...obj }
    this.search(arg)

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
    let reqArg = { ...this.state.reqArg, ...initArg, page:1 }
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
    this.fetchTable({page:1})
  }


  render() {

    const { filters, tableData, timestampRange } = this.state

    let columns = [
      { title:'序号', 
        dataIndex:'index',
        render: ( text, record, index ) => <div>{ index+1 }</div>
        },
      { title:'首次攻击时间', 
        dataIndex:'attackFirstTime',
        render: text => <Tag color={ '#1890ff' } >{tranformTime(text)}</Tag>
        },
      { title:'最近攻击时间', 
        dataIndex:'attackLatelyTime',
        render: text => <Tag color={ '#1890ff' } >{tranformTime(text)}</Tag>
      },
      { title:'攻击者IP', 
        dataIndex:'attackerIP', 
        types:['search']
      },
      { title:'攻击者域名', 
        dataIndex:'attackerDomainName', 
        types:['search'],
        render: text => <ArrayTag data={ text } />
      },
      { title:'攻击者所在地',   
        dataIndex:'attackerWhere', 
        types:['search']
      },
      { title:'攻击者组织', 
        dataIndex:'attackGroup', 
        types:['search']
      },
      { title:'攻击者家族', 
        dataIndex:'family', 
        types:['search']
      },
      { title:'详细信息', 
        dataIndex:'actions', 
        render: (text,record,index) =>
          <div style={{ textAlign:'center' }}  >
          {/* 此处通过dva router里面的link路由跳转将会强制转换，但是通过a标签就可以执行 */}
            <a  href={ `/#${ANALYSE_ATTACK_DETAL_URL}?attackerIP=${record.attackerIP}` }
                  style={{ cursor:'pointer', marginBottom:10, color:'#1890ff' }} >查看</a>
          </div>
      },
    ]

    let constants = this.props.config.constants || { }
  
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
            value={timestampRange}
            onChange={this.timestampRangeOnChange}>
          </DateRangePicker>
        </div>
        {
          this.props.animateRender([
            <div key='analyse-attacker-count' >
            {/* 统计数据 */}
              <Count  key={ this.state.countKey } timestampRange={ timestampRange }  />
            </div>,
            <div key="analyse-attacker-table">
            <button onClick={ this.reset } >重置筛选</button>
            <Spin spinning={ this.props.tableLoading  } >
              <WithTable  tableData={ tableData }
                        key = { this.state.tableKey }
                        constants={ constants }
                        config={ combineColumnsConfig(columns,this.props.config.columns) }
                        tableBeforeFetch={ this.tableBeforeFetch } />
              <WithPagination total={this.state.total}
                              onChange={ this.paginationOnchange }
                              limit={ limit }
                              current={this.state.reqArg.page}  />
            </Spin>
            </div>
          ])
        }
      </div>
    )
  }
}

export default Page