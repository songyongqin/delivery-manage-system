

import React from 'react'
import extraConnect from 'domainUtils/extraConnect'
import { THREAT_REPORT_COUNT_NAMESPACE } from 'constants/model'
import CountItem from 'components/CountItem'
import { Icon, Col, Row } from 'antd'
import Spin from 'domainComponents/Spin'
import { idArr } from '../../constants'
import $ from 'jquery'
import { ThreatEvent, HightEvent, AttackSource, AttackAsset, ThreatIoc, AttackGroup, ThreatFamliy }  from 'components/IconSvg'
const styles = require('./index.less')


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
      icon: <ThreatEvent />,
      unit: '起',
    },
    { 
      // text:'威胁高危事件', 
      text: idArr[1].text,
      id: idArr[1].value,
      count: obj.threatHightEventCount ||0 , 
      icon: <HightEvent />,
      unit: '起',
    },
    { 
      // text:'攻击来源', 
      text: idArr[4].text,
      id: idArr[4].value,
      count: obj.attackSource ||0 , 
      icon: <AttackSource />,
      unit: '个',
    },
    { 
      // text:'受攻击资产', 
      text: idArr[5].text,
      id: idArr[5].value,
      count: obj.attackedAssets ||0 , 
      icon: <AttackAsset />,
      unit: '台',
    },
    { 
      // text:'威胁情报', 
      text: idArr[6].text,
      id: idArr[6].value,
      count: obj.threatIntelligence ||0 , 
      icon: <ThreatIoc />,
      unit: '条',
    },
    { 
      // text:'威胁组织', 
      text: idArr[2].text,
      id: idArr[2].value,
      count: obj.threatGroup ||0 , 
      icon: <AttackGroup/>,
      unit: '个',
    },
    { 
      // text:'威胁家族', 
      text: idArr[3].text,
      id: idArr[3].value,
      count: obj.family ||0 , 
      icon: <ThreatFamliy  />,
      unit: '个',
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
        <div className={ styles.count } >
          {
            arr.map((item, index)=> 
            <div key={ index } 
            data-id={ item.id } onClick={ this.scroll } >
              <ItemCount Icon={ item.icon } title={ item.text } count={ item.count } unit={ item.unit }  />
            </div>
            )
          }
        </div>

      </Spin>
      </div>
    )
  }
}


export default Count


const ItemCount = ({ Icon, title, count, unit }) => {
  return (
    <div className={ styles.container }  >
      <div style={{ color: "#4F5DCA" }} >{ Icon }</div>
      <div style={{  color: 'rgba(0,0,0,0.65)' }} >{ title }</div>
      <div>
        <span style={{ fontSize: 16 }} >{ count }</span>
        <span style={{  color: 'rgba(0,0,0,0.65)' }}  >{ unit }</span>
      </div>
    </div>
  )
}