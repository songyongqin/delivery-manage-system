import * as React from 'react'
import StrategySetting from './components/StrategySetting'
import SnortFeature from './components/SnortFeature'
import { Tabs, Row, Col, Button, Drawer, Icon } from 'antd'
import { getAppConfig } from 'domain/app'
import { get } from 'utils'
import { If } from 'components/ControlStatements'
import extraConnect from 'domainUtils/extraConnect'
import { SIMPLEFEATURECOUNT, SNORTFEATURECOUNT, SUPPORTPROTOCOLCOUNT } from './constants'
import { SYS_CONFIG_STRATEGY_SETTING, SYS_CONFIG_STRATEGY_THREAT_NAME } from 'constants/model'
import ThreatName from './components/ThreatName'
import WithAnimateRender from 'components/WithAnimateRender'
const styles = require('./style.less')
const dataItems = [
  {
    value: SIMPLEFEATURECOUNT,
    text: "简易特征数量",
    color: "#46C83D",
  },
  {
    value: SNORTFEATURECOUNT,
    text: "自定义snort特征数量",
    color: "orange",
  },
  {
    value: SUPPORTPROTOCOLCOUNT,
    text: "支持协议数量",
    color: "#1890ff",
  },
]
@extraConnect(
  state => {
    const effectsLoading = state.loading.effects
    return {
      // putLoading: effectsLoading[`${SYS_CONFIG_STRATEGY_SETTING}/put`],
    }
  },
  dispatch => {
    return {
      saveThreatNameList: payload => dispatch({
        type: `${SYS_CONFIG_STRATEGY_THREAT_NAME}/saveThreatNameList`,
        payload
      }),
      fetchThreatType: payload => dispatch({
        type: `${SYS_CONFIG_STRATEGY_THREAT_NAME}/fetch`,
        payload
      }),
      fetchDate: payload => dispatch({
        type: `${SYS_CONFIG_STRATEGY_SETTING}/fetchDate`,
        payload
      }),
    }
  }
)
@WithAnimateRender
export default class Strategy extends React.Component<any, any>{
  constructor(props) {
    super(props)
    this.state = {
      data: {},
      expanded: false,
      visible: false
    }
  }
  componentDidMount() {
    this.props.fetchDate({}).then(res => {
      this.setState({
        data: { ...res }
      })
    }
    )
    this.props.fetchThreatType({}).then(res => {
      this.props.saveThreatNameList(res.data)
    }
    )
  }
  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };
  render() {
    const { data } = this.state;
    const strategyConfig = get(getAppConfig(), ['strategyConfig'], {})
    const tabs = [
      {
        key: "simpleFeature",
        content: (
          <Tabs.TabPane tab="简易特征" key="simpleFeature">
            <StrategySetting></StrategySetting>
          </Tabs.TabPane>
        )
      },
      {
        key: "snortFeature",
        content: (
          <Tabs.TabPane tab="自定义snort特征" key="snortFeature">
            <SnortFeature></SnortFeature>
          </Tabs.TabPane>
        )
      }
    ].filter(item => strategyConfig[item.key]).map(item => item.content)

    return (
      <div>
        {
          this.props.animateRender([
            <div key="divkey">
              <Row style={{ marginTop: "10px" }}>
                {
                  dataItems.map(i => <Col key={i.value} span={5} offset={3}>
                    <div className={styles["div-box"]} style={{ background: i.color }}>
                      {i.text}<br />
                      <span style={{ fontWeight: "bold" }}>{data[i.value]}</span>
                    </div>
                  </Col>
                  )
                }
              </Row>
              <div style={{ float: "right", marginTop: "10px" }}>
                <Button
                  // disabled={putLoading || applyLoading}
                  type="primary"
                  onClick={this.showDrawer}
                  style={{ marginLeft: "15px" }}
                  icon="setting">
                  威胁类型配置
            </Button>
              </div>
            </div>,
            <Tabs key="tabskey" style={{ clear: "both" }}>
              {tabs}
            </Tabs>,

            <div key="div_Drawer_key">
              <Drawer
                width={500}
                title={<span> <Icon type="setting"></Icon>&nbsp;威胁等级配置</span>}
                placement="right"
                onClose={this.onClose}
                visible={this.state.visible}
              >
                <ThreatName></ThreatName>
              </Drawer>
            </div>
          ])
        }

      </div>
    )
  }
}