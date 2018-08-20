import * as React from 'react'
import { connect } from 'dva'
import { DatePicker, Button, Card, Affix, Icon, Timeline, Tooltip, message as Message, List } from 'antd'
import WithCommonProps from 'domainComponents/WithCommonProps'
import { Link, withRouter } from 'dva/router'
import { COMMON_SUCCESS_STATUS, LAYOUT_NAMESPACE, LOGIN_NAMESPACE, } from 'configs/ConstConfig'
import { DEL_SIGN_ACTION } from 'modules/Login/ConstConfig'
import Header from 'modules/MainWrapper/components/Header'
import { panelKeys, panelTitleConfigs, NAMESPACE, basicInfoDataIndexes, basicPanelTextConfig, SIZE_DATA_INDEX, emailInfoDataIndexes, emailPanelTextConfig, START_TIME_DATA_INDEX, JUDGE_DATA_INDEX } from "./ConstConfig"
import { head, last, queryString } from 'utils/tools'
import { createMapDispatchWithPromise } from 'utils/dvaExtraDispatch'
import Spin from 'domainComponents/Spin'
import ClipboardButton from 'react-clipboard.js'
import Collapse from 'domainComponents/Collapse'
import UrlTable from './components/urlTable/indes'
import FileTable from './components/fileTable/indes'
import exportmailReportByTaskId from 'utils/exportmailReportByTaskId'
import TimesLabel from 'components/TimeLabel'
import OverflowTextWrapper from 'components/OverflowTextWrapper'
import $ from 'jquery'
import moment from 'moment'
import classnames from 'classnames'
const styles = require("./styles.less")

