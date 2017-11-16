/**
 * Created by jojo on 2017/9/5.
 */
import React from 'react';
import { InputNumber, Button, Form, Icon, Tooltip } from 'antd';
import styles from './styles.css';
const FormItem = Form.Item;

function validatePrimeNumber(number) {
  if (number >= 1) {
    return {
      validateStatus: 'success',
      errorMsg: null,
    };
  }
  return {
    validateStatus: 'error',
    errorMsg: '必须是大于等于1的正整数',
  };
}

export default class extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      number: {
        value: props.defaultValue || 10
      }
    };
  };
  handleNumberChange = (value) => {
    this.setState({
      number: {
        ...validatePrimeNumber(value),
        value,
      },
    });
  };
  submitHandle = () => {

    if (this.state.number.validateStatus === "error") {
      return;
    }
    if (this.props.loading) {
      return;
    }
    this.props.onSubmit && this.props.onSubmit(this.state.number.value)
  };
  onKeyDown = (e) => {
    if (e.keyCode === 13) {
      this.submitHandle();
    }
  };
  render() {
    const number = this.state.number;
    const { textConfig = {}, loading, isDark } = this.props;


    return (
      <div className={styles["panel"]}>
        <Form>
          <span className={isDark ? styles["lbl-dark"] : null}
            style={{ height: "30px", lineHeight: "30px" }}>
            {textConfig.label}&nbsp;
            <Tooltip title={"当用户登录失败达到该次数时，用户将被冻结无法再登录，管理员可执行解除用户冻结操作"}>
              <a onClick={this.switchModal} >
                <Icon type="question-circle-o" style={{ color: "#108ee9" }} />
              </a>
            </Tooltip>
            &nbsp;&nbsp;
          </span>
          <FormItem style={{ width: "100px", display: "inline-block" }}
            validateStatus={number.validateStatus}
            help={number.errorMsg}>
            <InputNumber
              onKeyDown={this.onKeyDown}
              style={{ width: "100%" }}
              precision={0}
              disabled={loading}
              min={1}
              step={10}
              value={number.value}
              placeholder={textConfig["placeholder"]}
              onChange={this.handleNumberChange} />
          </FormItem>
          <FormItem style={{ width: "200px", display: "inline-block" }}>
            <Button type="primary"
              loading={loading}
              onClick={this.submitHandle}
              size="large">确定</Button>
          </FormItem>

        </Form>
      </div>

    );
  }
}



