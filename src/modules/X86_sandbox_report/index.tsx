import * as React from 'react'
import { connect } from 'dva'
import { DatePicker, Button, Card, Affix, Icon } from 'antd'
import classnames from 'classnames'
import WithCommonProps from 'domainComponents/WithCommonProps'
const styles = require("./styles.less")
const style = require('./style.less')
import { Link, withRouter } from 'dva/router'
import { isArray, isObject } from 'lodash'
import { queryString } from 'utils'
import html2pdf from 'html2pdf.js'
import * as services from './Services'
import { COMMON_SUCCESS_STATUS, LAYOUT_NAMESPACE, LOGIN_NAMESPACE } from 'utils/analyse-report/ConstConfig'
import Spin from 'domainComponents/Spin'
// import Header from 'modules/MainWrapper/components/Header'
import Header from './components/Header'
// import OverflowTextWrapper from 'components/OverflowTextWrapper'
import SituationOverFlow from 'components/SituationOverFlow'
const  DEL_SIGN_ACTION = 'delSign'
import {
  ANALYSE_STATUS_DATA_INDEX,
  MD5_DATA_INDEX,
  FILE_NAME_DATA_INDEX
} from './ConstConfig'
import Collapse from 'domainComponents/Collapse'
import { getReport } from './Services';
const Panel = Collapse.Panel
import {
  getFileName,
  panelDataHandleConfigs,
  panelKeys,
  panelTitleConfigs,
  rendererConfig,
  BASIC_INFO,
  YARA_SCAN,
  AVL_SCAN
} from './components/PanelConfig'
import $ from 'jquery'
import { primaryColor } from 'themes/vars'
import { Timeline, Tooltip, message as Message } from 'antd'
import { head, last, exportData  } from 'utils'
import ClipboardButton from 'react-clipboard.js'
import exportReportByTaskId from 'utils/exportReportByTaskId'
import { getAppConfig } from 'domain/app'
import { includes } from 'lodash'

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

const mapStateToProps = state => {
  return {

  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeNavStatus: payload => dispatch({
      type: `${LAYOUT_NAMESPACE}/changeNavStatus`,
      payload
    }),
    changeTheme: payload => dispatch({
      type: `${LAYOUT_NAMESPACE}/changeTheme`,
      payload,
    }),
    delSign: payload => dispatch({
      type: `${LOGIN_NAMESPACE}/${DEL_SIGN_ACTION}`,
      payload
    })
  }
}


const SLIDE_ANIMATE_DURATION = 300,
  AMEND_VALUE = 100

