/**
 * Created by jojo on 2017/10/19.
 */
import React from 'react';
import {
  Upload,
  Form,
  Input,
  Tooltip,
  Icon,
  Cascader,
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
} from 'antd';
import styles from './styles.css';
import classnames from 'classnames';
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
  STAND_ALONE,
  DISTRIBUTION,
  CONNECT_STATUS_DATAINDEX,
  CONNECT,
  IDS,
  NODE,
} from '../../ConstConfig'
import EnhanciveTable from '../../../../domainComponents/EnhanciveTable';
const FormItem = Form.Item;
const Dragger = Upload.Dragger;
import JoTag from '../../../../components/JoTag';
import { SYSTEM_DATAINDEX } from '../../../../modules/Manager_Virtual/ConstConfig';
const LICENCE_SUCCESS = 1;
const CommonCell = ({ value }) => (
  <div style={{ textAlign: "center" }}>{value}</div>
)
const LicenceBackPlaceholder = ({ isDark = false, shouldReload = false, onCancel }) => (
  <div >
    <h4 style={{
      color: "#108ee9",
      textAlign: "center",
      fontWeight: "500"
    }}>
      感谢您使用本产品，本次批量升级操作已完成，若存在升级失败的设备请尝试重新升级
    </h4>
    <table className={styles["placeholder-table"]}>
      <tbody>
        <tr className={isDark ? "lbl-dark" : ""}>
          <td>售后联系邮箱:</td>
          <td>antiy_shenzhen@antiy.cn</td>
        </tr>
        <tr className={isDark ? "lbl-dark" : ""}>
          <td>售后联系电话:</td>
          <td>0755-26806561</td>
        </tr>
      </tbody>
    </table>
    <div style={{ textAlign: "center" }}>
      <Button
        onClick={() => shouldReload ? window.location.reload() : onCancel()}
        size="large"
        type="primary">
        {
          shouldReload
            ?
            "确定(重新载入应用)"
            :
            "确定"
        }
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
              <JoTag color="#108ee9" style={{ marginBottom: "0" }}>{i.value}</JoTag>
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

const nodeOptionDataIndexes = [
  SAMPLE_DATA_INDEX,
  PCAP_LOG_DATA_INDEX,
  PCAP_FLOW_DATA_INDEX,
  DATA_BASE_LOG_DATA_INDEX,
]

const distributionDataIndexes = [
  SAMPLE_DATA_INDEX,
  DATA_BASE_LOG_DATA_INDEX,
]


const getOptions = (productType) => {
  if (productType === IDS) {
    return idsOptionDataIndexes
  }
  if (productType === DISTRIBUTION) {
    return distributionDataIndexes
  }
  if (productType === NODE || productType === STAND_ALONE) {
    return nodeOptionDataIndexes
  }
  return []
}

const FILE_DATA_INDEX = "file",
  SERVER_URL_DATA_INDEX = "serverUrl",
  REMOTE_METHOD = "remote",
  LOCAL_METHOD = "local",
  DEVICE_LIST_DATA_INDEX = "deviceList"

@Form.create()
class WrappedForm extends React.Component {

  static defaultProps = {
    defaultValue: { data: [] },
    productType: "node"
  }
  constructor(props) {
    super(props);
    const optionCheckedList = {};

    props.defaultValue.data.forEach(i => {
      optionCheckedList[i[ID_DATAINDEX]] = [...getOptions(props.productType)]
    });


    this.state = {
      result: [],
      disabledList: [],
      optionCheckedList,
      hideNotValidItem: false,
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
    const { optionCheckedList } = this.state;
    const { defaultValue, onSubmit } = this.props;
    const payload = this.getValidItems()
      .map(i => {
        return {
          [ID_DATAINDEX]: i[ID_DATAINDEX],
          options: optionCheckedList[i[ID_DATAINDEX]]
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
      { data } = defaultValue;

    return data.filter(i => i[CONNECT_STATUS_DATAINDEX] === CONNECT)
      .map((i, index) => ({
        ...i,
        key: `${i[ID_DATAINDEX]}-item`
      }));
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { isDark, loading, defaultValue = { data: [] }, style, productType } = this.props;
    const { result, fileVisible, disabledList, shouldReload, updateResult, hideNotValidItem } = this.state;
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
              return "设备连接异常 无法进行清理磁盘操作"
            }
            const target = result.find(i => i[ID_DATAINDEX] === records[ID_DATAINDEX])
            if (target.status === 1) {
              return <p style={{ color: "#108ee9", textAlign: "center" }}>
                <Icon type="check"></Icon> &nbsp;清理成功，<br />
                共清理：{parseFloat(target["payload"] / 1024).toFixed(2)}GB数据
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
              return "设备连接异常 无法进行清理磁盘操作"
            }
            return <Collapse bordered={false}>
              <Collapse.Panel header="清理配置" style={{ background: "transparent" }}>
                <Checkbox.Group
                  onChange={this.getCheckedOnChange(records[ID_DATAINDEX])}
                  value={this.state.optionCheckedList[records[ID_DATAINDEX]]}>
                  {
                    getOptions(productType).map((i, index) => {
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

    const validItems = data.filter(i => i[CONNECT_STATUS_DATAINDEX] === CONNECT);

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
          <EnhanciveTable
            tableProps={tableProps}
            pagination={false}>
          </EnhanciveTable>
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
                    <div style={{ textAlign: "center", marginTop: "20px" }}>
                      <Button type="primary" size="large" onClick={this.onSubmit}>确认清理</Button>
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

export default WrappedForm;
