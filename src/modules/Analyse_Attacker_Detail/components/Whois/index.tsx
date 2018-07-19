

import React from 'react'



const info = [
  { text:'域名', value:'domainName' },
  { text:'注册商', value:'registrar' },
  { text:'联系人', value:'linkMan' },
  { text:'联系邮箱', value:'linkEmail' },
  { text:'联系电话', value:'linkTel' },
  { text:'创建时间', value:'createdTime' },
  { text:'过期时间', value:'overTime' },
  { text:'公司', value:'company' },
  { text:'域名服务器', value:'domainServer' },
  { text:'状态', value:'state' },
]

const Whois = ({ data }) => {
  return (
    <div>
      {
        info.map((item, index) =>
      <div key={ index+'' } >
        <span>{ item.text + ': ' }</span>
        <span>{ data[item.value]  }</span>
      </div>)
      }
    </div>
  )
}

export default Whois