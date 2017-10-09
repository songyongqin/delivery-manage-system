/**
 * Created by jojo on 2017/9/8.
 */
import CommonForm from '../CommonForm';
import React from 'react';


import {
  ADAPTER_NAME_DATAINDEX,
  ADAPTER_MAC_DATAINDEX,
  ADAPTER_IP_DATAINDEX,
  ADAPTER_MAS_DATAINDEX,
  ADAPTER_GW_DATAINDEX,
  ADAPTER_STATUS_DATAINDEX,
  adapterTextConfig
} from '../../ConstConfig'


const gatewayReg=/^(?:(?:2[0-4][0-9]\.)|(?:25[0-5]\.)|(?:1[0-9][0-9]\.)|(?:[1-9][0-9]\.)|(?:[0-9]\.)){3}(?:(?:2[0-5][0-5])|(?:25[0-5])|(?:1[0-9][0-9])|(?:[1-9][0-9])|(?:[0-9]))$/

const ipReg=/((25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))/

const dataIndexes=[
  ADAPTER_IP_DATAINDEX,
  ADAPTER_MAS_DATAINDEX,
  ADAPTER_GW_DATAINDEX,
];

const rulesConfig={
  [ADAPTER_IP_DATAINDEX]:[
    {
      required: true, message: "IP不能为空",
    },
    {
      pattern:ipReg,
      message:"请输入正确的IP"
    }
  ],
  [ADAPTER_MAS_DATAINDEX]:[
    {
      required: true, message: "子网掩码不能为空",
    },
    {
      pattern:ipReg,
      message:"请输入正确的子网掩码"
    }
  ],
  [ADAPTER_GW_DATAINDEX]:[
    {
      required: true, message: "网关不能为空",
    },
    {
      pattern:gatewayReg,
      message:"请输入正确的网关"
    }
  ]
}


export default (props)=>{
  return <CommonForm {...props}
                     rulesConfig={rulesConfig}
                     dataIndexes={dataIndexes}
                     labelTextConfig={adapterTextConfig}/>
};
