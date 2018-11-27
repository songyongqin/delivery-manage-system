

import React from 'react'
import extraConnect from 'domainUtils/extraConnect'
import { THREAT_REPORT_COUNT_NAMESPACE } from 'constants/model'
import CountItem from 'components/CountItem'
import { Icon } from 'antd'
import Spin from 'domainComponents/Spin'
import { idArr } from '../../constants'
import $ from 'jquery'

const mapStateToProps = state =>{
  return {
    state,
    loading: state.loading.effects[`${THREAT_REPORT_COUNT_NAMESPACE}/fetchCount`]
  }
}

const mapDispatchToProps = dispatch =>{
  return {
    dispatch,
    fetchCount: payload => dispatch({  
      type: `${THREAT_REPORT_COUNT_NAMESPACE}/fetchCount`,
      payload
    })
  }
}

interface props {
  timestampRange: Array<any>
  fetchCount?: (any:any) => any
  loading?: boolean
}

interface state{
  count:{
    threatEventCount:number
    threatHightEventCount:number
    threatGroup:number
    family:number
    attackSource:number
    attackedAssets:number
    threatIntelligence:number
  }
}

const getArr = obj => {
  return [
    { 
      // text:'威胁事件', 
      text: idArr[0].text,
      id: idArr[0].value,
      count: obj.threatEventCount ||0 , 
      icon: <Icon type="file-text" style={{ fontSize:21 }} />,
      style: { backgroundColor: '#2D97CE' } 
    },
    { 
      // text:'威胁高危事件', 
      text: idArr[1].text,
      id: idArr[1].value,
      count: obj.threatHightEventCount ||0 , 
      icon: <Icon type="file-excel" style={{ fontSize:21 }} />,
      style: { backgroundColor: '#BFB520' } 
    },
    { 
      // text:'威胁组织', 
      text: idArr[2].text,
      id: idArr[2].value,
      count: obj.threatGroup ||0 , 
      icon: <Icon type="api"  style={{ fontSize:21 }}/>,
      style: { backgroundColor: '#8E8726' } 
    },
    { 
      // text:'威胁家族', 
      text: idArr[3].text,
      id: idArr[3].value,
      count: obj.family ||0 , 
      icon: <Icon type="team" style={{ fontSize:21 }} />,
      style: { backgroundColor: '#160A55' } 
    },
    { 
      // text:'攻击来源', 
      text: idArr[4].text,
      id: idArr[4].value,
      count: obj.attackSource ||0 , 
      icon: <Icon type="shrink" style={{ fontSize:21 }} />,
      style: { backgroundColor: '#3B17F3' } 
    },
    { 
      // text:'受攻击资产', 
      text: idArr[5].text,
      id: idArr[5].value,
      count: obj.attackedAssets ||0 , 
      icon: <Icon type="pay-circle-o" style={{ fontSize:21 }} />,
      style: { backgroundColor: 'rgb(16, 119, 18)' } 
    },
    { 
      // text:'威胁情报', 
      text: idArr[6].text,
      id: idArr[6].value,
      count: obj.threatIntelligence ||0 , 
      icon: <Icon type="line-chart" style={{ fontSize:21 }} />,
      style: { backgroundColor: '#900D1D' } 
    },
  ]
}

@extraConnect(mapStateToProps, mapDispatchToProps)
class Count extends React.Component<props, state>{
  constructor(props){
    super(props)
    this.state={
      count:{
        threatEventCount:0,
        threatHightEventCount:0,
        threatGroup:0,
        family:0,
        attackSource:0,
        attackedAssets:0,
        threatIntelligence:0
      }
    }
  }
  componentDidMount(){
    this.fetchCount()
  }

  scroll = e => {
    // console.log(e.currentTarget.dataset.id)
    let key = e.currentTarget.dataset.id
    // try{
    //   $('html, body').stop()
    //   $('html, body').animate({
    //     scrollTop: $(`#${key}`).offset().top - 100
    //   }, 300)
    // }catch(e){
    //   console.error(e)
    // }
  }

  fetchCount = () => {
    let timestampRange = this.props.timestampRange
    this.props.fetchCount({ timestampRange })
    .then( res => {
      if(res.threatEventCount||res.threatEventCount===0){
        this.setState({ count: res })
      }
    } )
    .catch( err => console.error(err)  )
  }

  render(){
    const { count } = this.state
    const arr = getArr(count)
    return (
      <div style={{ marginTop: 10 }} >
      <Spin  spinning={ this.props.loading }  >
        {
          arr.map((item, index)=> 
          <div key={ index } style={{ marginLeft: 30, marginRight:30,  display:'inline-block', cursor:"pointer" }} 
          data-id={ item.id } onClick={ this.scroll } >
            <CountItem  title={ item.text } count={ item.count } key={index}
                        style={ item.style }  >
              { item.icon }
            </CountItem>
          </div>
          )
        }
      </Spin>
      </div>
    )
  }
}


export default Count