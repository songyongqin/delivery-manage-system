import React from 'react';
import { Menu, Button, Breadcrumb, Icon } from 'antd'
import { Tabs } from 'antd'
import { connect } from 'dva'
import classnames from 'classnames'
import ThreatEventExploit from './components/Exploit'
import ThreatEventThreatInfo from './components/ThreatInfo'
import ThreatEventTool from './components/Tool'
const TabPane = Tabs.TabPane
import ExtraIcon from 'components/Icon'


export const THREAT_EVENT_EXPLOIT = "exploits"
export const THREAT_EVENT_TOOL = "tools"

export const THREAT_EVENT_THREAT_INFO = "threatInfos"


export const threatEventKeys = [
  THREAT_EVENT_EXPLOIT,
  THREAT_EVENT_TOOL,
  THREAT_EVENT_THREAT_INFO
]

export const threatEventTextConfig = {
  title: {
    [THREAT_EVENT_EXPLOIT]: <span> <ExtraIcon type="bug"></ExtraIcon> &nbsp;&nbsp;{"攻击利用漏洞"}</span>,
    [THREAT_EVENT_TOOL]: <span><ExtraIcon type="eyedropper"></ExtraIcon>&nbsp;&nbsp;{"攻击武器（家族）"}</span>,
    [THREAT_EVENT_THREAT_INFO]: <span><Icon type="file-text"></Icon>&nbsp;&nbsp;{"威胁情报"}</span>
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
        <Tabs defaultActiveKey={this.state.defaultActiveKey} >
          {
            threatEventKeys.map(k => {
              return (
                <TabPane
                  tab={threatEventTextConfig.title[k]}
                  key={k}
                  style={{ height: this.state.panelHeight - 50, overflowY: "scroll" }}>
                  {this.getPane(k)}
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