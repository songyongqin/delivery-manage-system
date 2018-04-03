import * as React from 'react'
import WithAnimateRender from 'components/WithAnimateRender'
import Master from './components/Master'
import HoneypotNode from './components/HoneypotNode'
import IDSNode from './components/IDSNode'
import Honeypot from './components/Honeypot'
import IDS from './components/IDS'

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
          </IDS>
        ])
      }
    </div>
  }
}