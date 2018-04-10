import * as React from 'react'
import extraConnect from 'domainUtils/extraConnect'
import { MANAGER_VM_NAMESPACE } from 'constants/model'
import CreateHoneypotForm from '../CreateHoneypotForm'
import { Choose, When, Otherwise } from 'components/ControlStatements'
import { Icon } from 'antd'

@extraConnect(
  state => {
    return {

    }
  },
  dispatch => {
    return {
      fetchVMOption: _ => dispatch({
        type: `${MANAGER_VM_NAMESPACE}/fetchVMOption`,
      }),
      validate: payload => dispatch({
        type: `${MANAGER_VM_NAMESPACE}/validate`,
        payload
      })
    }
  }
)
export default class CreateVM extends React.Component<any, any>{
  constructor(props) {
    super(props)
    this.state = {
      vmOptions: {},
      initial: false
    }
  }
  componentDidMount() {
    this.props.fetchVMOption().then(res => this.setState({ vmOptions: res })).then(_ => this.setState({ initial: true }))
  }
  render() {
    return (
      <div>
        <Choose>
          <When condition={this.state.initial}>
            <CreateHoneypotForm
              loading={this.props.loading}
              onSubmit={this.props.onSubmit}
              validatorHandle={this.props.validate}
              vmOptions={this.state.vmOptions}>
            </CreateHoneypotForm>
          </When>
          <Otherwise>
            <div style={{ textAlign: "center", fontSize: "18px" }}>
              <Icon type="loading"></Icon> &nbsp;正在初始化选项
            </div>
          </Otherwise>
        </Choose>
      </div>
    )
  }
}