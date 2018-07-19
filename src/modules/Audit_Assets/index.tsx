import * as React from 'react'
import { Menu, Button, Breadcrumb, Tabs } from 'antd'
import extraConnect from 'domainUtils/extraConnect'
import AssetsList from './components/AssetsList'
import ScanRecord from './components/ScanRecord/'
import DateRangePicker from 'domainComponents/DateRangePicker'
import { last } from 'utils'
import { getAppConfig } from 'domain/app'
import { get } from 'utils'
import { If, Choose, When, Otherwise } from 'components/ControlStatements'

class Page extends React.Component<any, any> {
  constructor(props) {
    super(props)
    this.state = {
      lastReqTime: 0,
      // activeKey: "net-basic"
    }
  }
  render() {
    const { initialFilters, lastReqTime } = this.state;

    return (
      <div>
        <Tabs>
          <Tabs.TabPane tab="资产列表" key="assetsList">
            <AssetsList></AssetsList>
          </Tabs.TabPane>
          <Tabs.TabPane tab="资产扫描记录" key="assetsScanRecord">
            <ScanRecord></ScanRecord>
          </Tabs.TabPane>
        </Tabs>

      </div>
    )
  }
}

export default Page; 
