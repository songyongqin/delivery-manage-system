/**
 * Created by jojo on 2017/9/8.
 */

import React from 'react';
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
  Slider,
  Radio
} from 'antd';

import styles from './styles.css';
import classnames from 'classnames';

import {
  HOST_IP_DATAINDEX,
  HONEYPOT_NAME_DATAINDEX,
  HONEYPOT_IP_DATAINDEX,
  INTERCATION_DATAINDEX,
  VCPUS_DATAINDEX,
  RAM_DATAINDEX,
  SYSTEM_DATAINDEX,
  SERVICES_DATAINDEX,
  GATEWAY_DATAINDEX,
  honeypotTextConfig,
  AUTH_DATAINDEX,
} from '../../ConstConfig'

import {
  interactions,
  interactionsTextConfig,
  HIGH_INTERATION,
  LOW_INTERACTION,
  systems,
  systemsTextConfig,
  services,
  servicesTextConfig
} from '../../../../configs/ConstConfig'

const gatewayReg=/^(?:(?:2[0-4][0-9]\.)|(?:25[0-5]\.)|(?:1[0-9][0-9]\.)|(?:[1-9][0-9]\.)|(?:[0-9]\.)){3}(?:(?:2[0-5][0-5])|(?:25[0-5])|(?:1[0-9][0-9])|(?:[1-9][0-9])|(?:[0-9]))$/

const ipRangeReg=/^10\.|^192\.168\.|^172\.1[6-9]\.|^172\.2[0-9]\.|^172\.3[0-1]\./

const FormItem = Form.Item;
const Option=Select.Option;

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

const Label=({keyName,className})=><span className={className}>{honeypotTextConfig[keyName]}</span>

const shouldTrimDataIndexes=[HONEYPOT_NAME_DATAINDEX,HONEYPOT_IP_DATAINDEX,GATEWAY_DATAINDEX,AUTH_DATAINDEX];


