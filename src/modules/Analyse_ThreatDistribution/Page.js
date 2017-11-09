import React from 'react';
import styles from './styles.css'
import { Menu, Button, Breadcrumb, Radio } from 'antd';
import echarts from 'echarts';
import ReactEcharts from 'echarts-for-react';
import WorldMap from '../../configs/world';
import ChinaMap from '../../configs/china';
import { queryContainerGenerator } from '../../Generators/QueryContainerrGenerator/QueryContainerGenerator';
import WithOnQuery from '../../Generators/QueryContainerDecorator/WithOnQuery';
import { createMapDispatchWithPromise } from '../../utils/dvaExtraDispatch'
import JoSpin from '../../components/JoSpin'
import {
  NAMESPACE
} from './ConstConfig'
echarts.registerMap("world", WorldMap);
echarts.registerMap("china", ChinaMap);



const getOption = ({ data, isDark, mapType = "world" }) => {
  const values = data.map(i => i.value);
  const textStyle = isDark
    ?
    {
      color: "white"
    }
    :
    {
      color: "rgba(0,0,0,0.85)"
    }

  const option = {
    tooltip: {
      trigger: 'item',
      formatter: function (params) {
        // var value = (params.value + '').split('.');
        // console.info(value);
        // value = value[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,')
        //   + '.' + value[1];
        const { name } = params;
        const itemData = data.filter(i => i.name === name)
        if (itemData.length === 0) {
          return;
        }
        return "威胁分布" + '<br/>' + itemData[0].title + ' : ' + (params.value || 0) + "(攻击次数)";
      }
    },
    // toolbox: {
    //   show: true,
    //   orient: 'vertical',
    //   left: 'right',
    //   top: 'center',
    //   feature: {
    //     dataView: { readOnly: false },
    //     restore: {},
    //     saveAsImage: {}
    //   }
    // },
    grid: {
      left: '0',
      right: '0',
      bottom: '0',
      containLabel: true
    },
    series: [
      {
        name: '',
        type: 'map',
        map: mapType,
        roam: true,
        itemStyle: {
          emphasis: {
            areaColor: false,
            label: { show: false }
          }
        },
        scaleLimit: {
          min: 1
        },
        zoom: 1.2,
        data
      }
    ]
  }

  if (mapType === "china") {
    option.series[0].center = [105, 36]
  } else {
    option.series[0].center = [10, 15]
  }
  if (data.length !== 0) {
    option.visualMap = {
      min: 0,
      max: Math.max(...values),
      text: ['最大值', '最小值'],
      realtime: false,
      calculable: true,
      textStyle: textStyle,
      inRange: {
        color: ["#f79992", "#d73435"]
      },
      // left: "0",
      // top: "10px"
    }
  }

  return option;

}

const mapStateToProps = state => ({
  mapType: state[NAMESPACE].mapType,
})


const mapDispatchToProps = dispatch => ({
  switchMapType: payload => dispatch({
    type: `${NAMESPACE}/switchMapType`,
    payload
  })
})

@queryContainerGenerator({
  namespace: NAMESPACE,
  mapStateToProps,
  mapDispatchToProps: createMapDispatchWithPromise(mapDispatchToProps)
})
@WithOnQuery(NAMESPACE)
class Page extends React.Component {
  state = {
    height: 500
  }
  getQueryPanel = () => {
    const { routes, commonLayout } = this.props;
    const { queryFilters } = this.props[NAMESPACE];
    return (
      <div key="query-panel" style={{ marginTop: "15px" }}>
        {this.props.getContainerHeader({
          routes,
          queryFilters,
          onQuery: this.props.onQuery
        })}
      </div>
    )
  };
  componentDidMount = () => {
    this.setHeight();
    window.addEventListener("resize", this.setHeight)
  }
  componentWillUnmount = () => {
    window.removeEventListener("resize", this.setHeight)
  }
  setHeight = () => this.setState({
    height: document.body.offsetHeight - 250
  })
  getContentPanel = () => {
    const { queryResults } = this.props[NAMESPACE];
    const { data } = queryResults;
    const { mapType, commonLayout } = this.props;
    const isDark = commonLayout.darkTheme;
    return (
      <div key="query-result">
        <Radio.Group value={mapType} onChange={this.props.switchMapType}>
          <Radio.Button value="world">
            全球分布
          </Radio.Button>
          <Radio.Button value="china">
            国内分布
          </Radio.Button>
        </Radio.Group>
        <ReactEcharts
          onEvents={{
            georoam: (...rest) => {
              console.info(rest)
            }
          }}
          onChartReady={() => {
            console.info("xxxxx");
          }}
          option={getOption({ isDark, data: data[mapType], mapType })}
          style={{ width: "100%", height: this.state.height + "px" }}></ReactEcharts>
      </div>
    )

  }
  render = () => {

    return (
      <div>
        <JoSpin spinning={this.props.queryLoading}>
          {this.props.animateRender([
            this.getQueryPanel(),
            this.getContentPanel()
          ])}
        </JoSpin>
      </div>
    )
  }
}

export default Page;
