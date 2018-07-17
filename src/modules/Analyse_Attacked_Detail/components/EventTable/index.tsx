

import React from 'react'
import WithTable from 'components/WithTable'


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
    render: text => <a href={ `#/analyse/attack?attackerIP=${text}` }
              style={{ textDecoration:'none' }} >{text}</a>
  },
  { title:'事件归并次数', 
    dataIndex:'eventMergeCount'
  },
  { title:'资产状态', 
    dataIndex:'assetStates'
  },
  { title:'威胁等级', 
    dataIndex:'level'
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