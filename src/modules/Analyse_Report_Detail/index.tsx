import React from 'react';
import { connect, withRouter } from 'dva';
const styles = require('./styles.css');
const style = require('./style.less')
import { Icon, Tabs, Anchor, Affix, Timeline, Collapse, Spin, message as Message } from 'antd';
import Tag from '../../components/Tag/index';
import './common.css';
import { createMapDispatchWithPromise } from '../../utils/dvaExtraDispatch'
import Basic from './components/Basic'
import Avl from './components/Avl'
import Yara from './components/Yara'
import Staticdecryption from './components/Static_decryption'
import Virustotal from './components/Virus_total'
import OtherEngine from './components/Other'
import StringsRenderer from './components/StringsRenderer'
import WithCommonProps from 'domainComponents/WithCommonProps'
import $ from 'jquery'
import html2pdf from 'html2pdf.js'
import {queryString} from 'utils'

const TabPane = Tabs.TabPane;
const Panel = Collapse.Panel
const { Link } = Anchor;

const SLIDE_ANIMATE_DURATION = 300,
  AMEND_VALUE = 100
const getScrollTop = () => {
  let scrollTop = 0
  if (document.documentElement && document.documentElement.scrollTop) {
    scrollTop = document.documentElement.scrollTop
  }
  else if (document.body) {
    scrollTop = document.body.scrollTop
  }
  return scrollTop
}
class SideBar extends React.Component {
  state = {
    activeKey: '1'
  }
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.initContentLocationListener()
  }
  componentWillMount() {
    this.removeContentLocationListener()
  }
  initContentLocationListener = () => {
    window.addEventListener("scroll", this.adjustActiveNav)
    window.addEventListener("resize", this.adjustActiveNav)
  }
  removeContentLocationListener = () => {
    window.removeEventListener("scroll", this.adjustActiveNav)
    window.removeEventListener("resize", this.adjustActiveNav)
  }
  adjustActiveNav = () => {
    this.setState({
      activeKey: this.getActiveKey()
    })
  }
  getActiveKey = (direction = "down") => {
    let activeKey = "";

    ['1', '2','3','4','5','6','7'].forEach(key => {

      let inRange = ($(`#${key}`).offset().top - AMEND_VALUE - 5) <= getScrollTop()
      if (inRange) {
        activeKey = key
      }
    })
    return activeKey
  }
  getNavClick = key => () => {
    try {
      $('html, body').stop()
      $('html, body').animate({
        scrollTop: $(`#${key}`).offset().top - AMEND_VALUE
      }, SLIDE_ANIMATE_DURATION)
    } catch (e) {
      console.error(e)
    }
  }
  render() {
    const activeKey = this.state.activeKey
    const header= {
      color: "#4f5dca",
    }
    return (
      <Affix style={{ position: 'fixed', top: 180, left: 50, zIndex: 999 }}>
        <div>
          <Timeline  >

            <Timeline.Item key={'1'} >
              <a
                onClick={this.getNavClick(1)}
                className={styles["astyle"]}
                style = {activeKey == '1' ?header:null}
              >
                基本信息
              </a>
            </Timeline.Item>
            <Timeline.Item key={'2'} >
              <a
                onClick={this.getNavClick(2)}
                className={styles["astyle"]}
                style = {activeKey == '2' ?header:null}
              >
                avl引擎
                    </a>
            </Timeline.Item>
            <Timeline.Item key={'3'} >
              <a
                onClick={this.getNavClick(3)}
                className={styles["astyle"]}
                style = {activeKey == '3' ?header:null}
              >
                yara引擎
                    </a>
            </Timeline.Item>
            <Timeline.Item key={'4'} >
              <a
                onClick={this.getNavClick(4)}
                className={styles["astyle"]}
                style = {activeKey == '4' ?header:null}
              >
                静态解密
                    </a>
            </Timeline.Item>
            <Timeline.Item key={'5'} >
              <a
                onClick={this.getNavClick(5)}
                className={styles["astyle"]}
                style = {activeKey == '5' ?header:null}
              >
                vt检出结果
                    </a>
            </Timeline.Item>
            <Timeline.Item key={'6'} >
              <a
                onClick={this.getNavClick(6)}
                className={styles["astyle"]}
                style = {activeKey == '6' ?header:null}
              >
                沙箱动态检测
                    </a>
            </Timeline.Item>
            <Timeline.Item key={'7'} >
              <a
                onClick={this.getNavClick(7)}
                className={styles["astyle"]}
                style = {activeKey == '7' ? header:null}
              >
                提取字符串
                    </a>
            </Timeline.Item>
          </Timeline>

        </div>
      </Affix>
    )
  }
}
@WithCommonProps
@withRouter
class Page extends React.Component<any, any>  {
  constructor(props) {
    super(props);
    this.state = {
      activeKeys: ['1', '2', '3', '4', '5', '6', '7'],
      data: {
        engine_detect: {
          avl: {},
          yara: {},
          static_decryption: {},
          virus_total: {},
          threat_judge: {},
          other_engine: [],
          pe_str: {}
        },

      },
      loading: true,
      error_mes: "",
      x86_analysis_status: false,
      nox86_analysis_status: false
    }
    // document.title = this.props.layout.title;
  }
  componentDidMount = () => {
    this.props.getReport(queryString.parse(this.props.location.search)).then(res => {
      const {x86_status, non_x86_status} = res
      this.setState({ data: { ...res }, loading: false, x86_analysis_status:x86_status, nox86_analysis_status:non_x86_status})
    }).catch(res => {
      this.setState({ loading: false, error_mes: res })
    })
    // this.props.getReport_x86({ md5: this.props.location.query.keyword }).then(res => this.setState({ x86_analysis_status: res.payload.content.analysis_status }))
    // this.props.getReport_nox86(queryString.parse(this.props.location.search)).then(res => {
    //   this.setState({ nox86_analysis_status: res.payload.analysis_status })
    // })
    // this.props.getReport_x86(queryString.parse(this.props.location.search)).then(res => {
    //   this.setState({ x86_analysis_status: res.payload.analysis_status })
    // })
  }
  export = () => {
    let isFirFox = true
    try {
      isFirFox = !!(window['navigator']['userAgent'].toLowerCase().indexOf('firefox')!==-1)
    }
    catch(err){
    }

    // let portName = this.state.data.filename
    const name = `分析报告.pdf`
    let opt = {
      filename:     name,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'mm', format: 'a2', orientation: 'portrait' }
    }
    if(!isFirFox){
      opt['margin'] = 20
    }
    let dom = document.getElementById('report')
    console.log(dom)
    this.setState({ isLoading: true })
    html2pdf()
    .from(dom)
    .set(opt)
    .save()
    .then(res =>{
      this.setState({ isLoading: false })
    } )
    .catch(err => {
      this.setState({ isLoading: false })
      console.error('err',err)} 
    )
  }
  render() {
    const { data, loading, error_mes, x86_analysis_status, nox86_analysis_status } = this.state;
    const customPanelStyle = {
      background: '#f7f7f7',
      borderRadius: 4,
      marginBottom: 24,
      border: 0,
      overflow: 'hidden',
    };
    const engine_detect = data.engine_detect;
    const avl = engine_detect.avl,
      yara = engine_detect.yara,
      static_decryption = engine_detect.static_decryption,
      virus_total = engine_detect.virus_total,
      other_engine = engine_detect.other_engine,
      pe_str = engine_detect.pe_str,
      threat_judge = engine_detect.threat_judge;
    return (
      <div id='report'>
        {
          error_mes !== "" ?
            <div style={{ padding: "50px", textAlign: "center" }}>
              <h2><Icon type="frown" />{error_mes}</h2>
            </div>
            :
            <div >
              <div className={style['title']}>
                  <div className={style['headTitle']}>{data.filename}分析报告</div>
                  <div className={style['export']} onClick = {this.export}>
                    <span>导出报告</span>
                    <span className={style['download']}></span>
                  </div>
                </div>
              <SideBar></SideBar>
              <Spin tip="报告生成中..." spinning={loading}>
                <div style={{ marginLeft: "150px" }}>
                  {threat_judge == "threat" ? <h3 className={style['warning']} ><Icon type="exclamation-circle" />&nbsp;经检测该文件为恶意</h3> : null}
                  <Collapse defaultActiveKey={['1', '2', '3', '4', '5', '6', '7']} onChange={activeKeys => this.setState({ activeKeys })}>
                    <Panel forceRender={true} header={<div id={1} className={styles["basic"]}>&nbsp;基本信息</div>} key="1" style={customPanelStyle}>
                      <Basic data={data}></Basic>
                    </Panel>
                    <Panel forceRender={true} header={<div id={2} className={styles["avl"]}>&nbsp;avl引擎 {!avl.detected ? <Icon style={{ fontSize: "16px", color: "green" }} type="check-circle" /> : <Icon style={{ fontSize: "16px", color: "red" }} type="exclamation-circle" />}</div>} key="2" style={customPanelStyle}>
                      {avl.detected ? <Avl data={avl}></Avl> : <div>未检出</div>}
                    </Panel>
                    <Panel forceRender={true} header={<div id={3} className={styles["yara"]}>&nbsp;yara引擎 {!yara.detected ? <Icon style={{ fontSize: "16px", color: "green" }} type="check-circle" /> : <Icon style={{ fontSize: "16px", color: "red" }} type="exclamation-circle" />}</div>} key="3" style={customPanelStyle}>
                      {yara.detected ? <Yara data={yara}></Yara> : <div>未检出</div>}
                    </Panel>
                    <Panel forceRender={true} header={<div id={4} className={styles["sd"]}>&nbsp;静态解密 {!static_decryption.detected ? <Icon style={{ fontSize: "16px", color: "green" }} type="check-circle" /> : <Icon style={{ fontSize: "16px", color: "red" }} type="exclamation-circle" />}</div>} key="4" style={customPanelStyle}>
                      {static_decryption.detected ? <Staticdecryption data={static_decryption}></Staticdecryption> : <div>未检出</div>}
                    </Panel>
                    <Panel forceRender={true} header={<div id={5} className={styles["vt"]}>&nbsp;vt检出结果 {!virus_total.detected ? <Icon style={{ fontSize: "16px", color: "green" }} type="check-circle" /> : <Icon style={{ fontSize: "16px", color: "red" }} type="exclamation-circle" />}</div>} key="5" style={customPanelStyle}>
                      {virus_total.detected ? <Virustotal data={virus_total}></Virustotal> : <div>未检出</div>}
                    </Panel>
                    <Panel forceRender={true} header={<div id={6} style={{ lineHeight: "30px", fontWeight: "bold", fontSize: "16px" }}><Icon type="block" style={{ fontSize: " 2em" }} />&nbsp;沙箱动态检测</div>} key="6" style={customPanelStyle}>
                      {other_engine.length != 0 ? <OtherEngine
                        data={other_engine}
                        md5={data.md5}
                        x86_analysis_status={x86_analysis_status}
                        nox86_analysis_status={nox86_analysis_status}
                      ></OtherEngine> : <div>未检出</div>}
                    </Panel>
                    <Panel forceRender={true} header={<div id={7} style={{ lineHeight: "30px", fontWeight: "bold", fontSize: "16px" }}><Icon type="file-text" style={{ fontSize: " 2em" }} />&nbsp;提取字符串</div>} key="7" style={customPanelStyle}>
                      {pe_str.detected ? <StringsRenderer data={pe_str}></StringsRenderer> : <div>未检出</div>}
                    </Panel>
                  </Collapse>
                </div>
              </Spin>
            </div>
        }
      </div>
    );
  }
}

function mapStateToProps(state, props) {

  return {
    // data: state.report.data,
  }
}
function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getReport: (payload) => {
      return dispatch({
        type: "report/getReport",
        payload
      })
    },
    getReport_x86: (payload) => {
      return dispatch({
        type: "report/x86_sandbox_report",
        payload
      })
    },
    getReport_nox86: (payload) => {
      return dispatch({
        type: "report/non_x86_sandbox_report",
        payload
      })
    },
  }
}
export default connect(mapStateToProps, createMapDispatchWithPromise(mapDispatchToProps))(Page);
