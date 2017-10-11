/**
 * Created by jojo on 2017/10/10.
 */
import React from 'react';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';
import styles from './styles.css';
import classnames from 'classnames';
import {
  THREAT_NAME_NAME_DATAINDEX,
  THREAT_NAME_LEVEL_DATAINDEX,
  THREAT_NAME_KEY_DATAINDEX,
  levels,
  textConfig,
  levelTextConfig,
  USER_DEFINED_VALUE,
  THREAT_NAME_USER_DEFINED_DATAINDEX
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
  handleSubmit = (e) => {
    e.preventDefault();
    const {onSubmit,form}=this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (err) {
        return
      }

      let _values={};

      Object.keys(values).forEach(i=>_values[i]=values[i].trim())
      onSubmit&&onSubmit({
        ..._values,
        [THREAT_NAME_USER_DEFINED_DATAINDEX]:USER_DEFINED_VALUE,
        [THREAT_NAME_KEY_DATAINDEX]:window.btoa(values[THREAT_NAME_NAME_DATAINDEX])
      });

    });
  }

  checkInput = (rule, value, callback) => {
    const {threatnameList=[]}=this.props;
    let _value=value.trim();

    if (threatnameList.includes(_value)) {
      callback("该行为已经存在");
    } else {
      callback();
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const {isDark,loading}=this.props;


    const lblClasses=classnames({
      [styles["lbl-dark"]]:isDark
    })

    const commonProps={...formItemLayout,colon:false,hasFeedback:true}

    const items=[
      {
        props:{
          ...commonProps,
          label:<span className={lblClasses}>{tools.getKeyText(THREAT_NAME_NAME_DATAINDEX,textConfig)}</span>
        },
        filed:{
          name:THREAT_NAME_NAME_DATAINDEX,
          rules:[
            {
              required: true, message: '攻击行为不能为空',
            },
            {
              validator:this.checkInput,
            },
            {
              whitespace:true,message:"攻击行为不能为空"
            }
          ]
        },
        component:<Input disabled={loading}/>
      },
      {
        props:{
          ...commonProps,
          hasFeedback:false,
          required:true,
          label:<span className={lblClasses}>{tools.getKeyText(THREAT_NAME_LEVEL_DATAINDEX,textConfig)}</span>
        },
        filed:{
          name:THREAT_NAME_LEVEL_DATAINDEX,
          initialValue:levels[0]
        },
        component:(
          <Select size="large"
                  style={{width:"100px"}}>
            {levels.map((i,index)=>(
              <Select.Option value={i}
                             key={`${index}-item`}>
                {tools.getKeyText(i,levelTextConfig)}
              </Select.Option>
            ))}
          </Select>
        )
      },

    ]


    return (
      <Form >
        {
          items.map(i=><FormItem key={i.filed.name} {...i.props}>
            {
              getFieldDecorator(i.filed.name,{...i.filed})(i.component)
            }
          </FormItem>)
        }
        <FormItem {...tailFormItemLayout}>
          <Button type="primary"
                  loading={loading}
                  icon="plus"
                  onClick={this.handleSubmit}>添加</Button>

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
