import * as React from 'react'
import { RECORD_OF_CREATE_VM_NAMESPACE } from 'constants/model'
import { Collapse, Button, Popover, Icon, Badge, Row, Col, Tooltip, Steps } from 'antd'
import extraConnect from 'domainUtils/extraConnect'
import { Choose, When, Otherwise } from 'components/ControlStatements'
const styles = require('./styles.less')

const honeypotCreateStatusTip = {
  0: "正在获取蜜罐创建状态",
  1: "等待蜜罐获取配置",
  2: "蜜罐成功获取配置信息,等待蜜罐配置完成",
  3: "正在创建快照",
  4: "蜜罐创建成功"
}

const FINAL_CREATE_STATUS = 4

import { getTemp } from 'utils'

const CREATING_VM_ID_LIST_CACHE_NAMESPACE = "@@__CREATING_VM_ID_LIST_CACHE_NAMESPACE__@@"

export const getCreatingVMList = () => {
  return getTemp(CREATING_VM_ID_LIST_CACHE_NAMESPACE)
}


@extraConnect(
  state => {
    return {
      record: state[RECORD_OF_CREATE_VM_NAMESPACE].recordOfCreateVM,
      panelVisible: state[RECORD_OF_CREATE_VM_NAMESPACE].panelVisible,
    }
  },
  dispatch => {
    return {
      changePanelVisible: payload => dispatch({
        type: `${RECORD_OF_CREATE_VM_NAMESPACE}/changePanelVisible`,
        payload
      }),
      removeRecordItem: payload => dispatch({
        type: `${RECORD_OF_CREATE_VM_NAMESPACE}/removeRecordItem`,
        payload
      }),
      monitorVMCreate: payload => dispatch({
        type: `${RECORD_OF_CREATE_VM_NAMESPACE}/monitorVMCreate`,
        payload
      }),
    }
  }
)
export default class RecordOfCreateVM extends React.PureComponent<any, any>{
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.initCreatingVMMonitor()
  }
  initCreatingVMMonitor = () => {
    try {
      getCreatingVMList().forEach(this.props.monitorVMCreate)
    } catch (e) {
      // console.error(e)
    }
  }
  onVisibleChange = value => this.props.changePanelVisible(value)

  onChange = _ => this.props.changePanelVisible(!this.props.panelVisible)

  con = document.body

  render() {
    const { record, panelVisible } = this.props

    const { con } = this

    const recordList: any[] = Object.values(record).sort(({ order: beforeOrder }, { order: afterOrder }) => {
      return afterOrder - beforeOrder
    })

    const creatingCount = recordList.filter(i => i.status !== FINAL_CREATE_STATUS).length

    return (
      <div ref={con => this.con = con}>
        <Popover
          getPopupContainer={_ => con}
          trigger="click"
          onVisibleChange={this.onVisibleChange}
          visible={panelVisible}
          title={<div><Icon type="desktop" />&nbsp;&nbsp;蜜罐虚拟机创建状态</div>}
          placement="bottomRight"
          content={
            <div style={{ width: "420px", maxHeight: "700px", overflowY: "scroll" }}>
              <Choose>
                <When condition={recordList.length === 0}>
                  <div style={{ textAlign: "center", height: "50px", lineHeight: "50px" }}>
                    <Icon type="frown"></Icon>&nbsp;没有正在创建的蜜罐
                  </div>
                </When>
                <Otherwise>
                  <Collapse
                    key={`${recordList.length}-collapse`}
                    defaultActiveKey={recordList.map(({ honeypotId }, index) => `${index}-item`)}>
                    {
                      recordList.map(({ status, honeypotName, honeypotId, error }, index) => {
                        const closable = status === FINAL_CREATE_STATUS || error
                        const iconStyle = { color: "#108ee9", fontSize: "40px" }
                        return (
                          <Collapse.Panel
                            key={`${index}-item`}
                            header={<div >
                              {`蜜罐名称:${honeypotName}`}
                              <div style={{ float: "right" }}>
                                <Button
                                  onClick={_ => this.props.removeRecordItem(honeypotId)}
                                  icon="close"
                                  size="small"
                                  style={{ marginRight: "10px" }}
                                  disabled={!closable}>
                                </Button>
                              </div>
                            </div>}
                            style={{ marginBottom: "10px" }}>
                            <Row gutter={20}>
                              <Col span={4} style={{ height: "40px", lineHeight: "40px", textAlign: "center" }}>
                                <Choose>
                                  <When condition={status === FINAL_CREATE_STATUS && !error}>
                                    <Icon type="check-circle-o" style={iconStyle} />
                                  </When>
                                  <When condition={status !== FINAL_CREATE_STATUS && !error}>
                                    <Icon type="loading" style={iconStyle} key="loading"></Icon>
                                  </When>
                                  <When condition={error}>
                                    <Tooltip title="错误">
                                      <Icon type="close-circle-o" style={{ ...iconStyle, color: "red" }} />
                                    </Tooltip>
                                  </When>
                                </Choose>
                              </Col>
                              <Col span={20} className={error ? styles["step-error"] : ""} style={{ paddingLeft: "20px" }} >
                                <Steps direction="vertical" size="small" current={status} >
                                  {
                                    [0, 1, 2, 3, 4].map((i, index) => <Steps.Step
                                      key={`${i}-step`}
                                      description={honeypotCreateStatusTip[i]} />)
                                  }
                                </Steps>
                              </Col>
                            </Row>
                          </Collapse.Panel>
                        )
                      })
                    }
                  </Collapse>
                </Otherwise>
              </Choose>
            </div>
          }>
          <Badge count={creatingCount}>
            <a onClick={this.onChange}>
              <Icon type="notification"></Icon>
            </a>
          </Badge>
        </Popover>
      </div>
    )
  }
}