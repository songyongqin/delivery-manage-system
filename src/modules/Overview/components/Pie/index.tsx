

import PieCharts from 'domainComponents/PieCharts/async'
import React from 'react'
import { Row, Col } from 'antd';
// import { isArray, sum } from 'lodash'
import AnalysePie from 'components/AnalysePie'
const styles = require('./index.less')


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
        radius: [0, '25%'],
        center: ['25%', '55%'],
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
        center: ['25%', '55%'],
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
    <div className={ styles.container } >
      { props.children }
    </div>
  )
}



const Pie = ({ data}) => {
  
  let obj = getThreatEventConfig( data.eventBehaviorCount, data.threatLevelCount )
  let series = obj&&obj['series']&&obj['series']
  return (
    <Row justify={ 'space-between' } gutter={ 20 } style={{ height: "100%" }} >
      <Col span={6} style={{ height: "100%" }}>
        <Wrap>
          <PieCharts addNum  data={ data.eventBehaviorCount } titles={{ text:'威胁事件', link: '/#/analyse/event', textAlign: 'left', x:'left'  }} config={{series }}  />
        </Wrap>
      </Col>
      <Col span={6} style={{ height: "100%" }}>
      <AnalysePie data={ data.attackTypeCount } text={ '威胁类型' } link={ '/#/analyse/attacker' } addNum />
      </Col>
      <Col span={6} style={{ height: "100%" }}>
        <AnalysePie data={ data.assetsTypeCount } text={ '受攻击资产状态' } link={ '/#/analyse/attacked-assets' } addNum />
      </Col>
      <Col span={6} style={{ height: "100%" }}>
        <AnalysePie data={ data.familyCount } text={ '威胁家族' } link={ '/#/analyse/threat' } addNum />
      </Col>
    </Row>
  )
} 

export default Pie