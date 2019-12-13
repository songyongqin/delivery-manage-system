import * as React from 'react'
// import {
//   THREAT_TYPE_DATA_INDEX,
//   basicInfoDataIndexes,
//   basicPanelTextConfig,
//   SUMMARY_DATA_INDEX,
//   SUMMARY_DESCRIPTION,
//   SIZE_DATA_INDEX,
//   FILE_NAME_DATA_INDEX
// } from '../../ConstConfig'
import { Row, Col, Icon } from 'antd'
const styles = require("./styles.css")
import Tag from '../../Tagxt'
import OverflowTextWrapper from '../../OverflowTextWrapper'
import TimeLabel from '../../TimeLabelXt'

const format = (num) => {
  return (num.toFixed(2) + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')
}

const START_TIME_INDEX = 'start_time',
  END_TIME_INDEX = 'end_time',
  FILE_NAME_INDEX = 'file_name',
  FILE_SIZE_INDEX = 'file_size',
  FILE_TYPE_INDEX = 'file_type',
  SHA1_INDEX = 'sha1',
  SHA256_INDEX = 'sha256',
  MD5_INDEX = 'md5',
  SSDEEP_INDEX = 'ssdeep',
  CPU_INDEX = 'cpu',
  JUDGE_INDEX = 'judge',
  TAG_INDEX = 'tag',
  MAGIC_INDEX = 'magic'

const basicInfoDataIndexes = [
  START_TIME_INDEX,
  END_TIME_INDEX,
  FILE_NAME_INDEX,
  FILE_SIZE_INDEX,
  FILE_TYPE_INDEX,
  SHA1_INDEX,
  SHA256_INDEX,
  MD5_INDEX,
  SSDEEP_INDEX,
  MAGIC_INDEX,
  CPU_INDEX,
  JUDGE_INDEX,
  TAG_INDEX,

]

const basicPanelTextConfig = {
  [START_TIME_INDEX]: "开始分析时间:",
  [END_TIME_INDEX]: "结束分析时间:",
  [FILE_NAME_INDEX]: "文件名:",
  [FILE_SIZE_INDEX]: "文件大小:",
  [FILE_TYPE_INDEX]: "文件类型:",
  [SHA1_INDEX]: "SHA-1:",
  [SHA256_INDEX]: "SHA-256:",
  [MD5_INDEX]: "MD5:",
  [SSDEEP_INDEX]: "SSDeep:",
  [CPU_INDEX]: "CPU架构:",
  [JUDGE_INDEX]: "恶意判定:",
  [TAG_INDEX]: "标签:",
  [MAGIC_INDEX]: "Magic:"
}

const basicInfoGirdLayout = {
  xs: {
    span: 24
  },
  sm: {
    span: 24
  },
  md: {
    span: 24
  },
  lg: {
    span: 12
  },
  xl: {
    span: 12
  },
  xxl: {
    span: 12
  }
}


const keyRendererConfig = {
  [FILE_SIZE_INDEX]: data => {
    return format(data / 1024) + "KB"
  },
  [START_TIME_INDEX]: data => <div>{data && <TimeLabel value={data}></TimeLabel>}</div>,
  [END_TIME_INDEX]: data => <div>{data && <TimeLabel value={data}></TimeLabel>}</div>,
  [FILE_NAME_INDEX]: data => <OverflowTextWrapper style={{ paddingLeft: 15 }} >{data}</OverflowTextWrapper>,
  [JUDGE_INDEX]: data => <div>{data === 'threat' ? '威胁' : '未知'}</div>,
  [TAG_INDEX]: data => {
    return data.map((i, index) => {
      return (
        <Tag key={`${index}`}
        // color={primaryColor}
        >
          {i}
        </Tag>
      )
    })
  }
}


export default data => {

  return (
    <Row>
      <Col>
        <table className={styles["table"]}>
          <tbody>
            {
              basicInfoDataIndexes.map(key => {
                let content = data[key]
                return (
                  <tr key={key}>
                    <td >{basicPanelTextConfig[key]}</td>
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
      </Col>
    </Row>
  )
}
