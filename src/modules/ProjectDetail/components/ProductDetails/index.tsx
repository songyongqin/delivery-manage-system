
import * as React from 'react'
import { Collapse,Form, Button, Tabs } from 'antd';
const { Panel } = Collapse;
const styles = require("./styles.less")
import tranformTime from 'utils/tranformTime'
import UpdateForm from '../UpdateForm'
const { TabPane } = Tabs
import ApplicationTesting from '../ApplicationTesting'
import AuthorCanning from '../AuthorCanning'
import ApplicationTestingAdd from '../add/ApplicationTestingAdd'
import AuthorCanningAdd from '../add/AuthorCanningAdd'

class ProjectDetails extends React.Component<any, any> {

  state = {
    currentKey:'2',
    popApplicationTestingAdd: false,
    popAuthorCanningAdd: false,

  }
  closeApplicationTestingAdd = () => {
    this.setState({
      popApplicationTestingAdd: false
    })
  }
  closeAuthorCanningAdd = () => {
    this.setState({
      popAuthorCanningAdd: false
    })
  }
  tabChange = (key)=> {
    this.setState({
      currentKey: key
    })
  }
  handleAdd = ()=> {
    const {currentKey} = this.state
    switch(currentKey) {
      case "1": this.setState({popApplicationTestingAdd:true});break;
      case "2": this.setState({popAuthorCanningAdd:true});break;
    }
  }
  render() {
    const {currentKey, popApplicationTestingAdd, popAuthorCanningAdd} = this.state
    const {productName, productVersion, deviceID, productNumber, productState,applicationTesting=[],authorizationAfterCanning=[],pid} = this.props.data
    const headers = (
      <div>
        <span style={{fontSize:16}}>{productName}</span>
        <span style={{fontSize:14,marginLeft:15}}>产品版本号：<span style={{fontSize:12}}>{productVersion}</span></span>
        <span style={{fontSize:14,marginLeft:15}}>设备ID：<span style={{fontSize:12}}>{deviceID}</span></span>
        <span style={{fontSize:14,marginLeft:15}}>产品编号：<span style={{fontSize:12}}>{productNumber}</span></span>
        <span style={{fontSize:14,marginLeft:15}}>产品状态：<span style={{fontSize:12}}>{productState}</span></span>
      </div>
    )
    return (
      <div>
        <Collapse>
          <Panel header = {headers} key="1" className={styles['tabs']}>
            <Tabs defaultActiveKey={currentKey} onChange={this.tabChange}>
              <TabPane tab="申请测试单" key="1">
                <ApplicationTesting data = {applicationTesting} id={this.props.id} pid={pid} getTable={this.props.getTable} />
              </TabPane>
              <TabPane tab="灌装后授权单" key="2">
                <AuthorCanning data = {authorizationAfterCanning} id={this.props.id} pid={pid} getTable={this.props.getTable}/>
              </TabPane>
              <TabPane tab="出货测试单" key="3">
                Content of Tab Pane 3
              </TabPane>
              <TabPane tab="出货检查单" key="4">
                Content of Tab Pane 3
              </TabPane>
              <TabPane tab="授权记录" key="5">
                Content of Tab Pane 3
              </TabPane>
            </Tabs>
            <span></span>
            <Button type="primary" className={styles['addBtn']} onClick={this.handleAdd}>+创建文档</Button>
          </Panel>
          <ApplicationTestingAdd id={this.props.id} pid={pid} getTable={this.props.getTable} popVisible={popApplicationTestingAdd} closePop={this.closeApplicationTestingAdd} />
          <AuthorCanningAdd id={this.props.id} pid={pid} getTable={this.props.getTable} popVisible={popAuthorCanningAdd} closePop={this.closeAuthorCanningAdd} />
        </Collapse>
      </div>
    )
  }

}
export default ProjectDetails