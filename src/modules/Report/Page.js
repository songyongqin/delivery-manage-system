import React from 'react';
import { connect } from 'dva';
import * as moment from 'moment';
import { Menu, Button, Breadcrumb, Tabs, Checkbox, Row, Col, Switch, Icon } from 'antd';
import EnhanciveTable from '../../domainComponents/EnhanciveTable';
import Modal from '../../domainComponents/Modal';
import JoSpin from '../../components/JoSpin';
import { WithContainerHeader, WithAnimateRender } from '../../components/HOSComponents';
import classnames from 'classnames';
import Table_attack_components from './components/Table_attack/index'
import Table_threat_event_components from './components/Table_threat_event/index'
import Table_fall_host_components from './components/Table_fall_host/index'
import Table_threat_info_components from './components/Table_threat_info/index'
import Table_mal_ip_components from './components/Table_mal_ip/index'
import Table_mal_domain_components from './components/Table_mal_domain/index'
import Table_suffer_host_call_on_record_components from './components/Table_suffer_host_call_on_record/index'
import Table_have_communicate_inside_ip_components from './components/Table_have_communicate_inside_ip/index'
import Table_call_on_ip_components from './components/Table_call_on_ip/index'
import Table_call_on_domain_components from './components/Table_call_on_domain/index'
import Chart_statistical_components from './components/Chart_statistical/index'
import { STAND_ALONE } from 'configs/ConstConfig'
import {
  NAMESPACE_BASE,
  NAMESPACE_ATTACK,
  NAMESPACE_THREATEVENT,
  NAMESPACE_CALL_ON_DOMAIN,
  NAMESPACE_CALL_ON_IP,
  NAMESPACE_FALL_HOST,
  NAMESPACE_HAVECOMMUNICATEINSIDEIP,
  NAMESPACE_MALDOMAIN,
  NAMESPACE_MALIP,
  NAMESPACE_SUFFERHOSTCALLONRECORD,
  NAMESPACE_THREATINFO,
  NAMESPACE_CHART,
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
  VALUE_LOW,
  VALUE_CHART,
  VALUE_CHART_ATTACK,
  VALUE_EVENT_TYPE,
  VALUE_EXLOITVULNERABILITY,
  VALUE_CHART_SOURCECOUNTRY,
  VALUE_CHART_SOURCEPROVINCE,
  VALUE_RECORDSTATISTICAL,
  VALUE_WATERMARK

} from './ConstConfig'
const CheckboxGroup = Checkbox.Group;
const defaultCheckedList = [
  "VALUE_ATTACK",
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
  "VALUE_LOW",
  "VALUE_CHART_ATTACK",
  "VALUE_EVENT_TYPE",
  "VALUE_EXLOITVULNERABILITY",
  "VALUE_CHART_SOURCECOUNTRY",
  "VALUE_CHART_SOURCEPROVINCE",
  "VALUE_RECORDSTATISTICAL",
  "VALUE_WATERMARK"
]
const mindefaultCheckedList = [
  "VALUE_ATTACK",
  "VALUE_THREATEVENT",
  "VALUE_FALL_HOST",
  "VALUE_THREATINFO",
  "VALUE_HIGH",
  "VALUE_MIDDLE",
  "VALUE_LOW",
  "VALUE_CHART_ATTACK",
  "VALUE_EVENT_TYPE",
  "VALUE_EXLOITVULNERABILITY",
  "VALUE_CHART_SOURCECOUNTRY",
  "VALUE_CHART_SOURCEPROVINCE",
  "VALUE_WATERMARK"
]
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
const mineventexportItemList = [
  "VALUE_THREATEVENT",
  "VALUE_FALL_HOST",
  "VALUE_THREATINFO",
  "VALUE_HIGH",
  "VALUE_MIDDLE",
  "VALUE_LOW"
]
const threateventItemList = [
  "VALUE_HIGH",
  "VALUE_MIDDLE",
  "VALUE_LOW"
]
const chartItemList = [
  "VALUE_CHART_ATTACK",
  "VALUE_EVENT_TYPE",
  "VALUE_EXLOITVULNERABILITY",
  "VALUE_CHART_SOURCECOUNTRY",
  "VALUE_CHART_SOURCEPROVINCE",
  "VALUE_RECORDSTATISTICAL",
]
const minchartItemList = [
  "VALUE_CHART_ATTACK",
  "VALUE_EVENT_TYPE",
  "VALUE_EXLOITVULNERABILITY",
  "VALUE_CHART_SOURCECOUNTRY",
  "VALUE_CHART_SOURCEPROVINCE",
]
const TabPane = Tabs.TabPane;
function Table_show() {


}
@WithAnimateRender
@WithContainerHeader
class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      loading: false,
      indeterminate: true,
      checkAll: false,
      checkedListNew: (this.props.productType == STAND_ALONE) ? mindefaultCheckedList : defaultCheckedList,
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
    this.setState({
      checkedListNew
    })
  }


  handleOk = (e) => {

    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 2000);
    this.onExport();
  }

  getQueryPanel = () => {
    const { routes } = this.props;
    const { timestampRange } = this.props.base;
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
  timestampRangeOnChange = ({ timestampRange }) => {
    const lastChangeTime = new Date().getTime();
    this.props.dispatch({
      type: `${NAMESPACE_BASE}/save`,
      payload: {
        timestampRange,
        lastChangeTime
      }
    });
    if (this.props.base.keyvalue == 'attack_components') {
      this.props.dispatch({
        type: `${NAMESPACE_ATTACK}/save`,
        payload: {
          lastChangeTime
        }
      });
      this.props.dispatch({
        type: `${NAMESPACE_ATTACK}/fetch`,
        payload: {
          timestampRange,
        }
      });
    } else if (this.props.base.keyvalue == 'event_components') {
      const { productType } = this.props;
      this.props.dispatch({
        type: `${NAMESPACE_THREATEVENT}/save`,
        payload: {
          lastChangeTime
        }
      });
      this.props.dispatch({
        type: `${NAMESPACE_FALL_HOST}/save`,
        payload: {
          lastChangeTime
        }
      });
      this.props.dispatch({
        type: `${NAMESPACE_THREATINFO}/save`,
        payload: {
          lastChangeTime
        }
      });


      this.props.dispatch({
        type: `${NAMESPACE_THREATEVENT}/fetch`,
        payload: {
          page: 1,
          limit: 10,
          timestampRange
        }
      });
      this.props.dispatch({
        type: `${NAMESPACE_FALL_HOST}/fetch`,
        payload: {
          page: 1,
          limit: 10,
          timestampRange
        }

      });
      this.props.dispatch({
        type: `${NAMESPACE_THREATINFO}/fetch`,
        payload: {
          page: 1,
          limit: 10,
          timestampRange
        }

      });
      if (productType !== STAND_ALONE) {
        this.props.dispatch({
          type: `${NAMESPACE_MALIP}/save`,
          payload: {
            lastChangeTime
          }
        });
        this.props.dispatch({
          type: `${NAMESPACE_MALDOMAIN}/save`,
          payload: {
            lastChangeTime
          }
        });
        this.props.dispatch({
          type: `${NAMESPACE_SUFFERHOSTCALLONRECORD}/save`,
          payload: {
            lastChangeTime
          }
        });
        this.props.dispatch({
          type: `${NAMESPACE_HAVECOMMUNICATEINSIDEIP}/save`,
          payload: {
            lastChangeTime
          }
        });
        this.props.dispatch({
          type: `${NAMESPACE_CALL_ON_IP}/save`,
          payload: {
            lastChangeTime
          }
        });
        this.props.dispatch({
          type: `${NAMESPACE_CALL_ON_DOMAIN}/save`,
          payload: {
            lastChangeTime
          }
        });
        this.props.dispatch({
          type: `${NAMESPACE_MALIP}/fetch`,
          payload: {
            page: 1,
            limit: 10,
            timestampRange
          }

        });
        this.props.dispatch({
          type: `${NAMESPACE_MALDOMAIN}/fetch`,
          payload: {
            page: 1,
            limit: 10,
            timestampRange
          }

        });
        this.props.dispatch({
          type: `${NAMESPACE_SUFFERHOSTCALLONRECORD}/fetch`,
          payload: {
            page: 1,
            limit: 10,
            timestampRange
          }

        });
        this.props.dispatch({
          type: `${NAMESPACE_HAVECOMMUNICATEINSIDEIP}/fetch`,
          payload: {
            page: 1,
            limit: 10,
            timestampRange
          }

        });
        this.props.dispatch({
          type: `${NAMESPACE_CALL_ON_IP}/fetch`,
          payload: {
            page: 1,
            limit: 10,
            timestampRange
          }

        });
        this.props.dispatch({
          type: `${NAMESPACE_CALL_ON_DOMAIN}/fetch`,
          payload: {
            page: 1,
            limit: 10,
            timestampRange
          }

        });
      }
    } else if (this.props.base.keyvalue == 'chart_statistical') {
      this.props.dispatch({
        type: `${NAMESPACE_CHART}/fetch`,
        payload: {
          timestampRange
        }

      });

    }
  }
  selectLevel = (checkedListNew) => {
    if (checkedListNew.includes("VALUE_HIGH") && !checkedListNew.includes("VALUE_MIDDLE") && !checkedListNew.includes("VALUE_LOW")) {
      return {
        limit: 10,
        page: 1,
        level: ["high"]
      }
    }
    else if (checkedListNew.includes("VALUE_HIGH") && checkedListNew.includes("VALUE_MIDDLE")) {
      return {
        limit: 10,
        page: 1,
        level: ["high", "middle"]
      }

    } else if (checkedListNew.includes("VALUE_HIGH") && checkedListNew.includes("VALUE_LOW")) {
      return {
        limit: 10,
        page: 1,
        level: ["high", "low"]
      }

    }
    if (checkedListNew.includes("VALUE_MIDDLE") && !checkedListNew.includes("VALUE_HIGH") && !checkedListNew.includes("VALUE_LOW")) {
      return {
        limit: 10,
        page: 1,
        level: ["middle"]
      }
    }
    else if (checkedListNew.includes("VALUE_MIDDLE") && checkedListNew.includes("VALUE_LOW")) {
      return {
        limit: 10,
        page: 1,
        level: ["middle", "low"]
      }
    }
    if (checkedListNew.includes("VALUE_LOW") && !checkedListNew.includes("VALUE_MIDDLE") && !checkedListNew.includes("VALUE_HIGH")) {
      return {
        limit: 10,
        page: 1,
        level: ["low"]
      }
    }
  }


  onExport = () => {
    const checkedListNew = this.state.checkedListNew;
    const option = {
      exportAll: "exportAll",
      eventStatistic: checkedListNew.includes("VALUE_ATTACK") ? 1 : 0,
      threatEvent:
      threateventItemList.every(i => this.haveChecked(i))
        ?
        {
          limit: 10,
          page: 1,
          level: ["high", "middle", "low"]
        }
        : this.selectLevel(checkedListNew),
      fallhost:
      checkedListNew.includes("VALUE_FALL_HOST")
        ?
        {
          limit: 10,
          page: 1
        }
        : null,
      threatinfo:
      checkedListNew.includes("VALUE_THREATINFO")
        ?
        {
          limit: 10,
          page: 1
        }
        : null,
      malip:
      checkedListNew.includes("VALUE_MALIP")
        ?
        {
          limit: 10,
          page: 1
        }
        : null,
      maldomain:
      checkedListNew.includes("VALUE_MALDOMAIN")
        ?
        {
          limit: 10,
          page: 1
        }
        : null,
      sufferhostcallonrecord:
      checkedListNew.includes("VALUE_SUFFERHOSTCALLONRECORD")
        ?
        {
          limit: 10,
          page: 1
        }
        : null,
      havecommunicateinsideip:
      checkedListNew.includes("VALUE_HAVECOMMUNICATEINSIDEIP")
        ?
        {
          limit: 10,
          page: 1
        }
        : null,
      callonip:
      checkedListNew.includes("VALUE_CALL_ON_IP")
        ?
        {
          limit: 10,
          page: 1
        }
        : null,
      callondomain:
      checkedListNew.includes("VALUE_CALL_ON_DOMAIN")
        ?
        {
          limit: 10,
          page: 1
        }
        : null,
      chartattackip:
      checkedListNew.includes("VALUE_CHART_ATTACK")
        ?
        {
          limit: 10,
          page: 1
        }
        : null,
      eventtype:
      checkedListNew.includes("VALUE_EVENT_TYPE")
        ?
        {
          limit: 10,
          page: 1
        }
        : null,
      exploitvulnerability:
      checkedListNew.includes("VALUE_EXLOITVULNERABILITY")
        ?
        {
          limit: 10,
          page: 1
        }
        : null,
      sourcecountry:
      checkedListNew.includes("VALUE_CHART_SOURCECOUNTRY")
        ?
        {
          limit: 10,
          page: 1
        }
        : null,
      sourceprovince:
      checkedListNew.includes("VALUE_CHART_SOURCEPROVINCE")
        ?
        {
          limit: 10,
          page: 1
        }
        : null,
      recordstatistical:
      checkedListNew.includes("VALUE_RECORDSTATISTICAL")
        ?
        {
          limit: 10,
          page: 1
        }
        : null,
      watermark:
      checkedListNew.includes("VALUE_WATERMARK") ? 1 : 0,

    };
    const timestampRange = this.props.base.timestampRange;
    this.props.dispatch({
      type: `${NAMESPACE_ATTACK}/onExport`,
      payload:
      { option, timestampRange }

    });
  }
  haveChecked = key => {
    return this.state.checkedListNew.includes(key)
  }
  callback = (key) => {
    const { productType } = this.props;
    const attacklastChangeTime = this.props.attack.lastChangeTime;
    const threateventlastChangeTime = this.props.threatevent.lastChangeTime;
    const fallhostlastChangeTime = this.props.fallhost.lastChangeTime;
    const threatinfolastChangeTime = this.props.threatinfo.lastChangeTime;
    const maliplastChangeTime = this.props.malip.lastChangeTime;
    const maldomainlastChangeTime = this.props.maldomain.lastChangeTime;
    const sufferhostcalllastChangeTime = this.props.sufferhostcall.lastChangeTime;
    const havecommunicatelastChangeTime = this.props.havecommunicate.lastChangeTime;
    const calloniplastChangeTime = this.props.callonip.lastChangeTime;
    const callondomainlastChangeTime = this.props.callondomain.lastChangeTime;
    const chartstatisticallastChangeTime = this.props.chartstatistical.lastChangeTime;
    const { lastChangeTime, timestampRange, limit, page } = this.props.base;
    switch (key) {
      case 'attack_components':
        this.props.dispatch({
          type: `${NAMESPACE_BASE}/save`,
          payload: {
            keyvalue: 'attack_components'
          }
        });
        if (lastChangeTime !== attacklastChangeTime) {
          this.props.dispatch({
            type: `${NAMESPACE_ATTACK}/save`,
            payload: {
              lastChangeTime: lastChangeTime
            }
          });
          this.props.dispatch({
            type: `${NAMESPACE_ATTACK}/fetch`,
            payload: {
              timestampRange
            }
          });
        }
        break;
      case 'event_components':
        this.props.dispatch({
          type: `${NAMESPACE_BASE}/save`,
          payload: {
            keyvalue: 'event_components'
          }
        });
        if (lastChangeTime !== threateventlastChangeTime) {
          this.props.dispatch({
            type: `${NAMESPACE_THREATEVENT}/save`,
            payload: {
              lastChangeTime: lastChangeTime
            }
          });
          this.props.dispatch({
            type: `${NAMESPACE_THREATEVENT}/fetch`,
            payload: {
              page,
              limit,
              timestampRange
            }
          });
        }
        if (lastChangeTime !== fallhostlastChangeTime) {
          this.props.dispatch({
            type: `${NAMESPACE_FALL_HOST}/save`,
            payload: {
              lastChangeTime: lastChangeTime
            }
          });
          this.props.dispatch({
            type: `${NAMESPACE_FALL_HOST}/fetch`,
            payload: {
              page,
              limit,
              timestampRange
            }
          });
        }
        if (lastChangeTime !== threatinfolastChangeTime) {
          this.props.dispatch({
            type: `${NAMESPACE_THREATINFO}/save`,
            payload: {
              lastChangeTime: lastChangeTime
            }
          });
          this.props.dispatch({
            type: `${NAMESPACE_THREATINFO}/fetch`,
            payload: {
              page,
              limit,
              timestampRange
            }

          });
        }
        if (productType !== STAND_ALONE) {

          if (lastChangeTime !== maliplastChangeTime) {
            this.props.dispatch({
              type: `${NAMESPACE_MALIP}/save`,
              payload: {
                lastChangeTime: lastChangeTime
              }
            });
            this.props.dispatch({
              type: `${NAMESPACE_MALIP}/fetch`,
              payload: {
                page,
                limit,
                timestampRange
              }
            });
          }
          if (lastChangeTime !== maldomainlastChangeTime) {
            this.props.dispatch({
              type: `${NAMESPACE_MALDOMAIN}/save`,
              payload: {
                lastChangeTime: lastChangeTime
              }
            });
            this.props.dispatch({
              type: `${NAMESPACE_MALDOMAIN}/fetch`,
              payload: {
                page,
                limit,
                timestampRange
              }
            });
          }
          if (lastChangeTime !== sufferhostcalllastChangeTime) {
            this.props.dispatch({
              type: `${NAMESPACE_SUFFERHOSTCALLONRECORD}/save`,
              payload: {
                lastChangeTime: lastChangeTime
              }
            });
            this.props.dispatch({
              type: `${NAMESPACE_SUFFERHOSTCALLONRECORD}/fetch`,
              payload: {
                page,
                limit,
                timestampRange
              }
            });
          }
          if (lastChangeTime !== havecommunicatelastChangeTime) {
            this.props.dispatch({
              type: `${NAMESPACE_HAVECOMMUNICATEINSIDEIP}/save`,
              payload: {
                lastChangeTime: lastChangeTime
              }
            });
            this.props.dispatch({
              type: `${NAMESPACE_HAVECOMMUNICATEINSIDEIP}/fetch`,
              payload: {
                page,
                limit,
                timestampRange
              }
            });
          }
          if (lastChangeTime !== calloniplastChangeTime) {
            this.props.dispatch({
              type: `${NAMESPACE_CALL_ON_IP}/save`,
              payload: {
                lastChangeTime: lastChangeTime
              }
            });
            this.props.dispatch({
              type: `${NAMESPACE_CALL_ON_IP}/fetch`,
              payload: {
                page,
                limit,
                timestampRange
              }
            });
          }
          if (lastChangeTime !== callondomainlastChangeTime) {
            this.props.dispatch({
              type: `${NAMESPACE_CALL_ON_DOMAIN}/save`,
              payload: {
                lastChangeTime: lastChangeTime
              }
            });
            this.props.dispatch({
              type: `${NAMESPACE_CALL_ON_DOMAIN}/fetch`,
              payload: {
                page,
                limit,
                timestampRange
              }
            });
          }
        }
        break;
      case 'chart_statistical':
        this.props.dispatch({
          type: `${NAMESPACE_BASE}/save`,
          payload: {
            keyvalue: 'chart_statistical'
          }
        });
        if (lastChangeTime !== chartstatisticallastChangeTime) {
          this.props.dispatch({
            type: `${NAMESPACE_CHART}/save`,
            payload: {
              lastChangeTime: lastChangeTime
            }
          });
          this.props.dispatch({
            type: `${NAMESPACE_CHART}/fetch`,
            payload: {
              timestampRange
            }
          });

        }
        break;
    };
  }
  render() {
    const eventreportdata = ["VALUE_FALL_HOST", "VALUE_THREATEVENT", "VALUE_THREATINFO", "VALUE_MALIP", "VALUE_MALDOMAIN", "VALUE_SUFFERHOSTCALLONRECORD", "VALUE_HAVECOMMUNICATEINSIDEIP", "VALUE_CALL_ON_IP", "VALUE_CALL_ON_DOMAIN", "VALUE_HIGH", "VALUE_MIDDLE", "VALUE_LOW"];
    const mineventreportdata = ["VALUE_FALL_HOST", "VALUE_THREATEVENT", "VALUE_THREATINFO", "VALUE_HIGH", "VALUE_MIDDLE", "VALUE_LOW"];
    const chartdata = ["VALUE_CHART_ATTACK", "VALUE_EVENT_TYPE", "VALUE_EXLOITVULNERABILITY", "VALUE_CHART_SOURCECOUNTRY", "VALUE_CHART_SOURCEPROVINCE", "VALUE_RECORDSTATISTICAL"];
    const minchartdata = ["VALUE_CHART_ATTACK", "VALUE_EVENT_TYPE", "VALUE_EXLOITVULNERABILITY", "VALUE_CHART_SOURCECOUNTRY", "VALUE_CHART_SOURCEPROVINCE"];
    const { visible, loading } = this.state;
    const { isDark, productType } = this.props;
    const { timestampRange } = this.props.base;
    let showdatastart = "", showdataend = ""
    try {
      showdatastart = timestampRange[0].format("YYYY-MM-DD");
      showdataend = timestampRange[1].format("YYYY-MM-DD");

    } catch (e) {

    }

    return (
      <div>

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

            </div>,
            <Tabs onChange={this.callback} className={classnames({ "lbl-dark": isDark })} key="tab-list">
              <TabPane tab="攻击统计" key="attack_components">  <Table_attack_components {...this.props} /></TabPane>
              <TabPane tab="事件报告" key="event_components">
                <Table_threat_event_components {...this.props} />
                <Table_fall_host_components {...this.props} />
                <Table_threat_info_components {...this.props} />
                <div style={{ display: (productType == STAND_ALONE) ? "none" : "block" }}>
                  <Table_mal_ip_components {...this.props} />
                  <Table_mal_domain_components {...this.props} />
                  <Table_suffer_host_call_on_record_components {...this.props} />
                  <Table_have_communicate_inside_ip_components {...this.props} />
                  <Table_call_on_ip_components {...this.props} />
                  <Table_call_on_domain_components {...this.props} />
                </div>
              </TabPane>
              <TabPane tab="图表统计" key="chart_statistical"><Chart_statistical_components {...this.props} /></TabPane>


            </Tabs>
          ])
        }

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
                checked={this.props.productType == STAND_ALONE ? mineventexportItemList.every(i => this.haveChecked(i)) : eventexportItemList.every(i => this.haveChecked(i))}
                onChange={this.getOnChangeHandle(this.props.productType == STAND_ALONE ? mineventreportdata : eventreportdata)}
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
            <div style={{ display: (productType == STAND_ALONE) ? "none" : "block" }}>
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
            </div>
            <Col span={24}>
              <Checkbox
                style={{ fontWeight: "bold" }}
                value="VALUE_CHART"
                checked={this.props.productType == STAND_ALONE ? minchartItemList.every(i => this.haveChecked(i)) : chartItemList.every(i => this.haveChecked(i))}
                onChange={this.getOnChangeHandle(this.props.productType == STAND_ALONE ? minchartdata : chartdata)}
              >
                图表统计
                      </Checkbox>
            </Col>
            <Col span={7} offset={1}>
              <Checkbox
                value="VALUE_CHART_ATTACK"
                onChange={this.getOnChangeHandle(["VALUE_CHART_ATTACK"])}
                checked={this.state.checkedListNew.includes("VALUE_CHART_ATTACK")}>
                攻击IP
                      </Checkbox>
            </Col>
            <Col span={7} offset={1}>
              <Checkbox
                value="VALUE_EVENT_TYPE"
                onChange={this.getOnChangeHandle(["VALUE_EVENT_TYPE"])}
                checked={this.state.checkedListNew.includes("VALUE_EVENT_TYPE")}>
                攻击事件类型
                      </Checkbox>
            </Col>
            <Col span={7} offset={1}>
              <Checkbox
                value="VALUE_EXLOITVULNERABILITY"
                onChange={this.getOnChangeHandle(["VALUE_EXLOITVULNERABILITY"])}
                checked={this.state.checkedListNew.includes("VALUE_EXLOITVULNERABILITY")}>
                攻击利用漏洞
                      </Checkbox>
            </Col>
            <Col span={7} offset={1}>
              <Checkbox
                value="VALUE_CHART_SOURCECOUNTRY"
                onChange={this.getOnChangeHandle(["VALUE_CHART_SOURCECOUNTRY"])}
                checked={this.state.checkedListNew.includes("VALUE_CHART_SOURCECOUNTRY")}>
                攻击来源国家
                      </Checkbox>
            </Col>
            <Col span={7} offset={1}>
              <Checkbox
                value="VALUE_CHART_SOURCEPROVINCE"
                onChange={this.getOnChangeHandle(["VALUE_CHART_SOURCEPROVINCE"])}
                checked={this.state.checkedListNew.includes("VALUE_CHART_SOURCEPROVINCE")}>
                攻击来源省份
                      </Checkbox>
            </Col>
            <div style={{ display: (productType == STAND_ALONE) ? "none" : "block" }}>
              <Col span={7} offset={1}>
                <Checkbox
                  value="VALUE_RECORDSTATISTICAL"
                  onChange={this.getOnChangeHandle(["VALUE_RECORDSTATISTICAL"])}
                  checked={this.state.checkedListNew.includes("VALUE_RECORDSTATISTICAL")}>
                  威胁记录统计
                      </Checkbox>
              </Col>
            </div>
            <Col span={24}>
              <Checkbox
                value="VALUE_WATERMARK"
                onChange={this.getOnChangeHandle(["VALUE_WATERMARK"])}
                checked={this.state.checkedListNew.includes("VALUE_WATERMARK")}>
                水印功能
              </Checkbox>
            </Col>
          </Row>

        </Modal>
      </div>
    )
  }
}
function mapStateToProps(state) {

  const base = state[NAMESPACE_BASE];
  const attack = state[NAMESPACE_ATTACK];
  const threatevent = state[NAMESPACE_THREATEVENT];
  const fallhost = state[NAMESPACE_FALL_HOST];
  const threatinfo = state[NAMESPACE_THREATINFO];
  const malip = state[NAMESPACE_MALIP];
  const maldomain = state[NAMESPACE_MALDOMAIN];
  const sufferhostcall = state[NAMESPACE_SUFFERHOSTCALLONRECORD];
  const havecommunicate = state[NAMESPACE_HAVECOMMUNICATEINSIDEIP];
  const callonip = state[NAMESPACE_CALL_ON_IP];
  const callondomain = state[NAMESPACE_CALL_ON_DOMAIN];
  const chartstatistical = state[NAMESPACE_CHART];
  return {
    loading: state.loading.effects[`${NAMESPACE_ATTACK}/fetch`],
    base,
    attack,
    threatevent,
    fallhost,
    threatinfo,
    malip,
    maldomain,
    sufferhostcall,
    havecommunicate,
    callonip,
    callondomain,
    chartstatistical,
    isDark: state.layout.commonLayout.darkTheme,
    productType: state.user.productType.type,
  };
}



export default connect(mapStateToProps)(Page);