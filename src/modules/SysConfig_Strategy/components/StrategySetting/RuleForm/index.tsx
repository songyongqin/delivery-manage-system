import * as  React from 'react'
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd'
// import styles from './styles.css'
import classnames from 'classnames'
import {
  PROTOCOLTYPE,
  THREATTYPE,
  RULE,
  DESCRIPTION,
  ruleItemPlaceholder,
  ruleItemsConfig,
  THREATLEVEL
} from '../../../constants'
import * as tools from 'utils'
import ruleItemCheckConfig from './itemCheckerConfig'

const textConfig = {
  [THREATTYPE]: "威胁类型",
  [RULE]: "规则",
  [DESCRIPTION]: "特征描述",
  [PROTOCOLTYPE]: "协议类型",
  [THREATLEVEL]: "威胁等级"
}


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
      ruleItems: [],
      checkerStatus: {
        // sourceIpPort:{
        //   status:"error"
        // }
      }
    }
  }


  handleSubmit = (e) => {
    e.preventDefault();
    const { onSubmit, form } = this.props;
    const { ruleItems } = this.state;
    const ERROR = "error";


    Promise.all(ruleItems.map(i => this.getRuleCheckConfirm(i)())).then(result => {
      setTimeout(() => {
        form.validateFieldsAndScroll((err, values) => {
          if (err) {
            return
          }

          if (Object.values(this.state.checkerStatus).some(i => i.status === ERROR)) {
            return;
          }

          let _values = { ...values },
            rule = {}

          ruleItems.forEach(i => {
            rule[i] = (values[i] || "")
            delete _values[i]
          })

          _values[RULE] = rule
          _values[RULE] = _values[RULE] || ""

          if (this.props.isCreate == false) {
            let values_ = {
              ..._values,
              protocolType: this.props.protocolType,
              id: this.props.defaultValue.id
            }
            onSubmit && onSubmit(values_)

          }
          else {
            onSubmit && onSubmit(_values)
          }
        });
      })
    })


  }

  componentDidMount() {
    this.setRuleItems(this.props[PROTOCOLTYPE] || this.props.protocolTypes[0])
  }

  componentWillReceiveProps(newProps) {
    const { isCreate = true, form } = this.props;
    const isChangeProtocol = newProps.form.getFieldValue(PROTOCOLTYPE) !== form.getFieldValue(PROTOCOLTYPE)
    if (isCreate && isChangeProtocol) {
      this.setRuleItems(newProps.form.getFieldValue(PROTOCOLTYPE))
    }
  }

  setRuleItems = (protocolType) => {

    this.setState({
      ruleItems: ruleItemsConfig[protocolType] || [],
      checkerStatus: {}
    })
  }

  onChange = value => this.setRuleItems(value);

  getRuleCheckConfirm = dataIndex => () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const activeProtocolType = this.props.form.getFieldValue(PROTOCOLTYPE) ||
            this.props[PROTOCOLTYPE];
          ruleItemCheckConfig && ruleItemCheckConfig[activeProtocolType]({
            dataIndex,
            setCheckStatus: this.setCheckerStatus,
            props: this.props,
            checkerStatus: this.state.checkerStatus
          })

          resolve();

        } catch (e) {

        }
      })
    })

  }
  setCheckerStatus = (dataIndex, status, help) => {

    const { checkerStatus } = this.state;
    const _checkerStatus = {
      ...checkerStatus,
      [dataIndex]: {
        status,
        help
      }
    }

    this.setState({
      checkerStatus: _checkerStatus
    })
  }
  handleSelectChange = (value) => {
    const { threatTypes } = this.props;
    const a = threatTypes.filter((i) => i.value == value);
    this.props.form.setFieldsValue({
      threatLevel: a[0].threatLevel,
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { isDark, loading, defaultValue = {}, isCreate = true } = this.props;
    const protocolTypes = this.props.protocolTypes || [];
    const threatTypes = this.props.threatTypes || [];
    const { ruleItems, checkerStatus } = this.state;
    const lblClasses = classnames({
      // [styles["lbl-dark"]]: isDark
    });
    const commonProps = { ...formItemLayout, colon: false, hasFeedback: true, required: true }
    let items = [];
    items = isCreate ? [
      {
        props: {
          ...commonProps,
          hasFeedback: false,
          label: <span className={lblClasses}>
            {tools.getKeyText(PROTOCOLTYPE, textConfig)}
          </span>
        },
        filed: {
          name: PROTOCOLTYPE,
          initialValue: protocolTypes[0] || ""
        },
        component: (
          <Select
            disabled={loading}
            onChange={this.onChange}
            style={{ width: "140px" }}>
            {protocolTypes.map((i, index) => (
              <Select.Option value={i}
                key={`${index}-item`}>
                {i}
              </Select.Option>
            ))}
          </Select>
        )
      },
    ] : items;

    items = [
      ...items,
      {
        props: {
          ...commonProps,
          hasFeedback: false,
          label: <span className={lblClasses}>{tools.getKeyText(THREATTYPE, textConfig)}</span>
        },
        filed: {
          name: THREATTYPE,
          initialValue: defaultValue[THREATTYPE] || ((threatTypes[0] || {}).value)
        },
        component: (
          <Select
            onChange={this.handleSelectChange}
            disabled={loading}
            style={{ width: "140px" }}>
            {threatTypes.map((i, index) => (
              <Select.Option value={i.key || i.value}
                key={`${index}-item`}>
                {i.name || i.text}
              </Select.Option>
            ))}
          </Select>
        )
      },
      ...ruleItems.map((r, index) => (
        {
          props: {
            ...commonProps,
            required: index === 0,
            validateStatus: (checkerStatus[r] || {}).status,
            help: (checkerStatus[r] || {}).help,
            label: index === 0 ? <span className={lblClasses}>{tools.getKeyText(RULE, textConfig)}</span> : " "
          },
          filed: {
            name: r,
            initialValue: (defaultValue[RULE] || {})[r],
            // rules: [
            //   {
            //     required: true, message: "不能为空"
            //   },
            // ]
          },
          component: (
            <Input
              disabled={loading}
              key={`${r}-${index}`}
              onChange={this.getRuleCheckConfirm(r)}
              placeholder={`${tools.getKeyText(r, ruleItemPlaceholder)}`}
            />
          )
        })),
      {
        props: {
          ...commonProps,
          required: true,
          hasFeedBack: false,
          label: <span className={lblClasses}>{tools.getKeyText(DESCRIPTION, textConfig)}</span>
        },
        filed: {
          name: DESCRIPTION,
          initialValue: defaultValue[DESCRIPTION],
          rules: [
            {
              required: true, message: "不能为空"
            }
          ]
        },
        component: (
          <Input disabled={loading} />
        )
      },
      {
        props: {
          ...commonProps,
          required: true,
          hasFeedBack: false,
          label: <span className={lblClasses}>{tools.getKeyText(THREATLEVEL, textConfig)}</span>
        },
        filed: {
          name: THREATLEVEL,
          initialValue: defaultValue[THREATLEVEL] || ((threatTypes[0] || {}).threatLevel),
          rules: [
            {
              required: true, message: "不能为空"
            }
          ]
        },
        component: (
          <Input disabled={true} />
        )
      }
    ]


    return (
      <Form >
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