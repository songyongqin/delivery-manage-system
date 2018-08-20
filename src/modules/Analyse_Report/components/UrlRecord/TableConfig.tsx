import React from 'react'
import { Button, Icon, Input, Tag } from 'antd'
import columnsCreator from 'utils/columnsCreator'
import OverflowTextWrapper from 'components/OverflowTextWrapper'
import TimesLabel from 'components/TimeLabel'
import ReportLink from 'domainComponents/ReportLink'
import exportReportByTaskId from 'utils/exportReportByTaskId'
import {
  KEY_INDEX,
  URL_DATA_INDEX,
  URL_MD5_DATA_INDEX,
  JUDGE_DATA_INDEX,
  URL_TIME_DATA_INDEX,
  URL_SAMPLE_DOWNLOAD_INDEX,
  urlDataIndexTextConfig,
  urlDataAllIndexes,
  JUDGE_TEXT_TYPE,
  JUDGE_TYPE,
  URL_SEARCH,
  MD5_NAME_SEARCH,
  THREAT_TYPE,
  THREAT_TYPE_DATA_INDEX,
  THREAT_LEVEL_DATA_INDEX,
} from '../../ConstConfig'
import Judge from '../../judge'
const styles = require("./styles.less")

export const getColumns = ({

  searchName,
  searchMD5,

  changeFilename,
  onInputChangeMD5,

  md5,
  url,

  searchFilename,
  onSearchMD5,

  filterDropdownUrl,
  filterDropdownMD5,

  downUrl,
  downMD5,

  page,
  limit,
  judge,
  threatType

}) => {

  const renderer = {
    [KEY_INDEX]: (key) => { const key_ = (page - 1) * limit + (++key); return <div style={{ textAlign: "center" }}>{key_}</div> },
    [URL_DATA_INDEX]: (url) => <OverflowTextWrapper style={{ textAlign: "center" }}>{url}</OverflowTextWrapper>,
    [URL_MD5_DATA_INDEX]: (md5) => { return <OverflowTextWrapper style={{ textAlign: "center" }}>{md5}</OverflowTextWrapper> },
    [JUDGE_DATA_INDEX]: (value) => <Judge value={value}></Judge>,
    [URL_TIME_DATA_INDEX]: (time) => <div style={{ textAlign: "center" }}><TimesLabel value={[time]}></TimesLabel></div>,
    [URL_SAMPLE_DOWNLOAD_INDEX]: (taskId, record) => <div style={{ textAlign: "center" }}><Tag color='#108ee9' style={{ marginRight: "0px" }}><ReportLink data={record}></ReportLink></Tag>|<Tag color='#108ee9'><a onClick={() => exportReportByTaskId(record.taskId)}>下载</a></Tag></div>,
    [THREAT_TYPE_DATA_INDEX]: (value) => <div style={{ textAlign: "center" }}>{value}</div>,
    [THREAT_LEVEL_DATA_INDEX]: (value) => <div style={{ textAlign: "center" }}>{value}</div>,
  }

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



  return columnsCreator(
    {
      dataIndexes: urlDataAllIndexes,
      titleConfig: urlDataIndexTextConfig,
      renderer,
      filtersTextConfig: {
        [THREAT_TYPE_DATA_INDEX]: THREAT_TYPE,
        [JUDGE_DATA_INDEX]: JUDGE_TEXT_TYPE


      },
      filtersConfig: {
        [THREAT_TYPE_DATA_INDEX]: THREAT_TYPE,
        [JUDGE_DATA_INDEX]: JUDGE_TYPE
      },
      filteredValue: {
        [THREAT_TYPE_DATA_INDEX]: threatType,
        [JUDGE_DATA_INDEX]: judge
      },
      extraProps: {
        [URL_DATA_INDEX]: FilterAction(URL_SEARCH, changeFilename, url, searchFilename, filterDropdownUrl, downUrl),

        [URL_MD5_DATA_INDEX]:
          FilterAction(MD5_NAME_SEARCH, onInputChangeMD5, md5, onSearchMD5, filterDropdownMD5, downMD5),
        [KEY_INDEX]: { width: "50px" },
        [URL_DATA_INDEX]: { width: "120px" },
        // [JUDGE_DATA_INDEX]: { width: "120px" },
        [THREAT_TYPE_DATA_INDEX]: { width: "100px" },
        [URL_MD5_DATA_INDEX]: { width: "150px" },
        [THREAT_LEVEL_DATA_INDEX]: { width: "50px" },
        [JUDGE_DATA_INDEX]: { width: "100px" },
        [URL_SAMPLE_DOWNLOAD_INDEX]: { width: "150px" },
        [URL_TIME_DATA_INDEX]: { width: "150px" }
      }
    })
}
