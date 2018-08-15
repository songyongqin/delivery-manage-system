/**
 * Created by jojo on 2017/10/10.
 */
import React from 'react'
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd'
import classnames from 'classnames'

import * as tools from 'utils'
import { ipReg } from 'utils/tools'
const { TextArea } = Input;
export const TYPE_DATAINDEX = "type",
  SNORT_DATAINDEX = "snortrule",
  OPEN_DATAINDEX = "open",
  ID_DATAINDEX = "id"

export const STRATEGY_OPERATION_KEY = "operation";

export const textConfig = {
  [TYPE_DATAINDEX]: "白名单类型",
  [SNORT_DATAINDEX]: "snort特征",
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
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
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
      offset: 4,
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
    const { onSubmit, form, isCreate, defaultValue } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (err) {
        return
      }
      isCreate
        ?
        onSubmit && onSubmit({ id: "", ...values })
        :
        onSubmit && onSubmit({ id: defaultValue.id, ...values })
    })
  }

  onChange = () => {
    this.props.form.resetFields([SNORT_DATAINDEX])
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
          label: <span className={lblClasses}>{tools.getKeyText(SNORT_DATAINDEX, textConfig)}</span>
        },
        filed: {
          name: SNORT_DATAINDEX,
          initialValue: isCreate ? null : defaultValue[SNORT_DATAINDEX]
        },
        component: (
          <TextArea autosize={{ minRows: 12, maxRows: 24 }} disabled={loading}
            placeholder="输入自定义snort特征内容："
          />
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
                onClick={this.handleSubmit}>上传编辑内容</Button>
              :
              <Button type="primary"
                loading={loading}
                icon="save"
                onClick={this.handleSubmit}>保存</Button>
          }
          <Button type="primary"
            loading={loading}
            style={{ marginLeft: "15px" }}
            icon="close"
            onClick={this.props.onCancel}>取消</Button>
        </FormItem>
      </Form>
    );
  }
}

export default WrappedForm;
