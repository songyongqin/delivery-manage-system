

import PieCharts from 'domainComponents/PieCharts/async'
import React from 'react'



const getThreatEventConfig = (eventBehaviorCount, threatLevelCount) => {
  let obj = {}
  
  if(!threatLevelCount||!eventBehaviorCount) return obj
  threatLevelCount[0]['selected'] = true
  obj['series'] = [
    {
        // name:'访问来源',
        type:'pie',
        selectedMode: 'single',
        radius: [0, '25%'],

        label: {
            normal: {
                position: 'inner'
            }
        },
        labelLine: {
            normal: {
                show: false
            }
        },
        data:threatLevelCount
    },
    {
        name:'威胁类型',
        type:'pie',
        radius: ['35%', '50%'],
        label: {
            normal: {
                formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
                backgroundColor: '#eee',
                borderColor: '#aaa',
                borderWidth: 1,
                borderRadius: 4,
                // shadowBlur:3,
                // shadowOffsetX: 2,
                // shadowOffsetY: 2,
                // shadowColor: '#999',
                // padding: [0, 7],
                rich: {
                    a: {
                        color: '#999',
                        lineHeight: 22,
                        align: 'center'
                    },
                    // abg: {
                    //     backgroundColor: '#333',
                    //     width: '100%',
                    //     align: 'right',
                    //     height: 22,
                    //     borderRadius: [4, 4, 0, 0]
                    // },
                    hr: {
                        borderColor: '#aaa',
                        width: '100%',
                        borderWidth: 0.5,
                        height: 0
                    },
                    b: {
                        fontSize: 16,
                        lineHeight: 33
                    },
                    per: {
                        color: '#eee',
                        backgroundColor: '#334455',
                        padding: [2, 4],
                        borderRadius: 2
                    }
                }
            },
        },
        lableLine: {
          normal: {
              show: true,
              smooth:true,
              length:20
          },
          emphasis: {
              show: true
          }
      },
        data:eventBehaviorCount
    }
]
  return obj
}

const Wrap = props => {
  return (
    <div style={{ display:'inline-block', width:500 }} >{ props.children }</div>
  )
}


const Pie = ({ data}) => {


  return (
    <div  >
      <Wrap>
        <PieCharts data={ data.eventBehaviorCount } titles={{ text:'威胁事件统计', link: '/#/analyse/event' }} config={getThreatEventConfig( data.eventBehaviorCount, data.threatLevelCount )}  />
      </Wrap>
      <Wrap>
        <PieCharts data={ data.attackTypeCount } titles={{ text:'攻击类型统计', link: '/#/analyse/attack' }}   />
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