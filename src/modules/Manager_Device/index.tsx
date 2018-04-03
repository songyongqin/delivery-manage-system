import * as React from 'react'
import WithAnimateRender from 'components/WithAnimateRender'
import Master from './components/Master'
import HoneypotNode from './components/HoneypotNode'
import IDSNode from './components/IDSNode'
import Honeypot from './components/Honeypot'
import IDS from './components/IDS'
import HoneypotStandalone from './components/HoneypotStandalone'
import IDSStandalone from './components/IDSStandalone'

@WithAnimateRender
export default class ManagerDevice extends React.Component<any, any>{
  constructor(props) {
    super(props)
  }
  render() {
    return <div>
      {
        this.props.animateRender([
          <Master
            key="master"
            style={{ marginBottom: "15px" }}>
          </Master>,
          <Honeypot
            key="honeypot"
            style={{ marginBottom: "15px" }}>
          </Honeypot>,
          <IDS
            key="ids"
            style={{ marginBottom: "15px" }}>
          </IDS>,
          <HoneypotNode
            key="honeypot-node"
            style={{ marginBottom: "15px" }}>
          </HoneypotNode>,
          <IDSNode
            key="ids-node"
            style={{ marginBottom: "15px" }}>
          </IDSNode>,
          <HoneypotStandalone
            key="honeypot-standalone"
            style={{ marginBottom: "15px" }}>
          </HoneypotStandalone>,
          <IDSStandalone
            key="ids-standalone"
            style={{ marginBottom: "15px" }}>
          </IDSStandalone>
        ])
      }
    </div>
  }
}