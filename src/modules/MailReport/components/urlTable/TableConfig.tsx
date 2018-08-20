import React from 'react'
import { Button, Icon, Input, Tag, Popover, Modal } from 'antd'
import columnsCreator from 'utils/columnsCreator'
import OverflowTextWrapper from 'components/OverflowTextWrapper'
import {
  urlText, urlIndex, OPERATE_INDEX, URL_INDEX,
  MD5_INDEX,
  JUDGE_DATA_INDEX,
} from '../../ConstConfig'
import ReportLink from 'domainComponents/ReportLink'
export const getColumns = ({ }) => {

  const renderer = {
    [JUDGE_DATA_INDEX]: (value) => <div>{value == "1" ? "信任" : value == "-1" ? "恶意" : "未知"}</div>,
    [OPERATE_INDEX]: (taskId, record) => <div style={{ textAlign: "center" }}><Tag color='#108ee9' style={{ marginRight: "0px" }}><ReportLink data={record}></ReportLink></Tag></div>,
  }
  return columnsCreator(
    {
      dataIndexes: urlIndex,
      titleConfig: urlText,
      renderer,
      extraProps: {
        [URL_INDEX]: {
          width: "35%"
        },
        [MD5_INDEX]: {
          width: "35%"
        },
        [JUDGE_DATA_INDEX]: {
          width: "15%"
        },
        [OPERATE_INDEX]: {
          width: "15%"
        }
      }
    })
}
