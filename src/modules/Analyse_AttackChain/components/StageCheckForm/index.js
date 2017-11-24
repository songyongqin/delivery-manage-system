import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, DatePicker } from 'antd';
import React from 'react';
import classnames from 'classnames';
import {
  ATTACK_STAGE_DATA_INDEX,
  stageRowDataIndexes,
  tableTextConfig,
} from '../../ConstConfig'
const FormItem = Form.Item;

class QueryForm extends React.Component {
  constructor(props) {
    super(props);
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const { onSubmit, form } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (this.props.loading) {
        return;
      }

      if (err) {
        return;
      }
      onSubmit && onSubmit(values);

    });
  };
  selectAll = e => {
    this.props.form.setFieldsValue({ [ATTACK_STAGE_DATA_INDEX]: e.target.checked ? stageRowDataIndexes : [] })
  }
  render() {

    const { getFieldDecorator, getFieldValue } = this.props.form;
    const { defaultValue = {}, loading = false, textConfig = {}, style = {}, isDark } = this.props;
    const { value = "" } = defaultValue;

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
            <Checkbox.Group>
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
          size="large"
          icon="filter"
          onClick={this.handleSubmit}>确定</Button>
      </Form>
    );
  }
}

export default Form.create()(QueryForm);