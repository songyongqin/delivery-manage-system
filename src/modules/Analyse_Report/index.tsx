import * as React from 'react'
import { connect } from 'dva'
import { Tabs, Icon } from 'antd'
import classnames from 'classnames'
import WithAnimateRender from 'components/WithAnimateRender'
import WithCommonProps from 'domainComponents/WithCommonProps'
import TimestampPicker from 'components/TimestampPicker'
import { NAMESPACE, NAMESPACE_FILE, NAMESPACE_MAIL, NAMESPACE_URL, TAB_FILE, TAB_URL } from './ConstConfig'
import FileRecord from './components/FileRecord'
import Spin from 'domainComponents/Spin'
const styles = require("./styles.less")
const TabPane = Tabs.TabPane


const getMd5 = str => {
  if(str&& typeof str==='string'&& str.indexOf('=')!==-1){
    return str.split('=')[1]
  }
  else return ''
}

@WithAnimateRender
@WithCommonProps
class Page extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      keyValue: "file"
    }
  }
  componentDidMount() {

    let str = this.props.location.search

    const { fileLastChangeTime, mailLastChangeTime, urlLastChangeTime, timestampRange, page,
      limit,
      total,
      emailTheme,
      fileMd5,
      threatType,
      judge,
      senderAccount,
      // senderIp,
      receiverAccount,
      // receiverIp, 
    } = this.props;
    const lastChangeTime = new Date().getTime();
    this.props.toMailSave({
      limit: 30,
      emailTheme: "",
      fileMd5: "",
      threatType: [],
      judge: [],
      senderAccount: "",
      // senderIp: "",
      receiverAccount: "",
    }),
      this.props.toSave({
        fileName: "",
        md5: getMd5(str)||"",
        fileType: [],
        threatType: [],
        judge: [],
        limit: 30
      }),
      this.props.toUrlSave({
        limit: 30,
        md5: "",
        url: "",
        judge: [],
        threatType: [],
      })
    this.props.toBaseSave({ timestampRange: [], lastChangeTime })
    if (this.state.keyValue == 'url' && urlLastChangeTime != lastChangeTime) {
      this.props.toUrlSave({ lastChangeTime }); this.props.toUrlFetch({})
    } else if (this.state.keyValue == 'file' && fileLastChangeTime != lastChangeTime) {
      this.props.toSave({
        lastChangeTime
      }), this.props.toFetch({})
    } else if (this.state.keyValue == 'mail' && mailLastChangeTime != lastChangeTime) {
      this.props.toMailSave({
        lastChangeTime,
      }), this.props.toMailFetch({
        page,
        limit,
        total,
        timestampRange,
        emailTheme,
        fileMd5,
        threatType,
        judge,
        senderAccount,
        // senderIp: "",
        receiverAccount,
      })
    }

  }
  timestampRangeOnChange = ({ timestampRange }) => {
    const {
      page,
      limit,
      total,
      emailTheme,
      fileMd5,
      threatType,
      judge,
      senderAccount,
      // senderIp,
      receiverAccount,
      // receiverIp,
    } = this.props;
    const lastChangeTime = new Date().getTime();
    this.props.toBaseSave({ timestampRange, lastChangeTime })
    if (this.state.keyValue == 'url') {
      this.props.toUrlSave({ lastChangeTime }); this.props.toUrlFetch({})
    } else if (this.state.keyValue == 'file') {
      this.props.toSave({ lastChangeTime }), this.props.toFetch({})
    } else if (this.state.keyValue == 'mail') {
      this.props.toMailSave({ lastChangeTime }), this.props.toMailFetch({
        page,
        limit,
        total,
        timestampRange,
        emailTheme,
        fileMd5,
        threatType,
        judge,
        senderAccount,
        // senderIp,
        receiverAccount,
      })
    }

  }
  callback = (key) => {
    const { lastChangeTime, urlLastChangeTime, fileLastChangeTime, mailLastChangeTime,
      timestampRange,
      page,
      limit,
      total,
      emailTheme,
      fileMd5,
      threatType,
      judge,
      senderAccount,
      // senderIp,
      receiverAccount,
      // receiverIp,
    } = this.props;
    switch (key) {
      case "url":
        this.setState({
          keyValue: "url"
        });
        if (urlLastChangeTime !== lastChangeTime) {
          this.props.toUrlSave({ lastChangeTime: lastChangeTime });
          this.props.toUrlFetch({})
        }
        break;
      case "file":
        this.setState({
          keyValue: "file"
        });
        if (fileLastChangeTime !== lastChangeTime) {
          this.props.toUrlSave({ lastChangeTime: lastChangeTime });
          this.props.toFetch({})
        }
        break;

      case "mail":
        this.setState({
          keyValue: "mail"
        });
        if (mailLastChangeTime !== lastChangeTime) {
          this.props.toMailSave({ lastChangeTime: lastChangeTime });
          this.props.toMailFetch({
            page,
            limit,
            total,
            timestampRange,
            emailTheme,
            fileMd5,
            threatType,
            judge,
            senderAccount,
            // senderIp,
            receiverAccount,
          })
        }
        break;
    }
  }

  render() {
    const { theme } = this.props;
    const pageClasses = classnames({
      [styles["page-dark"]]: theme == "dark"
    })
    
    return (
      <div className={pageClasses}>
        {this.props.animateRender([
          <div className={styles["timestampPicker"]} key="timestampPicker"> <TimestampPicker onChange={this.timestampRangeOnChange}></TimestampPicker></div>,
          <div style={{ width: "100%", overflow: "hidden" }} key="keyDiv">
            <Spin spinning={this.props.loading}>
              {/* <Tabs defaultActiveKey="file" onChange={this.callback}>
                <TabPane tab="文件记录" key="file"><FileRecord /></TabPane>
                <TabPane tab="邮件记录" key="mail"><MailRecord /></TabPane>
                <TabPane tab="URL记录" key="url"><UrlRecord /></TabPane>
                
              </Tabs> */}
              <FileRecord />
            </Spin>
          </div>,
        ])}
      </div>
    )
  }
}
const mapStateToProps = state => {
  const { lastChangeTime, timestampRange } = state[NAMESPACE], urlLastChangeTime = state[NAMESPACE_URL].lastChangeTime, fileLastChangeTime = state[NAMESPACE_FILE].lastChangeTime, mailLastChangeTime = state[NAMESPACE_MAIL].lastChangeTime,
    {
      page,
      limit,
      total,
      emailTheme,
      fileMd5,
      threatType,
      judge,
      senderAccount,
      // senderIp,
      receiverAccount,
      // receiverIp,
    } = state[NAMESPACE_MAIL];
  return {
    page,
    limit,
    total,
    emailTheme,
    fileMd5,
    threatType,
    judge,
    senderAccount,
    // senderIp,
    receiverAccount,
    // receiverIp,
    timestampRange,
    lastChangeTime,
    urlLastChangeTime,
    mailLastChangeTime,
    fileLastChangeTime,
    loading: state.loading.effects[`${NAMESPACE_FILE}/fetch`] || state.loading.effects[`${NAMESPACE_URL}/fetch`],
  }
}
const mapDispatchToProps = dispatch => {
  return {
    toBaseSave: payload => dispatch({
      type: `${NAMESPACE}/save`,
      payload,
    }),
    toSave: payload => dispatch({
      type: `${NAMESPACE_FILE}/save`,
      payload,
    }),
    toFetch: payload => dispatch({
      type: `${NAMESPACE_FILE}/fetch`,
      payload,
    }),
    toUrlSave: payload => dispatch({
      type: `${NAMESPACE_URL}/save`,
      payload,
    }),
    toUrlFetch: payload => dispatch({
      type: `${NAMESPACE_URL}/fetch`,
      payload,
    }),
    toMailSave: payload => dispatch({
      type: `${NAMESPACE_MAIL}/save`,
      payload,
    }),
    toMailFetch: payload => dispatch({
      type: `${NAMESPACE_MAIL}/fetch`,
      payload,
    })
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Page);
