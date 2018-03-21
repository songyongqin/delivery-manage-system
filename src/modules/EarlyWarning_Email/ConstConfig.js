/**
 * Created by jojo on 2017/9/11.
 */
import JoIcon from '../../components/JoIcon';
import {Icon} from "antd";
import {level as commonLevel,levelTextConfig} from '../../configs/ConstConfig'

export const NAMESPACE="earylyWarningEmail"

export const RECEIVE_EMAIL_CONFIG_TITLE=<span><Icon type="mail"/>&nbsp;接收告警邮箱配置</span>;

export const SEND_CONFIG_TITLE=<span><JoIcon type="setting"/>&nbsp;发送告警邮箱配置</span>;

export const level=[...commonLevel].reverse();

export const PUT_SUCCESS_MESSAGE="修改成功";

export const textConfig={
  title:{
    receive:RECEIVE_EMAIL_CONFIG_TITLE,
    sent:SEND_CONFIG_TITLE
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


