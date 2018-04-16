import * as React from 'react'
import TableWithRemote from 'domainComponents/TableWithRemote'
import { SYS_CONFIG_STRATEGY_RULE } from 'constants/model'
import { getColumns } from './tableConfig'
import Card from 'domainComponents/Card'
import extraConnect from 'domainUtils/extraConnect'
import WithModal from 'components/WithModal'
import { Modal, Icon, message as Message } from 'antd'
import RuleForm from '../RuleForm'

@extraConnect(
  null,
  dispatch => {
    return {
      put: payload => dispatch({
        type: `${SYS_CONFIG_STRATEGY_RULE}/put`,
        payload
      }),
      delete: payload => dispatch({
        type: `${SYS_CONFIG_STRATEGY_RULE}/delete`,
        payload
      })
    }
  }
)
@WithModal()
export default class Rule extends React.Component<any, any>{
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      putLoading: false,
      activeRule: {}
    }
  }
  onEditClick = (records) => {
    this.props.setModalVisible("edit", true)
    this.setState({
      activeRule: records
    })
  }
  onPut = payload => {
    const { onChange } = this.props

    this.setState({
      putLoading: true
    })

    this.props.put(payload)
      .then(_ => {

        Message.success("修改规则成功")

        this.props.setModalVisible("edit", false)

        onChange && onChange()

      })
    // .then(_ => {
    //   this.setState({
    //     putLoading: false
    //   })
    // })
  }
  onDeleteClick = records => {
    const { onChange } = this.props
    Modal.confirm({
      title: "删除规则",
      content: "确定后将无法恢复",
      onOk: _ => this.props.delete({ id: records.id })
        .then(_ => {
          onChange && onChange()
          Message.success("删除规则成功")
        })
    })
  }
  render() {
    return (
      <Card style={{ margin: "0 10px" }}>
        <TableWithRemote
          initialFilters={{ page: 1, limit: 10, protocolType: this.props.records["protocolType"], value: "" }}
          onChange={_ => this.setState({ loading: true })}
          onFinal={_ => this.setState({ loading: false })}
          loading={this.state.loading}
          getColumns={option => {
            return getColumns({
              ...option,
              protocolType: this.props.records["protocolType"],
              handle: {
                edit: this.onEditClick,
                delete: this.onDeleteClick
              }
            })
          }}
          remoteNamespace={SYS_CONFIG_STRATEGY_RULE}>
        </TableWithRemote>
        <Modal
          title={
            <div>
              <Icon type="edit"></Icon>&nbsp;修改规则
            </div>
          }
          destroyOnClose={true}
          closable={!this.state.putLoading}
          footer={null}
          onCancel={_ => this.props.setModalVisible("edit", false)}
          visible={this.props.modalVisible["edit"]}>
          <RuleForm
            onSubmit={this.onPut}
            loading={this.state.putLoading}
            defaultValue={this.state.activeRule}
            protocolType={this.props.records["protocolType"]}
            isCreate={false}>
          </RuleForm>
        </Modal>
      </Card>
    )
  }
}