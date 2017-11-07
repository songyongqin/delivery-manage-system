/**
 * Created by jojo on 2017/8/28.
 */
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, DatePicker } from 'antd';
import React from 'react';
import moment from 'moment';

const disabledDate=(current)=>{
  return current && (current.valueOf()) > Date.now();
};

const FormItem = Form.Item;

class QueryForm extends React.Component {
  constructor(props){
    super(props);
  }
  // handleSubmit = (e) => {
  //   e.preventDefault();
  //   this.props.form.validateFieldsAndScroll((err, values) => {
  //     if(!err){
  //       this.props.onSubmit&&this.porps.onSubmit(values);
  //     }
  //   });
  // };
  onChange=(timestampRange)=>{
    this.props.onSubmit&&this.props.onSubmit({timestampRange});
  };
  render() {

    const { getFieldDecorator } = this.props.form;
    const {defaultValue={}, loading=false}=this.props;
    const {timestampRange=[]}=defaultValue;

    return (
      <Form style={{width:"300px"}}>
        <FormItem>
          {getFieldDecorator('timestampRange', {
            initialValue: timestampRange,
          })(
            <DatePicker.RangePicker size="large"
                                    style={{width:"100%"}}
                                    disabled={loading}
                                    onChange={this.onChange}
                                    allowClear={true}
                                    disabledDate={disabledDate}
                                    placeholder={["全部","全部"]}
                                    ranges={{
                                      "今天": [moment().subtract(0,"days"),moment().subtract(0, 'days')],
                                      "本月":[moment().startOf('month'),moment().subtract(0, 'days')],
                                      "本季度":[moment().startOf('quarter'),moment().subtract(0, 'days')],
                                      "本年度":[moment().startOf("year"),moment().subtract(0, 'days')],
                                      "全部": []
                                    }}
            />
          )}
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(QueryForm);
