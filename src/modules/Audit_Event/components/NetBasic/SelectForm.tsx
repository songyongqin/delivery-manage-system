import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, DatePicker } from 'antd';
import React from 'react';
import * as tools from '../../../../utils/tools';

import classnames from 'classnames';
export const TIME_DATA_INDEX = "time",
  THREATJUDGE_DATA_INDEX = "threatJudge",
  SOURCE_IP_DATA_INDEX = "sourceIP",
  SOURCE_PORT_DATA_INDEX = "sourcePort",
  TARGET_IP_DATA_INDEX = "targetIP",
  TARGET_PORT_DATA_INDEX = "targetPort",
  URL_DATA_INDEX = "httpUrl",
  HOST_DATA_INDEX = "httpHost",
  METHOD_DATA_INDEX = "httpMethod",
  CONTENT_TYPE_DATA_INDEX = "contentType",
  PROTOCOL_TYPE_DATA_INDEX = "protocolType",
  REQUEST_DOMAIN_DATA_INDEX = "dnsRequestDomain",
  REQUEST_IP_DATA_INDEX = "dnsRequestIP",
  PACKAGE_TYPE_DATA_INDEX = "dnsPackageType",
  SENDER_DATA_INDEX = "smtpSender",
  RECEIVE_DATA_INDEX = "smtpReceiver",
  PROTOCOL_VERSION_DATA_INDEX = "sshProtocolVersion",


  FTP_DIRECTION_DATA_INDEX = 'ftpDirection',
  FTP_CURRENT_LINE_DATA_INDEX = 'ftpCurrentLine',
  FTP_PORT_LINE_DATA_INDEX = 'ftpPortLine',
  SMB_NBSS_TYPE_DATA_INDEX = 'smbNbssType',
  SMB_COMMAND_AND_CODE_DATA_INDEX = 'smbCommandAndCode',
  DNP3_APP_FUNCTION_CODE_DATA_INDEX = 'dnp3AppFunctionCode',
  DNP3_DATA_FUNCTION_CODE_DATA_INDEX = 'dnp3DataFunctionCode',
  DNP3_TYPE_DATA_INDEX = 'dnp3Type',
  MODBUS_FUNCTION_DATA_INDEX = 'modbusFunction'



export const HTTP = 'HTTP',
  TCP = "TCP",
  DNS = "DNS",
  FTP = "FTP",
  SMTP = "SMTP",
  SSH = "SSH",
  SMB = 'SMB',
  DNP3 = 'DNP3',
  MODBUS = 'modbus';

export const protocolTypeList = [HTTP, TCP, DNS, FTP, SMTP, SSH, SMB,DNP3, MODBUS ];

