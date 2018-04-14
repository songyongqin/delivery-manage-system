import * as React from 'react'
import TableWithRemote from 'domainComponents/TableWithRemote'
import { SYS_CONFIG_STRATEGY_SETTING } from 'constants/model'
import { getColumns, getExpandedRowRenderer } from './tableConfig'
import Card from 'domainComponents/Card'
import { Button, Icon, message as Message } from 'antd'
import extraConnect from 'domainUtils/extraConnect'
import Spin from 'domainComponents/Spin'


@extraConnect(
  state => {
    return {
      putLoading: state.loading.effects[`${SYS_CONFIG_STRATEGY_SETTING}/put`]
    }
  },
  dispatch => {
    return {
      put: payload => dispatch({
        type: `${SYS_CONFIG_STRATEGY_SETTING}/put`,
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
      lastReqTime: 0
    }
  }
  onSwitchClick = (payload) => {
    this.props.put(payload).then(_ => Message.success("修改成功"))
  }
  onShowClick = () => {

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
  render() {

    const { selectedRows } = this.state
    const { putLoading } = this.props

    const title = (
      <div style={{ overflow: "hidden" }}>
        <div style={{ float: "left" }}>
          <Button.Group>
            <Button type="primary"
              onClick={_ => this.onMulSwitchClick(true)}
              disabled={selectedRows.length === 0 || putLoading}>
              <Icon type="check" />启用
                </Button>
            <Button type="danger"
              onClick={_ => this.onMulSwitchClick(false)}
              disabled={selectedRows.length === 0 || putLoading}
              className="btn-danger">
              关闭<Icon type="close" />
            </Button>
          </Button.Group>
          <Button type="primary"
            icon="plus"
            disabled={putLoading}
            style={{ marginLeft: "15px" }}>
            新增特征
          </Button>
        </div>
        <div style={{ float: "right" }}>
          <Button
            type="primary"
            disabled={putLoading}
            icon="save">
            应用
          </Button>
          <Button
            disabled={putLoading}
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
              getExpandedRowRenderer={getExpandedRowRenderer}
              getKey={(i, index) => { return `${index}-item` }}
              tableProps={{
                expandIconAsCell: false,
                expandIconColumnIndex: -1,
                expandedRowKeys: ["0-item"]
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
      </div>
    )
  }
}



