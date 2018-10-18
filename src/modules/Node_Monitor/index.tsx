import * as React from 'react'
import WithAnimateRender from 'components/WithAnimateRender'
import path from 'constants/path'
import Table from './components/Table'


@WithAnimateRender
class AnalyseDetail extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <div>
        {
          this.props.animateRender([
            <div key="node-monitor">
              <Table  path={ path.layoutConfig.NodeMonitor } type={ 'fetch' } />
            </div>
          ])
        }
      </div>
    )
  }
}

export default AnalyseDetail