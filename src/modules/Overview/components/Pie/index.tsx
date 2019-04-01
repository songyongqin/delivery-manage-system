

import PieCharts from 'domainComponents/PieCharts/async'
import React from 'react'
import { Row, Col } from 'antd';
import { isArray, sum } from 'lodash'


const getThreatEventConfig = (eventBehaviorCount, threatLevelCount) => {
  let obj = {}
  
  if(!threatLevelCount||!eventBehaviorCount) return obj
  if(threatLevelCount.length){
    threatLevelCount[0]['selected'] = false
  }
  obj['series'] = [
    {
        // name:'访问来源',
        type:'pie',
        selectedMode: 'single',
        radius: [0, '30%'],
        center: ['25%', '60%'],
        minAngle:5,
        label: {
          normal: {
            show: false,
            position: "outside",
            formatter: "{b} : {c} ({d}%)"
          },
  
        },
        data: Array.isArray(threatLevelCount) ? threatLevelCount.filter(i => i.value) : []
    },
    {
        // name:'威胁类型',
        type:'pie',
        radius: ['35%','45%'],
        center: ['25%', '60%'],
        minAngle:5,
        label: {
          normal: {
            show: false,
            position: "outside",
            formatter: "{b} : {c} ({d}%)"
          },
  
        },
        data:  Array.isArray(eventBehaviorCount) ? eventBehaviorCount.filter(i => i.value) : []
    }
]
  return obj
}

const Wrap = props => {
  return (
    <div style={{ width:'100%', height:'100%', display:'inline-block',  position:'relative' ,border:'1px solid rgba(0,0,0,0.3)', borderRadius:10, backgroundColor: 'rgb(255,255,255)' }} >{ props.children }</div>
  )
}

const getTotal = (arr) => {
  if(!isArray(arr)||(isArray(arr)&&arr.length===0)){
    return '0'
  }
  else {
    let array = arr.map(i => typeof i.value ==='number' ? i.value : 0 )
    return `${sum(array)}`
  }
}

const Total = ({ num }) => {
  const needAddComma = num >1000000;
  let str = needAddComma ? `${addComma(Math.round(num/1000))}万` : addComma(Math.round(num))
  return (
    <div style={{ position: "absolute",bottom: "40%", marginBottom: "-6px", width:'100%', textAlign:'center', fontSize: "12px",marginLeft: "-25%", }} >
      { str }
    </div>
  )
}


const addComma = num => (num+'').replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g,'$1,')

const Pie = ({ data}) => {
  return (
    <Row justify={ 'space-between' } gutter={ 20 } style={{ height: "100%" }} >
      <Col span={6} style={{ height: "100%" }}>
        <Wrap>
          <PieCharts data={ data.eventBehaviorCount } titles={{ text:'威胁事件统计', link: '/#/analyse/event' }} config={getThreatEventConfig( data.eventBehaviorCount, data.threatLevelCount )}  />
        </Wrap>
      </Col>
      <Col span={6} style={{ height: "100%" }}>
      <Wrap>
        <PieCharts data={ data.attackTypeCount } titles={{ text:'威胁类型统计', link: '/#/analyse/attacker' }}   />
        <Total num={ getTotal(data.attackTypeCount) } />
      </Wrap>
      </Col>
      <Col span={6} style={{ height: "100%" }}>
      <Wrap>
        <PieCharts data={ data.assetsTypeCount } titles={{ text:'资产类型统计', link: '/#/analyse/attacked-assets' }}   />
        <Total num={ getTotal(data.assetsTypeCount) } />
      </Wrap>
      </Col>
      <Col span={6} style={{ height: "100%" }}>
      <Wrap>
        <PieCharts data={ data.familyCount } titles={{ text:'病毒家族攻击统计', link: '/#/analyse/threat' }}   />
        <Total num={ getTotal(data.familyCount) } />
      </Wrap>
      </Col>
    </Row>
  )
} 

export default Pie