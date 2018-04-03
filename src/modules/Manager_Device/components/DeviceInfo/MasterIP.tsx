import * as React from 'react'
import extraConnect from 'domainUtils/extraConnect'
import { If, Choose, When, Otherwise } from 'components/ControlStatements'
import { Icon } from 'antd'

@extraConnect(
  state => {
    return {
      effectsLoading: state.loading.effects
    }
  },
  dispatch => {
    return {
      dispatch
    }
  }
)
export default class MasterIP extends React.Component<any, any>{
  state = {
    initial: false,
    masterIP: ""
  }
  fetchData = () => {
    this.props.dispatch({
      type: `${this.props.remoteNamespace}/fetchMasterIP`
    })
      .then(masterIP => {
        this.setState({ masterIP })
      })
      .then(_ => {
        this.setState({
          initial: true
        })
      })
  }
  componentDidMount() {
    this.fetchData()
  }
  render() {
    return <div>
      <Choose>
        <When condition={this.state.initial}>
          控制中心IP: {this.state.masterIP}
        </When>
        <Otherwise>
          <Icon type="loading"></Icon>
        </Otherwise>
      </Choose>
    </div>
  }
}

