import React from 'react';
import { connect, withRouter } from 'dva';
import styles from './styles.css';
const style = require('./style.less')
import { Icon, Tabs, Anchor, Affix, Timeline, Collapse, Spin,Tooltip,message as Message } from 'antd';
import Tag from './components/Tag';
import OverflowTextWrapper from './components/OverflowTextWrapper'
import './common.css';
import ClipboardButton from 'react-clipboard.js'
import { createMapDispatchWithPromise } from '../../utils/dvaExtraDispatch'
import html2pdf from 'html2pdf.js'
import {
  getFileName,
  panelDataHandleConfigs,
  panelKeys,
  panelTitleConfigs,
  rendererConfig,
  BASIC_INFO,
} from './components/PanelConfig/index.js'
import {
  ANALYSE_STATUS_DATA_INDEX,
  MD5_DATA_INDEX,
  FILE_NAME_DATA_INDEX
} from './ConstConfig'
import $ from 'jquery'
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
    activeKey: panelKeys[0]
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

    [...panelKeys].forEach(key => {

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
      <Affix style={{ position: 'fixed', top: 120, left: 50, zIndex: 999 }}>
        <div>
          <Timeline>
            {
              panelKeys.map(key => {
                return (
                  <Timeline.Item key={key}>
                    <a
                      style = {activeKey === key ?header:null}
                      className={styles["astyle"]}
                      onClick={this.getNavClick(key)}
                    >
                      {panelTitleConfigs[key]}
                    </a>
                  </Timeline.Item>
                )
              })
            }
          </Timeline>
        </div>
      </Affix>
    )
  }
}
class PanelContent extends React.PureComponent<any, any>{
  constructor(props) {
    super(props)

  }
  componentWillMount() {
    console.time(this.props.value)
  }
  componentDidMount() {
    const { callback, value } = this.props
    console.timeEnd(value)

    setTimeout(() => {
      callback && callback()
    })
  }
  render() {
    const { renderer, data } = this.props
    return (
      <div>{renderer && renderer(data)}</div>
    )
  }
}
const successCallback = () => {
  Message.success("链接已成功复制到粘贴板", 5);
}

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: false,
      message: null,
      payload: {},
      activeKeys: panelKeys,
      canInitCount: 1,
      checkStatus: null,
      status_err: ""
    }
  }
  componentDidMount = () => {

    this.getData(this.props.location.search)
    this.initContentLocationListener()
  };
  initContentLocationListener = () => {
    window.addEventListener("scroll", this.adjustActiveNav)
    window.addEventListener("resize", this.adjustActiveNav)
  }
  getCaption = (obj) => {
    var index = obj.lastIndexOf("\=");
    obj = obj.substring(index + 1, obj.length);
    return obj;
  }

  getData = (search) => {
    this.setState({
      loading: true,
    })
    const md5 = this.getCaption(search);
    this.props.getReport({ md5: md5 })
      .then(this.resHandle)
      .catch(
        res => this.setState({
          loading: false,
          status_err: res
        })
      )
  }
  timer = null
  resHandle = res => {
    if (res.status === 1) {

      const analyse = this.hasAnalyse(res.payload)

      analyse ? this.clearTimeout() : this.initAsyncTimer()

      this.setState({
        payload: res.payload,
        checkStatus: res.checkStatus
      })
      return
    }

    this.setState({
      loading: false,
      error: true,
      message: res.payload
    })
  }
  hasAnalyse = (payload) => {
    return payload[ANALYSE_STATUS_DATA_INDEX]
    // const { content = {} } = payload
    // return content[ANALYSE_STATUS_DATA_INDEX] || false
  }
  initAsyncTimer = () => {
    clearTimeout(this.timer)
    this.setState({ loading: true })
    this.timer = setTimeout(() => {
      this.getData(this.props.location.search)
    }, 2000)
  }
  clearTimeout = () => {
    clearTimeout(this.timer)
    this.setState({ loading: false })
  }
  getCaption = (obj) => {
    var index = obj.lastIndexOf("\=");
    obj = obj.substring(index + 1, obj.length);
    return obj;
  }
  collapseOnChange = () => {
    setTimeout(() => {
      try {
        $('.ant-card-body').getNiceScroll().resize()
      } catch (e) {
        console.info("error")
      }
    }, 1000)
  }
  callback = () => {
    this.setState({
      canInitCount: this.state.canInitCount + 1
    })
  }
  export = () => {
    let isFirFox = true
    try {
      isFirFox = !!(window['navigator']['userAgent'].toLowerCase().indexOf('firefox')!==-1)
    }
    catch(err){
    }
    const name = `非X86沙箱报告.pdf`
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
    const { payload = {}, loading, checkStatus, status_err } = this.state
    const { location } = this.props
    // const { content = {} } = payload
    const content = {
      ...payload,
    }

    const analyse = content[ANALYSE_STATUS_DATA_INDEX] || false
    return (
      <div id="report">
        {
          status_err != ""
            ?
            <div style={{ padding: "50px", fontSize: "2em", color: "red", textAlign: "center" }}>
              <Icon type="frown" />{status_err}
            </div>
            :
            <div>
              <div className={style['title']}>
                <div className={style['headTitle']}>非X86沙箱报告</div>
                <div className={style['export']} onClick = {this.export}>
                  <span>导出报告</span>
                  <span className={style['download']}></span>
                </div>
              </div>
              <SideBar></SideBar>
              <Spin tip="报告生成中..."
                spinning={loading}
              >
                <div style={{ marginLeft: "150px" }}>
                  <Collapse defaultActiveKey={[...panelKeys, '概述']} onChange={this.collapseOnChange}>
                    <Panel style={{fontSize: 16,color:'black'}} header="概述" key="概述">
                      {
                        content['summarize'] ?
                          <div style={{fontSize:14, whiteSpace: 'pre-wrap', color: `${content['basic_info'] && content['basic_info']['judge'] === 'threat' ? 'red' : 'inherit'}` }} >
                            {content['summarize']}
                          </div> : null
                      }
                    </Panel>
                    {
                      panelKeys.slice(0, this.state.canInitCount).map((key, index) => {
                        const data = panelDataHandleConfigs[key] && panelDataHandleConfigs[key]({ ...content }),
                          renderer = rendererConfig[key]

                        return (
                          <Panel forceRender={true} style={{fontSize:16}} header={<span id={key}>{panelTitleConfigs[key]}</span>} key={`${key}`}>
                            <PanelContent
                              renderer={renderer}
                              data={data}
                              value={key}
                              callback={this.callback}>
                            </PanelContent>
                          </Panel>
                        )
                      })
                    }
                  </Collapse>
                </div>
              </Spin>
            </div>}

      </div>
    );
  }
}

function mapStateToProps(state, props) {

  return {
  }
}
function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getReport: (payload) => {
      return dispatch({
        type: "non_x86_sandbox_report/getReport",
        payload
      })
    }
  }
}
export default connect(mapStateToProps, createMapDispatchWithPromise(mapDispatchToProps))(Page);
