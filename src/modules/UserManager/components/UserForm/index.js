/**
 * Created by jojo on 2017/9/8.
 */

import React from 'react';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';
import styles from './styles.css';
import classnames from 'classnames';
import {
  USER_NAME_DATAINDEX,
  REMARK_DATAINDEX,
  DEPARTMENT_DATAINDEX,
  PHONE_NUMBER_DATAINDEX,
  EMAIL_DATAINDEX,
  USERACCOUNT_DATAINDEX,
  ROLE_DATAINDEX,
  tableTextConfig,
  USER_PASSWORD_DATAINDEX,
  COMMON_USER_ROLE
} from '../../ConstConfig'

import * as tools from '../../../../utils/tools';


const textConfig = tableTextConfig.rowTitles

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

const commonItemCreater = ({ commonProps, lblClasses, dataIndex, loading }) => (
  {
    props: {
      ...commonProps,
      requried: false,
      label: <span className={lblClasses}>{tools.getKeyText(dataIndex, textConfig)}</span>
    },
    filed: {
      name: dataIndex,
      rules: dataIndex === EMAIL_DATAINDEX
        ?
        [{
          type: 'email', message: '请输入正确的邮箱格式',
        }]
        :
        []
    },
    component: <Input disabled={loading} />
  }
)


@Form.create()
class WrappedForm extends React.Component {
  state = {
    confirmDirty: false,
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const { onSubmit, form } = this.props;
    form.validateFieldsAndScroll((err, values) => {

      if (err) {
        return
      }

      delete values.confirm;

      onSubmit && onSubmit(values);

    });
  }
  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    console.info((form.getFieldValue('confirm') !== form.getFieldValue('userPassword')));
    if (value && (form.getFieldValue('confirm') !== form.getFieldValue('userPassword'))) {
      callback('两次输入的密码不一致');
    } else {
      callback();
    }
  }
  checkConfirm = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { isDark, loading, isCreate = true, defaultValue = {} } = this.props;
    const lblClasses = classnames({
      [styles["lbl-dark"]]: isDark
    })
    const commonProps = { ...formItemLayout, colon: false, hasFeedback: true }

    let items = [
      {
        props: {
          ...commonProps,
          hasFeedback: isCreate,
          label: <span className={lblClasses}>{tools.getKeyText(USERACCOUNT_DATAINDEX, textConfig)}</span>
        },
        filed: {
          name: USERACCOUNT_DATAINDEX,
          initialValue: defaultValue[USERACCOUNT_DATAINDEX],
          rules: isCreate
            ?
            [
              {
                required: true, message: '用户账号不能为空',
              },
              {
                pattern: /^[a-zA-Z0-9]{6,12}$/, message: "长度必须在6-12之间 只能由大小写字母和数字组成"
              }
            ]
            :
            []
        },
        component: <Input disabled={loading || !isCreate} />
      },

      commonItemCreater({
        commonProps: { ...commonProps, hasFeedback: false },
        lblClasses,
        loading,
        defaultValue: defaultValue[USER_NAME_DATAINDEX],
        dataIndex: USER_NAME_DATAINDEX
      }),

      {
        props: {
          ...commonProps,
          hasFeedback: false,
          label: <span className={lblClasses}>{tools.getKeyText(ROLE_DATAINDEX, textConfig)}</span>
        },
        filed: {
          name: ROLE_DATAINDEX,
          initialValue: `${COMMON_USER_ROLE}`
        },
        component: <Select>
          <Select.Option value={`${COMMON_USER_ROLE}`}>
            {tableTextConfig.enums.role[`${COMMON_USER_ROLE}`]}
          </Select.Option>
        </Select>
      },

      ...[DEPARTMENT_DATAINDEX, EMAIL_DATAINDEX, PHONE_NUMBER_DATAINDEX, REMARK_DATAINDEX].map(i => (
        commonItemCreater({
          commonProps: { ...commonProps, hasFeedback: false },
          lblClasses,
          loading,
          dataIndex: i,
          defaultValue: defaultValue[i],
        })
      )),
    ]

    items = isCreate
      ?
      [
        ...items,
        {
          props: {
            ...commonProps,
            label: <span className={lblClasses}>{tools.getKeyText(USER_PASSWORD_DATAINDEX, textConfig)}</span>
          },
          filed: {
            name: USER_PASSWORD_DATAINDEX,
            rules: [
              {
                required: true, message: '密码不能为空',
              },
              {
                pattern: /^[a-zA-Z0-9]{6,12}$/, message: "长度必须在6-12之间 只能由大小写字母和数字组成"
              },
              {
                validator: this.checkConfirm,
              }
            ]
          },
          component: <Input disabled={loading}
            type="password" />
        },
        {
          props: {
            ...commonProps,
            label: <span className={lblClasses}>确认密码</span>
          },
          filed: {
            name: "confirm",
            rules: [
              {
                required: true, message: '请再次确密码',
              },
              {
                validator: this.checkPassword,
              }
            ],
          },
          component: <Input type="password"
            disabled={loading}
            onBlur={this.handleConfirmBlur}
            onPressEnter={this.handleSubmit} />
        }
      ]
      :
      items

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
          <Button type="primary"
            loading={loading}
            icon="plus"
            onClick={this.handleSubmit}>
            {isCreate ? "添加" : "确定"}
          </Button>
        </FormItem>
      </Form>
    );
  }
}

export default WrappedForm;
