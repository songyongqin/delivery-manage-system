

import React , { Component } from 'react'
import echarts from 'echarts'


const data2 = {
  "name": "flare",
  "children": [
      {
          "name": "flex",
          "children": [
              {"name": "FlareVis", "value": 4116}
          ]
      },
      {
          "name": "scale",
          "children": [
              {"name": "IScaleMap", "value": 2105},
              {"name": "LinearScale", "value": 1316},
              {"name": "LogScale", "value": 3151},
              {"name": "OrdinalScale", "value": 3770},
              {"name": "QuantileScale", "value": 2435},
              {"name": "QuantitativeScale", "value": 4839},
              {"name": "RootScale", "value": 1756},
              {"name": "Scale", "value": 4268},
              {"name": "ScaleType", "value": 1821},
              {"name": "TimeScale", "value": 5833}
         ]
      },
      {
          "name": "display",
          "children": [
              {"name": "DirtySprite", "value": 8833}
         ]
      }
  ]
};


const  option = {
  tooltip: {
      trigger: 'item',
      triggerOn: 'mousemove'
  },
  legend: {
      top: '2%',
      left: '3%',
      orient: 'vertical',
      data: [{
          name: 'tree1',
          icon: 'rectangle'
      } ,
      {
          name: 'tree2',
          icon: 'rectangle'
      }],
      borderColor: '#c23531'
  },
  series:[
      {
          type: 'tree',
          name: 'tree2',
          data: [data2],
          // orient: 'RL' ,
          top: '10%',
          left: '10%',
          bottom: '10%',
          right: '18%',

          symbolSize: 7,
          // layout: 'orthogonal',
          // orient: 'RL' ,
          label: {
              normal: {
                  position: 'left',
                  verticalAlign: 'middle',
                  align: 'right'
              }
          },

          leaves: {
              label: {
                  normal: {
                      position: 'right',
                      verticalAlign: 'middle',
                      align: 'left'
                  }
              }
          },

          expandAndCollapse: true,

          animationDuration: 550,
          animationDurationUpdate: 750
      }
  ]
}


class Tree extends Component{
  myEcharts=null
  componentDidMount(){
    let id = document.getElementById('tree')
    this.myEcharts = echarts.init(id)
    this.myEcharts.setOption(option)
  }

  render(){
    return (
      <div id='tree' style={{ width:400, height:400 }} ></div>
    )
  }
}


export default Tree