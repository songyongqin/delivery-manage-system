import React from 'react'

import WithAnimateRender from 'components/WithAnimateRender'

import DateRangePicker from 'domainComponents/DateRangePicker'
import Pie from './components/Pie'
import Spin from 'domainComponents/Spin'
import { OVERVIEW_STATISTICS_COUNT } from 'constants/model'
import extraConnect from 'domainUtils/extraConnect'
import { Input, Row, Col  } from 'antd'
import Line from './components/Line/AsyncLineCharts'
import TimeTag from 'components/TimeTag'
import LevelTag from 'components/LevelTag'
import WithTable from 'components/WithTable'
import Tree from './components/Tree'
import { getTodayTime } from 'utils/getInitTime'
import debounce from 'lodash/debounce'
const css = require('./index.less')

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

let cloumns = [
  {
    dataIndex:'latelyTime',
    title:'时间',
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
  // {
  //   dataIndex:'level',
  //   title:'威胁等级',
  //   render: text => <LevelTag text={ text } />
  // }
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
        timestampRange:getTodayTime()|| []
      },
      // networkFlow:{
      //   series:[],
      //   xAxis:[],
      //   unit:''
      // },
      applicationFlow:{
        series:[],
        xAxis:[],
        unit:''
      },
      table:{
        total:0,
        data:[]
      },
      pieHeight:200,
      lineHeight: 324,
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
    window.onresize = debounce(this.setWidth, 100)
    this.setWidth();
  }

  componentWillUnmount(){
    window.onresize = null
  }

  setWidth = () => {
    
    let innerWidth = window.innerWidth ||1336;
    let pieHeight = (innerWidth - 180-50-60)/280/4*200;
    let lineHeight = (innerWidth - 180-50-60)/580/2*324
    console.log(innerWidth)
    this.setState({ pieHeight, lineHeight })
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
  }

  render() {
    const { applicationFlow, filters, table, pieHeight, lineHeight } = this.state
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
            <Spin key='pie-charts' spinning={ countLoading } style={{ height:pieHeight }} >
              <Pie data={ this.state.count } />
            </Spin>,
            <Row key='overview-row' justify={ 'space-between' } gutter={ 20 } style={{ marginTop: '1em' ,height:'100%' }} >
            <Col span={12}  style={{ height:pieHeight }} >
              <Spin key='pie-charts-line' spinning={ flowLoading } style={{ height:'100%' }} >
                {/* <span style={{ width:1020, display:'inline-block',  border:'1px solid rgba(0,0,0,0.3)', borderRadius:10, margin:10,  padding:10 }} >
                  <Line title={'网络流量'} xAxis={ networkFlow.xAxis } series={ networkFlow.series }  unit={ networkFlow.unit }  />
                </span> */}
                <Wrap  style={{  height: lineHeight }}>
                  <Line title={'应用流量'} xAxis={ applicationFlow.xAxis } series={ applicationFlow.series }  unit={ applicationFlow.unit }  />
                </Wrap>
              </Spin>
              </Col>
              <Col span={12}>
              <div >
              <Wrap style={{  height: lineHeight,   overflowY:'auto', overflowX:'hidden' }} >
                <div>
                  <h2 style={{ display:'inline-block', fontWeight: 900,padding:15, fontSize:"14px", fontFamily:"Arial" }} >最新高危事件</h2>
                  <a href='/#/analyse/event' style={{ textDecoration:'none', float:'right', marginRight:40, marginTop:10}} >{ `查看更多威胁事件 >` }</a>
                </div>
                <Spin spinning={ eventLoading }  >
                  <WithTable tableData={ table.data } config={ cloumns } />
                </Spin>
              </Wrap>
              </div>
              </Col>
            </Row>
          ])
        }
      </div>
    )
  }
}

export default Page

const Wrap = props => {
  return(
    <div className={ css.wrap}  style={{ width:'100%', ...props.style, display:'inline-block',   borderRadius:6, padding:10 , backgroundColor: 'rgb(255,255,255)' }} >
      {
        props.children
      }
    </div>
  )
}