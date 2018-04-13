import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, DatePicker } from 'antd'
import React from 'react';
import classnames from 'classnames'
import {
  ATTACK_STAGE_DATA_INDEX,
  stageRowDataIndexes,
  tableTextConfig,
} from '../../constants'
const FormItem = Form.Item

class QueryForm extends React.Component<any, any> {
  constructor(props) {
    super(props);
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const { onSubmit, form } = this.props
    form.validateFieldsAndScroll((err, values) => {

      if (err) {
        return
      }

      onSubmit && onSubmit(values)

    })
  }

  selectAll = e => {
    this.props.form.setFieldsValue({ [ATTACK_STAGE_DATA_INDEX]: e.target.checked ? stageRowDataIndexes : [] })
  }
  render() {

    const { getFieldDecorator, getFieldValue } = this.props.form
    const { defaultValue = {}, loading = false, textConfig = {}, style = {}, isDark } = this.props

    const lblClasses = classnames({
      ["lbl-dark"]: isDark,
    })

    const values = getFieldValue(ATTACK_STAGE_DATA_INDEX) || defaultValue[ATTACK_STAGE_DATA_INDEX] || [];

    return (
      <Form style={{ overflow: "hidden" }} layout="inline">
        <FormItem
          label={<span className={lblClasses}>攻击阶段筛选</span>}
          style={{ float: "left" }}>
          <Checkbox
            disabled={loading}
            onChange={this.selectAll}
            checked={values.length === stageRowDataIndexes.length}
            indeterminate={values.length > 0 && values.length < stageRowDataIndexes.length}>
            <span className={lblClasses}>
              全选
            </span>
          </Checkbox>
        </FormItem>
        <FormItem
          style={{ float: "left" }}
          required={false}>
          {getFieldDecorator(ATTACK_STAGE_DATA_INDEX, {
            initialValue: defaultValue[ATTACK_STAGE_DATA_INDEX],
          })(
            <Checkbox.Group disabled={loading}>
              {
                stageRowDataIndexes.map((i, index) => (
                  <Checkbox key={`${index}-check`} value={i}>
                    <span className={lblClasses}>
                      {tableTextConfig.rowTitles[i]}
                    </span>
                  </Checkbox>
                ))
              }
            </Checkbox.Group>
          )
          }
        </FormItem>
        <Button
          type="primary"
          loading={loading}
          icon="filter"
          onClick={this.handleSubmit}>确定</Button>
      </Form>
    );
  }
}

const WrappedForm: any = Form.create()(QueryForm)

export default WrappedForm