const Panel = Collapse.Panel
const getScrollTop = () => {
  //获取滚动条位置
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
  const { data, urlCount, fileCount, total } = state[NAMESPACE]
  return {
    data, urlCount, fileCount, total
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toFetch: payload => dispatch({
      type: `${NAMESPACE}/fetch`,
      payload
    }),
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
const format = (num) => {
  return (num.toFixed(2) + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')
}
const SLIDE_ANIMATE_DURATION = 300,
  AMEND_VALUE = 100;
const keyRendererConfig = {
  [SIZE_DATA_INDEX]: data => {
    return format(data / 1024) + "KB"
  },
  [START_TIME_DATA_INDEX]: (time) => { return moment(time * 1000).format("YYYY-MM-DD HH:mm:ss") },
  [JUDGE_DATA_INDEX]: (value) => <div>{value == "1" ? "信任" : value == "-1" ? "恶意" : "未知"}</div>,
}
@WithCommonProps
class SideBar extends React.PureComponent<any, any> {
  state = {
    activeKey: head(panelKeys)
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

    const { theme } = this.props,
      { activeKey } = this.state

    const timelineClassName = classnames({
      [styles["timeline"]]: true,
      [styles[theme]]: true
    })

    return (
      <Affix style={{ position: 'fixed', top: 80, right: 25 }}>
        <div className={styles["side-nav"]}>
          <Timeline className={timelineClassName}>
            {
              panelKeys.map(key => {

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
class Page extends React.Component<any, any>{
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      canInitCount: 1,
      filedataSource: [],
      urldataSource: [],
      urlListData: [],
      fileListData: [],
      dataList: [],
      fileThreatCount: 0,
      urlThreatCount: 0
    }
  }

  componentDidMount() {
    const search = this.props.location.search;
    const taskId = queryString.parse(search);
    this.props.toFetch(taskId).then((payload) => {
      const { data } = payload;
      this.setState({ dataList: data })
      const fileList = data.fileList;
      const filethreat = fileList.filter((j, index) => {
        if (j.threatName != "") { return j }
      });
      const filedataSource = filethreat.map((i, index) => { return { title: `附件: ${i.fileName} 检出 ${i.threatName}` } });
      this.setState({ fileListData: fileList, filedataSource, fileThreatCount: filethreat.length });
      const urlList = data.urlList;
      const urlthreat = urlList.filter((j, index) => {
        if (j.threatName != "") { return j }
      });
      const urldataSource = urlthreat.map((i, index) => { return { title: `URL: ${i.url} 检出 ${i.threatName}` } });
      this.setState({ urlListData: urlList, urldataSource, urlThreatCount: urlthreat.length })

    }

    )
  }
  exportReport = () => {
    try {
      Message.success("正在生成静态报告文件...")

      exportmailReportByTaskId(parseInt(queryString.parse(this.props.location.search).taskId))
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
  render() {
    const { urlThreatCount, fileThreatCount, loading, filedataSource, urldataSource, urlListData, fileListData, dataList } = this.state;
    const { theme, navMini, changeTheme, changeNavStatus, location, data, urlCount, fileCount, } = this.props;
    const title = dataList.mailName
      ?
      <div style={{ margin: "0", textAlign: "center" }}>
        <div style={{ float: "left", width: "50%", marginLeft: "100px", textAlign: "right", height: "60px" }}>
          <div style={{}}>
            <OverflowTextWrapper style={{ height: "60px", lineHeight: "60px" }}> {dataList.mailName}</OverflowTextWrapper>
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


    const pageClasses = classnames({
      [styles["page"]]: true
    });

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
        <SideBar></SideBar>
        <div className={styles["content"]}>
          <Spin spinning={loading}>
            <Collapse defaultActiveKey={panelKeys} onChange={this.collapseOnChange}>
              <Panel forceRender={true} header={<span id="overview">概述</span>} key="overview" >
                {
                  data.threatCount == 0
                    ?
                    <div>
                      <div style={{ color: "red", fontWeight: "bold" }}>
                        该封邮件文件暂未检出威胁。
                      <br />
                        {`从该封邮件中提取了 ${fileCount} 个附件文件, ${urlCount} 个URL地址。`}
                      </div>
                    </div>
                    :
                    <div>
                      <div style={{ color: "red", fontWeight: "bold" }}>
                        该封邮件文件检出威胁。
                      <br />
                        {`从该封邮件中提取了${fileCount}个附件文件,${urlCount}个URL地址。共检出${data.threatCount}个威胁。`}
                      </div>
                      <div className={styles["listColor"]} style={{ color: "red", fontWeight: "bold" }}>
                        其中
                        {
                          fileThreatCount != 0 ?
                            <List
                              itemLayout="horizontal"
                              dataSource={filedataSource}
                              split={false}
                              renderItem={item => (
                                <List.Item>
                                  <List.Item.Meta
                                    title={item.title}
                                  />
                                </List.Item>
                              )}
                            />
                            :
                            null
                        }
                        {
                          urlThreatCount != 0
                            ?
                            <List
                              itemLayout="horizontal"
                              dataSource={urldataSource}
                              split={false}
                              renderItem={item => (
                                <List.Item>
                                  <List.Item.Meta
                                    title={item.title}
                                  />
                                </List.Item>
                              )}
                            />
                            :
                            null
                        }
                      </div>
                    </div>
                }
              </Panel>
              <Panel forceRender={true} header={<span id="basic_info">基本信息</span>} key="basic_info">
                <div>
                  <table className={styles["basic-info-table"]}>
                    <tbody>
                      {
                        basicInfoDataIndexes.map(key => {
                          let content = data[key]
                          return (
                            <tr key={key}>
                              <td className={styles["title-cell"]}>{basicPanelTextConfig[key]}</td>
                              <td>
                                {
                                  key in keyRendererConfig ? keyRendererConfig[key](content) : content
                                }
                              </td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </table>
                </div>

              </Panel>
              <Panel forceRender={true} header={<span id="email_info">邮件信息</span>} key="email_info">
                <div>
                  <table className={styles["basic-info-table"]}>
                    <tbody>
                      {
                        emailInfoDataIndexes.map(key => {
                          let content = data[key]
                          return (
                            <tr key={key}>
                              <td className={styles["title-cell"]}>{emailPanelTextConfig[key]}</td>
                              <td>
                                {
                                  key in keyRendererConfig ? keyRendererConfig[key](content) : content
                                }
                              </td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </table>
                </div>

              </Panel>
              <Panel forceRender={true} header={<span id="urllist">URL列表</span>} key="urllist">
                <div>
                  <UrlTable data={urlListData}></UrlTable>
                </div>

              </Panel>
              <Panel forceRender={true} header={<span id="filelist">附件列表</span>} key="filelist">
                <div>
                  <FileTable data={fileListData}></FileTable>
                </div>

              </Panel>
            </Collapse>
          </Spin>

        </div>
      </div>
    )
  }
}
export default connect(mapStateToProps, createMapDispatchWithPromise(mapDispatchToProps))(Page);