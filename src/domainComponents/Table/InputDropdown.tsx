import * as React from 'react'
const styles = require('./styles.less')

import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, DatePicker } from 'antd';
import * as tools from 'utils'
import { ipReg, portReg } from 'utils/tools'

const FormItem = Form.Item;

const getRuleByType = type => {
  if (type === "ip") {
    return [
      {
        pattern: ipReg,
        message: "请输入正确的IP"
      }
    ]
  }
  if (type === "port") {
    return [
      {
        pattern: portReg,
        message: "请输入正确的端口"
      }
    ]
  }
  return []
}

class QueryForm extends React.Component<any, any> {
  constructor(props) {
    super(props)
  }
  input = null
  handleSubmit = (e) => {
    e.preventDefault()
    const { form, onSubmit } = this.props
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        onSubmit && onSubmit(values)
      }
    })
  }
  componentDidUpdate() {
    try {
      if (this.shouldFocus) {
        this.input.input.focus()
        this.shouldFocus = false
      }
    } catch (e) {
      console.info(e)
    }
  }
  shouldFocus = false
  componentWillReceiveProps(newProps) {
    this.shouldFocus = newProps.visible
  }
  render() {

    const { getFieldDecorator } = this.props.form
    const {
      defaultValue = {},
      loading = false,
      dataIndex,
      value,
      label,
      type
    } = this.props


    return (
      <div className={styles["input-dropdown"]}>
        <Form style={{ width: "100%" }}>
          <FormItem required={false}
            colon={false}
            style={{ marginBottom: "10px" }}
            label={<span>{label || "请输入搜索内容"}</span>}>
            {getFieldDecorator(dataIndex, {
              initialValue: value,
              rules: getRuleByType(type)
            })(
              <Input placeholder={""}
                ref={input => this.input = input}
                onPressEnter={this.handleSubmit} />
            )}
          </FormItem>
          <Button
            type="primary"
            icon="search"
            onClick={this.handleSubmit}>搜索</Button>
        </Form>
      </div>
    )
  }
}

const Final: any = Form.create()(QueryForm)

export default Final