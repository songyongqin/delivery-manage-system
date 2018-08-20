/**
 * Created by jojo on 2017/9/5.
 */
import React from 'react';
import columnsCreator from 'utils/columnsCreator'
import CountUp from 'react-countup';
import Card from '../../../../domainComponents/Card';
import TimesLabel from 'components/TimeLabel'
import MailReportLink from 'domainComponents/MailReportLink'
import exportmailReportByTaskId from 'utils/exportmailReportByTaskId'
import SearchForm from './searchForm'
import UrlTable from '../MailRecord/components/urlTable/indes'
import FileTable from '../MailRecord/components/fileTable/indes'
import getAuthURL from 'utils/getAuthURL'
import Spin from 'domainComponents/Spin'
import OverflowTextWrapper from 'components/OverflowTextWrapper'
import {
  mailDataAllIndexes,
  mailDataIndexTextConfig,
  MAIL_KEY_INDEX,
  MAIL_URL_COUNT_INDEX,
  MAIL_FILE_COUNT_DATAINDEX,
  MAIL_THREATTYPE_DATAINDEX,
  MAIL_FILE_MD5_DATAINDEX,
  MAIL_THEME_DATAINDEX,
  MAIL_RECEIVER_DATAINDEX,
  MAIL_SENDER_DATAINDEX,
  FILE_MD5_NAME_SEARCH,
  MAIL_THEME_SEARCH,
  MAIL_RECEIVER_SEARCH,
  MAIL_SENDER_SEARCH,
  MAIL_TIME_DATAINDEX,
  MAIL_REPORT_DATAINDEX,
  MAIL_DOWNLOAD_DATAINDEX,
  THREAT_TYPE,
  JUDGE_DATA_INDEX,
  JUDGE_TEXT_TYPE,
  JUDGE_TYPE,
  MAIL_ACCOUNT_DATAINDEX,
  MAIL_IP_DATAINDEX,
  MAIL_RECEIVER_ACCOUNT_DATAINDEX,
  MAIL_SENDER_ACCOUNT_DATAINDEX,
  MAIL_RECEIVER_IP_DATAINDEX,
  MAIL_SENDER_IP_DATAINDEX

} from '../../ConstConfig';
import Judge from '../../judge'
const styles = require("../../styles.less")
import { Button, Switch, Icon, Input, Tag, Row, Col, Form, Checkbox } from 'antd'
import Tabs from 'domainComponents/Tabs'
import judge from '../../judge';
function FilterAction(text, changeFile, file, searchFile, filterDropdown, down) {
  return {
    filterDropdown: (
      <div className={styles["panel"]}>
        <p style={{
          color: "rgba(0, 0, 0, 0.65)",
          textAlign: "justify",
          marginBottom: "3px"
        }}>
          {text}
        </p>
        <Input
          placeholder={text}
          onChange={changeFile}
          value={file}
          onPressEnter={searchFile}
        />

        <Button icon="search" type="primary" onClick={searchFile} style={{ marginTop: "10px" }}>搜索</Button>
      </div>
    ),
    filterIcon: <Icon type="filter" style={{ color: '#108ee9' }} />,
    filterDropdownVisible: filterDropdown,
    onFilterDropdownVisibleChange: down,

  }
}
// function FilterMaxAction(text, accountindex, ipindex, onSearch, filterDropdown, down) {

//   return {
//     filterDropdown: (
//       <div className={styles["panel_max"]}>
//         <SearchForm text={text} onSearch={onSearch} accountdataindex ipindex />
//       </div>
//     ),
//     filterIcon: <Icon type="filter" style={{ color: '#108ee9' }} />,
//     filterDropdownVisible: filterDropdown,
//     onFilterDropdownVisibleChange: down,

