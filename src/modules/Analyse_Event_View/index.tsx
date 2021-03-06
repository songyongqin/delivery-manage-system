import * as React from 'react'

import WithAnimateRender from 'components/WithAnimateRender'
import { ANALYSE_EVENT_VIEW, LAYOUT_NAMESPACE } from 'constants/model'
import DateRangePicker from 'domainComponents/DateRangePicker'
import Count from './components/Count'
import WithTable from 'components/WithTable'
import WithPagination from 'components/WithPagination'
import WithTableConfig  from 'domainComponents/WithTableConfig'
import combineColumnsConfig from 'domainUtils/combineColumnsConfig';
import path from 'constants/path'
import extraConnect from 'domainUtils/extraConnect'
import tranformTime from 'utils/tranformTime'
import {  Icon } from 'antd'
import Spin from 'domainComponents/Spin'
import {  ANALYSE_ATTACK_DETAIL_URL,
          ANALYSE_REPORT_URL,   
          ANALYSE_ATTACKED_ASSETS_DETAL_URL } from 'routes/config/path'
import LevelTag from 'components/LevelTag'
import { momentToTimeStampRange } from 'utils/moment'
import transformTimeStamp from 'utils/transformTimeStamp'
import ResetIcon from 'components/ResetIcon' 
import fetch from 'dva/fetch'
import  debounce  from 'lodash/debounce'

