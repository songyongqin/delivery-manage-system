/**
 * Created by jojo on 2017/10/9.
 */
import CommonForm from '../CommonForm';
import React from 'react';
import {
  DNS_DATAINDEX,
  dnsTextConfig
} from '../../ConstConfig'

import { ipReg } from 'utils/tools'


const dataIndexes = [
  "ip"
];

const rulesConfig = {
  ip: [
    {
      required: true, message: "不能为空",
    },
    {
      pattern: ipReg,
      message: "请输入正确的IP"
    }
  ],

}


export default (props) => {
  return <CommonForm {...props}
    rulesConfig={rulesConfig}
    dataIndexes={dataIndexes}
    labelTextConfig={"IP"} />
};
