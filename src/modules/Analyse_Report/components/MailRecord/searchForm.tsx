import * as React from 'react'
import { Form, Input, Button, Checkbox } from 'antd'
import { connect } from 'dva'
import { createMapDispatchWithPromise } from 'utils/dvaExtraDispatch'
import {
  NAMESPACE_MAIL,
  MAIL_ACCOUNT_SEARCH,
  MAIL_IP_SEARCH,
  MAIL_SENDER_ACCOUNT_DATAINDEX,
  MAIL_SENDER_IP_DATAINDEX,
  MAIL_RECEIVER_ACCOUNT_DATAINDEX,
  MAIL_RECEIVER_IP_DATAINDEX,
  MAIL_RECEIVER_SEARCH,
  MAIL_RECEIVER_DATAINDEX,
  MAIL_SENDER_SEARCH
} from '../../ConstConfig'
const FormItem = Form.Item;
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};
const formTailLayout = {
  labelCol: { span: 6 },
  wrapperCol: { offset: 18 },
};
const mapStateToProps = state => {
  const { data, fileMd5, emailTheme, receiverIp, receiverAccount, senderIp, senderAccount, threatType, limit, total, page, } = state[NAMESPACE_MAIL];
  return {
    data, fileMd5, emailTheme, receiverIp, receiverAccount, senderIp, senderAccount, threatType, limit, total, page,
    loading: state.loading.effects[`${NAMESPACE_MAIL}/fetch`]
  }
}
const mapDispatchToProps = dispatch => {
  return {
    fetch: payload => dispatch({
      type: `${NAMESPACE_MAIL}/fetch`,
      payload
    }),
    save: payload => dispatch({
      type: `${NAMESPACE_MAIL}/save`,
      payload
    })
  }
}
class Page extends React.Component<any, any> {
  state = {
    checkNick: false,
  };
  handle = (payload) => {
    const { text } = this.props;
    const {
      page,
      limit,
      emailTheme,
      fileMd5,
      threatType,
      senderAccount,
      senderIp,
      receiverAccount,
      receiverIp,
    } = this.props;
    if (text == MAIL_SENDER_SEARCH) {
      this.props.fetch({
        page,
        limit,
        emailTheme,
        fileMd5,
        threatType,
        senderAccount: payload.senderAccount,
        senderIp: payload.senderIp,
        receiverAccount,
        receiverIp,
      })
        .then(this.props.onSearch())
    }
    else {
      this.props.fetch({
        page,
        limit,
        emailTheme,
        fileMd5,
        threatType,
        senderAccount,
        senderIp,
        receiverAccount: payload.receiverAccount,
        receiverIp: payload.receiverIp,
      })
        .then(this.props.onSearch())
    }

  }


  handleSubmit = (e) => {

    const { form } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (err) {
        return
      }
      delete values.confirm;
      this.props.save({ values })
      this.handle && this.handle(values);

    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { text } = this.props;
    return (
      <div>
        <p>{this.props.text}</p>
        <Form onSubmit={this.handleSubmit}>
          <FormItem {...formItemLayout} label={MAIL_ACCOUNT_SEARCH}>
            {getFieldDecorator(text == MAIL_SENDER_SEARCH ? MAIL_SENDER_ACCOUNT_DATAINDEX : MAIL_RECEIVER_ACCOUNT_DATAINDEX, {
              rules: [{
                // required: true,
              }],
            })(
              <Input placeholder="" />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label={MAIL_IP_SEARCH}>
            {getFieldDecorator(text == MAIL_SENDER_SEARCH ? MAIL_SENDER_IP_DATAINDEX : MAIL_RECEIVER_IP_DATAINDEX, {
              rules: [{
                // required: this.state.checkNick,
                // message: 'Please input your nickname',
              }],
            })(
              <Input placeholder="" />
            )}
          </FormItem>
          <FormItem {...formTailLayout}>
            <Button icon="search" type="primary" onClick={this.handleSubmit} style={{}}>搜索</Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

const SearchForm = Form.create()(Page);
export default connect(mapStateToProps, createMapDispatchWithPromise(mapDispatchToProps))(SearchForm);