//   }
// }
function getRenderer({ page, limit, getExpandRowOnChange, expandedRowIndexes, expandedRowIndexes_url }) {

  return {
    [MAIL_THEME_DATAINDEX]: (value) => <OverflowTextWrapper>{value}</OverflowTextWrapper>,
    [MAIL_KEY_INDEX]: (key) => (++key) + (page - 1) * limit,
    [MAIL_RECEIVER_ACCOUNT_DATAINDEX]: (value) => (
      <div style={{ textAlign: "center" }}>
        {value}
        {/* <br />
        {value[MAIL_IP_DATAINDEX]} */}
      </div>),
    [MAIL_SENDER_ACCOUNT_DATAINDEX]: (value) => (
      <div style={{ textAlign: "center" }}>
        {value}
        {/* <br />
        {value[MAIL_IP_DATAINDEX]} */}
      </div>),
    // [MAIL_URL_COUNT_INDEX]: (value, records, index) => (
    //   <Button type="primary"
    //     onClick={getExpandRowOnChange(index, MAIL_URL_COUNT_INDEX)}>
    //     {urlList[index].length}
    //     {expandedRowIndexes_url.includes(index) ? <Icon type="shrink" /> : <Icon type="arrows-alt" />}
    //   </Button>
    // ),

    // [MAIL_FILE_COUNT_DATAINDEX]: (value, records, index) => (
    //   <Button type="primary"
    //     onClick={getExpandRowOnChange(index, MAIL_FILE_COUNT_DATAINDEX)}>
    //     {fileList[index].length}
    //     {expandedRowIndexes.includes(index) ? <Icon type="shrink" /> : <Icon type="arrows-alt" />}
    //   </Button>
    // ),
    [JUDGE_DATA_INDEX]: (value) => <Judge value={value}></Judge>,
    [MAIL_TIME_DATAINDEX]: (time) => <div style={{ textAlign: "center" }}><TimesLabel value={[time]}></TimesLabel></div>,
    [MAIL_REPORT_DATAINDEX]: (taskId, record) => <div style={{ textAlign: "center" }}><Tag color='#108ee9' style={{ marginRight: "0px" }}><MailReportLink data={record}></MailReportLink></Tag>|<Tag color='#108ee9'><a onClick={() => exportmailReportByTaskId(record.taskId)}>下载</a></Tag></div>,
    [MAIL_DOWNLOAD_DATAINDEX]: (downloadUrl, record) => <div style={{ textAlign: "center" }}><Tag color='#108ee9'><a href={getAuthURL(record.downloadUrl)} download>下载</a></Tag></div>
  }

}

export const getColumns = ({ page, limit, filterDropdownReceiver,
  filterDropdownSender, filterDropdownTheme,
  filterDropdownMD5, changeFileTheme, onInputChangeMD5, searchTheme, onSearchMD5, onSearchReceiver,
  onSearchSender, downReceiver,
  downSender, downTheme, downMD5, clickValue, fileMd5, emailTheme, threatType, judge, getExpandRowOnChange, expandedRowIndexes, expandedRowIndexes_url,
  onInputChangeReceiver, onInputChangeSender, senderAccount,
  receiverAccount,
}) => {
  return columnsCreator({
    dataIndexes: mailDataAllIndexes,
    titleConfig: mailDataIndexTextConfig,
    renderer: getRenderer({ page, limit, getExpandRowOnChange, expandedRowIndexes, expandedRowIndexes_url }),
    filtersTextConfig: {
      [MAIL_THREATTYPE_DATAINDEX]: THREAT_TYPE,
      [JUDGE_DATA_INDEX]: JUDGE_TEXT_TYPE

    },
    filtersConfig: {
      [MAIL_THREATTYPE_DATAINDEX]: THREAT_TYPE,
      [JUDGE_DATA_INDEX]: JUDGE_TYPE
    },
    filteredValue: {
      [MAIL_THREATTYPE_DATAINDEX]: threatType,
      [JUDGE_DATA_INDEX]: judge
    },
    extraProps: {
      [MAIL_THEME_DATAINDEX]:
        FilterAction(MAIL_THEME_SEARCH, changeFileTheme, emailTheme, searchTheme, filterDropdownTheme, downTheme),
      [MAIL_FILE_MD5_DATAINDEX]:
        FilterAction(FILE_MD5_NAME_SEARCH, onInputChangeMD5, fileMd5, onSearchMD5, filterDropdownMD5, downMD5),
      [MAIL_RECEIVER_ACCOUNT_DATAINDEX]:
        FilterAction(MAIL_RECEIVER_SEARCH, onInputChangeReceiver, receiverAccount, onSearchReceiver, filterDropdownReceiver, downReceiver),
      [MAIL_SENDER_ACCOUNT_DATAINDEX]:
        FilterAction(MAIL_SENDER_SEARCH, onInputChangeSender, senderAccount, onSearchSender, filterDropdownSender, downSender),
      // [MAIL_RECEIVER_DATAINDEX]:
      //   FilterMaxAction(MAIL_RECEIVER_SEARCH, MAIL_RECEIVER_ACCOUNT_DATAINDEX, MAIL_RECEIVER_IP_DATAINDEX, onSearchReceiver, filterDropdownReceiver, downReceiver),
      // [MAIL_SENDER_DATAINDEX]:
      //   FilterMaxAction(MAIL_SENDER_SEARCH, MAIL_SENDER_ACCOUNT_DATAINDEX, MAIL_SENDER_IP_DATAINDEX, onSearchSender, filterDropdownSender, downSender),
    }
  })
}



export const getExpandedRowRenderer = ({ expandedRowIndexes, getProtocol }) => (records, index) => (
  <div style={{ marginLeft: "40px" }}>
    <FileTable index={index} />
  </div>
)
export const getExpandedRowRenderer_url = ({ expandedRowIndexes_url, getProtocol }) => (records, index) => {
  return (
    <div style={{ marginLeft: "40px" }}>
      <UrlTable index={index} />
    </div>
  )
}
