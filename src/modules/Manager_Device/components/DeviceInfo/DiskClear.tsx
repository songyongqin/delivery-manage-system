import * as React from 'react'
import extraConnect from 'domainUtils/extraConnect'
import classnames from 'classnames'
import { InputNumber, Button, Form, Select, Icon, message as Message } from 'antd'
const Option = Select.Option
import { If, Choose, When, Otherwise } from 'components/ControlStatements'
import Spin from 'domainComponents/Spin'

const options = [
  {
    value: 40,
    text: "40%"
  },
  {
    value: 50,
    text: "50%"
  },
  {
    value: 60,
    text: "60%"
  },
  {
    value: 70,
    text: "70%"
  },
  {
    value: 80,
    text: "80%"
  }
]

class DiskClearForm extends React.Component<any, any> {
  handleChange = (value) => {
    const { onSubmit } = this.props
    onSubmit && onSubmit({ threshold: parseInt(value) })
  }
  render() {
    const { defaultValue, isDark, loading, readonly } = this.props
    const classes = classnames({
      ["lbl-dark"]: isDark
    })
    return (
      <div className={classes}>
        <span>&nbsp;自动清理磁盘阈值设置&nbsp;</span>
        <Select style={{ width: "100px" }}
          disabled={loading || readonly}
          defaultValue={defaultValue + ""}
          onChange={this.handleChange}>
          {
            options.map(i => {
              return (
                <Option
                  value={`${i.value}`}
                  key={`${i.value}`}>
                  {i.text}
                </Option>
              )
            })
          }
        </Select>
        <If condition={loading}>
          &nbsp;<Icon type="loading"></Icon>
        </If>
      </div>
    )
  }
}



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
export default class DiskClear extends React.Component<any, any>{
  state = {
    threshold: 40,
    initial: false,
  }
  onSubmit = payload => {
    this.props.dispatch({
      type: `${this.props.remoteNamespace}/putDeviceDisk`,
      payload
    })
      .then(_ => {
        Message.success("设置成功")
      })
  }
  fetchData = () => {
    this.props.dispatch({
      type: `${this.props.remoteNamespace}/fetchDeviceDisk`
    })
      .then(res => {
        this.setState({
          threshold: res
        })
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

    const { effectsLoading, readonly } = this.props

    return (
      <Choose>
        <When condition={!this.state.initial}>
          <Icon type="loading"></Icon>
        </When>
        <Otherwise>
          <DiskClearForm
            readonly={readonly}
            loading={effectsLoading[`${this.props.remoteNamespace}/putDeviceDisk`]}
            defaultValue={this.state.threshold}
            onSubmit={this.onSubmit}>
          </DiskClearForm>
        </Otherwise>
      </Choose>
    )
  }
}