export const dataIndexesConfig = {
  [HTTP]: [
    TIME_DATA_INDEX,
    THREATJUDGE_DATA_INDEX,
    SOURCE_IP_DATA_INDEX,
    SOURCE_PORT_DATA_INDEX,
    TARGET_IP_DATA_INDEX,
    TARGET_PORT_DATA_INDEX,
    URL_DATA_INDEX,
    HOST_DATA_INDEX,
    METHOD_DATA_INDEX,
    CONTENT_TYPE_DATA_INDEX,
    PROTOCOL_TYPE_DATA_INDEX
  ],
  [TCP]: [
    TIME_DATA_INDEX,
    THREATJUDGE_DATA_INDEX,
    SOURCE_IP_DATA_INDEX,
    SOURCE_PORT_DATA_INDEX,
    TARGET_IP_DATA_INDEX,
    TARGET_PORT_DATA_INDEX,
  ],
  [DNS]: [
    TIME_DATA_INDEX,
    THREATJUDGE_DATA_INDEX,
    SOURCE_IP_DATA_INDEX,
    SOURCE_PORT_DATA_INDEX,
    TARGET_IP_DATA_INDEX,
    TARGET_PORT_DATA_INDEX,
    REQUEST_DOMAIN_DATA_INDEX,
    REQUEST_IP_DATA_INDEX,
    PACKAGE_TYPE_DATA_INDEX,
    PROTOCOL_TYPE_DATA_INDEX
  ],
  [FTP]: [
    TIME_DATA_INDEX,
    THREATJUDGE_DATA_INDEX,
    SOURCE_IP_DATA_INDEX,
    SOURCE_PORT_DATA_INDEX,
    TARGET_IP_DATA_INDEX,
    TARGET_PORT_DATA_INDEX,
    FTP_DIRECTION_DATA_INDEX,
    FTP_CURRENT_LINE_DATA_INDEX,
    FTP_PORT_LINE_DATA_INDEX
  ],
  [SMTP]: [
    TIME_DATA_INDEX,
    THREATJUDGE_DATA_INDEX,
    SOURCE_IP_DATA_INDEX,
    SOURCE_PORT_DATA_INDEX,
    TARGET_IP_DATA_INDEX,
    TARGET_PORT_DATA_INDEX,
    SENDER_DATA_INDEX,
    RECEIVE_DATA_INDEX,
  ],
  [SSH]: [
    TIME_DATA_INDEX,
    THREATJUDGE_DATA_INDEX,
    SOURCE_IP_DATA_INDEX,
    SOURCE_PORT_DATA_INDEX,
    TARGET_IP_DATA_INDEX,
    TARGET_PORT_DATA_INDEX,
    PROTOCOL_VERSION_DATA_INDEX
  ],
  [SMB]: [
    TIME_DATA_INDEX,
    THREATJUDGE_DATA_INDEX,
    SOURCE_IP_DATA_INDEX,
    SOURCE_PORT_DATA_INDEX,
    TARGET_IP_DATA_INDEX,
    TARGET_PORT_DATA_INDEX,
    SMB_NBSS_TYPE_DATA_INDEX,
    SMB_COMMAND_AND_CODE_DATA_INDEX
  ],
  [DNP3]: [
    TIME_DATA_INDEX,
    THREATJUDGE_DATA_INDEX,
    SOURCE_IP_DATA_INDEX,
    SOURCE_PORT_DATA_INDEX,
    TARGET_IP_DATA_INDEX,
    TARGET_PORT_DATA_INDEX,
    DNP3_APP_FUNCTION_CODE_DATA_INDEX,
    DNP3_DATA_FUNCTION_CODE_DATA_INDEX,
    DNP3_TYPE_DATA_INDEX
  ],
  [MODBUS]: [
    TIME_DATA_INDEX,
    THREATJUDGE_DATA_INDEX,
    SOURCE_IP_DATA_INDEX,
    SOURCE_PORT_DATA_INDEX,
    TARGET_IP_DATA_INDEX,
    TARGET_PORT_DATA_INDEX,
    MODBUS_FUNCTION_DATA_INDEX
  ]
}
export const dataLimitIndexesConfig = {
  [HTTP]: [
    TIME_DATA_INDEX,
    SOURCE_IP_DATA_INDEX,
    SOURCE_PORT_DATA_INDEX,
    TARGET_IP_DATA_INDEX,
    TARGET_PORT_DATA_INDEX,
    URL_DATA_INDEX,
    HOST_DATA_INDEX,
    METHOD_DATA_INDEX,
    CONTENT_TYPE_DATA_INDEX,
    PROTOCOL_TYPE_DATA_INDEX
  ],
  [TCP]: [
    TIME_DATA_INDEX,
    SOURCE_IP_DATA_INDEX,
    SOURCE_PORT_DATA_INDEX,
    TARGET_IP_DATA_INDEX,
    TARGET_PORT_DATA_INDEX,
  ],
  [DNS]: [
    TIME_DATA_INDEX,
    SOURCE_IP_DATA_INDEX,
    SOURCE_PORT_DATA_INDEX,
    TARGET_IP_DATA_INDEX,
    TARGET_PORT_DATA_INDEX,
    REQUEST_DOMAIN_DATA_INDEX,
    REQUEST_IP_DATA_INDEX,
    PACKAGE_TYPE_DATA_INDEX,
    PROTOCOL_TYPE_DATA_INDEX
  ],
  [FTP]: [
    TIME_DATA_INDEX,
    SOURCE_IP_DATA_INDEX,
    SOURCE_PORT_DATA_INDEX,
    TARGET_IP_DATA_INDEX,
    TARGET_PORT_DATA_INDEX,
  ],
  [SMTP]: [
    TIME_DATA_INDEX,
    SOURCE_IP_DATA_INDEX,
    SOURCE_PORT_DATA_INDEX,
    TARGET_IP_DATA_INDEX,
    TARGET_PORT_DATA_INDEX,
    SENDER_DATA_INDEX,
    RECEIVE_DATA_INDEX,
  ],
  [SSH]: [
    TIME_DATA_INDEX,
    SOURCE_IP_DATA_INDEX,
    SOURCE_PORT_DATA_INDEX,
    TARGET_IP_DATA_INDEX,
    TARGET_PORT_DATA_INDEX,
    PROTOCOL_VERSION_DATA_INDEX
  ]
}


export const textConfig = {
  [TIME_DATA_INDEX]: "时间",
  [THREATJUDGE_DATA_INDEX]: "威胁判断",
  [SOURCE_IP_DATA_INDEX]: "源IP",
  [SOURCE_PORT_DATA_INDEX]: "源Port",
  [TARGET_IP_DATA_INDEX]: "目的IP",
  [TARGET_PORT_DATA_INDEX]: "目的Port",
  [URL_DATA_INDEX]: "URL",
  [HOST_DATA_INDEX]: "主机名",
  [METHOD_DATA_INDEX]: "方法名",
  [CONTENT_TYPE_DATA_INDEX]: "内容类型",
  [PROTOCOL_TYPE_DATA_INDEX]: "协议类型",
  [REQUEST_DOMAIN_DATA_INDEX]: "请求域名",
  [REQUEST_IP_DATA_INDEX]: "请求IP",
  [PACKAGE_TYPE_DATA_INDEX]: "包类型",
  [SENDER_DATA_INDEX]: "发件人邮箱",
  [RECEIVE_DATA_INDEX]: "收件人邮箱",
  [PROTOCOL_VERSION_DATA_INDEX]: "协议版本",

  [FTP_PORT_LINE_DATA_INDEX]: 'PORT命令',
  [FTP_DIRECTION_DATA_INDEX]: '传输方向',
  [FTP_CURRENT_LINE_DATA_INDEX]: 'FTP命令',

  [SMB_NBSS_TYPE_DATA_INDEX]: 'NBSS消息类型',
  [SMB_COMMAND_AND_CODE_DATA_INDEX]: 'SMB命令及状态',
  [DNP3_APP_FUNCTION_CODE_DATA_INDEX]: '应用层功能码',
  [DNP3_DATA_FUNCTION_CODE_DATA_INDEX]: '链路层功能码',
  [DNP3_TYPE_DATA_INDEX]: '消息类型',
  [MODBUS_FUNCTION_DATA_INDEX]: '功能码及其映射',
}


