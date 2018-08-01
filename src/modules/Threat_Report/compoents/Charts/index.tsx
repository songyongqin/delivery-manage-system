

import React from 'react'
import Spin from 'domainComponents/Spin'
import { THREAT_REPORT_DETAIL_NAMESPACE } from 'constants/model'
import extraConnect from 'domainUtils/extraConnect'
import Pie from '../Pie'
import PieTwo from '../PieTwo'

const css = require('./index.less')


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
  getClick: (any:any)=>any
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


  clickTitle = title => {
    console.log(title)
    this.props.getClick(title)
  }


  render(){
    const { loading } = this.props
    const { data } = this.state
    const arr = [
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
    return(
      <div>
        <Spin spinning={ loading } >
          <PieTwo  data={ data.level } onClick={ this.clickTitle } 
                title={ '威胁事件' }
                data2={ data.threatEvent }
                total={ data.threatEventTotal }
                unit={ '起' } />
          {
            arr.map((item, index) => 
            <Pie  data={ item.data } onClick={ this.clickTitle } 
                title={ item.title }
                total={ item.total }
                unit={ item.unit }
                key={ index } />
          )
          }
          <div className={ css.place }>
          <span style={{ display:'inline-block', verticalAlign:'top' }} ></span>
          </div>
        </Spin>
      </div>
    )
  }
}


export default Charts