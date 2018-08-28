

import PieCharts from 'domainComponents/PieCharts/async'
import React from 'react'



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
        radius: ['40%', '60%'],
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
    <div style={{ display:'inline-block', width:500, border:'1px solid rgba(0,0,0,0.3)', borderRadius:10, margin:10 }} >{ props.children }</div>
  )
}


const Pie = ({ data}) => {


  return (
    <div  >
      <Wrap>
        <PieCharts data={ data.eventBehaviorCount } titles={{ text:'威胁事件统计', link: '/#/analyse/event' }} config={getThreatEventConfig( data.eventBehaviorCount, data.threatLevelCount )}  />
      </Wrap>
      <Wrap>
        <PieCharts data={ data.attackTypeCount } titles={{ text:'威胁类型统计', link: '/#/analyse/attacker' }}   />
      </Wrap>
      <Wrap>
        <PieCharts data={ data.assetsTypeCount } titles={{ text:'资产类型统计', link: '/#/analyse/attacked-assets' }}   />
      </Wrap>
      <Wrap>
        <PieCharts data={ data.familyCount } titles={{ text:'病毒家族攻击统计', link: '/#/analyse/threat' }}   />
      </Wrap>
    
    </div>
  )
} 

export default Pie