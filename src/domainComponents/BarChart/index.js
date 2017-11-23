import ReactEcharts from 'echarts-for-react';
import { connect } from 'dva'
import { Row, Col } from 'antd'

/*

const data=[
  {
    "title": "这里是标题",
    "xTitle": "x轴标题",
    "data": [
      {
      "name": "我是名字",
      "value": 10
      }
    ]
  }
]



*/




const BarChart = ({ data = [], isDark }) => {

  const textStyle = isDark
    ?
    {
      color: "rgb(183,193,204)"
    }
    :
    {
      color: "rgba(0, 0, 0, 0.85)"
    }


  const titleStyle = isDark
    ?
    {
      color: "white"
    }
    :
    {
      color: "black"
    };


  return (
    <Row key="content-panel">
      {
        data.map((i, index) => {

          const xData = i.data.map(i => i.name);
          const yData = i.data.map(i => i.value);

          return (
            <Col key={`${index}-bar-chart`}
              style={{ marginBottom: "50px", height: "480px" }}
              xs={24}
              sm={24}
              lg={24}
              md={24}>
              <ReactEcharts
                style={{ height: "100%" }}
                option={{
                  title: {
                    text: i.title,
                    x: 'center',
                    textStyle: titleStyle
                  },
                  color: ['#108ee9'],
                  tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                      type: 'shadow'
                    }
                  },
                  grid: {
                    left: '3%',
                    right: '15%',
                    bottom: '50px',
                    containLabel: true
                  },
                  xAxis: [
                    {
                      name: i.xTitle,
                      nameTextStyle: textStyle,
                      type: 'category',
                      data: xData,
                      axisTick: {
                        alignWithLabel: true
                      },
                      axisLabel: {
                        interval: 0,
                        rotate: 30,
                        textStyle: textStyle
                      },

                    }
                  ],
                  yAxis: [
                    {
                      type: 'value',
                      axisLabel: {
                        textStyle: textStyle
                      },
                    }
                  ],
                  series: [
                    {
                      type: 'bar',
                      barWidth: '22px',
                      data: yData,
                      label: {
                        normal: {
                          position: 'top',
                          show: true
                        }
                      },
                    }
                  ]
                }}>
              </ReactEcharts>
            </Col>
          )
        })
      }
    </Row>
  )
}

const mapStateToProps = state => {
  return {
    isDark: state.layout.commonLayout.darkTheme,
  }
}


export default connect(mapStateToProps)(BarChart)