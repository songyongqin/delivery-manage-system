import React from 'react';

import extraConnect from 'domainUtils/extraConnect'
import WithModal from 'components/WithModal'
import WithAnimateRender from 'components/WithAnimateRender'
import Summary from './components/Summary'
import NodeMirror from './components/NodeMirror'
import { getAppConfig } from 'domain/app'
import { get } from 'utils'
import { If, Choose, When, Otherwise } from 'components/ControlStatements'
import WithCommonProps from 'domainComponents/WithCommonProps'

@WithCommonProps
@WithModal()
// @extraConnect(mapStateToProps, (mapDispatchToProps))
@WithAnimateRender
class Page extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  render() {

    const config = (getAppConfig() as any)["mirrorImageManager"] || {}

    return (
      <div>
        {this.props.animateRender([
          <div key="summary" style={{ marginBottom: "15px" }}>
            <If condition={config["collection"]}>
              <Summary readonly={!this.props.admin}></Summary>
            </If>
          </div>,
          <div key="node">
            <If condition={config["node"]}>
              <NodeMirror readonly={config["nodeReadOnly"] || !this.props.admin}></NodeMirror>
            </If>
          </div>
        ])}
      </div>
    )
  }
}
export default Page;