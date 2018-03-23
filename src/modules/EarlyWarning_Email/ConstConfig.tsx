/**
 * Created by jojo on 2017/9/11.
 */
import * as React from 'react'
import { Icon } from "antd"

export const NAMESPACE = "earylyWarningEmail"

export const RECEIVE_EMAIL_CONFIG_TITLE = <span><Icon type="mail"></Icon> &nbsp; 接收告警邮箱配置</span>

export const SEND_CONFIG_TITLE = <span><Icon type="setting"></Icon> &nbsp;发送告警邮箱配置</span>

// export const level = [...commonLevel].reverse();

export const HIGH = "high",
  MIDDLE = "middle",
  LOW = "low",
  UN_KNOW = "unknow";


export const levelTextConfig = {
  [HIGH]: "高危",
  [MIDDLE]: "中危",
  [LOW]: "低危",
  // [UN_KNOW]: "未知"
};

export const level = Object.keys(levelTextConfig)


export const PUT_SUCCESS_MESSAGE = "修改成功";

export const textConfig = {
  title: {
    receive: RECEIVE_EMAIL_CONFIG_TITLE,
    sent: SEND_CONFIG_TITLE
  },
  form: {
    receive: {
      level: levelTextConfig,
    }
  },
  notification: PUT_SUCCESS_MESSAGE
}


export const formTextConfig = {
  receive: {
    open: {
      label: ""
    }
  }
}


