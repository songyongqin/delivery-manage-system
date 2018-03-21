import * as React from 'react'
import { Modal, message as Message, Input, Icon, Button } from 'antd'
import Mousetrap from 'mousetrap'
import { primaryColor } from 'themes/vars'
import { decrypt, encrypt } from 'domain/secret'
const { TextArea } = Input

const secretToValue = (secret) => {
  try {
    return decrypt(secret)
  } catch (e) {
    console.error(e)
    return ""
  }
}

let mount = false

export default class extends React.Component<any, any>{
  initialError = false

  constructor(props) {
    super(props)

    if (mount) {
      console.warn("<SecretParse> have initial,could not initial again")
      this.initialError = true
    }

    mount = true

    this.state = {
      visible: false,
      secret: "",
      value: ""
    }
  }

  componentDidMount() {
    Mousetrap.bind(['command+alt+p', 'ctrl+alt+p'], () => {
      this.setState({
        visible: !this.state.visible
      })
    })
  }
  componentWillUnmount() {
    mount = false
  }
  onChange = e => {
    try {
      this.setState({
        secret: e.target.value
      })
    } catch (e) {
      console.error(e)
    }
  }
  parse = () => {
    this.setState({
      value: secretToValue(this.state.secret)
    })
  }
  render() {

    if (this.initialError) {
      return null
    }

    return (
      <Modal
        visible={this.state.visible}
        onCancel={_ => this.setState({ visible: false })}
        footer={null}
        title={<div><Icon type="unlock" style={{ color: primaryColor }}></Icon>&nbsp;解密工具</div>}>
        <div style={{ overflow: "hidden" }}>
          <TextArea
            onChange={this.onChange}
            onPressEnter={this.parse}
            value={this.state.secret}
            style={{ height: "140px", marginBottom: "20px" }}
            placeholder="请输入需要解密的内容"></TextArea>
          <TextArea
            readOnly
            value={this.state.value}
            style={{ height: "140px" }}
            placeholder="这里会显示解密的结果"></TextArea>
          <Button
            style={{ float: "right", marginTop: "10px" }}
            type="primary"
            onClick={this.parse}
            disabled={this.state.secret.trim().length === 0}>
            解密
          </Button>
        </div>
      </Modal>
    )
  }
}