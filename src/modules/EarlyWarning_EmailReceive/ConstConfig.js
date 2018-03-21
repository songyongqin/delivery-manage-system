/**
 * Created by jojo on 2017/9/11.
 */
import JoIcon from '../../components/JoIcon';
import {Icon} from "antd";
import {level as commonLevel,levelTextConfig} from '../../configs/ConstConfig'

export const NAMESPACE="earylyWarningEmailReceive"

export const level=[...commonLevel].reverse();

export const PUT_SUCCESS_MESSAGE="修改成功";

export const textConfig={
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


