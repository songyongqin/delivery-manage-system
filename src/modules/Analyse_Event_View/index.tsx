import * as React from 'react'

import WithAnimateRender from 'components/WithAnimateRender'
import { ANALYSE_EVENT_VIEW } from 'constants/model'
import DateRangePicker from 'domainComponents/DateRangePicker'
import Count from './components/Count'
import WithTable from 'components/WithTable'
import WithPagination from 'components/WithPagination'
import WithTableConfig  from 'domainComponents/WithTableConfig'
import combineColumnsConfig from 'domainUtils/combineColumnsConfig';
import path from 'constants/path'
import extraConnect from 'domainUtils/extraConnect'
import tranformTime from 'utils/tranformTime'
import { Tag, Icon, Input  } from 'antd'
import Spin from 'domainComponents/Spin'
import {  ANALYSE_ATTACK_DETAIL_URL,
          ANALYSE_REPORT_URL,   
          ANALYSE_ATTACKED_ASSETS_DETAL_URL } from 'routes/config/path'
import LevelTag from 'components/LevelTag'
import { getWeekTime } from 'utils/getInitTime'
import { momentToTimeStampRange } from 'utils/moment'
import transformTimeStamp from 'utils/transformTimeStamp'
import ResetIcon from 'components/ResetIcon' 

import {
  limit,
  canMultipleDetail
} from './constants'
import Detail from './components/Detail'
import TimeTag from 'components/TimeTag'


const mapStateToProps = state => {
  return {
    state,
    loading: state.loading.effects[`${ANALYSE_EVENT_VIEW}/post`]
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    // fetch: payload => dispatch({
    //   type: `${ANALYSE_EVENT_VIEW}/fetch`,
    //   payload
    //  })
    post: payload => dispatch({
      type: `${ANALYSE_EVENT_VIEW}/post`,
      payload
     })
  }
}

const initArg = {
  limit: limit,
  // page: 1,
  threatenBehavior:'',
  eventType:'',
  attatcedAssetIp:'',
  assetStates:'',
  attackerIP:'',
  level:'',
  attackStage:'',
}

