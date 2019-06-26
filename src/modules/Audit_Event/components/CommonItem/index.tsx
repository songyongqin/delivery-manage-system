import * as React from 'react'
import TableWithRemote from 'domainComponents/TableWithRemote'
import LimitForm from './LimitForm'
import extraConnect from 'domainUtils/extraConnect'
import { AUDIT_EVENT_NAMESPACE } from 'constants/model'
import { Button, Tooltip  } from 'antd'
@extraConnect(
  state => {
    return {
      // initialFilters: state[AUDIT_EVENT_NAMESPACE].initialFilters
    }
  },
  dispatch => {
    return {

      save: payload => dispatch(
        {
          type: `${AUDIT_EVENT_NAMESPACE}/save`,
          payload
        }
      ),
    }
  }
)
export default class CommonItem extends React.Component<any, any>{
  ref = null
  constructor(props) {
    super(props)
    this.state = {
      // filters: { limit: 10 },
      lastReqTime: 0,
      downloadLoading: false
    }
  }
  onSubmit = filters => {
    const { initialFilters } = this.props;
    this.props.save({ ...initialFilters, ...filters, page: 1 })
    this.setState({
      // filters,
      lastReqTime: new Date().getTime(),
    })
  }

  onDownload = () => {
    this.setState({ downloadLoading: true })
    this.props.download(this.ref&&this.ref.props&&this.ref.props.initialFilters||{})
    .then(_ => this.setState({ downloadLoading: false }) )
    .catch(_ => this.setState({ downloadLoading: false }) )
  }

  render() {
    return (
      <div>
        <div style={{ overflow: "hidden" }}>
          <div style={{ float: "left" }}>
            {this.props.expandPanel}
          </div>
          <div style={{ float: "left" }}>
            <LimitForm onSubmit={this.onSubmit} defaultValue={ ...this.props.initialFilters  } ></LimitForm>
          </div>

        </div>
        <div style={{ position:'absolute', right: 15, top:0 }} >
          <Tooltip   title='导出数据最多为1000条' >
            <Button type='primary' onClick={ this.onDownload } loading={ this.state.downloadLoading }  >导出</Button>
          </Tooltip>
        </div>
        <div style={{ padding:25, background: '#ffffff' }} >
          <TableWithRemote
            key={`${this.state.lastReqTime}-table`}
            ref={ target => this.ref = target }
            initialFilters={{ ...this.props.initialFilters }}
            getColumns={this.props.getColumns}
            remoteNamespace={this.props.remoteNamespace}>
          </TableWithRemote>
        </div>
      </div>
    )
  }
}