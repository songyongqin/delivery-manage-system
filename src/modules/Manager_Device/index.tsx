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
      {
        key: "master",
        content: (
          <Master
            key="master"
            style={{ marginBottom: "15px" }}>
          </Master>
        )
      },
      {
        key: "honeypot",
        content: (
          <Honeypot
            key="honeypot"
            style={{ marginBottom: "15px" }}>
          </Honeypot>
        )
      },
      {
        key: "ids",
        content: (
          <IDS
            key="ids"
            style={{ marginBottom: "15px" }}>
          </IDS>
        )
      },
      {
        key: "honeypotNode",
        content: (
          <HoneypotNode
            key="honeypot-node"
            style={{ marginBottom: "15px" }}>
          </HoneypotNode>
        )
      },
      {
        key: "idsNode",
        content: (
          <IDSNode
            key="ids-node"
            style={{ marginBottom: "15px" }}>
          </IDSNode>
        )
      },
      {
        key: "honeypotStandalone",
        content: (
          <HoneypotStandalone
            key="honeypot-standalone"
            style={{ marginBottom: "15px" }}>
          </HoneypotStandalone>
        )
      },
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