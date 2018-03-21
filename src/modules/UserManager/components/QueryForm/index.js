import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, DatePicker } from 'antd';
import React from 'react';
import styles from './styles.css';
import {
  USERACCOUNT_DATAINDEX,
  USER_NAME_DATAINDEX,
} from '../../ConstConfig'
import classnames from 'classnames';

const labelTextConfig = {
  [USERACCOUNT_DATAINDEX]: "用户账号搜索",
  [USER_NAME_DATAINDEX]: "用户名搜索",
}

const placeholderTextConfig = {
  [USERACCOUNT_DATAINDEX]: "请输入用户账号",
  [USER_NAME_DATAINDEX]: "请输入用户名",
}

const FormItem = Form.Item;

class QueryForm extends React.Component {
  constructor(props) {
    super(props);
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (this.props.loading) {
        return;
      }

      if (!err) {
        this.props.onSubmit && this.props.onSubmit(values);
      }
    });
  };

  render() {

    const { getFieldDecorator } = this.props.form;
    const { isDark, defaultValue = {}, loading = false, textConfig = {}, style = {}, keyConfig = "value" } = this.props;
    const { value = "" } = defaultValue;

    const labelClasses = classnames({
      ["lbl-dark"]: isDark
    })

    return (
      <Form>
        <Row gutter={10}>
          {
            [USERACCOUNT_DATAINDEX, USER_NAME_DATAINDEX].map((i, index) => <Col span={10} key={`${index}-item`}>
              <FormItem
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                label={<span className={labelClasses}>{labelTextConfig[i]}</span>}
                required={false}>
                {getFieldDecorator(i, {
                  initialValue: defaultValue[i],
                })(
                  <Input placeholder={placeholderTextConfig[i]}
                    style={{ width: "100%" }}
                    onPressEnter={this.handleSubmit} />
                  )}
              </FormItem>
            </Col>)

          }
          <Col span={3}>
            <Button
              type="primary"
              size="large"
              icon="search"
              onClick={this.handleSubmit}>{textConfig["button"] || "搜索"}</Button>
          </Col>
        </Row>

      </Form>
    );
  }
}

export default Form.create()(QueryForm);
