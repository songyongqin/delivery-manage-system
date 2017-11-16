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
import OverviewFlow from '../Overview_Flow/Page';
import {
  NAMESPACE as FLOW_NAMESPACE
} from '../Overview_Flow/ConstConfig'

import {
  createMapDispatchWithPromise
} from '../../utils/dvaExtraDispatch'

const mapStateToProps = state => ({
  [FLOW_NAMESPACE]: state[FLOW_NAMESPACE].queryFilters
})



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
          统计数据
        </span>
        <div style={{ float: "right", marginTop: "8px" }}>
          <TimestampForm
            onSubmit={this.timestampRangeOnChange}
            defaultValue={queryFilters}>
          </TimestampForm>
        </div>
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
    this.props.onQuery({ ...filters })
  };
  timestampRangeOnChange = payload => {

    this.props.onQuery({ ...payload })
    this.props.dispatch({
      type: `${FLOW_NAMESPACE}/query`,
      payload: {
        ...this.props[FLOW_NAMESPACE],
        ...payload
      }
    })

  }
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

    return (
      <Row key="content-panel">
        {
          rankingListData.map((i, index) => {

            const data = i.data || []

            const xData = data.map(item => item.name);
            const yData = data.map(item => item.value);

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
                    // title: {
                    //   text: i.title,
                    //   x: 'center',
                    //   textStyle: titleStyle
                    // },
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
  render = () => {



    return (
      <Card
        title={this.getQueryPanel()}
        style={{ marginTop: "15px" }}>
        <JoSpin spinning={this.props.queryLoading}>
          <span>
            威胁事件
          </span>
          {
            this.getContentPanel()
          }
        </JoSpin>
        <OverviewFlow></OverviewFlow>
      </Card>

    )
  }
}

export default Page;