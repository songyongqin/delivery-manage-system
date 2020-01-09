
import * as React from 'react'
import { Collapse,Form, Button, Tabs } from 'antd';
const { Panel } = Collapse;
const styles = require("./styles.less")
import tranformTime from 'utils/tranformTime'
import UpdateForm from '../UpdateForm'
const { TabPane } = Tabs
import ApplicationTesting from '../ApplicationTesting'
import AuthorCanning from '../AuthorCanning'
import DeliveryTesting from '../DeliveryTesting'
import DeliveryChecklist from '../DeliveryChecklist'
import AuthorizationRecord from '../AuthorizationRecord'
import ApplicationTestingAdd from '../add/ApplicationTestingAdd'
import AuthorCanningAdd from '../add/AuthorCanningAdd'
import DeliveryTestingAdd from '../add/DeliveryTestingAdd'
import DeliveryChecklistAdd from '../add/DeliveryChecklistAdd'
import AuthorizationRecordAdd from '../add/AuthorizationRecordAdd'


class ProjectDetails extends React.Component<any, any> {

  state = {
    currentKey:'3',
    popApplicationTestingAdd: false,
    popAuthorCanningAdd: false,
    popDeliveryTestingAdd: false,
    popDeliveryChecklistAdd: false,
    popAuthorizationRecordAdd: false,
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
  closeDeliveryTestingAdd = () => {
    this.setState({
      popDeliveryTestingAdd: false
    })
  }
  closeDeliveryChecklistAdd = () => {
    this.setState({
      popDeliveryChecklistAdd: false
    })
  }
  closeAuthorizationRecordAdd = () => {
    this.setState({
      popAuthorizationRecordAdd: false
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
      case "3": this.setState({popDeliveryTestingAdd:true});break;
      case "4": this.setState({popDeliveryChecklistAdd:true});break;
      case "5": this.setState({popAuthorizationRecordAdd:true});break;
    }
  }

  render() {
    const {currentKey, popApplicationTestingAdd, popAuthorCanningAdd, popDeliveryTestingAdd, popDeliveryChecklistAdd, popAuthorizationRecordAdd} = this.state
    const {productName, productVersion, deviceID, productNumber, productState,applicationTesting=[],authorizationAfterCanning=[], deliveryTestSheet =[],authorizationRecord=[], deliveryChecklist=[],pid} = this.props.data
    const headers = (
      <div>
        <span style={{fontSize:16}}>{productName}</span>
        <span style={{fontSize:14,marginLeft:15}}>产品版本号：<span style={{fontSize:12}}>{productVersion}</span></span>
        <span style={{fontSize:14,marginLeft:15}}>设备ID：<span style={{fontSize:12}}>{deviceID}</span></span>
        <span style={{fontSize:14,marginLeft:15}}>产品编号：<span style={{fontSize:12}}>{productNumber}</span></span>
        <span style={{fontSize:14,marginLeft:15}}>产品状态：<span style={{fontSize:12}}>{productState}</span></span>
      </div>
    )
    const {role, index} = this.props
    let disabled = false 
    if(role===3){
      disabled = true
    } else {
      const xx = {
        '1': applicationTesting,
        '2': authorizationAfterCanning,
        '3': deliveryTestSheet,
        '4': deliveryChecklist,
        '5': authorizationRecord
      }
      if(xx[currentKey]&&xx[currentKey].length!==0 && currentKey !== '5'){
        disabled = true
      }else {
        disabled = false
      }
    }
    return (
      <div>
        <Collapse >
          <Panel header = {headers} key="1" className={styles['tabs']}>
            <Tabs defaultActiveKey={currentKey} onChange={this.tabChange}>
              <TabPane tab="申请测试单" key="1">
                <ApplicationTesting role={role} data = {applicationTesting} id={this.props.id} pid={pid} getTable={this.props.getTable} />
              </TabPane>
              <TabPane tab="灌装后授权单" key="2">
                <AuthorCanning role={role} data = {authorizationAfterCanning} id={this.props.id} pid={pid} getTable={this.props.getTable}/>
              </TabPane>
              <TabPane tab="出货测试单" key="3">
                <DeliveryTesting role={role} data = {deliveryTestSheet} id={this.props.id} pid={pid} getTable={this.props.getTable}/>
              </TabPane>
              <TabPane tab="出货检查单" key="4">
                <DeliveryChecklist role={role} data = {deliveryChecklist} id={this.props.id} pid={pid} getTable={this.props.getTable}/>
              </TabPane>
              <TabPane tab="授权记录" key="5">
                <AuthorizationRecord role={role} data = {authorizationRecord} id={this.props.id} pid={pid} getTable={this.props.getTable} />
              </TabPane>
            </Tabs>
            <span></span>
            <Button type="primary" className={styles['addBtn']} onClick={this.handleAdd} disabled={ disabled }>+创建文档</Button>
          </Panel>
          <ApplicationTestingAdd id={this.props.id} pid={pid} getTable={this.props.getTable} popVisible={popApplicationTestingAdd} closePop={this.closeApplicationTestingAdd} />
          <AuthorCanningAdd id={this.props.id} pid={pid} getTable={this.props.getTable} popVisible={popAuthorCanningAdd} closePop={this.closeAuthorCanningAdd} />
          <DeliveryTestingAdd id={this.props.id} pid={pid} getTable={this.props.getTable} popVisible={popDeliveryTestingAdd} closePop={this.closeDeliveryTestingAdd} />
          <DeliveryChecklistAdd id={this.props.id} pid={pid} getTable={this.props.getTable} popVisible={popDeliveryChecklistAdd} closePop={this.closeDeliveryChecklistAdd} />
          <AuthorizationRecordAdd id={this.props.id} pid={pid} getTable={this.props.getTable} popVisible={popAuthorizationRecordAdd} closePop={this.closeAuthorizationRecordAdd} />
        </Collapse>
      </div>
    )
  }

}
export default ProjectDetails