/**
 * Created by jojo on 2017/10/10.
 */
import React from 'react';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';
import styles from './styles.css';
import classnames from 'classnames';
import {
  textConfig,
  TYPE_DATAINDEX,
  FEATURE_DATAINDEX,
  types,
  typeTextConfig,
  IP_TYPE,
} from '../../ConstConfig'
import * as tools from '../../../../utils/tools';

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 14,
      offset: 6,
    },
  },
};


@Form.create()
class WrappedForm extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      update:1,
    }
  }


  handleSubmit = (e) => {
    e.preventDefault();
    const {onSubmit,form}=this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (err) {
        return
      }
      onSubmit&&onSubmit(values);
    })
  }

  onChange=()=>{
    this.props.form.resetFields([FEATURE_DATAINDEX])
  }



  render() {
    const { getFieldDecorator} = this.props.form;
    const {isDark,loading,defaultValue={},isCreate=true}=this.props;
    const lblClasses=classnames({
      [styles["lbl-dark"]]:isDark
    });

    const commonProps={...formItemLayout,colon:false,hasFeedback:true,required:true}
    let items=[
      {
        props:{
          ...commonProps,
          hasFeedback:false,
          label:<span className={lblClasses}>{tools.getKeyText(TYPE_DATAINDEX,textConfig)}</span>
        },
        filed: {
          name: TYPE_DATAINDEX,
          initialValue: defaultValue[TYPE_DATAINDEX] || types[0]
        },
        component:(
          <Select size="large"
                  onChange={this.onChange}
                  style={{width:"140px"}}>
            {types.map((i,index)=>(
              <Select.Option value={i}
                             key={`${index}-item`}>
                {tools.getKeyText(i,typeTextConfig)}
              </Select.Option>
            ))}
          </Select>
        )
      },
      {
        props:{
          ...commonProps,
          label:<span className={lblClasses}>{tools.getKeyText(FEATURE_DATAINDEX,textConfig)}</span>
        },
        filed:{
          name:FEATURE_DATAINDEX,
          initialValue:defaultValue[FEATURE_DATAINDEX],
          rules:this.props.form.getFieldValue(TYPE_DATAINDEX)===IP_TYPE
            ?
            [
              {
                pattern:/((25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))$/,
                message:"请输入正确的IP地址"
              },
              {
                required:true,
                message:"不能为空"
              },
              {
                whitespace:true,
                message:"不能为空"
              }
            ]
            :
            [
              {
                required:true,
                message:"不能为空"
              },
              {
                whitespace:true,
                message:"不能为空"
              }
            ]
        },
        component:(
          <Input disabled={loading} />
        )
      }
    ]


    return (
      <Form>
        {
          items.map(i=><FormItem key={i.filed.name} {...i.props}>
            {
              getFieldDecorator(i.filed.name,{...i.filed})(i.component)
            }
          </FormItem>)
        }
        <FormItem {...tailFormItemLayout}>
          {
            isCreate
              ?
              <Button type="primary"
                      loading={loading}
                      icon="plus"
                      onClick={this.handleSubmit}>添加</Button>
              :
              <Button type="primary"
                      loading={loading}
                      icon="save"
                      onClick={this.handleSubmit}>保存</Button>
          }
          {/*<Button type="danger"*/}
                  {/*loading={loading}*/}
                  {/*style={{marginLeft:"15px"}}*/}
                  {/*icon="close"*/}
                  {/*onClick={this.props.onCancel}>取消</Button>*/}
        </FormItem>
      </Form>
    );
  }
}

export default WrappedForm;
