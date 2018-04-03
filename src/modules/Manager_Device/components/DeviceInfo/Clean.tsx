import * as React from 'react'
import {
  Upload,
  Form,
  Input,
  Tooltip,
  Icon,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
  Slider,
  Radio,
  Collapse,
  message as Message,
  Switch,
} from 'antd'
import classnames from 'classnames'
import {
  CODE_DATAINDEX,
  ID_DATAINDEX,
  LICENCE_STATUS_DATAINDEX,
  LICENCE_VALID_VALUE,
  HOST_IP_DATAINDEX,
  LIBRARY_VERSION_LIST_DATAINDEX,
  APPLIACTION_VERSION_DATAINDEX,
  ENGINE_VERSION_LIST_DATAINDEX,
  DISK_PER_DATAINDEX,
  DEVICE_ID_DATAINDEX,
  tableTextConfig,
  CONNECT_STATUS_DATAINDEX,
  CONNECT,
} from '../../constants'
import Table from 'domainComponents/Table'
const FormItem = Form.Item
const Dragger = Upload.Dragger
import Tag from 'components/Tag'
import moment from 'moment'
const styles = require("./styles.less")

const timeRange = [7, 14, 30, 90]

const timeRangeTextConfig = {
  [7]: "一星期前",
  [14]: "两星期前",
  [30]: "一个月前",
  [90]: "三个月前"
}

const timeToUnix = (count) => {
  return moment().subtract(count, "day").unix()
}


const LICENCE_SUCCESS = 1;
const CommonCell = ({ value }) => (
  <div style={{ textAlign: "center" }}>{value}</div>
)
const LicenceBackPlaceholder = ({ isDark = false, shouldReload = false, onCancel }) => (
  <div >
    <h4 style={{
      color: "#108ee9",
      textAlign: "center",
      fontWeight: 500
    }}>
      本次批量清理磁盘操作已完成
    </h4>
    <table className={styles["placeholder-table"]}>
      <tbody >
        <tr >
          <td >售后联系邮箱:</td>
          <td >antiy_shenzhen@antiy.cn</td>
        </tr>
        <tr >
          <td >售后联系电话:</td>
          <td >0755-26806561</td>
        </tr>
      </tbody>
    </table>
    <div style={{ textAlign: "center" }}>
      <Button
        onClick={() => shouldReload ? window.location.reload() : onCancel()}
        type="primary">
        确定
      </Button>
    </div>
  </div >
)

const CommonListRenderer = ({ data }) => (
  <table>
    <tbody>
      {
        data.map((i, index) => (
          <tr key={`${index}-row`}>
            <td style={{ padding: "2px" }}>{i.name}</td>
            <td style={{ padding: "2px" }}>
              <Tag color="#108ee9" style={{ marginBottom: "0" }}>{i.value}</Tag>
            </td>
            <td style={{ padding: "2px" }}>
              {i.result}
            </td>
          </tr>
        ))
      }
    </tbody>
  </table>
)

const SAMPLE_DATA_INDEX = "sample",
  PCAP_LOG_DATA_INDEX = "pcapLog",
  PCAP_FLOW_DATA_INDEX = "pcapFlow",
  DATA_BASE_LOG_DATA_INDEX = "dataBaseLog",

  THREAT_INFO_DATA_INDEX = "threatInfo",
  BASIC_NET_DATA_INDEX = "basicNet",
  FLOW_LOG_DATA_INDEX = "flowLog",
  HISTORY_REPORT_DATA_INDEX = "historyReport"

const optionTextConfig = {
  [SAMPLE_DATA_INDEX]: "样本",
  [PCAP_LOG_DATA_INDEX]: "日志PCAP包",
  [PCAP_FLOW_DATA_INDEX]: "数据PCAP包",
  [DATA_BASE_LOG_DATA_INDEX]: "数据库日志",
  [THREAT_INFO_DATA_INDEX]: "威胁数据",
  [BASIC_NET_DATA_INDEX]: "网络基础数据",
  [FLOW_LOG_DATA_INDEX]: "流量日志",
  [HISTORY_REPORT_DATA_INDEX]: "历史报告"
}



