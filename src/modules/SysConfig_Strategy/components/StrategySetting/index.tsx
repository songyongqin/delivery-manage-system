import * as React from 'react'
import TableWithRemote from 'domainComponents/TableWithRemote'
import { SYS_CONFIG_STRATEGY_SETTING, SYS_CONFIG_STRATEGY_RULE, SYS_CONFIG_STRATEGY_THREAT_NAME, } from 'constants/model'
import { getColumns, getExpandedRowRenderer } from './tableConfig'
import Card from 'domainComponents/Card'
import { Button, Icon, message as Message, Modal, Select } from 'antd'
import extraConnect from 'domainUtils/extraConnect'
import Spin from 'domainComponents/Spin'
import WithModal from 'components/WithModal'
import RuleForm from './RuleForm'
import { PROTOCOLTYPE, protocolTypeList } from '../../constants'
import WithConfig from 'domainComponents/WithConfig'
import path from 'constants/path'
import combineColumnsConfig from 'domainUtils/combineColumnsConfig'


const Option = Select.Option;

@WithModal()
@extraConnect(
  state => {
    const effectsLoading = state.loading.effects
    return {
      putLoading: effectsLoading[`${SYS_CONFIG_STRATEGY_SETTING}/put`],
      applyLoading: effectsLoading[`${SYS_CONFIG_STRATEGY_SETTING}/apply`],
      postLoading: effectsLoading[`${SYS_CONFIG_STRATEGY_RULE}/post`],
      threatNameList: state[SYS_CONFIG_STRATEGY_THREAT_NAME].threatNameList,
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
      }),
      // put: payload => dispatch({
      //   type: `${SYS_CONFIG_STRATEGY_RULE}/put`,
      //   payload
      // }),
      delete: payload => dispatch({
        type: `${SYS_CONFIG_STRATEGY_RULE}/delete`,
        payload
      })
    }
  }
)
@WithConfig(path.layoutConfig.simpleFeature)
export default class StrategySetting extends React.Component<any, any>{
  constructor(props) {
    super(props)
    this.state = {
      selectedRows: [],
      lastReqTime: 0,
      expandedRowKeys: [],
      data: [],
      expanded: false,
      protocolType: "",
      initialFilters: {
        page: 1,
        limit: 10,
        id: "",
        threatType: "",
        protocolType: "",
        threatLevel: "",
        updateTime: "",
        rule: ""
      },
    }
  }
  onSwitchClick = (payload) => {
    this.props.put(payload).then(_ => {
      Message.success("修改成功");
    })
    this.setState({
      lastReqTime: new Date().getTime()
    })
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
    const idList = selectedRows.map((i) => i.id)
    value != "del"
      ?
      this.props.put({ idList, status: value })
        .then(_ => {
          Message.success("修改成功")
          this.setState({
            selectedRows: [],
            lastReqTime: new Date().getTime()
          })
        })
      :
      this.onDeleteClick(idList)

  }
  onPut = payload => {

    this.setState({
      putLoading: true
    })

    this.props.post(payload)
      .then(_ => {

        Message.success("修改规则成功")

        this.props.setModalVisible("edit", false)

        this.setState({
          lastReqTime: new Date().getTime()
        })
      })
  }
  onSubmit = payload => {
    return this.props.post({ id: "", ...payload }).then(_ => {
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
  onEditClick = (records) => {

    this.props.setModalVisible("edit", true)
    this.setState({
      activeRule: records,
      protocolType: records.protocolType

    })
  }
  onDeleteClick = idList => {
    const { onChange } = this.props
    Modal.confirm({
      title: "删除规则",
      content: "确定后将无法恢复",
      onOk: _ => this.props.delete({ idList })
        .then(_ => {
          this.setState({
            lastReqTime: new Date().getTime()
          })
          Message.success("删除规则成功")
        })
    })
  }
  render() {

    const { selectedRows, data, protocolType, initialFilters } = this.state

    const { putLoading, applyLoading } = this.props

    const title = (
      <div style={{ overflow: "hidden" }}>
        <div style={{ float: "left" }}>
          <Button type="primary"
            icon="plus"
            onClick={_ => this.props.setModalVisible("create", true)}
            disabled={putLoading || applyLoading}
            style={{ marginLeft: "15px" }}>
            添加简易特征
          </Button>
          <Select defaultValue="1" key={`${this.state.lastReqTime}-select-with-remote`} style={{ width: 120 }} onSelect={this.onMulSwitchClick} disabled={selectedRows.length === 0 || putLoading || applyLoading}>
            <Option value="1">启用特征</Option>
            <Option value="0">停用特征</Option>
            <Option value="del">批量删除</Option>
          </Select>
        </div>
        <div style={{ float: "right" }}>
          {/* <Button
            disabled={putLoading || applyLoading}
            type="primary"
            onClick={_ => this.setState({ expanded: !this.state.expanded })}
            style={{ marginLeft: "15px" }}
            icon="setting">
            威胁等级配置
          </Button> */}
        </div>
      </div>
    )

    return (
      <div style={{ padding: "5px" }}>
        <Spin spinning={putLoading}>
          <Card title={title} style={{
            marginRight: this.state.expanded ? "400px" : "0px",
            transitionProperty: "margin",
            transitionDuration: "0.3s",
          }}>
            <TableWithRemote
              initialFilters={initialFilters}
              onDataChange={payload => this.setState({ data: payload.data })}
              key={`${this.state.lastReqTime}-table-with-remote`}
              rowSelection={{
                onChange: (_, selectedRows) => {
                  this.setState({
                    selectedRows
                  })
                }
              }}
              getColumns={options => {
                return combineColumnsConfig(getColumns({
                  ...options,
                  handle: {
                    show: this.onShowClick,
                    switch: this.onSwitchClick,
                    edit: this.onEditClick,
                    delete: this.onDeleteClick
                  }
                }), this.props.config.columns)
              }}
              remoteNamespace={SYS_CONFIG_STRATEGY_SETTING}>
            </TableWithRemote>
          </Card>
        </Spin>

        <Modal
          title={
            <div>
              <Icon type="edit"></Icon>&nbsp;修改规则
            </div>
          }
          destroyOnClose={true}
          closable={!this.props.postLoading}
          footer={null}
          onCancel={_ => this.props.setModalVisible("edit", false)}
          visible={this.props.modalVisible["edit"]}>
          <RuleForm
            onSubmit={this.onPut}
            threatTypes={this.props.threatNameList.map(i => {
              return {
                text: i.type,
                value: i.key,
                threatLevel: i.threatLevel
              }
            })}
            loading={this.props.postLoading}
            defaultValue={this.state.activeRule}
            protocolType={protocolType}
            id={[...new Set(this.state.data.map(i => i["id"]))]}
            isCreate={false}>
          </RuleForm>
        </Modal>

        <Modal
          title={
            <div>
              <Icon type="plus"></Icon>&nbsp;新增特征
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
            threatTypes={this.props.threatNameList.map(i => {
              return {
                text: i.type,
                value: i.key,
                threatLevel: i.threatLevel
              }
            })}
            // protocolTypes={[...new Set(this.state.data.map(i => i[PROTOCOLTYPE]))]}>
            protocolTypes={protocolTypeList}>
          </RuleForm>
        </Modal>
      </div>
    )
  }
}



