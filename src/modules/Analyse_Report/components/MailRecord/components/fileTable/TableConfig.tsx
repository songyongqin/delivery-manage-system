import React from 'react'
import { Button, Icon, Input, Tag, Modal } from 'antd'
import columnsCreator from 'utils/columnsCreator'
import OverflowTextWrapper from 'components/OverflowTextWrapper'
import DetectionSettingForm from '../../../../../Detection/components/DetectionSettingForm'
import exportReportByTaskId from 'utils/exportReportByTaskId'
import {
  MAIL_REPORT_DATAINDEX,
  MAIL_STATIC_DATAINDEX,
  MAIL_KEY_INDEX,
  DYNAMIC_ANALYSIS,
  fileText,
  fileDate,
} from '../../../../ConstConfig'

export const getColumns = ({ page, limit,
  showModal }) => {

  const renderer = {
    [MAIL_KEY_INDEX]: (key) => (++key) + (page - 1) * limit,
    [MAIL_REPORT_DATAINDEX]: (taskId, record, index) =>
      <div>
        <Button type="primary" size="small" onClick={() => showModal(index)}>{DYNAMIC_ANALYSIS}</Button>
        |<Tag color='#108ee9'><a href={record.downloadUrl} download>下载</a></Tag>
      </div>,
    [MAIL_STATIC_DATAINDEX]: (value) => <div>{value == "1" ? "信任" : value == "-1" ? "恶意" : "未知"}</div>,
  }
  return columnsCreator(
    {
      dataIndexes: fileDate,
      titleConfig: fileText,
      renderer,
    })
}