import {
  limit,
  maxTableExpanded
} from './constants'
import Detail from './components/Detail'
import TimeTag from 'components/TimeTag'
import { getToken } from 'domain/user'
// import { SearchIcon } from 'components/IconSvg'
import InputSearch from 'components/InputSearch'
const styles = require('./index.less')
const arrowPng = require('./arrow.png')

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
    get: payload => dispatch({
      type: `${ANALYSE_EVENT_VIEW}/get`,
      payload
     }),
     getThreatAction: payload => dispatch({
      type: `${ANALYSE_EVENT_VIEW}/getThreatAction`,
      payload
     }),
     getParmas: payload => dispatch({
      type: `${ANALYSE_EVENT_VIEW}/getParmas`,
      payload
     }),
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
      threatTypeArr:[] ,
      threatActionArr: [],
      lastChangeTime: 0,
      filters: {
        timestampRange:this.props.state[LAYOUT_NAMESPACE].timestampRange|| []
      },
      reqArg:{
        ...initArg,
        searchValue:'',
        page:1,
        timestampRange:this.props.state[LAYOUT_NAMESPACE].timestampRange|| []
      },
      tableParam:{},
      table:{
        total:0,
        data: []
      },
      tableKey: 0,
      clicked:[''],
      tableLoading: false,
      pieHeight: 200
    }
  }

  componentDidMount(){
    this.fetch({page:1})
    // this.getThretType()
    // this.getThreatAction()
    this.getParmas(this.state.reqArg.timestampRange)
    window.onresize = debounce(this.resetHeight, 100)
  }

  getParmas = (timestampRange) => {
    this.props.getParmas({ timestampRange }).then(res => {
      this.setState({ tableParam: {
        threatenBehavior: res.behaviors||[],
        eventType: res.categorys ||[]
      } })
    })
  }

  resetHeight = () => {
    let innerWidth = window.innerWidth ||1336;
    let pieHeight = (innerWidth - 180-50-60)/280/4*200;
    this.setState({ pieHeight })
  }

  componentWillMount(){
    window.onresize = null
  }

  getThretType = () => {
    this.props.get()
    .then(res =>  {
      let threatTypeArr = res.data&&res.data.length? res.data.map(i => {
        let obj = {}
        obj['text'] = i['type']
        obj['value'] = i['type']
        return obj
      } ) : []
      this.setState({ threatTypeArr })
    })
    .catch(err => console.error(err) )
  }

  getThreatAction =() => {
    this.props.getThreatAction()
    .then(res =>  {
      this.setState({ threatActionArr: res.data ||[] })
    })
    .catch(err => console.error(err) )
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
    reqArg.timestampRange = transformTimeStamp(reqArg.timestampRange)
    this.props.post(reqArg)
    .then(res => {
      this.setState({ table: res, reqArg, clicked:[] })
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
    this.getParmas(filters.timestampRange)
  }

  pieSelect = obj => {
    let objs = { ...initArg, ...obj, timestampRange: transformTimeStamp(this.state.reqArg.timestampRange), page:1}
    this.selectPost(objs)
  }

  selectPost = data => {
    this.setState({ tableLoading: true })
    fetch('/analyse/event-search', { method: 'POST', headers: { "Content-Type": "application/json; charset=utf-8", "access-token":getToken() }, body: JSON.stringify(data) })
    .then(res => res.json() )
    .then(res => {
      let table = res.payload
      this.setState({ table, tableKey: +new Date(), tableLoading: false })
    } )
    .catch(err => {
      this.setState({ tableLoading: false })
      console.error(err) 
    })
  }

  getCilck = index => {
    let str = index +''
    let arr = this.state.clicked
    if(arr.indexOf(str)>-1){
      let array = arr.filter(item => item!==str )
      this.setState({ clicked: array })
    }
    // else if(maxTableExpanded){
    //   this.setState({ clicked: [ ...arr, str ] })
    // }
    // else {
    //   this.setState({ clicked: [str] })
    // }
    else {
      let array = [ ...arr, str ]
      if(array.length> maxTableExpanded ){
        let len = array.length
        array = array.slice(len-maxTableExpanded,len)
      }
      this.setState({ clicked: array })
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
    
    const {  filters, lastChangeTime, table, reqArg, tableKey, threatTypeArr, threatActionArr, pieHeight, tableParam } = this.state

    const filterConfig = { ...this.props.config.constants.filter, eventType: threatTypeArr, threatenBehavior:threatActionArr, ...tableParam }

    const columns = [
      {
        title:'',
        dataIndex: 'action',
        className: 'none',
        width: 30,
        render: (text, record, index) => 
        <div style={{  cursor:'pointer' }} onClick={() =>this.getCilck(index)  } >
          {/* <Icon type={ this.state.clicked.indexOf(index+'')>-1  ? "caret-up" : "caret-down"} /> */}
          <img src={ arrowPng } alt='arrow' style={{ transform: `rotate(${this.state.clicked.indexOf(index+'')>-1 ? '90': '0' }deg)`, width:14, height:14 }} />
        </div>
      },
      {
        title:'威胁等级',
        // title: <ResetIcon onClick={ this.reset } >威胁等级</ResetIcon >,
        dataIndex: 'level',
        render: text => <LevelTag text={text} />
      },
      {
        title:'威胁行为',
        dataIndex: 'threatenBehavior'
      },
      {
        title:'详细描述',
        dataIndex: 'detailDescription',
        width: 200,
        render: (text,record) => <div>{text}<a href={ `/#${ANALYSE_REPORT_URL}?md5=${text}` } className={ styles.table }  style={{ textDecoration:"none" ,marginLeft:5 }} >{record.md5}</a></div>  
      },
      {
        title:'威胁类型',
        dataIndex: 'eventType'
      },
      {
        title:'攻击阶段',
        dataIndex: 'attackStage'
      },
      // {
      //   title:'资产状态',
      //   dataIndex: 'assetStates'
      // },
      {
        title:'攻击者资产',
        dataIndex: 'attackerIP',
        searchRule: 'ip',
        render: text =>  <a href={ `/#${ANALYSE_ATTACK_DETAIL_URL}?attackerIP=${text}` } className={ styles.table }  style={{ textDecoration:"none" }} >{text}</a>
      },
      {
        title:'受攻击资产IP',
        dataIndex: 'attatcedAssetIp',
        searchRule: 'ip',
        render: text =>  <a href={ `/#${ANALYSE_ATTACKED_ASSETS_DETAL_URL}?attatcedAssetIp=${text}` }  className={ styles.table }  style={{ textDecoration:"none" }} >{text}</a>
      },
      // {
      //   title: '事件次数',
      //   dataIndex: 'eventMergeCount',
      // },
      {
        // title:<ResetIcon onClick={ this.reset } >首次发生时间</ResetIcon >,
        title:'首次发生时间',
        dataIndex: 'firstTime',
        render: text => <TimeTag num={ text } />
      },
      {
        title:'最近发生时间',
        dataIndex: 'latelyTime',
        render: text => <TimeTag num={ text } />
      },
      
    ]

    const constants = {
      filter: filterConfig,
      selectDetail: this.state.clicked
    }

    return (
      <div style={{ position: "relative" }}>
        <div style={{ float: "right", position: "absolute", right: "0", top: "-45px" }}>
          <InputSearch searchEnter={ this.searchEnter } onChange={ this.getSearchValue } value={ this.state.reqArg.searchValue }   />
          <DateRangePicker
            value={filters.timestampRange}
            key={ +new Date() }
            global
            onChange={this.timestampRangeOnChange}>
          </DateRangePicker>
        </div>
        {
          this.props.animateRender([
            <div key="event-count">
              <Count timestampRange={ filters.timestampRange } key={ lastChangeTime } fetchTable={ this.pieSelect } pieHeight={ pieHeight } />
            </div>,
            <div key='event-table' >
              {/* <button onClick={ this.reset } >重置筛选</button> */}
              <Spin spinning={ this.props.loading|| this.state.tableLoading } >
              <div className={ styles.container } >
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