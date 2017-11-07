import React from 'react';
import styles from './styles.css'
import classnames from 'classnames';
import { Menu, Button, Breadcrumb, Table, Icon, Row, Col, Badge, Modal } from 'antd';
import { queryContainerGenerator } from '../../Generators/QueryContainerrGenerator/QueryContainerGenerator';
import JoSpin from '../../components/JoSpin/index';
import EnhanciveTable from '../../domainComponents/EnhanciveTable/index';
import * as tools from '../../utils/tools.js';
import {

  NAMESPACE,
} from './ConstConfig';

import JoIcon from '../../components/JoIcon';
import { Link } from 'dva/router';
import ThreatEvent from '../ThreatEvent/Page';
import { routerRedux } from 'dva/router';
import CountUp from 'react-countup';
import WithOnQuery from '../../Generators/QueryContainerDecorator/WithOnQuery';
import WithPageOnChange from '../../Generators/QueryContainerDecorator/WithPageOnChangeQuery';
import ReactEcharts from 'echarts-for-react';
import TimestampForm from '../../components/TimestampForm';
import Card from '../../domainComponents/Card';

@queryContainerGenerator({
  namespace: NAMESPACE,
})
@WithOnQuery(NAMESPACE)
@WithPageOnChange(NAMESPACE)
class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      activeKey: null,
    }
  }
  getQueryPanel = () => {
    const { routes, commonLayout } = this.props;
    const { queryFilters } = this.props[NAMESPACE];

    return (
      <div key="query-panel" style={{ overflow: "hidden" }}>
        <span>
          主要协议排行
        </span>
        {/* <div style={{ float: "right", marginTop: "8px" }}>
          <TimestampForm
            onSubmit={this.timestampRangeOnChange}
            defaultValue={queryFilters}>
          </TimestampForm>
        </div> */}
      </div>
    )
  };
  switchModal = () => {
    this.setState({
      visible: !this.state.visible
    })
  }
  setActiveKey = (key) => {
    this.setState({
      activeKey: key,
    })
  }
  tableOnChange = (pagination, filters, sorter) => {
    this.props.onQuery({ ...filters, page: 1 })
  };
  getData = () => {
    function randomData() {
      now = new Date(+now + oneDay);
      value = value + Math.random() * 21 - 10;
      return {
        name: now.toString(),
        value: [
          [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
          Math.round(value)
        ]
      }
    }

    var data = [];
    var now = +new Date(1997, 9, 3);
    var oneDay = 24 * 3600 * 1000;
    var value = Math.random() * 1000;
    for (var i = 0; i < 1000; i++) {
      data.push(randomData());
    }
    return data;
  }
  monitor = () => {


    return <Col span={24}>
      <ReactEcharts option={{
        title: {
          text: '动态数据 + 时间坐标轴'
        },
        tooltip: {
          trigger: 'axis',
          formatter: function (params) {
            params = params[0];
            var date = new Date(params.name);
            return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];
          },
          axisPointer: {
            animation: false
          }
        },
        xAxis: {
          type: 'time',
          splitLine: {
            show: false
          }
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '100%'],
          splitLine: {
            show: false
          }
        },
        series: [{
          name: '模拟数据',
          type: 'line',
          showSymbol: false,
          hoverAnimation: false,
          data: this.getData()
        },
        {
          name: '模拟数据2',
          type: 'line',
          showSymbol: false,
          hoverAnimation: false,
          data: this.getData()
        }]
      }}>

      </ReactEcharts></Col>
  }
  timestampRangeOnChange = payload => this.props.onQuery({ ...payload })
  getContentPanel = () => {
    const { routes, commonLayout } = this.props;

    const { queryResults } = this.props[NAMESPACE];
    const { data: rankingListData } = queryResults;
    const isDark = commonLayout.darkTheme;

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

    const color = ['#108ee9', "#f04134"]

    return (
      <Row key="content-panel">
        {
          rankingListData.map((i, index) => {
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
                    color: [color[index]],
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
                    yAxis: [
                      {

                        type: 'category',
                        data: xData,
                        axisTick: {
                          alignWithLabel: true
                        },
                        axisLabel: {
                          interval: 0,
                          // rotate: 30,
                          textStyle: textStyle
                        },

                      }
                    ],
                    xAxis: [
                      {
                        name: i.xTitle,
                        nameTextStyle: textStyle,
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
                            position: 'right',
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
        {this.monitor()}

      </Row>
    )
  }
  render = () => {



    return (
      <Card
        title={this.getQueryPanel()}
        style={{ marginTop: "15px" }}>
        <JoSpin spinning={this.props.queryLoading}>
          {
            this.getContentPanel()
          }
        </JoSpin>
      </Card>

    )
  }
}

export default Page;
