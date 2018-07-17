

import React from 'react'
import WithTable from 'components/WithTable'

const transportFilter = [
  { text: 'TCP', value:'TCP' },
  { text: 'IP', value:'IP' },
]

const applicationFilter = [
  { text: 'HTTP', value:'HTTP' },
]

let constants = {
  filter:{
    transportLayerProtocol: transportFilter,
    applicationLayerProtocol: applicationFilter
  }
}

let columns = [
  { title:'序号', 
    dataIndex:'serial',
    render: (text, record,index ) => <div>{index}</div>
  },
  { title:'首次发生时间', 
    dataIndex:'firstTime'
  },
  { title:'最近发生时间', 
    dataIndex:'latelyTime'
  },
  { title:'C&C服务器IP', 
    dataIndex:'C2SeverIp'
  },
  { title:'攻击组织', 
    dataIndex:'attackGroup'
  },
  { title:'传输层协议', 
    dataIndex:'transportLayerProtocol',
    types:['filters']
  },
  { title:'应用层协议', 
    dataIndex:'applicationLayerProtocol',
    types:['filters']
  }
]

const CCTable = ({ data, tableChange }) => {
  return (
    <div>
      <WithTable tableData={ data } config={ columns } constants={ constants }
                  tableBeforeFetch={ tableChange } />
    </div>
  )
}

export default CCTable