@extraConnect( mapStateToProps, mapDispatchToProps )
@WithTableConfig(path.layoutConfig.analyseEventVIew)
@WithAnimateRender
class Page extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      lastChangeTime: 0,
      filters: {
        timestampRange:getWeekTime()|| []
      },
      reqArg:{
        ...initArg,
        searchValue:'',
        page:1,
        timestampRange:getWeekTime()|| []
      },
      table:{
        total:0,
        data: []
      },
      tableKey: 0,
      clicked:['']
    }
  }

  componentDidMount(){
    this.fetch({page:1})
  }

  // fetch = obj => {
  //   let reqArg = { ...this.state.reqArg, ...obj  }
    
  //   this.props.fetch(reqArg)
  //   .then(res => {
  //     this.setState({ table: res, reqArg })
  //   })
  //   .catch(err => console.error(err) )
  // }

  fetch = obj => {
    //将get方法改为post
    let reqArg = { ...this.state.reqArg, ...obj  }
    console.log(reqArg.timestampRange)
    reqArg.timestampRange = transformTimeStamp(reqArg.timestampRange)
    this.props.post(reqArg)
    .then(res => {
      this.setState({ table: res, reqArg })
    })
    .catch(err => console.error(err) )
  }

  tableBeforeFetch = obj => {
    this.fetch( { ...obj, page:1 } )
  }

  reset = () => {
    let reqArg = { ...this.state.reqArg, ...initArg, page:1 }
    this.setState({ tableKey: +new Date(), reqArg })
    this.fetch(reqArg)
  }

  paginationChange = page => {
    // console.log('page')
    this.fetch({ page })
  }

  timestampRangeOnChange = filters => {
    this.setState({
      filters,
      lastChangeTime: new Date().getTime()
    })
    this.fetch({ page:1, timestampRange: filters.timestampRange })
  }

  getCilck = index => {
    let str = index +''
    let arr = this.state.clicked
    if(arr.indexOf(str)>-1){
      let array = arr.filter(item => item!==str )
      this.setState({ clicked: array })
    }
    else if(canMultipleDetail){
      this.setState({ clicked: [ ...arr, str ] })
    }
    else {
      this.setState({ clicked: [str] })
    }
    // this.setState({ clicked: index+'' })
  }

  getSearchValue = e => {
    const { value } = e.target
    let reqArg = this.state.reqArg
    this.setState({ reqArg: { ...reqArg, searchValue:value } })
  }

  searchEnter =() => {
    this.fetch({ page:1 })
  }

  render() {
    
    const {  filters, lastChangeTime, table, reqArg, tableKey } = this.state

    const columns = [
      {
        title:<ResetIcon onClick={ this.reset } /> ,
        dataIndex: 'index',
        render: ( text, record, index ) => <div>{ index +1}</div>
      },
      {
        title:'首次发生时间',
        dataIndex: 'firstTime',
        render: text => <TimeTag num={ text } />
      },
      {
        title:'最近发生时间',
        dataIndex: 'latelyTime',
        render: text => <TimeTag num={ text } />
      },
      {
        title:'威胁行为',
        dataIndex: 'threatenBehavior'
      },
      {
        title:'详细描述',
        dataIndex: 'detailDescription',
        render: (text,record) => <div>{text}<a href={ `/#${ANALYSE_REPORT_URL}?md5=${text}` } style={{ textDecoration:"none" , color:'#1890ff',marginLeft:5 }} >{record.md5}</a></div>  
      },
      {
        title:'威胁类型',
        dataIndex: 'eventType'
      },
      {
        title:'攻击者IP',
        dataIndex: 'attackerIP',
        searchRule: 'ip',
        render: text =>  <a href={ `/#${ANALYSE_ATTACK_DETAIL_URL}?attackerIP=${text}` } style={{ textDecoration:"none" , color:'#1890ff'}} >{text}</a>
      },
      {
        title:'受攻击资产IP',
        dataIndex: 'attatcedAssetIp',
        searchRule: 'ip',
        render: text =>  <a href={ `/#${ANALYSE_ATTACKED_ASSETS_DETAL_URL}?attatcedAssetIp=${text}` } style={{ textDecoration:"none", color:'#1890ff' }} >{text}</a>
      },
      {
        title:'资产状态',
        dataIndex: 'assetStates'
      },
      {
        title:'攻击阶段',
        dataIndex: 'attackStage'
      },
      {
        title:'威胁等级',
        dataIndex: 'level',
        render: text => <LevelTag text={text} />
      },
      {
        title:'详情查看',
        dataIndex: 'action',
        render: (text, record, index) => 
        <div style={{ textAlign:'center', cursor:'pointer' }} onClick={() =>this.getCilck(index)  } >
          <Icon type={ this.state.clicked.indexOf(index+'')>-1  ? "caret-up" : "caret-down"} />
        </div>
      },
    ]

    const constants = {
      filter: this.props.config.constants.filter,
      selectDetail: this.state.clicked
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
            key={ +new Date() }
            onChange={this.timestampRangeOnChange}>
          </DateRangePicker>
        </div>
        {
          this.props.animateRender([
            <div key="event-count">
              <Count timestampRange={ filters.timestampRange } key={ lastChangeTime } />
            </div>,
            <div key='event-table' >
              {/* <button onClick={ this.reset } >重置筛选</button> */}
              <Spin spinning={ this.props.loading } >
              <WithTable  tableData={ table.data } 
                          constants={ constants }
                          config={ combineColumnsConfig(columns, this.props.config.columns) }
                          key={ tableKey+'table' }
                          Detail={ Detail  }
                          tableBeforeFetch={ this.tableBeforeFetch } />
              <WithPagination total={ table.total }
                              current={ reqArg.page }
                              limit={ limit }
                              onChange={ this.paginationChange } />
              </Spin>
            </div>
          ])
        }
      </div>
    )
  }
}

export default Page