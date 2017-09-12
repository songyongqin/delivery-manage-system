/**
 * Created by jojo on 2017/9/11.
 */
import JoIcon from '../../components/JoIcon';
import {Icon} from "antd";
import {level as commonLevel,levelTextConfig} from '../../configs/ConstConfig'
import referenceEmailJson from './referenceEmail.json';
export const NAMESPACE="earylyWarningEmailSent"

const RECEIVE_EMAIL_CONFIG_TITLE=<span><Icon type="mail"/>&nbsp;接受告警邮箱配置</span>;

const SENT_CONFIG_TITLE=<span><JoIcon type="setting"/>&nbsp;发送告警邮箱配置</span>;

export const level=[...commonLevel].reverse();

export const PUT_SUCCESS_MESSAGE="修改成功";

export const textConfig={
  title:{
    receive:RECEIVE_EMAIL_CONFIG_TITLE,
    sent:SENT_CONFIG_TITLE
  },
  form:{
    receive:{
      level:levelTextConfig
    }
  },
  notification:PUT_SUCCESS_MESSAGE
}


export const formTextConfig={
  receive:{
    open:{
      label:""
    }
  }
}


export const REFERENCE_EMAIL_TITLE="发送邮件服务器地址与端口填写参考";

const EMAIL_TYPE_DATAINDEXES="type",
      SNED_SERVER_DATAINDEXES="sendServer",
      SERVER_PORT_DATAINDEXES="port",
      SERVER_PORT_SSL_DATAINDEXES="sslPort";

const TIP="推荐您使用 SSL 加密连接，更加安全，使用时请注意加密端口是否已在您的本地电脑和网络中开放";

export const referTableDataIndexes=[
  EMAIL_TYPE_DATAINDEXES,
  SNED_SERVER_DATAINDEXES,
  SERVER_PORT_DATAINDEXES,
  SERVER_PORT_SSL_DATAINDEXES,
]

export const referenceEmailTextConfig={
  data:referenceEmailJson.data,
  title:{
    [EMAIL_TYPE_DATAINDEXES]:"邮箱",
    [SNED_SERVER_DATAINDEXES]:"发送服务地址",
    [SERVER_PORT_DATAINDEXES]:"服务器端口(非加密)",
    [SERVER_PORT_SSL_DATAINDEXES]:"服务器端口(SSL加密)"
  },
  tip:TIP,
  referenceEmailTitle:REFERENCE_EMAIL_TITLE
}