const idsOptionDataIndexes = [
  THREAT_INFO_DATA_INDEX,
  BASIC_NET_DATA_INDEX,
  FLOW_LOG_DATA_INDEX,
  HISTORY_REPORT_DATA_INDEX
]

const honeypotOptionDataIndexes = [
  SAMPLE_DATA_INDEX,
  PCAP_LOG_DATA_INDEX,
  PCAP_FLOW_DATA_INDEX,
  DATA_BASE_LOG_DATA_INDEX,
]

const masterDataIndexes = [
  SAMPLE_DATA_INDEX,
  DATA_BASE_LOG_DATA_INDEX,
]


const getOptions = (type) => {
  if (type === "ids") {
    return idsOptionDataIndexes
  }
  if (type === "honeypot") {
    return honeypotOptionDataIndexes
  }
  if (type === "master") {
    return masterDataIndexes
  }
}

const FILE_DATA_INDEX = "file",
  SERVER_URL_DATA_INDEX = "serverUrl",
  REMOTE_METHOD = "remote",
  LOCAL_METHOD = "local",
  DEVICE_LIST_DATA_INDEX = "deviceList"


class Clean extends React.Component<any, any> {

  static defaultProps = {
    defaultValue: { data: [] },
    type: "master"
  }
  constructor(props) {
    super(props);
    const optionCheckedList = {}, timeList = {};

    props.defaultValue.data.forEach(i => {
      optionCheckedList[i[ID_DATAINDEX]] = [...getOptions(props.type)]
      timeList[i[ID_DATAINDEX]] = 30
    });


    this.state = {
      result: [],
      disabledList: [],
      optionCheckedList,
      hideNotValidItem: false,
      timeList,
    }
  }

  hideNotValidItemOnChange = () => this.setState({
    hideNotValidItem: !this.state.hideNotValidItem,
  })

  getCheckedOnChange = id => payload => {
    this.setState({
      optionCheckedList: {
        ...this.state.optionCheckedList,
        [id]: payload
      }
    })
  }

  getTimeSelectOnChange = id => payload => {
    this.setState({
      timeList: {
        ...this.state.timeList,
        [id]: payload,
      }
    })
  }

  radioOnChange = e => {
    let { value } = e.target
    this.setState({
      method: value,
      file: null,
    })

  }
  switchFilePanel = value => this.setState({
    fileVisible: value
  })

  onSubmit = () => {
    const { optionCheckedList, timeList } = this.state;
    const { defaultValue, onSubmit } = this.props;
    const payload = this.getValidItems()
      .map(i => {
        const id = i[ID_DATAINDEX]

        return {
          [ID_DATAINDEX]: id,
          options: optionCheckedList[id],
          time: timeToUnix(timeList[id])
        }
      });


    onSubmit && onSubmit(payload)
      .then(result => {
        this.setState({
          result
        })
      });
  }

