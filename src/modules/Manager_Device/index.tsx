import * as React from 'react'
import WithAnimateRender from 'components/WithAnimateRender'
import Master from './components/Master'
import HoneypotNode from './components/HoneypotNode'
import IDSNode from './components/IDSNode'
import Honeypot from './components/Honeypot'
import IDS from './components/IDS'
import HoneypotStandalone from './components/HoneypotStandalone'
import IDSStandalone from './components/IDSStandalone'
import { getAppConfig } from 'domain/app'
import { If } from 'components/ControlStatements'
import { get } from 'utils'

@WithAnimateRender
export default class ManagerDevice extends React.Component<any, any>{
  constructor(props) {
    super(props)
  }
  render() {

    const deviceManagerConfig = get(getAppConfig(), ["deviceManager"], {})

    const items = [
      //控制中心模块
      {
        key: "master",
        content: (
          <Master
            key="master"
            style={{ marginBottom: "15px" }}>
          </Master>
        )
      },
      //控制中心显示的蜜罐设备模块
      {
        key: "honeypot",
        content: (
          <Honeypot
            key="honeypot"
            style={{ marginBottom: "15px" }}>
          </Honeypot>
        )
      },
      //控制中心显示的IDS模块
      {
        key: "ids",
        content: (
          <IDS
            key="ids"
            style={{ marginBottom: "15px" }}>
          </IDS>
        )
      },
      //蜜罐节点模块
      {
        key: "honeypotNode",
        content: (
          <HoneypotNode
            key="honeypot-node"
            style={{ marginBottom: "15px" }}>
          </HoneypotNode>
        )
      },
      //IDS节点模块
      {
        key: "idsNode",
        content: (
          <IDSNode
            key="ids-node"
            style={{ marginBottom: "15px" }}>
          </IDSNode>
        )
      },
      //单机版蜜罐模块
      {
        key: "honeypotStandalone",
        content: (
          <HoneypotStandalone
            key="honeypot-standalone"
            style={{ marginBottom: "15px" }}>
          </HoneypotStandalone>
        )
      },
      //单机版IDS模块
      {
        key: "idsStandalone",
        content: (
          <IDSStandalone
            key="ids-standalone"
            style={{ marginBottom: "15px" }}>
          </IDSStandalone>
        )
      }
    ].filter(item => deviceManagerConfig[item.key]).map(item => item.content)

    return <div>
      {
        this.props.animateRender(items)
      }
    </div>
  }
}