

import React from 'react'
import Spin from 'domainComponents/Spin'
import { THREAT_REPORT_NEW_CHART_NAMESPACE } from 'constants/model'
import extraConnect from 'domainUtils/extraConnect'
import Pie from '../Pie'
import PieTwo from '../PieTwo'
import Bar from '../Bar'



const mapStateToProps = state => {
  return {
    state,
    detailLoading : state.loading.effects[`${THREAT_REPORT_NEW_CHART_NAMESPACE}/fetchDetail`],
    loading: state.loading.effects[`${THREAT_REPORT_NEW_CHART_NAMESPACE}/fetch`]
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    fetch: payload => dispatch({
      type: `${THREAT_REPORT_NEW_CHART_NAMESPACE}/fetch`,
      payload
    }),
    fetchDetail: payload => dispatch({
      type: `${THREAT_REPORT_NEW_CHART_NAMESPACE}/fetchDetail`,
      payload
    }) 
  }
}

interface props{
  loading?:boolean
  fetchDetail?: (any:any)=>any
  getClick: (any:any)=>any
  timestampRange: Array<any>

  fetch?: (any:any)=>any
  detailLoading?:boolean
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
  rank:{
    threatSourceCountry: rankRes
    threatSourceProvince: rankRes
    attackerIp: rankRes
    threatEvent: rankRes
    attackedAssets: rankRes
  }
}


interface rankRes{
  // title: string
  data: Array<arrItem>
}

interface arrItem{
  name: string
  value: number
}

const Wrap = props => 
  <span style={{ display:'inline-block', width:605, margin:5 }} >
    <Spin spinning={ props.spinning } >{ props.children }</Spin>
  </span>


@extraConnect(mapStateToProps, mapDispatchToProps)
class NewChart extends React.Component<props,state>{
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
      },
      rank:{
        threatSourceCountry: {
          data:[{ name:'',value:0 }]
        },
        threatSourceProvince: {
          data:[{ name:'',value:0 }]
        },
        attackerIp: {
          data:[{ name:'',value:0 }]
        },
        threatEvent: {
          data:[{ name:'',value:0 }]
        },
        attackedAssets: {
          data:[{ name:'',value:0 }]
        },
      }
    }
  }

  componentDidMount(){
    this.fetchDetail()
    this.fetch()
  }

  fetch = () => {
    let timestampRange = this.props.timestampRange
    this.props.fetch({ timestampRange })
    .then(res => this.setState({ rank: res }) )
    .catch(err => console.error(err) )
  }



  fetchDetail = () => {
    let timestampRange = this.props.timestampRange
    this.props.fetchDetail({ timestampRange })
    .then(res => this.setState({ data: res }) )
    .catch(err => console.error(err) )
  }


  clickTitle = title => {
    console.log(title)
    this.props.getClick(title)
  }


  render(){
    const { loading, detailLoading } = this.props
    const { data, rank } = this.state
    const arrPie = [
      { 
        data: data.group, 
        title: '威胁组织', 
        total: data.groupTotal, 
        unit: '个' 
      },
      { 
        data: data.attackedAssets, 
        title: '受攻击资产', 
        total: data.attackedAssetsTotal, 
        unit: '台' 
      },
      { 
        data: data.family, 
        title: '威胁家族', 
        total: data.familyTotal, 
        unit: '个' 
      },
      { 
        data: data.threatIntelligence, 
        title: '威胁情报', 
        total: data.threatIntelligenceTotal, 
        unit: '条' 
      }
    ]

    const arrRank = [
      { 
        data: rank.threatSourceCountry.data, 
        title: '威胁来源国家排行TOP10' 
      },
      { 
        data: rank.threatSourceProvince.data, 
        title: '威胁来源国内省份排行TOP10' 
      },
      { 
        data: rank.attackerIp.data, 
        title: '攻击者IP排行TOP10' 
      },
      { 
        data: rank.threatEvent.data, 
        title: '威胁事件类型排行TOP10' 
      },
      { 
        data: rank.attackedAssets.data, 
        title: '受攻击资产IP排行TOP10' 
      },
    ]

    return(
      <div>
        <Wrap spinning={ detailLoading } >
          <PieTwo  data={ data.level } onClick={ this.clickTitle } 
                title={ '威胁事件' }
                data2={ data.threatEvent }
                total={ data.threatEventTotal }
                unit={ '起' } />
        </Wrap>
          {
            arrPie.map((item, index) => 
            <Wrap spinning={ detailLoading } key={ index } >
              <Pie  data={ item.data } onClick={ this.clickTitle } 
                  title={ item.title }
                  total={ item.total }
                  unit={ item.unit }
                   />
            </Wrap>
          )
          }
          {
          arrRank.map((item, index) => 
          <Wrap spinning={ loading } key={ index } >
            <Bar data={ item.data } title={ item.title } key={ index } /> 
          </Wrap>
         )
        }
        
      </div>
    )
  }
}


export default NewChart