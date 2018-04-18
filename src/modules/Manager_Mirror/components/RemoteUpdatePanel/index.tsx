import { connect } from 'dva';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, DatePicker } from 'antd';
import React from 'react';
import classnames from 'classnames'
const FormItem = Form.Item;
import {
  OPERATION_NAMESPACE,
} from '../../ConstConfig'
import JoSpin from 'domainComponents/Spin'
import UpdateResultPanel from '../UpdateResultPanel'
import extraConnect from 'domainUtils/extraConnect'

class RemoteUpdate extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      res: null,
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (this.props.loading) {
        return;
      }

      if (err) {
        return;
      }

      this.props.onSubmit && this.props.onSubmit(values)
        .then(res => this.setState({
          res,
        }));
    });
  };

  render() {

    const { getFieldDecorator } = this.props.form;
    const { defaultValue = {}, isDark, loading = false, textConfig = {}, style = {}, keyConfig = "value" } = this.props;
    const { value = "" } = defaultValue;
    const { res } = this.state;
    const lblClasses = classnames({
      "lbl-dark": isDark
    })

    return (
      <Form>
        {
          res
            ?
            <UpdateResultPanel
              onCancel={this.props.onCancel}
              isDark={isDark}
              res={res}>
            </UpdateResultPanel>
            :
            <JoSpin spinning={loading}>
              <FormItem required={false}
                colon={false}
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 10 }}
                label={<span className={lblClasses}>升级服务器地址</span>}>
                {getFieldDecorator(keyConfig, {
                  initialValue: value,
                  rules: [
                    {
                      required: true, message: "不能为空"
                    }
                  ]
                })(
                  <Input placeholder={"请输入服务器地址"}
                    disabled={loading}
                    onPressEnter={this.handleSubmit} />
                )}
              </FormItem>
              <FormItem required={false}
                colon={false}
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 10 }}
                label={"  "}>
                <Button
                  type="primary"
                  size="large"
                  loading={loading}
                  onClick={this.handleSubmit}>更新</Button>
              </FormItem>
            </JoSpin>
        }

      </Form>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.loading.effects[`${OPERATION_NAMESPACE}/updateRemote`]
  }
}


const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSubmit: payload => {
      ownProps.hideOptionPanel()
      return dispatch({
        type: `${OPERATION_NAMESPACE}/updateRemote`,
        payload
      })
    }
  }
}

export default extraConnect(
  mapStateToProps,
  (mapDispatchToProps)
)(Form.create()(RemoteUpdate));






