import React from 'react';
// import styles from './styles.css'
import { Menu, Button, Breadcrumb } from 'antd';
import { Tabs } from 'antd';
import { connect } from 'dva';
import classnames from 'classnames';
// import {
//   threatEventTextConfig,
//   threatEventKeys,
//   THREAT_EVENT_EXPLOIT,
//   THREAT_EVENT_TOOL,
//   THREAT_EVENT_THREAT_INFO
// } from './ConstConfig';
import ThreatEventExploit from './containers/Exploit'
import ThreatEventThreatInfo from './containers/ThreatInfo'
import ThreatEventTool from './containers/Tool'
// import ThreatEventTool from '../ThreatEvent_Tool/Page';
// import ThreatEventThreatInfo from '../ThreatEvent_ThreatInfo/Page';
const TabPane = Tabs.TabPane;


export const THREAT_EVENT_EXPLOIT = "exploits";
export const THREAT_EVENT_TOOL = "tools";

export const THREAT_EVENT_THREAT_INFO = "threatInfos";


export const threatEventKeys = [
  THREAT_EVENT_EXPLOIT,
  THREAT_EVENT_TOOL,
  THREAT_EVENT_THREAT_INFO
]

export const threatEventTextConfig = {
  title: {
    [THREAT_EVENT_EXPLOIT]: <span>&nbsp;&nbsp;{"攻击利用漏洞"}</span>,
    [THREAT_EVENT_TOOL]: <span>&nbsp;&nbsp;{"攻击武器（家族）"}</span>,
    [THREAT_EVENT_THREAT_INFO]: <span>&nbsp;&nbsp;{"威胁情报"}</span>
  }
}


function mapStateToProps(state) {
  const { commonLayout } = state.layout;
  return {
    commonLayout,
  }
}



@connect(mapStateToProps)
class Page extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      defaultActiveKey: props.activeKey || threatEventKeys[0],
      panelHeight: 700,
    }

  }
  componentDidMount() {
    this.resizeHeight()
    window.addEventListener("resize", this.resizeHeight)
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeHeight)
  }
  con = null
  resizeHeight = () => {
    try {
      this.setState({
        panelHeight: this.con.offsetHeight
      })
    } catch (e) {

    }
  }
  getPane = (key) => {
    if (key === THREAT_EVENT_EXPLOIT) {
      return <ThreatEventExploit initialFilters={this.props.initialFilters} />
    }
    if (key === THREAT_EVENT_TOOL) {
      return <ThreatEventTool initialFilters={this.props.initialFilters} />
    }
    if (key === THREAT_EVENT_THREAT_INFO) {
      return <ThreatEventThreatInfo initialFilters={this.props.initialFilters} />
    }
  }
  render() {

    const pageClasses = classnames({
      // [styles["page"]]: true,
      // [styles["page-dark"]]: this.props.commonLayout.darkTheme
    })

    return (
      <div className={pageClasses} ref={con => this.con = con} style={{ height: "100%" }}>
        {/* <ThreatEventExploit></ThreatEventExploit> */}
        <Tabs defaultActiveKey={this.state.defaultActiveKey} >
          {
            threatEventKeys.map(k => {
              return (
                <TabPane
                  tab={threatEventTextConfig.title[k]}
                  key={k}
                  style={{ height: this.state.panelHeight - 50, overflowY: "scroll" }}>
                  {/* <div className={styles["threat-event-item-wrapper"]}> */}
                  {this.getPane(k)}
                  {/* </div> */}
                </TabPane>
              )
            })
          }

        </Tabs>
      </div>
    )
  }
}

export default Page;