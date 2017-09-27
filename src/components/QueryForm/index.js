import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, DatePicker } from 'antd';
import React from 'react';
import styles from './styles.css';
const FormItem = Form.Item;

class QueryForm extends React.Component {
  constructor(props){
    super(props);
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if(this.props.loading){
        return;
      }

      if(!err){
        this.props.onSubmit&&this.props.onSubmit(values);
      }
    });
  };

  render() {

    const { getFieldDecorator } = this.props.form;
    const {defaultValue={}, loading=false,textConfig={},style={}}=this.props;
    const {value=""}=defaultValue;

    return (
      <Form style={{width:"300px",...style}} layout="inline">
        <FormItem  required={false}
                   className={styles["input-item"]}
                   style={{
                     margin:"0",
                     width:"calc(100% - 75px)"
                   }}>
          {getFieldDecorator('value', {
            initialValue:value,

          })(
            <Input placeholder={textConfig["placeholder"]}
                   style={{width:"100%"}}
                   onPressEnter={this.handleSubmit}/>
          )}
        </FormItem>
        <Button type="primary"
                size="large"
                onClick={this.handleSubmit}>{textConfig["button"]||"搜索"}</Button>
      </Form>
    );
  }
}

export default Form.create()(QueryForm);
