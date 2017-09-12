/**
 * Created by jojo on 2017/9/5.
 */

import React from 'react';
import JoIcon from '../../components/JoIcon';
import {Icon} from "antd";

const MODIFY_PASSWORD_TITLE=<span><Icon type="edit"/>&nbsp;修改密码</span>

const CREATE_NOTIFICATION_MESSAGE="修改成功"

export const modifyPasswordTextConfig={
  title:MODIFY_PASSWORD_TITLE,
  notification:CREATE_NOTIFICATION_MESSAGE
}
