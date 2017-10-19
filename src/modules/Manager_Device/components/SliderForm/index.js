/**
 * Created by jojo on 2017/10/19.
 */
import React from 'react';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete,Slider } from 'antd';
import styles from './styles.css';
import classnames from 'classnames';
import {
  DISK_PER_DATAINDEX
} from '../../ConstConfig'

const FormItem = Form.Item;

const range=[0,40,50,60,70,80,90];

const marks={};

range.forEach(i=>{
  marks[i]=`>${i}%`
})

@Form.create()
class WrappedForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    const {onSubmit,form}=this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (err) {
        return
      }
      onSubmit&&onSubmit(values);

    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const {isDark,loading,defaultValue={},style}=this.props;
    console.info(defaultValue);
    return (
      <Form style={{
        width:"800px",
        background:"white",
        padding:"15px 15px 0",
        boxShadow:"0 1px 6px rgba(0, 0, 0, 0.2)",
        ...style
      }}>
        <FormItem
          style={{
            width:"calc(100% - 140px)",
            display:"inline-block"
          }}
          colon={false}
          required={false}
          hasFeedback={false}
        >
          {getFieldDecorator(DISK_PER_DATAINDEX, {
            initialValue:defaultValue[DISK_PER_DATAINDEX]||0
          })(
            <Slider style={{width:"100%"}}
                    max={90}
                    marks={marks}
                    disabled={loading} />
          )}
        </FormItem>
        <FormItem
          style={{
            width:"60px",
            display:"inline-block",
            marginLeft:"40px",
          }}>
          <Button type="primary"
                  loading={loading}
                  onClick={this.handleSubmit}>确定</Button>
        </FormItem>
      </Form>
    );
  }
}

export default WrappedForm;
