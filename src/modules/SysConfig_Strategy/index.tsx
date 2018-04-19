import * as React from 'react'
import StrategySetting from './components/StrategySetting'
import WhiteList from './components/WhiteList'
import { Tabs } from 'antd'

export default class Strategy extends React.Component<any, any>{
  render() {

    return (
      <div>
        <Tabs>
          <Tabs.TabPane tab="策略配置" key="strategy-setting">
            <StrategySetting></StrategySetting>
          </Tabs.TabPane>
          <Tabs.TabPane tab="白名单配置" key="white-strategy-setting">
            <WhiteList></WhiteList>
          </Tabs.TabPane>
        </Tabs>
      </div>
    )
  }
}