  getValidItems = () => {
    const { defaultValue } = this.props,
      { data } = defaultValue

    return data.filter(i => i[CONNECT_STATUS_DATAINDEX] === CONNECT)
      .map((i, index) => ({
        ...i,
        key: `${i[ID_DATAINDEX]}-item`
      }));
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { isDark, loading, defaultValue = { data: [] }, style, } = this.props
    const { result, fileVisible, disabledList, shouldReload, updateResult, hideNotValidItem, timeList } = this.state;
    const lblClasses = classnames({
      "lbl-dark": isDark
    })

    const { data = [] } = defaultValue;
    const haveResult = result.length !== 0


    const colItems = haveResult
      ?
      [
        {
          key: "result",
          title: <p style={{ textAlign: "center" }}>清理结果</p>,
          render: records => {
            if (records[CONNECT_STATUS_DATAINDEX] !== CONNECT) {
              return <p style={{ textAlign: "center" }}>
                设备连接异常 无法进行清理磁盘操作
              </p>
            }
            const target = result.find(i => i[ID_DATAINDEX] === records[ID_DATAINDEX])
            if (target.status === 1) {
              return <p style={{ color: "#108ee9", textAlign: "center" }}>
                <Icon type="check"></Icon> &nbsp;清理成功
                {/* <Icon type="check"></Icon> &nbsp;清理成功，<br />
                共清理：{parseFloat(target["payload"] / 1024).toFixed(2)}GB数据 */}
              </p>
            }

            return <p style={{ color: "red", textAlign: "center" }}>
              <Icon type="close"></Icon> &nbsp;清理失败，<br />
              原因: {target["message"]}
            </p>
          }
        }
      ]
      :
      [
        {
          dataIndex: DISK_PER_DATAINDEX,
          title: <p style={{ textAlign: "center" }}>磁盘占用情况</p>,
          render: value => {
            return <p style={{ textAlign: "center" }}>
              磁盘已占用{value}%
            </p>
          }
        },
        {
          key: "option",
          width: "200px",
          title: <p style={{ textAlign: "center" }}>清理选项</p>,
          render: records => {
            if (records[CONNECT_STATUS_DATAINDEX] !== CONNECT) {
              return <p style={{ textAlign: "center" }}>
                设备连接异常 无法进行清理磁盘操作
              </p>
            }
            const id = records[ID_DATAINDEX], value = timeList[id] + "";
            return <Collapse bordered={false}>
              <Collapse.Panel key="option" header="清理配置" style={{ background: "transparent" }}>
                <Select
                  onChange={this.getTimeSelectOnChange(id)}
                  value={value}
                  style={{ marginBottom: "10px" }}>
                  {
                    timeRange.map((i, index) => (
                      <Select.Option
                        key={`${index}-option`}
                        value={`${i}`}>
                        {timeRangeTextConfig[i]}
                      </Select.Option>
                    ))
                  }
                </Select>
                <Checkbox.Group
                  onChange={this.getCheckedOnChange(id)}
                  value={this.state.optionCheckedList[id]}>
                  {
                    getOptions(this.props.type).map((i, index) => {
                      return <Col key={`${index}-radio-item`}>
                        <Checkbox value={i} >
                          {
                            optionTextConfig[i]
                          }
                        </Checkbox>
                      </Col>
                    })
                  }
                </Checkbox.Group>
              </Collapse.Panel>
            </Collapse>
          }
        }
      ]



    const tableProps = {
      dataSource: hideNotValidItem
        ?
        this.getValidItems()
        :
        data.map((i, index) => ({
          ...i,
          key: `${i[ID_DATAINDEX]}-item`,
        })),
      scroll: { y: 400 },
      columns: [
        {
          dataIndex: DEVICE_ID_DATAINDEX,
          title: <p style={{ textAlign: "center" }}>设备唯一标识</p>,
          width: haveResult ? "240px" : "140px"
        },
        {
          dataIndex: HOST_IP_DATAINDEX,
          title: <p style={{ textAlign: "center" }}>主机IP</p>,
          width: haveResult ? "240px" : "140px",
          render: value => <CommonCell value={value}></CommonCell>
        },
        ...colItems
      ]
    }

    const validItems = data.filter(i => i[CONNECT_STATUS_DATAINDEX] === CONNECT)

    return (
      <Form>
        <div style={{ marginBottom: "15px" }}>
          <span className={lblClasses}>
            隐藏无法操作的设备 &nbsp;
          </span>
          <Switch
            onChange={this.hideNotValidItemOnChange}
            checked={this.state.hideNotValidItem}
            checkedChildren={<Icon type="check" />}
            unCheckedChildren={<Icon type="cross" />}>
          </Switch>
        </div>
        <div style={{ marginBottom: "15px" }}>
          <Table
            tableProps={tableProps}
            pagination={false}>
          </Table>
        </div>
        {
          haveResult
            ?
            <div>
              <LicenceBackPlaceholder
                isDark={isDark}
                shouldReload={shouldReload}
                onCancel={this.props.onCancel}>
              </LicenceBackPlaceholder>
            </div>
            :
            (
              validItems.length !== 0
                ?
                <Row>
                  <Col>
                    <p style={{ textAlign: "center" }} className={lblClasses}>
                      <span style={{ color: "red" }}>*</span>
                      清理磁盘后，web页面中的所有威胁信息将会清除，请谨慎删除
                    </p>
                    <div style={{ textAlign: "center", marginTop: "20px" }}>
                      <Button type="primary" onClick={this.onSubmit}>确认清理</Button>
                    </div>
                  </Col>
                </Row>
                :
                null
            )
        }

      </Form>
    );
  }
}

const WrappedForm: any = Form.create()(Clean)

export default WrappedForm