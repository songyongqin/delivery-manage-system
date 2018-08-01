


import React from 'react'
import extraConnect from 'domainUtils/extraConnect'
import Spin from 'domainComponents/Spin'
import { THREAT_REPORT_RANK_NAMESPACE } from 'constants/model'
// import WithBarChart from  'components/WithBarChart'
import Bar from '../Bar'

const mapStateToProps = state => {
  return {
    state,
    loading: state.loading.effects[`${THREAT_REPORT_RANK_NAMESPACE}/fetch`]
  }
}

const mapDispatchToprops = dispatch => {
  return {
    dispatch,
    fetch: payload => dispatch({
      type: `${THREAT_REPORT_RANK_NAMESPACE}/fetch`,
      payload
    })
  }
}

interface props{
  fetch?: (any:any)=>any
  loading?: boolean
  timestampRange: Array<number>
}

interface state{
  rank:{
    threatSourceCountry: rankRes
    threatSourceProvince: rankRes
    attackerIp: rankRes
    threatEvent: rankRes
    attackedAssets: rankRes
  }
}

interface rankRes{
  title: string
  data: Array<arrItem>
}

interface arrItem{
  name: string
  value: number
}

@extraConnect(mapStateToProps, mapDispatchToprops)
class Rank extends React.Component<props, state>{
  constructor(props){
    super(props)
    this.state={
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
    this.fetch()
  }

  fetch = () => {
    let timestampRange = this.props.timestampRange
    this.props.fetch({ timestampRange })
    .then(res => this.setState({ rank: res }) )
    .catch(err => console.error(err) )
  }

  render(){
    const { rank } = this.state
    const arr = [
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
    return (
      <Spin spinning={ this.props.loading } >
        {
          arr.map((item, index) => 
          <Bar data={ item.data } title={ item.title } key={ index } /> 
         )
        }
        <div style={{ display:'inline-block', width:605, margin: 5 }} ></div>
      </Spin>
    )
  }

}

export default Rank