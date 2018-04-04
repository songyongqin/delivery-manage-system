import * as React from 'react'
import { Input, Button, Form, Select, Radio, Row, Col } from 'antd'
import * as tools from 'utils/tools'
import classnames from 'classnames'
const FormItem = Form.Item

const MULTIPLE = "multiple", SINGLE = "single"

const getChecker = ipList => (ip) => {
  if (!tools.ipReg.test(ip)) {
    return {
      validateStatus: 'error',
      errorMsg: '请输入正确的IP',
    }
  }

  if (ipList.includes(ip)) {
    return {
      validateStatus: 'error',
      errorMsg: `${ip}已存在`
    };
  }

  return {
    validateStatus: 'success',
    errorMsg: null
  };
}

const FILL_STR = "0"

const fillStrStart = str => {
  let value = str = FILL_STR.repeat(3) + str;
  return value.slice(value.length - 3)
}


const getIpRangeChecker = (ipList) => (ipStart = "", ipEnd = "") => {
  if (ipList.includes(ipStart + "~" + ipEnd)) {
    return {
      ipStart: {
        validateStatus: 'error',
        errorMsg: `该IP范围已经已存在`
      },
      ipEnd: {
        validateStatus: 'error',
        errorMsg: `该IP范围已经已存在`
      }
    }
  }
  const ipStartIsIp = tools.ipReg.test(ipStart),
    ipEndIsIp = tools.ipReg.test(ipEnd)

  let result = {};
  if (!ipStartIsIp) {
    result.ipStart = {
      validateStatus: 'error',
      errorMsg: '请输入正确的IP',
    }
  }
  if (!ipEndIsIp) {
    result.ipEnd = {
      validateStatus: 'error',
      errorMsg: '请输入正确的IP',
    }
  }

  if ((!ipEndIsIp) || (!ipStartIsIp)) {
    return result;
  }

  const [startNth1] = ipStart.split("."),
    [endNth1] = ipEnd.split(".")

  const errorResult = {
    ipStart: {
      validateStatus: 'error',
      errorMsg: `IP范围输入错误`
    },
    ipEnd: {
      validateStatus: 'error',
      errorMsg: `IP范围输入错误`
    }
  }

  if (startNth1 !== endNth1) {
    return errorResult
  }
  if (parseInt(ipStart.split(".").map(fillStrStart).join("")) >= parseInt(ipEnd.split(".").map(fillStrStart).join(""))) {
    return errorResult
  }


  return {
    ipStart: {
      validateStatus: 'success',
      errorMsg: null
    },
    ipEnd: {
      validateStatus: 'success',
      errorMsg: null
    }
  }

}

export default class extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      ip: {
        value: props.defaultValue || ""
      },
      ipStart: {
        value: ""
      },
      ipEnd: {
        value: ""
      },
      mode: SINGLE
    };
  };
  modeOnChange = e => {
    this.setState({
      mode: e.target.value
    })
  }
  onChange = (e) => {
    let value = e.target.value;
    this.ipCheck(value)
  };
  ipCheck = value => {
    const payload = {
      ip: {
        ...getChecker(this.props.ipList || [])(value),
        value,
      },
    }
    this.setState(payload);
    return payload;
  }
  ipStartOnChange = e => {
    let value = e.target.value;
    this.ipStartCheck(value)
  }
  ipEndOnChange = e => {
    let value = e.target.value;
    this.ipEndCheck(value)
  }
  ipStartCheck = value => {
    const ipEndValue = this.state.ipEnd.value;
    const result = getIpRangeChecker(this.props.ipList || [])(value, ipEndValue);
    const payload = {
      ipStart: {
        ...result.ipStart,
        value,
      },
      ipEnd: {
        ...result.ipEnd,
        value: ipEndValue
      }
    }
    this.setState(payload)
    return payload;
  }
  ipEndCheck = value => {
    const ipStartValue = this.state.ipStart.value;
    const result = getIpRangeChecker(this.props.ipList || [])(ipStartValue, value);
    const payload = {
      ipStart: {
        ...result.ipStart,
        value: ipStartValue
      },
      ipEnd: {
        ...result.ipEnd,
        value
      }
    }
    this.setState(payload)
    return payload;
  }
  submitHandle = () => {
    const { mode, ip, ipStart, ipEnd } = this.state;

    if (mode === SINGLE && this.ipCheck(ip.value).ip.validateStatus === "error") {
      return;
    }
    if (mode === MULTIPLE && this.ipStartCheck(ipStart.value).ipStart.validateStatus === "error") {
      return;
    }
    if (mode === MULTIPLE && this.ipEndCheck(ipEnd.value).ipEnd.validateStatus === "error") {
      return;
    }
    if (this.props.loading) {
      return;
    }
    const payload = mode === SINGLE ? { ip: ip.value } : { ip: `${ipStart.value}~${ipEnd.value}` }

    this.props.onSubmit && this.props.onSubmit(payload)
  };
  onKeyDown = (e) => {
    if (e.keyCode === 13) {
      this.submitHandle();
    }
  };
  render() {
    const { ip, mode, ipStart, ipEnd } = this.state;
    const { textConfig = {}, loading, isDark } = this.props;

    const lblClasses = classnames({
      ["lbl-dark"]: isDark,
    })

    return (
      <div>
        <Form>
          {/* <span className={isDark ? styles["lbl-dark"] : null}
            style={{ height: "30px", lineHeight: "30px" }}>
            IP:&nbsp;
          </span> */}

          <FormItem
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 18 }}
            label={<span className={lblClasses}>输入类型</span>}>
            <Radio.Group value={mode} onChange={this.modeOnChange}>
              <Radio.Button value={SINGLE}>单个IP</Radio.Button>
              <Radio.Button value={MULTIPLE}>IP范围</Radio.Button>
            </Radio.Group>
          </FormItem>
          <Row>
            <Col span={4}>
              <p style={{ textAlign: "right", paddingRight: "10px" }}>
                <span className={lblClasses}>IP:</span>
              </p>
            </Col>
            <Col span={18}>
              {
                mode === SINGLE
                  ?
                  <FormItem
                    validateStatus={ip.validateStatus}
                    help={ip.errorMsg}>
                    <Input
                      onKeyDown={this.onKeyDown}
                      style={{ width: "100%" }}
                      disabled={loading}
                      value={ip.value}
                      placeholder={textConfig["placeholder"]}
                      onChange={this.onChange} />
                  </FormItem>
                  :
                  <Row>
                    <Col span={11}>
                      <FormItem
                        validateStatus={ipStart.validateStatus}
                        help={ipStart.errorMsg}>
                        <Input
                          onKeyDown={this.onKeyDown}
                          style={{ width: "100%" }}
                          disabled={loading}
                          value={ipStart.value}
                          placeholder={textConfig["placeholder"]}
                          onChange={this.ipStartOnChange} />
                      </FormItem>
                    </Col>
                    <Col span={2}>
                      <p className={lblClasses} style={{ textAlign: "center" }}>~</p>
                    </Col>
                    <Col span={11}>
                      <FormItem
                        validateStatus={ipEnd.validateStatus}
                        help={ipEnd.errorMsg}>
                        <Input
                          onKeyDown={this.onKeyDown}
                          style={{ width: "100%" }}
                          disabled={loading}
                          value={ipEnd.value}
                          placeholder={textConfig["placeholder"]}
                          onChange={this.ipEndOnChange} />
                      </FormItem>
                    </Col>
                  </Row>
              }
            </Col>
          </Row>

          <FormItem wrapperCol={{ span: 18, push: 4 }}>
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



