import * as React from 'react'
import { Menu, Button, Breadcrumb, Tabs } from 'antd'
import extraConnect from 'domainUtils/extraConnect'
import System from './components/System'
import Capture from './components/Capture'
import Pcap from './components/Pcap'
import NetBasic from './components/NetBasic'
import DateRangePicker from 'domainComponents/DateRangePicker'
import { last } from 'utils';

class Page extends React.Component<any, any> {
  constructor(props) {
    super(props)
    this.state = {
      initialFilters: {
        timestampRange: [],
        page: 1,
        limit: 10,
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
    return (
      <div style={{ position: "relative" }}>
        <div style={{ float: "right", position: "absolute", right: "0", top: "-45px" }}>
          <DateRangePicker
            value={initialFilters.timestampRange}
            onChange={this.timestampRangeOnChange}>
          </DateRangePicker>
        </div>
        <Tabs onChange={this.onChange} activeKey={this.state.activeKey} key={`${lastReqTime}-tabs`}>
          <Tabs.TabPane tab="网络基础数据" key="net-basic">
            <NetBasic
              initialFilters={{ ...initialFilters, protocolType: "HTTP" }}>
            </NetBasic>
          </Tabs.TabPane>
          <Tabs.TabPane tab="系统行为" key="system">
            <System
              initialFilters={initialFilters}>
            </System>
          </Tabs.TabPane>
          <Tabs.TabPane tab="捕获文件" key="capture">
            <Capture
              initialFilters={initialFilters}>
            </Capture>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Pcap下载" key="pcap">
            <Pcap
              initialFilters={initialFilters}>
            </Pcap>
          </Tabs.TabPane>
        </Tabs>
      </div>
    )
  }
}

export default Page; 
