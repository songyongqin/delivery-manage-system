

import React from 'react'
import WithTable from 'components/WithTable'
import { ANALYSE_ATTACK_DETAIL_URL } from 'routes/config/path'
import { Tag } from 'antd'
import tranformTime from 'utils/tranformTime'


let tranformColor = text => {
  if(text==='低危') return '#fccb00'
  if(text==='中危') return '#db3e00'
  else return '#b80000'
}

let columns = [
  { title:'序号', 
    dataIndex:'serial',
    render: (text, record,index ) => <div>{index}</div>
  },
  { title:'首次发生时间', 
    dataIndex:'firstTime',
    render: text => <Tag color={ '#1890ff' } >{tranformTime(text)}</Tag>
  },
  { title:'最近发生时间', 
    dataIndex:'latelyTime',
    render: text => <Tag color={ '#1890ff' } >{tranformTime(text)}</Tag>
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
  { title:'攻击者IP', 
    dataIndex:'attackerIP',
    render: text => <a href={ `#${ANALYSE_ATTACK_DETAIL_URL}?attackerIP=${text}` }
              style={{ textDecoration:'none' }} >{text}</a>
  },
  { title:'事件归并次数', 
    dataIndex:'eventMergeCount'
  },
  { title:'资产状态', 
    dataIndex:'assetStates'
  },
  { title:'威胁等级', 
    dataIndex:'level',
    render: text => <Tag color={ tranformColor(text) } >{text}</Tag>
  }
]

const EventTable = ({ data}) => {
  return (
    <div>
      <WithTable tableData={ data } config={ columns }  />
    </div>
  )
}

export default EventTable