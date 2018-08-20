import React from 'react'
import { Button, Icon, Input, Tag } from 'antd'
import columnsCreator from 'domainUtils/columnsCreator'
import OverflowTextWrapper from 'components/OverflowTextWrapper'
import TimesLabel from 'components/TimeLabel'
import ReportLink from 'domainComponents/ReportLink'
import exportReportByTaskId from 'utils/exportReportByTaskId'
import getAuthURL from 'utils/getAuthURL'
import {
  KEY_INDEX,
  FILE_NAME_DATA_INDEX,
  MD5_DATA_INDEX,
  FILE_TYPE_DATA_INDEX,
  THREAT_TYPE_DATA_INDEX,
  TIME_DATA_INDEX,
  THREAT_LEVEL_DATA_INDEX,
  TASK_ID_DATA_INDEX,
  OPERATION_COL_KEY,
  SAMPLE_DOWNLOAD_INDEX,
  dataIndexTextConfig,
  dataAllIndexes,
  FILETYPE,
  THREAT_TYPE,
  FILE_NAME_SEARCH,
  MD5_NAME_SEARCH,
  JUDGE_DATA_INDEX,
  JUDGE_TEXT_TYPE,
  JUDGE_TYPE

} from '../../ConstConfig'
import Judge from '../../judge'
const styles = require("./styles.less")

export const getColumns = ({

  searchName,
  searchMD5,

  changeFilename,
  onInputChangeMD5,

  md5,
  fileName,

  searchFilename,
  onSearchMD5,

  filterDropdownName,
  filterDropdownMD5,

  downFile,
  downMD5,

  page,
  limit,
  fileType,
  threatType,
  judge

}) => {

  const renderer = {
    [KEY_INDEX]: (key) => { const key_ = (page - 1) * limit + (++key); return <div style={{ textAlign: "center" }}>{key_}</div> },
    [FILE_NAME_DATA_INDEX]: (fileName) => <OverflowTextWrapper style={{ textAlign: "center" }}>{fileName}</OverflowTextWrapper>,
    [MD5_DATA_INDEX]: (md5) => { return <OverflowTextWrapper style={{ textAlign: "center" }}>{md5}</OverflowTextWrapper> },
    [FILE_TYPE_DATA_INDEX]: (value) => <div style={{ textAlign: "center" }}>{value}</div>,
    // [JUDGE_DATA_INDEX]: (value) => <Judge value={value}></Judge>,
    [THREAT_TYPE_DATA_INDEX]: (value) => <div style={{ textAlign: "center" }}>{value}</div>,
    [TIME_DATA_INDEX]: (time) => <div style={{ textAlign: "center" }}><TimesLabel value={[time]}></TimesLabel></div>,
    [THREAT_LEVEL_DATA_INDEX]: (value) => <div style={{ textAlign: "center" }}>{value}</div>,
    [OPERATION_COL_KEY]: (taskId, record) => <div style={{ textAlign: "center" }}><Tag color='#108ee9' style={{ marginRight: "0px" }}><ReportLink data={record}></ReportLink></Tag>|<Tag color='#108ee9'><a onClick={() => exportReportByTaskId(record.taskId)}>下载</a></Tag></div>,
    [SAMPLE_DOWNLOAD_INDEX]: (sampleUrl, record) => <div style={{ textAlign: "center" }}><Tag color='#108ee9'><a href={getAuthURL(record.sampleUrl)} download>下载</a></Tag></div>
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
      dataIndexes: dataAllIndexes,
      titleConfig: dataIndexTextConfig,
      renderer,
      filtersTextConfig: {
        [FILE_TYPE_DATA_INDEX]: FILETYPE,
        [THREAT_TYPE_DATA_INDEX]: THREAT_TYPE,
        // [JUDGE_DATA_INDEX]: JUDGE_TEXT_TYPE

      },
      filtersConfig: {
        [FILE_TYPE_DATA_INDEX]: FILETYPE,
        [THREAT_TYPE_DATA_INDEX]: THREAT_TYPE,
        // [JUDGE_DATA_INDEX]: JUDGE_TYPE
      },
      filteredValue: {
        [FILE_TYPE_DATA_INDEX]: fileType,
        [THREAT_TYPE_DATA_INDEX]: threatType,
        // [JUDGE_DATA_INDEX]: judge
      },
      extraProps: {
        [FILE_NAME_DATA_INDEX]: FilterAction(FILE_NAME_SEARCH, changeFilename, fileName, searchFilename, filterDropdownName, downFile),

        [MD5_DATA_INDEX]: FilterAction(MD5_NAME_SEARCH, onInputChangeMD5, md5, onSearchMD5, filterDropdownMD5, downMD5),
        [KEY_INDEX]: { width: "50px" },
        [FILE_TYPE_DATA_INDEX]: { width: "120px" },
        // [JUDGE_DATA_INDEX]: { width: "120px" },
        [THREAT_TYPE_DATA_INDEX]: { width: "120px" },
        [TIME_DATA_INDEX]: { width: "150px" },
        [THREAT_LEVEL_DATA_INDEX]: { width: "100px" },
        [OPERATION_COL_KEY]: { width: "200px" },
        [SAMPLE_DOWNLOAD_INDEX]: { width: "80px" }
      }
    })
}
