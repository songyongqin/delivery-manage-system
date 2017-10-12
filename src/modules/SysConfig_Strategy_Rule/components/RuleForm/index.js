/**
 * Created by jojo on 2017/10/10.
 */
import React from 'react';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';
import styles from './styles.css';
import classnames from 'classnames';
import {
  RULE_PROTOCOLTYPE_DATAINDEX,
  textConfig,
  RULE_THREAT_TYPE_DATAINDEX,
  RULE_DATAINDEX,
  RULE_DESCRIPTION,
  ruleItemPlaceholder,
  ruleItemsConfig,
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
      ruleItems:[]
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const {onSubmit,form}=this.props;
    const {ruleItems}=this.state;
    form.validateFieldsAndScroll((err, values) => {
      if (err) {
        return
      }
      let _values={...values},
          rule={};

      ruleItems.forEach(i=>{
        rule[i]=(values[i]||"")
        delete _values[i];
      })

      _values[RULE_DATAINDEX]=rule;
      _values[RULE_DESCRIPTION]=_values[RULE_DESCRIPTION]||""
      onSubmit&&onSubmit(_values);
    });
  }
  componentDidMount=()=>{
    this.setRuleItems(this.props[RULE_PROTOCOLTYPE_DATAINDEX]||this.props.protocolTypes[0])
  }
  componentWillReceiveProps=newProps=>{
    const {isCreate=true}=this.props;
    if(isCreate){
      this.setRuleItems(newProps.form.getFieldValue(RULE_PROTOCOLTYPE_DATAINDEX))
    }
  }
  setRuleItems=(protocolType)=>this.setState({
    ruleItems:ruleItemsConfig[protocolType]||[]
  })
  onChange=value=>this.setRuleItems(value);

  render() {
    const { getFieldDecorator} = this.props.form;
    const {isDark,loading,defaultValue={},isCreate=true}=this.props;
    const protocolTypes=this.props.protocolTypes||[];
    const threatTypes=this.props.threatTypes||[];
    const ruleItems=this.state.ruleItems;

    const lblClasses=classnames({
      [styles["lbl-dark"]]:isDark
    });

    const commonProps={...formItemLayout,colon:false,hasFeedback:true,required:true}
    let items=[];


    items=isCreate?[
      {
        props:{
          ...commonProps,
          hasFeedback:false,
          label:<span className={lblClasses}>{tools.getKeyText(RULE_PROTOCOLTYPE_DATAINDEX,textConfig)}</span>
        },
        filed:{
          name:RULE_PROTOCOLTYPE_DATAINDEX,
          initialValue:protocolTypes[0]||""
        },
        component:(
          <Select size="large"
                  onChange={this.onChange}
                  style={{width:"140px"}}>
            {protocolTypes.map((i,index)=>(
              <Select.Option value={i}
                             key={`${index}-item`}>
                {i}
              </Select.Option>
            ))}
          </Select>
        )
      },
    ]:items;


    items=[
      ...items,
      {
        props:{
          ...commonProps,
          hasFeedback:false,
          label:<span className={lblClasses}>{tools.getKeyText(RULE_THREAT_TYPE_DATAINDEX,textConfig)}</span>
        },
        filed:{
          name:RULE_THREAT_TYPE_DATAINDEX,
          initialValue:defaultValue[RULE_THREAT_TYPE_DATAINDEX]||(threatTypes[0].value)
        },
        component:(
          <Select size="large"
                  style={{width:"140px"}}>
            {threatTypes.map((i,index)=>(
              <Select.Option value={i.value}
                             key={`${index}-item`}>
                {i.text}
              </Select.Option>
            ))}
          </Select>
        )
      },
      ...ruleItems.map((r,index)=>({
        props:{
          ...commonProps,
          required:index===0,
          label:index===0?<span className={lblClasses}>{tools.getKeyText(RULE_DATAINDEX,textConfig)}</span>:" "
        },
        filed:{
          name:r,
          initialValue:(defaultValue[RULE_DATAINDEX]||{})[r]
        },
        component:(
          <Input disabled={loading}
                 key={`${r}-${index}`}
                 placeholder={tools.getKeyText(r,ruleItemPlaceholder)}/>
        )
      })),
      {
        props:{
          ...commonProps,
          required:false,
          hasFeedBack:false,
          label:<span className={lblClasses}>{tools.getKeyText(RULE_DESCRIPTION,textConfig)}</span>
        },
        filed:{
          name:RULE_DESCRIPTION,
          initialValue:defaultValue[RULE_DESCRIPTION]
        },
        component:(
          <Input disabled={loading}/>
        )
      }
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
