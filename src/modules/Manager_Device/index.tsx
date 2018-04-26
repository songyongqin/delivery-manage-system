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

    return <div>
      {
        this.props.animateRender([
          <If condition={deviceManagerConfig["master"]} key="master">
            <Master
              key="master"
              style={{ marginBottom: "15px" }}>
            </Master>
          </If>,
          <If condition={deviceManagerConfig["honeypot"]} key="honeypot">
            <Honeypot
              key="honeypot"
              style={{ marginBottom: "15px" }}>
            </Honeypot>
          </If>,
          <If condition={deviceManagerConfig["ids"]} key="ids">
            <IDS
              key="ids"
              style={{ marginBottom: "15px" }}>
            </IDS>
          </If>,
          <If condition={deviceManagerConfig["honeypotNode"]} key="honeypotNode">
            <HoneypotNode
              key="honeypot-node"
              style={{ marginBottom: "15px" }}>
            </HoneypotNode>
          </If>,
          <If condition={deviceManagerConfig["idsNode"]} key="idsNode">
            <IDSNode
              key="ids-node"
              style={{ marginBottom: "15px" }}>
            </IDSNode>
          </If>,
          <If condition={deviceManagerConfig["honeypotStandalone"]} key="honeypotStandalone">
            <HoneypotStandalone
              key="honeypot-standalone"
              style={{ marginBottom: "15px" }}>
            </HoneypotStandalone>
          </If>,
          <If condition={deviceManagerConfig["idsStandalone"]} key="idsStandalone">
            <IDSStandalone
              key="ids-standalone"
              style={{ marginBottom: "15px" }}>
            </IDSStandalone>
          </If>
        ])
      }
    </div>
  }
}