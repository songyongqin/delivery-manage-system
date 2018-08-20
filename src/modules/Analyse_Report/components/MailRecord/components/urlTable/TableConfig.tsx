import React from 'react'
import { Button, Icon, Input, Tag, Popover, Modal } from 'antd'
import columnsCreator from 'utils/columnsCreator'
import OverflowTextWrapper from 'components/OverflowTextWrapper'
import DetectionSettingForm from '../../../../../Detection/components/DetectionSettingForm'
import {
  NAMESPACE_MAIL,
  FETCH_DETECTION_OPTION_ACTION,
  MAIL_REPORT_DATAINDEX,
  MAIL_STATIC_DATAINDEX,
  MAIL_KEY_INDEX,
  DYNAMIC_ANALYSIS,
  URLText,
  URLDate,
} from '../../../../ConstConfig'

export const getColumns = ({ page, limit, showModal }) => {

  const renderer = {
    [MAIL_KEY_INDEX]: (key) => (++key) + (page - 1) * limit,
    [MAIL_REPORT_DATAINDEX]: (taskId, record, index) =>
      <div>
        <Button type="primary" size="small" onClick={() => showModal(index)}>{DYNAMIC_ANALYSIS}</Button>
      </div>,
    [MAIL_STATIC_DATAINDEX]: (value) => <div>{value == "1" ? "信任" : value == "-1" ? "恶意" : "未知"}</div>,
  }
  return columnsCreator(
    {
      dataIndexes: URLDate,
      titleConfig: URLText,
      renderer,
    })
}
