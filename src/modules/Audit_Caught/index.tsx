import * as React from 'react'
import { Menu, Button, Breadcrumb, Tabs, Modal, message, Icon } from 'antd'
import extraConnect from 'domainUtils/extraConnect'
import CaughtRecord from './components/CaughtRecord'
import CaughtTask from './components/CaughtTask'
import DateRangePicker from 'domainComponents/DateRangePicker'
import SetTaskForm from './components/setTaskForm'
import { AUDIT_CAUGHTTASK_NAMESPACE } from 'constants/model'
import { last } from 'utils'
import { getAppConfig } from 'domain/app'
import { get } from 'utils'
import { If, Choose, When, Otherwise } from 'components/ControlStatements'
@extraConnect(
  state => {
    return {
      loading: state.loading.effects[`${AUDIT_CAUGHTTASK_NAMESPACE}/postCaughtTask`]
    }
  },
  dispatch => {
    return {
      postCaughtTask: payload => dispatch(
        {
          type: `${AUDIT_CAUGHTTASK_NAMESPACE}/postCaughtTask`,
          payload
        }
      ),
      fetch: payload => dispatch(
        {
          type: `${AUDIT_CAUGHTTASK_NAMESPACE}/fetch`,
          payload
        }
      ),
    }
  }
)
class Page extends React.Component<any, any> {
  constructor(props) {
    super(props)
    this.state = {
      initialFilters: {
        page: 1,
        limit: 15,
      },
      lastReqTime: 0,
      visible: false
    }
  }
  showModal = () => {
    this.setState({ visible: true })
  }
  handleOk = (values) => {
    this.props.postCaughtTask(values).then(res => {
      message.success('提交成功！')
      this.setState({
        visible: false,
      })
      this.props.fetch(this.state.initialFilters)
    }
    )
  }
  handleCancel = (e) => {
    this.setState({
      visible: false
    });
  }

  render() {
    const { initialFilters, lastReqTime } = this.state;

    return (
      <div>
        <div style={{ position: "relative" }}>
          <Button type="primary" style={{ position: "absolute", right: "0", zIndex: "999" }} onClick={this.showModal}>新建任务</Button>
        </div>
        <Tabs>
          <Tabs.TabPane tab="抓包记录" key="caughtRecord">
            <CaughtRecord></CaughtRecord>
          </Tabs.TabPane>
          <Tabs.TabPane tab="抓包任务" key="caughtTask">
            <CaughtTask></CaughtTask>
          </Tabs.TabPane>
        </Tabs>
        <Modal
          destroyOnClose={true}
          title={<span><Icon type="edit" />&nbsp;新建抓包任务</span>}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onOk={this.handleOk}
          footer={null}
        >
          <SetTaskForm onOk={this.handleOk}></SetTaskForm>
        </Modal>
      </div >
    )
  }
}

export default Page; 
