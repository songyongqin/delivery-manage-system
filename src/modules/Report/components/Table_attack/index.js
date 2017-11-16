
import { connect } from 'dva';
import * as moment from 'moment';
import styles from './index.css';
import { Table, Input, Button, Icon, Pagination, Spin, Checkbox, Row, Col } from 'antd';
import { routerRedux } from 'dva/router';
import EnhanciveTable from '../../../../domainComponents/EnhanciveTable';
import Modal from '../../../../domainComponents/Modal';
import JoSpin from '../../../../components/JoSpin';
import { WithContainerHeader, WithAnimateRender } from '../../../../components/HOSComponents';
import classnames from 'classnames';
import {
  NAMESPACE_ATTACK,
  NAMESPACE_THREATEVENT,
  NAMESPACE_CALL_ON_DOMAIN,
  MAMESPACE_CALL_ON_IP,
  NAMESPACE_FALL_HOST,
  NAMESPACE_HAVECOMMUNICATEINSIDEIP,
  NAMESPACE_MALDOMAIN,
  NAMESPACE_MALIP,
  NAMESPACE_SUFFERHOSTCALLONRECORD,
  NAMESPACE_THREATINFO,
  VALUE_ATTACK,
  VALUE_THREATEVENT,
  VALUE_CALL_ON_DOMAIN,
  VALUE_CALL_ON_IP,
  VALUE_FALL_HOST,
  VALUE_HAVECOMMUNICATEINSIDEIP,
  VALUE_MALDOMAIN,
  VALUE_MALIP,
  VALUE_SUFFERHOSTCALLONRECORD,
  VALUE_THREATINFO,
  VALUE_HIGH,
  VALUE_MIDDLE,
  VALUE_LOW
} from '../../ConstConfig'
const CheckboxGroup = Checkbox.Group;

