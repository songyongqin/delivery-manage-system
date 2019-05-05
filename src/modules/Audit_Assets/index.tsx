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
const styles = require('./styles.less')

class Page extends React.Component<any, any> {
  constructor(props) {
    super(props)
    this.state = {
      lastReqTime: 0,
      // activeKey: "net-basic"
    }
  }
  change = () => {

    this.setState({
      lastReqTime: new Date().getTime()
    })
  }
  render() {
    const { initialFilters, lastReqTime } = this.state;

    return (
      <div className={ styles.tabs } >
        <Tabs defaultActiveKey='assetsList' >
          <Tabs.TabPane tab="资产列表" key="assetsList">
            <Wrap >
              <AssetsList changeRecord={this.change}></AssetsList>
            </Wrap>
          </Tabs.TabPane>
          <Tabs.TabPane tab="资产扫描记录" key="assetsScanRecord">
            <Wrap>
              <ScanRecord key={lastReqTime}></ScanRecord>
            </Wrap>
          </Tabs.TabPane>
        </Tabs>

      </div>
    )
  }
}

export default Page; 

const Wrap = props => <div style={{ padding:25, backgroundColor:'#ffffff', borderTop: '1px solid rgba(0,0,0,0.35)' }} >{ props.children }</div>