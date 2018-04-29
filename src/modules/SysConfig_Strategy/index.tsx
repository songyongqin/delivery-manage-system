import * as React from 'react'
import StrategySetting from './components/StrategySetting'
import WhiteList from './components/WhiteList'
import { Tabs } from 'antd'
import { getAppConfig } from 'domain/app'
import { get } from 'utils'
import { If } from 'components/ControlStatements'

export default class Strategy extends React.Component<any, any>{
  render() {

    const strategyConfig = get(getAppConfig(), ['strategyConfig'], {})

    const tabs = [
      {
        key: "strategy",
        content: (
          <Tabs.TabPane tab="策略配置" key="strategy-setting">
            <StrategySetting></StrategySetting>
          </Tabs.TabPane>
        )
      },
      {
        key: "white",
        content: (
          <Tabs.TabPane tab="白名单配置" key="white-strategy-setting">
            <WhiteList></WhiteList>
          </Tabs.TabPane>
        )
      }
    ].filter(item => strategyConfig[item.key]).map(item => item.content)

    return (
      <div>
        <Tabs>
          {tabs}
        </Tabs>
      </div>
    )
  }
}