const eventexportItemList = [
  "VALUE_THREATEVENT",
  "VALUE_FALL_HOST",
  "VALUE_THREATINFO",
  "VALUE_MALIP",
  "VALUE_MALDOMAIN",
  "VALUE_SUFFERHOSTCALLONRECORD",
  "VALUE_HAVECOMMUNICATEINSIDEIP",
  "VALUE_CALL_ON_IP",
  "VALUE_CALL_ON_DOMAIN",
  "VALUE_HIGH",
  "VALUE_MIDDLE",
  "VALUE_LOW"
]
const threateventItemList = [
  "VALUE_HIGH",
  "VALUE_MIDDLE",
  "VALUE_LOW"
]
@WithAnimateRender
@WithContainerHeader
class Tableattack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      loading: false,
      indeterminate: true,
      checkAll: false,
      checkedListNew: []
    };
  }
  //导出选项卡
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleCancel = () => {
    this.setState({ visible: false });
  }
  getOnChangeHandle = (key) => (e) => {
    const checked = e.target.checked;
    let { checkedListNew } = this.state;
    key.map((i, index) => {
      checkedListNew = checked
        ?
        [...new Set([...checkedListNew, i])]
        :
        checkedListNew.filter(n => n !== i)

    })
    console.info(checkedListNew)
    this.setState({
      checkedListNew
    })
  }


  handleOk = (e) => {

    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
    this.onExport();
  }

  getQueryPanel = () => {
    const { routes, timestampRange } = this.props;
    const queryFilters = {
      timestampRange
    }
    return (
      <div key="query-panel" style={{ marginTop: "15px" }}>
        {this.props.getContainerHeader({
          routes,
          queryFilters,
          onQuery: this.timestampRangeOnChange
        })}
      </div>
    )
  };
  timestampRangeOnChange = (payload) => {
    this.props.dispatch({
      type: `${NAMESPACE_ATTACK}/fetch`,
      payload
    });
    this.props.dispatch({
      type: `${NAMESPACE_THREATEVENT}/fetch`,
      payload
    });
    this.props.dispatch({
      type: `${NAMESPACE_FALL_HOST}/fetch`,
      payload:
      payload

    });
    this.props.dispatch({
      type: `${NAMESPACE_THREATINFO}/fetch`,
      payload:
      payload

    });
    this.props.dispatch({
      type: `${NAMESPACE_MALIP}/fetch`,
      payload:
      payload

    });
    this.props.dispatch({
      type: `${NAMESPACE_MALDOMAIN}/fetch`,
      payload:
      payload

    });
    this.props.dispatch({
      type: `${NAMESPACE_SUFFERHOSTCALLONRECORD}/fetch`,
      payload:
      payload

    });
    this.props.dispatch({
      type: `${NAMESPACE_HAVECOMMUNICATEINSIDEIP}/fetch`,
      payload:
      payload

    });
    this.props.dispatch({
      type: `${MAMESPACE_CALL_ON_IP}/fetch`,
      payload:
      payload

    });
    this.props.dispatch({
      type: `${NAMESPACE_CALL_ON_DOMAIN}/fetch`,
      payload:
      payload

    });

  }

  onExport = () => {
    const checkedListNew = this.state.checkedListNew;
    const timestampRange = this.props.timestampRange;
    this.props.dispatch({
      type: `${NAMESPACE_ATTACK}/onExport`,
      payload:
      { checkedListNew, timestampRange }

    });
  }
  haveChecked = key => {
    return this.state.checkedListNew.includes(key)
  }
  render() {
    const eventreportdata = ["VALUE_FALL_HOST", "VALUE_THREATEVENT", "VALUE_THREATINFO", "VALUE_MALIP", "VALUE_MALDOMAIN", "VALUE_SUFFERHOSTCALLONRECORD", "VALUE_HAVECOMMUNICATEINSIDEIP", "VALUE_CALL_ON_IP", "VALUE_CALL_ON_DOMAIN", "VALUE_HIGH", "VALUE_MIDDLE", "VALUE_LOW"];
    const { visible, loading } = this.state;
    const data = this.props.data;
    const { timestampRange, isDark } = this.props;
    let showdatastart = "", showdataend = ""
    try {
      showdatastart = timestampRange[0].format("YYYY-MM-DD");
      showdataend = timestampRange[1].format("YYYY-MM-DD");

    } catch (e) {

    }
    const columns = [{
      title: '攻击次数',
      dataIndex: 'attackCount',
      key: 'attackCount',
    }, {
      title: '攻击成功事件',
      dataIndex: 'attackSucessEvent',
      key: 'attackSucessEvent',
    }, {
      title: '攻击高危事件',
      dataIndex: 'attackHighLevelEvent',
      key: 'attackHighLevelEvent',
    }, {
      title: '攻击武器',
      dataIndex: 'tool',
      key: 'tool',
    }, {
      title: '失陷主机',
      dataIndex: 'fallHost',
      key: 'fallHost',
    }, {
      title: '威胁情报',
      dataIndex: 'threatInfo',
      key: 'threatInfo',
    }, {
      title: '攻击链',
      dataIndex: 'attackChain',
      key: 'attackChain',
    },];
    const dataSource = [{
      key: '1',
      attackCount: data.attackCount + "次",
      attackSucessEvent: data.attackSucessEvent + "起",
      attackHighLevelEvent: data.attackHighLevelEvent + "起",
      tool: data.tool + "个",
      fallHost: data.fallHost + "个",
      threatInfo: data.threatInfo + "条",
      attackChain: data.attackChain + "条",
    }]
    const tableProps = {
      columns: columns,
      dataSource: dataSource,
      pagination: false
    }

    const paginationProps = false;
    const title = "一、攻击统计";
    console.info(this.state.checkedListNew)
    return (
      <div>
        {/* "VALUE_THREATEVENT" && "VALUE_FALL_HOST" && "VALUE_THREATINFO" && "VALUE_MALIP" && "VALUE_MALDOMAIN" && "VALUE_SUFFERHOSTCALLONRECORD" && "VALUE_HAVECOMMUNICATEINSIDEIP" && "VALUE_CALL_ON_IP" && "VALUE_CALL_ON_DOMAIN" && "VALUE_HIGH" && "VALUE_MIDDLE" && "VALUE_LOW" */}
        <JoSpin spinning={this.props.loading}>
          {
            this.props.animateRender([
              this.getQueryPanel(),
              <div key="operation-panel" style={{ overflow: "hidden" }}>
                <h2 className={classnames({ "lbl-dark": isDark })} style={{ textAlign: "center", marginBottom: "10px" }}>威胁报告</h2>
                <h5 className={classnames({ "lbl-dark": isDark })} style={{ textAlign: "center" }} >
                  {

                    timestampRange.length === 0
                      ?
                      "统计日期：全部时间"
                      :
                      ("统计日期：" + showdatastart + "到" + showdataend)
                  }
                </h5>

                <Button type="primary" style={{ float: "right", marginBottom: "15px" }} onClick={this.showModal}>导出报告</Button>
                <Modal
                  visible={this.state.visible}
                  title="报告配置"
                  onOk={this.handleOk}
                  onCancel={this.handleCancel}
                  footer={[
                    <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
                      导出报告
                    </Button>
                  ]}
                >
                  <Row className={classnames({ "lbl-dark": isDark })}>
                    <Col span={24} style={{ marginBottom: "10px", fontWeight: "bold" }}> 选择界面及导出报告中显示的模块</Col>
                    <Col span={24}>
                      <Checkbox
                        style={{ fontWeight: "bold" }}
                        value="VALUE_ATTACK"
                        checked={this.state.checkedListNew.includes("VALUE_ATTACK")}
                        onChange={this.getOnChangeHandle(["VALUE_ATTACK"])}>
                        攻击统计
                        </Checkbox>
                    </Col>
                    <Col span={24}>
                      <Checkbox
                        style={{ fontWeight: "bold" }}
                        value="VALUE_EVENTREPORT"
                        checked={eventexportItemList.every(i => this.haveChecked(i))}
                        onChange={this.getOnChangeHandle(eventreportdata)}
                      >
                        事件报告
                      </Checkbox>
                    </Col>
                    <Row>
                      <Col span={5} offset={1}>
                        <Checkbox
                          value="VALUE_THREATEVENT"
                          checked={threateventItemList.every(i => this.haveChecked(i))}
                          onChange={this.getOnChangeHandle(["VALUE_HIGH", "VALUE_MIDDLE", "VALUE_LOW"])}>
                          威胁事件:
                          </Checkbox>
                      </Col>


                      <Col span={5} offset={1}>
                        <Checkbox
                          value="VALUE_HIGH"
                          checked={this.state.checkedListNew.includes("VALUE_HIGH")}
                          onChange={this.getOnChangeHandle(["VALUE_HIGH"])}>
                          高危
                          </Checkbox>
                      </Col>
                      <Col span={5} offset={1}>
                        <Checkbox
                          value="VALUE_MIDDLE"
                          checked={this.state.checkedListNew.includes("VALUE_MIDDLE")}
                          onChange={this.getOnChangeHandle(["VALUE_MIDDLE"])}>
                          中危
                          </Checkbox>
                      </Col>
                      <Col span={5} offset={1}>
                        <Checkbox
                          value="VALUE_LOW"
                          checked={this.state.checkedListNew.includes("VALUE_LOW")}
                          onChange={this.getOnChangeHandle(["VALUE_LOW"])}>
                          低危
                          </Checkbox>
                      </Col>



                    </Row>


                    <Col span={23} offset={1}>
                      <Checkbox
                        value="VALUE_FALL_HOST"
                        onChange={this.getOnChangeHandle(["VALUE_FALL_HOST"])}
                        checked={this.state.checkedListNew.includes("VALUE_FALL_HOST")}>
                        失陷主机
                      </Checkbox>
                    </Col>
                    <Col span={23} offset={1}>
                      <Checkbox
                        value="VALUE_THREATINFO"
                        onChange={this.getOnChangeHandle(["VALUE_THREATINFO"])}
                        checked={this.state.checkedListNew.includes("VALUE_THREATINFO")}>
                        威胁情报
                      </Checkbox>
                    </Col>
                    <Col span={23} offset={1}>
                      <Checkbox
                        value="VALUE_MALIP"
                        onChange={this.getOnChangeHandle(["VALUE_MALIP"])}
                        checked={this.state.checkedListNew.includes("VALUE_MALIP")}>
                        恶意IP
                      </Checkbox>
                    </Col>
                    <Col span={23} offset={1}>
                      <Checkbox
                        value="VALUE_MALDOMAIN"
                        onChange={this.getOnChangeHandle(["VALUE_MALDOMAIN"])}
                        checked={this.state.checkedListNew.includes("VALUE_MALDOMAIN")}>
                        恶意域名
                      </Checkbox>
                    </Col>
                    <Col span={23} offset={1}>
                      <Checkbox
                        value="VALUE_SUFFERHOSTCALLONRECORD"
                        onChange={this.getOnChangeHandle(["VALUE_SUFFERHOSTCALLONRECORD"])}
                        checked={this.state.checkedListNew.includes("VALUE_SUFFERHOSTCALLONRECORD")}>
                        内网受害主机访问外网恶意域名/IP
                      </Checkbox>
                    </Col>
                    <Col span={23} offset={1}>
                      <Checkbox
                        value="VALUE_HAVECOMMUNICATEINSIDEIP"
                        onChange={this.getOnChangeHandle(["VALUE_HAVECOMMUNICATEINSIDEIP"])}
                        checked={this.state.checkedListNew.includes("VALUE_HAVECOMMUNICATEINSIDEIP")}>
                        有通讯记录的内网IP
                      </Checkbox>
                    </Col>
                    <Col span={23} offset={1}>
                      <Checkbox
                        value="VALUE_CALL_ON_IP"
                        onChange={this.getOnChangeHandle(["VALUE_CALL_ON_IP"])}
                        checked={this.state.checkedListNew.includes("VALUE_CALL_ON_IP")}>
                        访问的外网IP
                      </Checkbox>
                    </Col>
                    <Col span={23} offset={1}>
                      <Checkbox
                        value="VALUE_CALL_ON_DOMAIN"
                        onChange={this.getOnChangeHandle(["VALUE_CALL_ON_DOMAIN"])}
                        checked={this.state.checkedListNew.includes("VALUE_CALL_ON_DOMAIN")}>
                        访问的域名
                      </Checkbox>
                    </Col>
                  </Row>

                </Modal>
              </div>,
              <EnhanciveTable key="table" tableProps={tableProps} pagination={false} title={title}> </EnhanciveTable>
            ])
          }
        </JoSpin>

      </div>
    )

  }
}

