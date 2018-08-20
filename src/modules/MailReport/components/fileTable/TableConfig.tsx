import React from 'react'
import { Button, Icon, Input, Tag, Popover, Modal } from 'antd'
import columnsCreator from 'utils/columnsCreator'
import OverflowTextWrapper from 'components/OverflowTextWrapper'
import {
  fileText, fileIndex, OPERATE_INDEX, FILE_NAME_INDEX,
  MD5_INDEX,
  SIZE_INDEX,
  JUDGE_DATA_INDEX,
} from '../../ConstConfig'
import ReportLink from 'domainComponents/ReportLink'
import getAuthURL from 'utils/getAuthURL'
export const getColumns = ({ }) => {
  const format = (num) => {
    return (num.toFixed(2) + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')
  }
  const renderer = {
    [JUDGE_DATA_INDEX]: (value) => <div>{value == "1" ? "信任" : value == "-1" ? "恶意" : "未知"}</div>,
    [OPERATE_INDEX]: (taskId, record) => <div style={{ textAlign: "center" }}><Tag color='#108ee9'><ReportLink data={record}></ReportLink></Tag><Tag color='#108ee9'><a href={getAuthURL(record.downloadUrl)} download>样本下载</a></Tag></div>,
    [SIZE_INDEX]: data => {
      return format(data / 1024) + "KB"
    },
  }
  return columnsCreator(
    {
      dataIndexes: fileIndex,
      titleConfig: fileText,
      renderer,
      extraProps: {
        [FILE_NAME_INDEX]: {
          width: "30%"
        },
        [MD5_INDEX]: {
          width: "30%"
        },
        [SIZE_INDEX]: {
          width: "15%"
        },
        [JUDGE_DATA_INDEX]: {
          width: "15%"
        },
        [OPERATE_INDEX]: {
          width: "10%"
        }
      }
    })
}
