

import React from 'react'
import WithTable from 'components/WithTable'
import { ANALYSE_ATTACK_DETAIL_URL } from 'routes/config/path'
import TimeTag from 'components/TimeTag'
import LevelTag from 'components/LevelTag'

let columns = [
  { title:'序号', 
    dataIndex:'serial',
    render: (text, record,index ) => <div>{index+1}</div>
  },
  { title:'首次发生时间', 
    dataIndex:'firstTime',
    render: text =>  <TimeTag num={ text } />
  },
  { title:'最近发生时间', 
    dataIndex:'latelyTime',
    render: text =>  <TimeTag num={ text } />
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
              style={{ textDecoration:'none' }} >{text}</a>
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