import * as React from 'react'
import TableWithRemote from 'domainComponents/TableWithRemote'
import { SYS_CONFIG_STRATEGY_SETTING, SYS_CONFIG_STRATEGY_RULE } from 'constants/model'
import { getColumns, getExpandedRowRenderer } from './tableConfig'
import Card from 'domainComponents/Card'
import { Button, Icon, message as Message, Modal } from 'antd'
import extraConnect from 'domainUtils/extraConnect'
import Spin from 'domainComponents/Spin'
import WithModal from 'components/WithModal'
import RuleForm from './RuleForm'
import { PROTOCOLTYPE_DATAINDEX } from '../../constants'


@WithModal()
@extraConnect(
  state => {
    return {
      putLoading: state.loading.effects[`${SYS_CONFIG_STRATEGY_SETTING}/put`],
      applyLoading: state.loading.effects[`${SYS_CONFIG_STRATEGY_SETTING}/apply`],
      postLoading: state.loading.effects[`${SYS_CONFIG_STRATEGY_RULE}/post`]
    }
  },
  dispatch => {
    return {
      put: payload => dispatch({
        type: `${SYS_CONFIG_STRATEGY_SETTING}/put`,
        payload
      }),
      apply: _ => dispatch({
        type: `${SYS_CONFIG_STRATEGY_SETTING}/apply`,
      }),
      post: payload => dispatch({
        type: `${SYS_CONFIG_STRATEGY_RULE}/post`,
        payload
      })
    }
  }
)
export default class StrategySetting extends React.Component<any, any>{
  constructor(props) {
    super(props)
    this.state = {
      selectedRows: [],
      lastReqTime: 0,
      expandedRowKeys: [],
      data: []
    }
  }
  onSwitchClick = (payload) => {
    this.props.put(payload).then(_ => Message.success("修改成功"))
  }
  onShowClick = (records) => {
    const { key } = records
    const { expandedRowKeys } = this.state

    this.setState({
      expandedRowKeys: expandedRowKeys.includes(key)
        ?
        expandedRowKeys.filter(k => k !== key)
        :
        [...expandedRowKeys, key]
    })
  }
  onMulSwitchClick = value => {
    const { selectedRows } = this.state

    this.props.put(selectedRows.reduce((target, item) => {
      target[item["protocolType"]] = value ? 1 : 0
      return target
    }, {}))
      .then(_ => {
        Message.success("修改成功")
        this.setState({
          selectedRows: [],
          lastReqTime: new Date().getTime()
        })
      })

  }
  onSubmit = payload => {
    return this.props.post(payload).then(_ => {
      Message.success("添加成功")
      this.props.setModalVisible("create", false)
      this.setState({
        lastReqTime: new Date().getTime()
      })
    })
  }
  onExpandRowChange = _ => {
    this.setState({
      selectedRows: [],
      lastReqTime: new Date().getTime()
    })
  }
  onApplyClick = () => {
    this.props.apply().then(_ => Message.success("应用成功"))
  }
  render() {

    const { selectedRows } = this.state
    const { putLoading, applyLoading } = this.props

    const title = (
      <div style={{ overflow: "hidden" }}>
        <div style={{ float: "left" }}>
          <Button.Group>
            <Button type="primary"
              onClick={_ => this.onMulSwitchClick(true)}
              disabled={selectedRows.length === 0 || putLoading || applyLoading}>
              <Icon type="check" />启用
                </Button>
            <Button type="danger"
              onClick={_ => this.onMulSwitchClick(false)}
              disabled={selectedRows.length === 0 || putLoading || applyLoading}
              className="btn-danger">
              关闭<Icon type="close" />
            </Button>
          </Button.Group>
          <Button type="primary"
            icon="plus"
            onClick={_ => this.props.setModalVisible("create", true)}
            disabled={putLoading || applyLoading}
            style={{ marginLeft: "15px" }}>
            新增特征
          </Button>
        </div>
        <div style={{ float: "right" }}>
          <Button
            type="primary"
            onClick={this.onApplyClick}
            loading={applyLoading}
            disabled={putLoading}
            icon="save">
            应用
          </Button>
          <Button
            disabled={putLoading || applyLoading}
            type="primary"
            style={{ marginLeft: "15px" }}
            icon="setting">
            威胁等级配置
          </Button>
        </div>
      </div>
    )

    return (
      <div style={{ padding: "5px" }}>
        <Spin spinning={putLoading}>
          <Card title={title}>
            <TableWithRemote
              onDataChange={payload => this.setState({ data: payload.data })}
              getExpandedRowRenderer={option => {
                return getExpandedRowRenderer({
                  ...option,
                  expandedRowKeys: this.state.expandedRowKeys,
                  onChange: this.onExpandRowChange
                })
              }}
              getKey={(item, index) => `${item["protocolType"]}-item`}
              tableProps={{
                expandIconAsCell: false,
                expandIconColumnIndex: -1,
                expandedRowKeys: this.state.expandedRowKeys
              }}
              key={`${this.state.lastReqTime}-table-with-remote`}
              rowSelection={{
                onChange: (_, selectedRows) => {
                  this.setState({
                    selectedRows
                  })
                }
              }}
              pagination={false}
              getColumns={options => {
                return getColumns({
                  ...options,
                  expandedRowKeys: this.state.expandedRowKeys,
                  handle: {
                    show: this.onShowClick,
                    switch: this.onSwitchClick
                  }
                })
              }}
              remoteNamespace={SYS_CONFIG_STRATEGY_SETTING}>
            </TableWithRemote>
          </Card>
        </Spin>
        <Modal
          title={
            <div>
              <Icon type="plus"></Icon>&nbsp;添加新的规则
            </div>
          }
          destroyOnClose={true}
          closable={!this.props.postLoading}
          footer={null}
          onCancel={_ => this.props.setModalVisible("create", false)}
          visible={this.props.modalVisible["create"]}>
          <RuleForm
            loading={this.props.postLoading}
            onSubmit={this.onSubmit}
            create={true}
            protocolTypes={[...new Set(this.state.data.map(i => i[PROTOCOLTYPE_DATAINDEX]))]}>
          </RuleForm>
        </Modal>
      </div>
    )
  }
}



