import { Input, Tooltip, Icon, Select } from 'antd'
import React from 'react'

const Option = Select.Option


export default class QueryForm extends React.Component<any, any> {
  constructor(props) {
    super(props);
  }
  onChange = (value) => {
    this.props.onChange && this.props.onChange({ limit: parseInt(value) })
  }
  render() {
    const { defaultValue = {}, loading = false, style = {} } = this.props
    const { limit = "" } = defaultValue

    return (
      <div style={{ width: "220px", ...style }}>
        {"每页显示 "}
        <Select onChange={this.onChange}
          defaultValue={limit + ""}
          style={{ width: "80px", display: "inline-block" }}>
          <Option value="5">5</Option>
          <Option value="10">10</Option>
          <Option value="15">15</Option>
          <Option value="20">20</Option>
          <Option value="25">25</Option>
          <Option value="30">30</Option>
        </Select>
        {" 条数据"}
      </div>
    )
  }
}