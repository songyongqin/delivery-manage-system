/**
 * Created by jojo on 2017/9/6.
 */
import React from 'react';
import styles from './styles.css'
import { Menu, Button, Breadcrumb } from 'antd';
import { Tabs } from 'antd';
import { connect } from 'dva';
import classnames from 'classnames';
import {
  threatEventTextConfig,
  threatEventKeys,
  THREAT_EVENT_EXPLOIT,
  THREAT_EVENT_TOOL,
  THREAT_EVENT_THREAT_INFO
} from './ConstConfig';
import ThreatEventExploit from '../ThreatEvent_Exploit/Page';
import ThreatEventTool from '../ThreatEvent_Tool/Page';
import ThreatEventThreatInfo from '../ThreatEvent_ThreatInfo/Page';
const TabPane = Tabs.TabPane;


function mapStateToProps(state) {
  const { commonLayout } = state.layout;
  return {
    commonLayout,
  }
}

@connect(mapStateToProps)
class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultActiveKey: props.defaultActiveKey || threatEventKeys[0],
      panelHeight: 700,
    }

  }
  componentDidMount = () => {
    this.resizeHeight()
    window.addEventListener("resize", this.resizeHeight)
  }
  componentWillUnmount = () => {
    window.removeEventListener("resize", this.resizeHeight)
  }
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
      return <ThreatEventExploit timestampRange={this.props.timestampRange} />
    }
    if (key === THREAT_EVENT_TOOL) {
      return <ThreatEventTool timestampRange={this.props.timestampRange} />
    }
    if (key === THREAT_EVENT_THREAT_INFO) {
      return <ThreatEventThreatInfo timestampRange={this.props.timestampRange} />
    }
  }
  render = () => {

    const pageClasses = classnames({
      [styles["page"]]: true,
      [styles["page-dark"]]: this.props.commonLayout.darkTheme
    })

    return (
      <div className={pageClasses} ref={target => this.con = target}>
        <Tabs defaultActiveKey={this.state.defaultActiveKey} >
          {
            threatEventKeys.map(k => {
              return (
                <TabPane
                  tab={threatEventTextConfig.title[k]}
                  key={k}
                  style={{ height: this.state.panelHeight - 100, overflowY: "scroll" }}>
                  <div className={styles["threat-event-item-wrapper"]}>
                    {this.getPane(k)}
                  </div>
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
