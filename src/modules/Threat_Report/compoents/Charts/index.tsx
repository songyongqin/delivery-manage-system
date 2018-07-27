

import React from 'react'
import Spin from 'domainComponents/Spin'
import { THREAT_REPORT_DETAIL_NAMESPACE } from 'constants/model'
import extraConnect from 'domainUtils/extraConnect'
import PieCharts from 'domainComponents/PieCharts/async'
import { Icon } from 'antd'
import transformNum from 'utils/transformNum'


const mapStateToProps = state => {
  return {
    state,
    loading : state.loading.effects[`${THREAT_REPORT_DETAIL_NAMESPACE}/fetchDetail`]
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    fetchDetail: payload => dispatch({
      type: `${THREAT_REPORT_DETAIL_NAMESPACE}/fetchDetail`,
      payload
    }) 
  }
}

interface props{
  loading?:boolean
  fetchDetail?: (any:any)=>any
  timestampRange: Array<any>
}

interface state{
  data:{
    level:Array<object>
    threatEvent:Array<object>
    group:Array<object>
    attackedAssets:Array<object>
    family:Array<object>
    threatIntelligence:Array<object>
    attackedAssetsTotal:number
    familyTotal:number
    groupTotal:number
    threatEventTotal:number
    threatIntelligenceTotal:number
  }
}

const getNum = (name, data) => {
  let arr = data.filter(i=> i.name===name ) || data
  return arr[0].value+13154234523424
}

const getConfig = data => ({
  title: { },
  tooltip: {
    trigger: 'item',
    formatter: "{b} : {c} ({d}%)"
  },
  legend: {
    orient: 'vertical',
    right: 'right',
    bottom: '10',
    data: Array.isArray(data) ? data.map(i => i.name) : [],
    formatter: function (name) {
      return   name +'  ' + getNum(name, data);
  }
  },

  series: [
    {
      type: 'pie',
      radius: ['0','60%'],
      center: ['40%', '40%'],
      data: data,
      label: {
        normal: {
          show: false,
          position: "outside",
          formatter: "{b} : {c} ({d}%)"
        },

      },
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
})


@extraConnect(mapStateToProps, mapDispatchToProps)
class Charts extends React.Component<props,state>{
  constructor(props){
    super(props)
    this.state={
      data:{
        level:[],
        threatEvent:[],
        group:[],
        attackedAssets:[],
        family:[],
        threatIntelligence:[],
        attackedAssetsTotal:0,
        familyTotal:0,
        groupTotal:0,
        threatEventTotal:0,
        threatIntelligenceTotal:0,
      }
    }
  }

  componentDidMount(){
    this.fetchDetail()
  }



  fetchDetail = () => {
    let timestampRange = this.props.timestampRange
    this.props.fetchDetail({ timestampRange })
    .then(res => this.setState({ data: res }) )
    .catch(err => console.error(err) )
  }

  onChartClick = parmas => {
    console.log('xx', parmas)
  }


  render(){
    const { loading } = this.props
    const { data } = this.state
    const onEvents = { 'click': this.onChartClick, }
    console.log(transformNum(1423353323))
    return(
      <div>
        <Spin spinning={ loading } >
          <div style={ { width:400 } } >
          <div><Icon type="pie-chart" style={{ fontSize:22 }} />威胁事件: -{data.groupTotal}起</div>
          <PieCharts data={ data.group }  onEvents={ onEvents } config={ getConfig(data.group) }  />
          </div>
        </Spin>
      </div>
    )
  }
}


export default Charts