@WithCommonProps
class SideBar extends React.PureComponent<any, any> {
  state = {
    // activeKey: head(panelKeys)
    activeKey: ''
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
    this.props.arr&&this.props.arr.forEach(i => {
      const { key } = i
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

    const { theme } = this.props,
      { activeKey } = this.state


    const timelineClassName = classnames({
      [styles["timeline"]]: true,
      [styles[theme]]: true
    })
    let { arr } = this.props
    return (
      <Affix style={{ position: 'fixed', top: 120, left: 40, zIndex: 999 }}>
        <div className={styles["side-nav"]}>
          <Timeline className={timelineClassName}>
            {
              arr.map(i => {
                const { key } = i
                const itemClassnames = classnames({
                  [styles["side-nav-item"]]: true,
                  [styles[theme]]: true,
                  [styles["active"]]: this.state.activeKey === key
                })

                return (
                  <Timeline.Item key={key}>
                    <a
                      onClick={this.getNavClick(key)}
                      className={itemClassnames}>
                      {i.text}
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


class Report extends React.PureComponent<any, any>{
  render() {
    const { content } = this.props
    return (
      <Collapse defaultActiveKey={panelKeys} onChange={activeKeys => this.setState({ activeKeys })}>
        {
          panelKeys.map(key => {
            const data = panelDataHandleConfigs[key] && panelDataHandleConfigs[key](content),
              renderer = rendererConfig[key]
            return (
              <Panel forceRender={true} header={<span id={key}>{panelTitleConfigs[key]}</span>} key={`${key}`}>
                <div key={`${this.state.activeKeys.includes(key)}-content`}>
                  {
                    renderer && renderer(data)
                  }
                </div>
              </Panel>
            )
          })
        }
      </Collapse>
    )
  }
}

const successCallback = () => {
  Message.success("链接已成功复制到粘贴板", 5);
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

@withRouter
@WithCommonProps
@connect(mapStateToProps, mapDispatchToProps)
class Page extends React.Component<any, any> {
  state = {
    loading: false,
    error: false,
    message: null,
    payload: {},
    activeKeys: panelKeys,
    canInitCount: 1
  }
  constructor(props) {
    super(props)
  }
  componentDidMount() {

    this.getData(this.props.location.search)
    this.initContentLocationListener()
  }

  getData = (search) => {
    this.setState({
      loading: true,
    })
    services.getReport(queryString.parse(search))
      .then(this.resHandle)
  }
  timer = null
  resHandle = res => {
    if (res.status === COMMON_SUCCESS_STATUS) {
      const analyse = this.hasAnalyse(res.payload)

      analyse ? clearTimeout(this.timer) : this.initAsyncTimer()

      this.setState({
        payload: res.payload,
        loading: false
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
    const { content = {} } = payload
    return content[ANALYSE_STATUS_DATA_INDEX] || false
  }
  initAsyncTimer = () => {
    clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      this.getData(this.props.location.search)
    }, 2000)
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
    this.addEmptyChunk()
  }
  addEmptyChunk = () => {
    try {
      let value = document.body.offsetHeight - $(`#${last(panelKeys)}`)[0].clientHeight - AMEND_VALUE
      this.con.style.paddingBottom = value + "px"
    } catch (e) {

    }
  }
  exportReport = () => {
    try {
      Message.success("正在生成静态报告文件...")
      exportReportByTaskId(queryString.parse(this.props.location.search)['md5'])
        .then(() => {
          Message.success("下载任务添加成功")
        })
        .catch(message => {
          Message.error(message)
        })
    } catch (e) {
      Message.error(e.message)
    }
  }
  con = null

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
    const name = `X86沙箱报告.pdf`
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

    const pageClasses = classnames({
      [styles["page"]]: true
    })

    const { payload = {}, loading } = this.state
    const { theme, navMini, changeTheme, changeNavStatus, location } = this.props
    const { content = {} } = payload

    const analyse = content[ANALYSE_STATUS_DATA_INDEX] || false
    const title = panelDataHandleConfigs[BASIC_INFO](content)
      ?
      <div style={{ margin: "0", textAlign: "center" }}>
        <div style={{ float: "left", width: "50%", marginLeft: "100px", textAlign: "right", height: "60px" }}>
          <div style={{}}>
            <SituationOverFlow style={{ height: "60px", lineHeight: "60px" }}> {`${panelDataHandleConfigs[BASIC_INFO](content)[FILE_NAME_DATA_INDEX]}`}</SituationOverFlow>
          </div>
        </div>
        <div style={{ float: "left", textAlign: "left", width: "160px" }}>
          &nbsp;
        {`分析报告`}
          &nbsp;&nbsp;
        <Tooltip title="点击下载报告源文件" placement="bottom">
            <a onClick={this.exportReport}>
              <Icon type="download"></Icon>
            </a>
          </Tooltip>
          &nbsp;&nbsp;
        <ClipboardButton
            data-clipboard-text={window.location.href}
            onSuccess={successCallback}
            style={{ border: "none", background: "none", cursor: "pointer", outline: "none" }}>
            <Tooltip title="点击可复制该条信息分享链接" placement="bottom">
              <Icon type="export"></Icon>
            </Tooltip>
        </ClipboardButton>
        </div>
      </div>
      :
      null


    if (!analyse) {
      return (
        <div className={pageClasses} ref={target => this.con = target}>
          <Header
            theme={theme}
            mini={navMini}
            expandable={false}
            title={title}
            handle={{ signOut: this.props.delSign }}
            themeOnChange={changeTheme}
            onChange={changeNavStatus}>
          </Header>
          <div>
            <p style={{ textAlign: "center", fontSize: 20, color: primaryColor }}>
              <Icon type="loading"></Icon>
              &nbsp;
              &nbsp;
              <span>系统正在拼命分析</span>
            </p>
          </div>
        </div>
      )
    }
    let arr = panelKeys.map((key, index) => {
      const value = panelDataHandleConfigs[key] && panelDataHandleConfigs[key](content),
        text = panelTitleConfigs[key]
      return {
        value, text, key
      }
    })

    arr =arr.filter(i => {
      let have = true
      let {value, text} = i
      let textArr = [panelTitleConfigs[BASIC_INFO], panelTitleConfigs[AVL_SCAN], panelTitleConfigs[YARA_SCAN] ]

      //是否隐藏动态数据
      let analyseReportStatic = getAppConfig()['analyseReportStatic'] || false
      if(analyseReportStatic){
        have = includes(textArr, text) 
      }
      // let isNull = value===''||value ===null 
      // let isEmptyArr = isArray(value)&&value.length===0
      // let isEmptyObj = isObject(value)&&Object.keys(value).length===0
      // if(isNull||isEmptyArr||isEmptyObj){
      //   have = false
      // }
      return have
    } )
    return (
      <div id='report' className={pageClasses} ref={target => this.con = target}>
        <div className={style['title']}>
          <div className={style['headTitle']}>X86沙箱报告</div>
          <div className={style['export']} onClick = {this.export}>
            <span>导出报告</span>
            <span className={style['download']}></span>
          </div>
        </div>
        <SideBar arr={ arr } ></SideBar>
        <div className={styles["content"]}>
          <Spin spinning={loading}>
            <Collapse defaultActiveKey={panelKeys} onChange={this.collapseOnChange}>
              {
                arr.slice(0, this.state.canInitCount).map((i, index) => {
                  let { value, key, text } = i,
                  renderer = rendererConfig[key]
                  return (
                    <Panel style={{fontSize: 16}} forceRender={true} header={<span id={key}>{ text }</span>} key={`${key}`}>
                      <PanelContent
                        renderer={renderer}
                        data={value}
                        value={key}
                        callback={this.callback}>
                      </PanelContent>
                    </Panel>
                  )
                })
              }
            </Collapse>
          </Spin>

        </div>
      </div>
    )
  }
}


export default Page
