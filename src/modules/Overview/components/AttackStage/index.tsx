import React from 'react'
import WithBar from 'components/WithBarChart'
import transformNum from 'utils/transformNum'

// 蓝紫色：#A1B8FF
// 橘色：#F8CEB3
// 浅蓝色：#7CE1FF
// 黄色：#FFDD68
// 绿色：#9DE8B5
const colorArr = ['#9DE8B5', '#A1B8FF', '#F8CEB3','#7CE1FF','#FFDD68',]

const getAixs = (data) => {
  return {
    title:{
      text:'攻击阶段分析',
      padding: 15,
      target:'self',
      textStyle: {fontFamily: "Arial", fontSize: 14 }
    },
    yAxis : [
      {
          type : 'category',
          // data : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          data: data&&data.length ? data.map(i => i.name) : [],
          axisTick: {
              alignWithLabel: true
          },
          // axisLabel:{
          //   rotate:45  
          // },
      }
  ],
  xAxis : [
      {
          type : 'value',
          name: '(次数)',
      }
  ],
  grid: {
    left: '6%',
    right: '12%',
    bottom: '6%',
    top:'15%',
    containLabel: true
},
  series : [
    {
        // name:'直接访问',
        type:'bar',
        barWidth: 20,
        // data:[10, 52, 200, 334, 390, 330, 220],
        data: data.length ?  data.map(i =>  i.value ): [] ,
        itemStyle:{
          color: function(obj){
            let num = obj&&obj.dataIndex || 0
            return colorArr[num]
          }
        },
        label: {
          normal: {
              show: true,
              // position: 'top'
              position: 'right',
              color: 'rgba(0,0,0,0.65)',
              align: 'left',
              formatter: function(params){
                let num = params.value || 0
                return transformNum(num)
              }
              // rotate: 90
          }
      },

    }
]
  }
}

const AttackStage = ({data=[]}) => {
  return(
    <div style={{ height: "100%" }}>
      <WithBar data={ data } config={getAixs(data)} />
    </div>
  )
}

export default AttackStage