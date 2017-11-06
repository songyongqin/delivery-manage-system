import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, DatePicker } from 'antd';
import React from 'react';
import styles from './styles.css';
import {
  FILE_NAME_DATA_INDEX,
  MD5_DATA_INDEX,
  FAMILY_DATA_INDEX
} from '../../ConstConfig'
import classnames from 'classnames';

const labelTextConfig = {
  [FILE_NAME_DATA_INDEX]: "文件名搜索",
  [MD5_DATA_INDEX]: "MD5搜索",
  [FAMILY_DATA_INDEX]: "家族搜索"
}

const placeholderTextConfig = {
  [FILE_NAME_DATA_INDEX]: "如：DownloadDll.dll",
  [MD5_DATA_INDEX]: "如：522a25b556516561651651",
  [FAMILY_DATA_INDEX]: "如：wanncry"
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
            [FILE_NAME_DATA_INDEX, MD5_DATA_INDEX, FAMILY_DATA_INDEX].map((i, index) => <Col span={7} key={`${index}-item`}>
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
