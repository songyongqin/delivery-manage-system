/**
 * Created by jojo on 2017/10/10.
 */
import React from 'react'
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd'
import classnames from 'classnames'

import * as tools from 'utils'
import { ipReg } from 'utils/tools'

export const TYPE_DATAINDEX = "type",
  FEATURE_DATAINDEX = "feature",
  OPEN_DATAINDEX = "open",
  ID_DATAINDEX = "id"

export const STRATEGY_OPERATION_KEY = "operation";

export const textConfig = {
  [TYPE_DATAINDEX]: "白名单类型",
  [FEATURE_DATAINDEX]: "白名单特征",
  [OPEN_DATAINDEX]: "是否可用",
  [STRATEGY_OPERATION_KEY]: "操作"
}

export const dataIndexes = Object.keys(textConfig);

export const DOMAIN_TYPE = "domain",
  IP_TYPE = "ip"

export const typeTextConfig = {
  [DOMAIN_TYPE]: "域名",
  [IP_TYPE]: "IP"
}

export const types = Object.keys(typeTextConfig)

export const OPEN_VALUE = 1,
  UN_OPEN_VALUE = 0;

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


@(Form.create() as any)
class WrappedForm extends React.Component<any, any> {
  constructor(props) {
    super(props)
    this.state = {
      update: 1,
    }
  }


  handleSubmit = (e) => {
    e.preventDefault();
    const { onSubmit, form } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (err) {
        return
      }
      onSubmit && onSubmit(values);
    })
  }

  onChange = () => {
    this.props.form.resetFields([FEATURE_DATAINDEX])
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { isDark, loading, defaultValue = {}, isCreate = true } = this.props;
    const lblClasses = classnames({
      // [styles["lbl-dark"]]:isDark
    });

    const commonProps = { ...formItemLayout, colon: false, hasFeedback: true, required: true }
    let items = [
      {
        props: {
          ...commonProps,
          hasFeedback: false,
          label: <span className={lblClasses}>{tools.getKeyText(TYPE_DATAINDEX, textConfig)}</span>
        },
        filed: {
          name: TYPE_DATAINDEX,
          initialValue: defaultValue[TYPE_DATAINDEX] || types[0]
        },
        component: (
          <Select
            disabled={loading}
            onChange={this.onChange}
            style={{ width: "140px" }}>
            {types.map((i, index) => (
              <Select.Option value={i}
                key={`${index}-item`}>
                {tools.getKeyText(i, typeTextConfig)}
              </Select.Option>
            ))}
          </Select>
        )
      },
      {
        props: {
          ...commonProps,
          label: <span className={lblClasses}>{tools.getKeyText(FEATURE_DATAINDEX, textConfig)}</span>
        },
        filed: {
          name: FEATURE_DATAINDEX,
          initialValue: defaultValue[FEATURE_DATAINDEX],
          rules: this.props.form.getFieldValue(TYPE_DATAINDEX) === IP_TYPE
            ?
            [
              {
                pattern: ipReg,
                message: "请输入正确的IP地址"
              },
              {
                required: true,
                message: "不能为空"
              },
              {
                whitespace: true,
                message: "不能为空"
              }
            ]
            :
            [
              {
                required: true,
                message: "不能为空"
              },
              {
                whitespace: true,
                message: "不能为空"
              }
            ]
        },
        component: (
          <Input disabled={loading} />
        )
      }
    ]


    return (
      <Form>
        {
          items.map(i => <FormItem key={i.filed.name} {...i.props}>
            {
              getFieldDecorator(i.filed.name, { ...i.filed })(i.component)
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
