import * as React from 'react'
import styles from './styles.css'
import { Menu, Button, Breadcrumb, Popover, Icon, Tooltip, message as Message, Modal } from 'antd'
import Spin from 'domainComponents/Spin'
import { connect } from 'dva'
import classnames from 'classnames'
import $ from 'jquery'
import {
  THREAT_NAME_NAME_DATAINDEX,
  THREAT_NAME_LEVEL_DATAINDEX,
} from './constants'
import * as tableConfig from './tableConfig'
import Table from 'domainComponents/Table'
import * as tools from 'utils'
import { SYS_CONFIG_STRATEGY_THREAT_NAME } from 'constants/model'
import TableWithRemote from 'domainComponents/TableWithRemote'
import Card from 'domainComponents/Card'
import extraConnect from 'domainUtils/extraConnect'
import WithModal from 'components/WithModal'
import CreateForm from './CreateForm'

@WithModal()
@extraConnect(
  state => {
    const effectsLoading = state.loading.effects
    return {
      fetchLoading: effectsLoading[`${SYS_CONFIG_STRATEGY_THREAT_NAME}/fetch`],
      putLoading: effectsLoading[`${SYS_CONFIG_STRATEGY_THREAT_NAME}/put`],
      deleteLoading: effectsLoading[`${SYS_CONFIG_STRATEGY_THREAT_NAME}/delete`],
      postLoading: effectsLoading[`${SYS_CONFIG_STRATEGY_THREAT_NAME}/post`],
      threatNameList: state[SYS_CONFIG_STRATEGY_THREAT_NAME].threatNameList
    }
  },
  dispatch => {
    return {
      saveThreatNameList: payload => dispatch({
        type: `${SYS_CONFIG_STRATEGY_THREAT_NAME}/saveThreatNameList`,
        payload
      }),
      put: payload => dispatch({
        type: `${SYS_CONFIG_STRATEGY_THREAT_NAME}/put`,
        payload
      }),
      delete: payload => dispatch({
        type: `${SYS_CONFIG_STRATEGY_THREAT_NAME}/delete`,
        payload
      }),
      post: payload => dispatch({
        type: `${SYS_CONFIG_STRATEGY_THREAT_NAME}/post`,
        payload
      })
    }
  }
)
class Page extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      createVisible: false,
      lastReqTime: 0,
    }
  }
  reload = () => {
    this.setState({
      lastReqTime: new Date().getTime()
    })
  }
  onPutClick = payload => {
    this.props.put([payload]).then(this.reload)
  }
  onDeleteClick = payload => {
    this.props.delete({ key: payload["key"] }).then(this.reload)
  }
  onSubmit = payload => {
    this.props.post(payload).then(_ => {
      Message.success("添加成功")
      this.props.setModalVisible("create", false)
      this.reload()
    })
  }
  render() {

    const { fetchLoading, putLoading, deleteLoading, postLoading } = this.props

    return (
      <Card
        style={{ height: "100%" }}
        title={
          <div>
            <Icon type="setting"></Icon>&nbsp;威胁等级配置
          </div>
        }>
        <div style={{ overflow: "hidden" }}>
          <Button
            disabled={fetchLoading || putLoading || deleteLoading}
            type="primary"
            onClick={_ => this.props.setModalVisible("create", true)}
            icon="plus">
            添加
            </Button>
          {/* <Button
            disabled={fetchLoading}
            type="primary"
            style={{
              marginLeft: "15px"
            }}
            icon="save">
            保存
            </Button> */}
          <Button
            disabled={fetchLoading || putLoading || deleteLoading}
            style={{ float: "right", marginLeft: "10px" }}
            icon="menu-unfold"
            onClick={_ => this.props.onExpandChange(false)}
            type="primary">
          </Button>
          <Tooltip title="重新加载" placement="bottomLeft">
            <Button
              disabled={fetchLoading || putLoading || deleteLoading}
              style={{ float: "right" }}
              onClick={this.reload}
              type="primary">
              {
                fetchLoading
                  ?
                  <Icon type="loading"></Icon>
                  :
                  <Icon type="reload"></Icon>
              }
            </Button>
          </Tooltip>
        </div>
        <TableWithRemote
          loading={fetchLoading || putLoading || deleteLoading}
          key={`${this.state.lastReqTime}-table`}
          onDataChange={payload => this.props.saveThreatNameList(payload.data)}
          getColumns={option => {
            return tableConfig.getColumns({
              ...option,
              handle: {
                put: this.onPutClick,
                delete: this.onDeleteClick
              }
            })
          }}
          remoteNamespace={SYS_CONFIG_STRATEGY_THREAT_NAME}
          pagination={false} />
        <Modal
          destroyOnClose={true}
          footer={null}
          closable={!postLoading}
          visible={this.props.modalVisible["create"]}
          onCancel={_ => this.props.setModalVisible("create", false)}
          title={
            <div><Icon type="plus"></Icon>&nbsp;新增特征</div>
          }>
          <CreateForm
            onSubmit={this.onSubmit}
            loading={postLoading}
            threatNameList={this.props.threatNameList.map(i => i["name"])}>
          </CreateForm>
        </Modal>
      </Card>
    )
  }
}

export default Page
