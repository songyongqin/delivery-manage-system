import * as React from 'react'
import { Menu, Button, Breadcrumb, Tabs } from 'antd'
import extraConnect from 'domainUtils/extraConnect'
import System from './components/System'
import Capture from './components/Capture'
import Pcap from './components/Pcap'
import NetBasic from './components/NetBasic'
import DateRangePicker from 'domainComponents/DateRangePicker'
import LimitNetBasic from './components/LimitNetBasic'
import { last } from 'utils'
import { getAppConfig } from 'domain/app'
import { get } from 'utils'
import { If, Choose, When, Otherwise } from 'components/ControlStatements'

class Page extends React.Component<any, any> {
  constructor(props) {
    super(props)
    this.state = {
      initialFilters: {
        timestampRange: [],
        page: 1,
        limit: 10,
        threatJudge: [],
        url: "",
        sourceIP: "",
        sourcePort: "",
        requestDomain: "",
        sender: "",
        receiver: "",
        value: ""
      },
      lastReqTime: 0,
      activeKey: "net-basic"
    }
  }
  timestampRangeOnChange = payload => {
    this.setState({
      initialFilters: {
        ...this.state.initialFilters,
        ...payload
      },
      lastReqTime: new Date().getTime(),
    })
  }
  onChange = activeKey => this.setState({ activeKey })
  render() {
    const { initialFilters, lastReqTime } = this.state

    const overallConfig = getAppConfig()["overall"] || {}

    const tabs = [
      {
        key: "netBasic",
        content: (
          <Tabs.TabPane tab="网络基础数据" key="net-basic">
            <NetBasic
              initialFilters={{ ...initialFilters, protocolType: "HTTP" }}>
            </NetBasic>
          </Tabs.TabPane>
        )
      },
      {
        key: "limitNetBasic",
        content: (
          <Tabs.TabPane tab="异常可疑网络数据" key="limit-net">
            <LimitNetBasic initialFilters={initialFilters}></LimitNetBasic>
          </Tabs.TabPane>
        )
      },
      {
        key: "system",
        content: (
          <Tabs.TabPane tab="系统行为" key="system">
            <System
              initialFilters={initialFilters}>
            </System>
          </Tabs.TabPane>
        )
      },
      {
        key: "capture",
        content: (
          <Tabs.TabPane tab="捕获文件" key="capture">
            <Capture
              initialFilters={initialFilters}>
            </Capture>
          </Tabs.TabPane>
        )
      },
      {
        key: "pcap",
        content: (
          <Tabs.TabPane tab="Pcap下载" key="pcap">
            <Pcap
              initialFilters={initialFilters}>
            </Pcap>
          </Tabs.TabPane>
        )
      },
    ].filter(item => overallConfig[item["key"]]).map(item => item["content"])


    return (
      <div style={{ position: "relative" }}>
        <div style={{ float: "right", position: "absolute", right: "0", top: "-45px" }}>
          <DateRangePicker
            value={initialFilters.timestampRange}
            onChange={this.timestampRangeOnChange}>
          </DateRangePicker>
        </div>
        <Tabs onChange={this.onChange} activeKey={this.state.activeKey} key={`${lastReqTime}-tabs`}>
          {tabs}
        </Tabs>
      </div>
    )
  }
}

export default Page; 
