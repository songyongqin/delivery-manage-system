import * as React from 'react'
import WithAnimateRender from 'components/WithAnimateRender'
import Master from './components/Master'
import HoneypotNode from './components/HoneypotNode'
import IDSNode from './components/IDSNode'

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
          <HoneypotNode
            key="honeypot-node"
            style={{ marginBottom: "15px" }}>
          </HoneypotNode>,
          <IDSNode
            key="ids-node"
            style={{ marginBottom: "15px" }}>
          </IDSNode>
        ])
      }
    </div>
  }
}