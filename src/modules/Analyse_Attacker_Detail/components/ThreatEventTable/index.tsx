


import React from 'react'
import WithTable from 'components/WithTable'
import { Tag } from 'antd'
import tranformTime from 'utils/tranformTime'
import TableTime from 'components/TableTime'

let tranformColor = text => {
  if(text==='低危') return '#fccb00'
  if(text==='中危') return '#db3e00'
  else return '#b80000'
}

const thratColumns = [
  { title:'序号', 
    dataIndex:'index',
    render: ( text, record, index ) => <div>{ index +1 }</div>
  },
  { title:'首次发生时间', 
    dataIndex:'firstTime',
    render: text => <TableTime num={ text } />
  },
  { title:'最近发生时间', 
    dataIndex:'latelyTime',
    render: text => <TableTime num={ text } />
  },
  { title:'威胁行为', 
    dataIndex:'threatenBehavior'
  },
  { title:'详细描述', 
    dataIndex:'detailDescription'
  },
  { title:'事件类型', 
    dataIndex:'eventType'
  },
  { title:'受攻击资产IP', 
    dataIndex:'attackedAssetsIP'
  },
  { title:'事件归并次数', 
    dataIndex:'eventMergeCount'
  },
  { title:'资产状态', 
    dataIndex:'assetStates'
  },
  { title:'攻击阶段', 
    dataIndex:'attackStage'
  },
  { title:'威胁等级', 
    dataIndex:'level',
    render: text => <Tag color={ tranformColor(text) } >{text}</Tag>
  },

]



const ThreatEventTable = ({ tableData }) => {
  return <WithTable tableData={ tableData } config={ thratColumns } />
}


export default ThreatEventTable 