export const THREATJUDGE_TYPE = "threat_type",
  JUDGE_THREAT = "threat",
  JUDGE_DOUBTFUL = "doubtful",
  JUDGE_ABNORMAL = "abnormal",
  JUDGE_UNKNOWN = "unknown",
  JUDGE_SAFE = "safe"

export const THREAT_TYPE = [
  // JUDGE_THREAT,
  // JUDGE_DOUBTFUL,
  // JUDGE_ABNORMAL,
  JUDGE_UNKNOWN,
  JUDGE_SAFE
]

export const THREAT_TYPE_TEXT = {
  // [JUDGE_THREAT]: "威胁",
  // [JUDGE_DOUBTFUL]: "可疑",
  // [JUDGE_ABNORMAL]: "异常",
  [JUDGE_UNKNOWN]: "未知",
  [JUDGE_SAFE]: "安全"
}
const FormItem = Form.Item;

const INPUT_DATA_INDEX = "value"

const pageSizeRange = [10, 20, 30, 50];

const placeholderConfig = {
  [HTTP]: "请输入部分或完整URL，如baidu.com",
  [TCP]: "请输入源ip:port或目的ip:port",
  [SMTP]: "请输入源ip:port或目的ip:port",
  [DNS]: "请输入部分或完整URL，如baidu.com",
  [FTP]: "请输入源ip:port或目的ip:port",
  [SSH]: "请输入源ip:port或目的ip:port"
}

const filterDataIndexes = [
  URL_DATA_INDEX,
  SOURCE_IP_DATA_INDEX,
  SOURCE_PORT_DATA_INDEX,
  TARGET_IP_DATA_INDEX,
  TARGET_PORT_DATA_INDEX,
  REQUEST_DOMAIN_DATA_INDEX,
  SENDER_DATA_INDEX,
  RECEIVE_DATA_INDEX
]

class QueryForm extends React.Component<any, any>{
  constructor(props) {
    super(props);
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const { onSubmit, form } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        onSubmit && onSubmit({
          value: values.value
        });
      }
    });
  };
  onPageSizeChange = value => {
    const { onSubmit } = this.props;
    onSubmit && onSubmit({
      limit: parseInt(value)
    })
  }
  onProtocolChange = value => {
    const { onSubmit } = this.props;

    const initFilter = {};

    filterDataIndexes.forEach(key => {
      initFilter[key] = ""
    })

    onSubmit && onSubmit({
      ...initFilter,
      [PROTOCOL_TYPE_DATA_INDEX]: value
    })
  }
  render() {

    const { getFieldDecorator } = this.props.form;
    const { isDark, defaultValue = {}, loading = false } = this.props;
    const lblClasses = classnames({
      ["lbl-dark"]: isDark
    })
    return (
      <Form layout="inline">
        {/* <FormItem required={false}>
          {getFieldDecorator(INPUT_DATA_INDEX, {
            initialValue: defaultValue[INPUT_DATA_INDEX] || "",
          })(
            <Input disabled={loading}
              placeholder={placeholderConfig[defaultValue[PROTOCOL_TYPE_DATA_INDEX]]}
              onPressEnter={this.handleSubmit}
              style={{ display: "inline-block", width: "260px" }}></Input>
            )}
          <Button type="primary"
            icon="search"
            onClick={this.handleSubmit}>
            搜索
                    </Button>
        </FormItem> */}
        <FormItem required={false}
          label={<span className={lblClasses}>协议类型</span>}>
          {getFieldDecorator(PROTOCOL_TYPE_DATA_INDEX, {
            initialValue: defaultValue[PROTOCOL_TYPE_DATA_INDEX] || protocolTypeList[0],
          })(
            <Select disabled={loading}
              style={{ width: "120px" }}
              onChange={this.onProtocolChange}>
              {
                protocolTypeList.map((i, index) => (
                  <Select.Option key={`${index}-option`}
                    value={i}>
                    {i.toUpperCase()}
                  </Select.Option>
                ))
              }
            </Select>
          )}
        </FormItem>

      </Form>
    );
  }
}

export default (Form.create as any)()(QueryForm);