function mapStateToProps(state) {
  const { data, loading, timestampRange } = state[NAMESPACE_ATTACK];

  const NAMESPACE_THREATEVENT = state[NAMESPACE_THREATEVENT];
  const NAMESPACE_FALL_HOST = state[NAMESPACE_FALL_HOST];
  const NAMESPACE_THREATINFO = state[NAMESPACE_THREATINFO];
  const NAMESPACE_MALIP = state[NAMESPACE_MALIP];
  const NAMESPACE_MALDOMAIN = state[NAMESPACE_MALDOMAIN];
  const NAMESPACE_SUFFERHOSTCALLONRECORD = state[NAMESPACE_SUFFERHOSTCALLONRECORD];
  const NAMESPACE_HAVECOMMUNICATEINSIDEIP = state[NAMESPACE_HAVECOMMUNICATEINSIDEIP];
  const MAMESPACE_CALL_ON_IP = state[MAMESPACE_CALL_ON_IP];
  const NAMESPACE_CALL_ON_DOMAIN = state[NAMESPACE_CALL_ON_DOMAIN];

  return {
    data,
    loading: state.loading.effects[`${NAMESPACE_ATTACK}/fetch`],
    timestampRange,
    NAMESPACE_THREATEVENT,
    NAMESPACE_FALL_HOST,
    NAMESPACE_THREATINFO,
    NAMESPACE_MALIP,
    NAMESPACE_MALDOMAIN,
    NAMESPACE_SUFFERHOSTCALLONRECORD,
    NAMESPACE_HAVECOMMUNICATEINSIDEIP,
    MAMESPACE_CALL_ON_IP,
    NAMESPACE_CALL_ON_DOMAIN,
    isDark: state.layout.commonLayout.darkTheme,




  };
}



export default connect(mapStateToProps)(Tableattack);
