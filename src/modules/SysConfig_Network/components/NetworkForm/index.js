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
  Checkbox,
  Button,
  AutoComplete,
  Slider,
  Radio,
} from 'antd';

import styles from './styles.css';
import classnames from 'classnames';

import {
  ADAPTER_NAME_DATAINDEX,
  ADAPTER_MAC_DATAINDEX,
  ADAPTER_IP_DATAINDEX,
  ADAPTER_MAS_DATAINDEX,
  ADAPTER_GW_DATAINDEX,
  ADAPTER_STATUS_DATAINDEX,
  adapterTextConfig
} from '../../ConstConfig'



const gatewayReg=/^(?:(?:2[0-4][0-9]\.)|(?:25[0-5]\.)|(?:1[0-9][0-9]\.)|(?:[1-9][0-9]\.)|(?:[0-9]\.)){3}(?:(?:2[0-5][0-5])|(?:25[0-5])|(?:1[0-9][0-9])|(?:[1-9][0-9])|(?:[0-9]))$/

const ipReg=/((25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))/

const FormItem = Form.Item;

const formItemLayout = {

};
const tailFormItemLayout = {

};

const Label=({dataIndex,className})=><span className={className}>{adapterTextConfig[dataIndex]}</span>

const dataIndexes=[
  ADAPTER_IP_DATAINDEX,
  ADAPTER_MAS_DATAINDEX,
  ADAPTER_GW_DATAINDEX,
];


const WrappedFormItem=({
                        dataIndex,
                        itemProps={},
                        lblClassName,
                        getFieldDecorator,
                        initialValue="",
                        rules=[],
                        loading})=>(

    <FormItem  {...itemProps}
               label={<Label className={lblClassName}
                             dataIndex={dataIndex}/>}>
      {
        getFieldDecorator(
          dataIndex,
          {
            initialValue,
            rules,
          }
        )
        (
          <Input disabled={loading}/>
        )
      }
    </FormItem>
)

const rulesConfig={
  [ADAPTER_IP_DATAINDEX]:[
    {
      required: true, message: "IP不能为空",
    },
    {
      pattern:ipReg,
      message:"请输入正确的IP"
    }
  ],
  [ADAPTER_MAS_DATAINDEX]:[
    {
      required: true, message: "子网掩码不能为空",
    },
    {
      pattern:ipReg,
      message:"请输入正确的子网掩码"
    }
  ],
  [ADAPTER_GW_DATAINDEX]:[
    {
      required: true, message: "网关不能为空",
    },
    {
      pattern:gatewayReg,
      message:"请输入正确的网关"
    }
  ]
}


@Form.create()
class WrappedForm extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault();
    const {onSubmit,form}=this.props;
    form.validateFieldsAndScroll((err, values) => {

      if (err) {
        return
      }

      dataIndexes.forEach(i=>values[i]=values[i].trim())

      console.info(values);

      onSubmit&&onSubmit(values);

    });
  }


  render() {
    const { getFieldDecorator } = this.props.form;
    const {isDark,loading,defaultValue={}}=this.props;

    const lblClasses=classnames({
      [styles["lbl-dark"]]:isDark
    })

    const commonProps={...formItemLayout,colon:false,hasFeedback:false,required:false}


    return (
      <Form layout="inline" style={{minWidth:"900px"}}>
        {
          dataIndexes.map(i=><WrappedFormItem key={i} {...{
            dataIndex:i,
            itemProps:commonProps,
            lblClassName:lblClasses,
            getFieldDecorator,
            initialValue:defaultValue[i]||"",
            loading,
            rules:rulesConfig[i]
          }}/>)
        }
        <FormItem>
          <Button type="primary"
                  loading={loading}
                  icon="save"
                  onClick={this.handleSubmit}>保存</Button>
        </FormItem>
      </Form>
    );
  }
}

export default WrappedForm;
