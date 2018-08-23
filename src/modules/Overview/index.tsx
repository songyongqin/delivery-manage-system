import React from 'react'

import WithAnimateRender from 'components/WithAnimateRender'

import DateRangePicker from 'domainComponents/DateRangePicker'
import Pie from './components/Pie'
import Spin from 'domainComponents/Spin'
import { OVERVIEW_STATISTICS_COUNT } from 'constants/model'
import extraConnect from 'domainUtils/extraConnect'
import { Input } from 'antd'
import Line from './components/Line/AsyncLineCharts'
import TimeTag from 'components/TimeTag'
import LevelTag from 'components/LevelTag'
import WithTable from 'components/WithTable'
import Tree from './components/Tree'
import { getWeekTime } from 'utils/getInitTime'



const MapStateToProps = state => {
  return{
    countLoading: state.loading.effects[`${OVERVIEW_STATISTICS_COUNT}/fetchCount`],
    flowLoading: state.loading.effects[`${OVERVIEW_STATISTICS_COUNT}/fetchFlow`],
    eventLoading: state.loading.effects[`${OVERVIEW_STATISTICS_COUNT}/fetchEvent`]
  }
}

const MapDispatchToProps = dispatch => {
  return {
    fetchCount: payload => dispatch({
      type: `${OVERVIEW_STATISTICS_COUNT}/fetchCount`,
      payload
    }),
    fetchFlow: payload => dispatch({ 
      type: `${OVERVIEW_STATISTICS_COUNT}/fetchFlow`,
      payload
     }),
    fetchEvent: payload => dispatch({ 
      type: `${OVERVIEW_STATISTICS_COUNT}/fetchEvent`,
      payload
     })
  }
}

const cloumns = [
  {
    dataIndex:'latelyTime',
    title:'威胁最近发生时间',
    render: text => <TimeTag num={ text } />
  },
  {
    dataIndex:'behaviorDescription',
    title:'行为描述',
  },
  {
    dataIndex:'eventType',
    title:'威胁类型'
  },
  {
    dataIndex:'attatcedAssetIp',
    title:'受害IP'
  },
  {
    dataIndex:'assetStates',
    title:'资产状态'
  },
  {
    dataIndex:'attackerIP',
    title:'攻击IP'
  },
  {
    dataIndex:'level',
    title:'威胁等级',
    render: text => <LevelTag text={ text } />
  }
]

@WithAnimateRender
@extraConnect(MapStateToProps, MapDispatchToProps )
class Page extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      lastChangeTime: 0,
      count: {
        familyCount: [],
      },
      filters: {
        timestampRange:getWeekTime()|| []
      },
      networkFlow:{
        series:[],
        xAxis:[],
        unit:''
      },
      applicationFlow:{
        series:[],
        xAxis:[],
        unit:''
      },
      table:{
        total:0,
        data:[]
      }
    }
  }

  timestampRangeOnChange = filters => {
    const { timestampRange } = filters
    this.setState({
      filters,
      lastChangeTime: new Date().getTime()
    })
    this.getCount({timestampRange});
    this.getFlow({timestampRange}) 
  }
  componentDidMount(){
    const { timestampRange } = this.state.filters
    this.getCount({timestampRange});
    this.getFlow({timestampRange});
    this.getEvent() 

  }

  getCount = ({timestampRange}) => {
    this.props.fetchCount({timestampRange})
    .then(res => {
      this.setState({ count: res })
    } )
    .catch( err => console.error(err)  )
  }

  getFlow = ({timestampRange}) => {

    this.props.fetchFlow({timestampRange})
    .then(res => {
      this.setState(res)
    } )
    .catch( err => console.error(err)  )
  }

  getEvent = () => {
    this.props.fetchEvent()
    .then(res => {
      this.setState({ table: res })
    } )
    .catch( err => console.error(err)  )
  }

  getValue = e => {
    let value = e.target.value ? e.target.value : ''
    console.log(value.toString())
  }

  render() {
    const { applicationFlow, filters, networkFlow, table } = this.state
    const { countLoading, flowLoading, eventLoading } = this.props
    
    return (
      <div style={{ position: "relative" }}>
        <div style={{ float: "right", position: "absolute", right: "0", top: "-45px" }}>
          <DateRangePicker
            value={filters.timestampRange}
            key={ +new Date() }
            onChange={this.timestampRangeOnChange}>
          </DateRangePicker>
        </div>
        {
          this.props.animateRender([
            <Spin key='pie-charts' spinning={ countLoading } >
              <Pie data={ this.state.count } />
            </Spin>,
            <Spin key='pie-charts-line' spinning={ flowLoading } >
              <span style={{ width:1020, display:'inline-block',  border:'1px solid rgba(0,0,0,0.3)', borderRadius:10, margin:10,  padding:10 }} >
                <Line title={'网络流量'} xAxis={ networkFlow.xAxis } series={ networkFlow.series }  unit={ networkFlow.unit }  />
              </span>
              <span style={{ width:1020, display:'inline-block',  border:'1px solid rgba(0,0,0,0.3)', borderRadius:10, margin:10, padding:10 }} >
                <Line title={'应用流量'} xAxis={ applicationFlow.xAxis } series={ applicationFlow.series }  unit={ applicationFlow.unit }  />
              </span>
              {/* <Tree /> */}
          </Spin>,
          <div key='overview-table' style={{ marginTop:20 }} >
            <div>
              <h2 style={{ display:'inline-block' }} >最新紧急事件</h2>
              <a href='/#/analyse/event' style={{ textDecoration:'none', float:'right', marginRight:140, marginTop:10}} >查看全部威胁事件</a>
            </div>
            <Spin spinning={ eventLoading } >
              <WithTable tableData={ table.data } config={ cloumns } />
            </Spin>
          </div>
          ])
        }
      </div>
    )
  }
}

export default Page