@Form.create()
class WrappedForm extends React.Component {
  state={
    [INTERCATION_DATAINDEX]:null,

  }
  handleSubmit = (e) => {
    e.preventDefault();
    const {onSubmit,form}=this.props;
    form.validateFieldsAndScroll((err, values) => {

      if (err) {
        return
      }
      shouldTrimDataIndexes.forEach(i=>values[i]=values[i].trim())

      console.info(values);

      onSubmit&&onSubmit({
        userAccount:values.userAccount,
        userPassword:values.userPassword
      });

    });
  }
  honeypotNameCheck=(rule,value,callback)=>{
    if(this.props.options[HONEYPOT_NAME_DATAINDEX].includes(value.trim())){
      return callback("该蜜罐名称已被占用");
    }
    callback();
  }
  componentDidMount=()=>{
    this.setFormType(this.props);
  }
  componentWillReceiveProps=(newProps)=>{
    this.setFormType(newProps);
  }
  setFormType=(props)=>{
    const intercation=props.form.getFieldValue(INTERCATION_DATAINDEX)
    this.setState({
      [INTERCATION_DATAINDEX]:intercation
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const {isDark,loading,defaultValue={}}=this.props;
    const activeInteraction=this.state[INTERCATION_DATAINDEX];

    const lblClasses=classnames({
      [styles["lbl-dark"]]:isDark
    })

    const commonProps={...formItemLayout,colon:false,hasFeedback:true,required:true}


    const radioClasses=classnames({
      [styles["radio"]]:true,
    })

    const checkboxClasses=classnames({
      [styles["check-box-dark"]]:isDark,
    })

    const sliderClasses=classnames({
      [styles["slider-dark"]]:isDark
    })
    return (
      <Form >
        <FormItem  {...commonProps}
                    label={<Label className={lblClasses}
                                  keyName={HONEYPOT_NAME_DATAINDEX}/>}>
          {
            getFieldDecorator(
              HONEYPOT_NAME_DATAINDEX,
              {
                initialValue:defaultValue[HONEYPOT_NAME_DATAINDEX]||"",
                rules:[
                  {
                    required: true, message: '蜜罐名称不能为空',
                  },
                  {
                    validator:this.honeypotNameCheck
                  }
                ]
              }
              )
            (
              <Input disabled={loading} placeholder="例：win高交互蜜罐1"/>
            )
          }
        </FormItem>
        <FormItem  {...commonProps}
                   label={<Label className={lblClasses}
                                 keyName={HOST_IP_DATAINDEX}/>}>
          {
            getFieldDecorator(
              HOST_IP_DATAINDEX,
              {
                initialValue:defaultValue[HOST_IP_DATAINDEX]||this.props.options[HOST_IP_DATAINDEX][0]
              }
            )
            (
              <Select>
                {
                  this.props.options[HOST_IP_DATAINDEX].map(i=><Option value={i} key={i}>
                    {i}
                  </Option>)
                }
              </Select>
            )
          }
        </FormItem>
        <FormItem  {...commonProps}
                   label={<Label className={lblClasses}
                                 keyName={HONEYPOT_IP_DATAINDEX}/>}>
          {
            getFieldDecorator(
              HONEYPOT_IP_DATAINDEX,
              {
                initialValue:defaultValue[HONEYPOT_IP_DATAINDEX]||"",
                rules:[
                  {
                    required: true, message: '蜜罐IP不能为空',
                  },
                  {
                    pattern:ipRangeReg,
                    message:"请输入正确范围内的IP"
                  }
                ]
              }
            )
            (
              <Input disabled={loading}/>
            )
          }
        </FormItem>
        <FormItem  {...commonProps}
                   label={<Label className={lblClasses}
                                 keyName={GATEWAY_DATAINDEX}/>}>
          {
            getFieldDecorator(
              GATEWAY_DATAINDEX,
              {
                initialValue:defaultValue[GATEWAY_DATAINDEX]||"",
                rules:[
                  {
                    required: true, message: '蜜罐网关不能为空',
                  },
                  {
                    pattern:gatewayReg,
                    message:"请输入正确的网关"
                  }
                ]
              }
            )
            (
              <Input disabled={loading}/>
            )
          }
        </FormItem>
        <FormItem  {...commonProps}
                   hasFeedback={false}
                   label={<Label className={lblClasses}
                                 keyName={INTERCATION_DATAINDEX}/>}>
          {
            getFieldDecorator(
              INTERCATION_DATAINDEX,
              {
                initialValue:defaultValue[INTERCATION_DATAINDEX]||interactions[0]
              }
            )
            (
              <Radio.Group className={radioClasses}>
                {
                  interactions.map(i=><Radio.Button value={i} key={i}>
                    {interactionsTextConfig[i]}
                  </Radio.Button>)
                }
              </Radio.Group>
            )
          }
        </FormItem>
        {
          activeInteraction===HIGH_INTERATION
          ?
            <FormItem  {...commonProps}
                       hasFeedback={false}
                       label={<Label className={lblClasses}
                                     keyName={SYSTEM_DATAINDEX}/>}>
              {
                getFieldDecorator(
                  SYSTEM_DATAINDEX,
                  {
                    initialValue:defaultValue[SYSTEM_DATAINDEX]||systems[0]
                  }
                )
                (
                  <Radio.Group  className={radioClasses}>
                    {
                      systems.map(i=><Radio.Button value={i} key={i}>
                        {systemsTextConfig[i]}
                      </Radio.Button>)
                    }
                  </Radio.Group>
                )
              }
            </FormItem>
            :
            null
        }
        {
          activeInteraction===LOW_INTERACTION
            ?
            <FormItem  {...commonProps}
                       hasFeedback={false}
                       label={<Label className={lblClasses}
                                     keyName={SERVICES_DATAINDEX}/>}>
              {
                getFieldDecorator(
                  SERVICES_DATAINDEX,
                  {
                    initialValue:defaultValue[SERVICES_DATAINDEX]||[],
                    rules:[
                      {
                        required: true, message: '服务支持不能为空',
                      }
                    ]
                  }
                )
                (
                  <Checkbox.Group className={checkboxClasses}>
                    {
                      services.map(i=><Checkbox value={i} key={i}>
                        {servicesTextConfig[i]}
                      </Checkbox>)
                    }
                  </Checkbox.Group>
                )
              }
            </FormItem>
            :
            null
        }
        <FormItem {...formItemLayout}
                  colon={false}
                  hasFeedback={false}
                  required={true}
                  label={<Label className={lblClasses}
                                keyName={RAM_DATAINDEX}/>}>
          {getFieldDecorator(
            RAM_DATAINDEX,
            {
              initialValue:defaultValue[RAM_DATAINDEX]||1
            }
          )(
            <Slider step={1}
                    min={1}
                    max={4}
                    className={sliderClasses}
                    tipFormatter={value=>`${value}GB`}
                    marks={{ 1: '1GB', 2: '2GB', 3: '3GB', 4: '4GB'}} />
          )}
        </FormItem>
        <FormItem {...formItemLayout}
                  colon={false}
                  hasFeedback={false}
                  required={true}
                  label={<Label className={lblClasses}
                                keyName={VCPUS_DATAINDEX}/>}>
          {getFieldDecorator(
            VCPUS_DATAINDEX,
            {
              initialValue:defaultValue[VCPUS_DATAINDEX]||1
            }
          )(
            <Slider step={1}
                    min={1}
                    max={4}
                    className={sliderClasses}
                    marks={{ 1: '1', 2: '2', 3: '3', 4: '4'}} />
          )}
        </FormItem>
        <FormItem  {...commonProps}
                    required={false}
                   label={<Label className={lblClasses}
                                 keyName={AUTH_DATAINDEX}/>}>
          {
            getFieldDecorator(
              AUTH_DATAINDEX,
              {
                initialValue:defaultValue[AUTH_DATAINDEX]||""
              }
            )
            (
              <Input disabled={loading}/>
            )
          }
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary"
                  loading={loading}
                  icon="plus"
                  onClick={this.handleSubmit}>添加</Button>
        </FormItem>
      </Form>
    );
  }
}

export default WrappedForm;
