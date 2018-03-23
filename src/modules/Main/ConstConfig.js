/**
 * Created by jojo on 2017/9/5.
 */

import React from 'react'
import { Icon } from "antd"
// export { EVENT_ACTION_DATA_INDEX, EVENT_TYPE_DATA_INDEX } from '../../configs/ConstConfig'
const MODIFY_PASSWORD_TITLE = <span><Icon type="edit" />&nbsp;修改密码</span>

const CREATE_NOTIFICATION_MESSAGE = "修改成功"

export const modifyPasswordTextConfig = {
  title: MODIFY_PASSWORD_TITLE,
  notification: CREATE_NOTIFICATION_MESSAGE
}

export const NAMESPACE = "main"