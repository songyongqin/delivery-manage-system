/**
 * Created by jojo on 2017/10/9.
 */
import CommonForm from '../CommonForm';
import React from 'react';
import {
  DNS_DATAINDEX,
  dnsTextConfig
} from '../../ConstConfig'



const ipReg=/((25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))$/

const dataIndexes=[
  DNS_DATAINDEX
];

const rulesConfig={
  [DNS_DATAINDEX]:[
    {
      required: true, message: "DNS不能为空",
    },
    {
      pattern:ipReg,
      message:"请输入正确的DNS"
    }
  ],

}


export default (props)=>{
  return <CommonForm {...props}
                     rulesConfig={rulesConfig}
                     dataIndexes={dataIndexes}
                     labelTextConfig={dnsTextConfig}/>
};
