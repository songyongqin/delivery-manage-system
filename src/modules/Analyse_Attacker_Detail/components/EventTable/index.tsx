

import React from 'react'
import WithTable from 'components/WithTable'
import { ANALYSE_ATTACK_DETAIL_URL } from 'routes/config/path'
import { Tag } from 'antd'
import tranformTime from 'utils/tranformTime'
import TableTime from 'components/TableTime'
import LevelTag from 'components/LevelTag'

let tranformColor = text => {
  if(text==='低危') return '#fccb00'
  if(text==='中危') return '#db3e00'
  else return '#b80000'
}

let columns = [
  { title:'序号', 
    dataIndex:'serial',
    render: (text, record,index ) => <div>{index +1 }</div>
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
  { title:'威胁类型', 
    dataIndex:'eventType'
  },
  { title:'攻击者IP', 
    dataIndex:'attackerIP',
    render: text => <a href={ `#${ANALYSE_ATTACK_DETAIL_URL}?attackerIP=${text}` }
              style={{ textDecoration:'none', color:'#4F5DCA' }} >{text}</a>
  },
  { title:'事件次数', 
    dataIndex:'eventMergeCount'
  },
  { title:'资产状态', 
    dataIndex:'assetStates'
  },
  { title:'威胁等级', 
    dataIndex:'level',
    render: text => <LevelTag text={text} />
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