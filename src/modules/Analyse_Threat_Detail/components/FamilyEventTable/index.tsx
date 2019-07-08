

import React from 'react'
// import WithTableConfig from 'domainComponents/WithTableConfig'
// import path from 'constants/path'
import WithTable from 'components/WithTable'
// import combineColumnsConfig from 'domainUtils/combineColumnsConfig'
import TimeTag from 'components/TimeTag'
import {  ANALYSE_ATTACK_DETAIL_URL,
  ANALYSE_ATTACKED_ASSETS_DETAL_URL } from 'routes/config/path'
import LevelTag from 'components/LevelTag'

interface props{
  tableData: Array<object>
}


class FamilyEventTable extends React.Component<props, any>{
  render(){

    let columns = [
      { title:'序号', 
        dataIndex:'index',
        render: ( text, record, index ) => <div>{ index+1 }</div>
        },
      { title:'首次发生时间', 
        dataIndex:'firstTime',
        render: text => <TimeTag num={ text } />
      },
      { title:'最近发生时间', 
        dataIndex:'latelyTime',
        render: text => <TimeTag num={ text } />
      },
      { title:'威胁家族', 
        dataIndex:'threatFamily'
      },
      { title:'威胁行为', 
        dataIndex:'threatenBehavior', 
      },
      { title:'详细描述', 
        dataIndex:'detailDescription', 
      },
      { title:'事件次数',   
        dataIndex:'eventMergeCount', 
      },
      { title:'攻击者资产', 
        dataIndex:'attackerIP',
        render: text => <a href={ `#${ANALYSE_ATTACK_DETAIL_URL}?attackerIP=${text}` }
              style={{ textDecoration:'none', color:'#4F5DCA' }} >{text}</a>
      },
      { title:'受害资产IP', 
        dataIndex:'attatcedAssetIp',
        render: text => <a href={ `#${ANALYSE_ATTACKED_ASSETS_DETAL_URL}?attatcedAssetIp=${text}` }
              style={{ textDecoration:'none' }} >{text}</a> 
      },
      { title:'资产状态',   
        dataIndex:'assetStates', 
      },
      { title:'攻击阶段', 
        dataIndex:'attackStage', 
      },
      { title:'威胁等级', 
        dataIndex:'level', 
        render: text => <LevelTag text={ text } />
      }
    ]

    
    const { tableData} = this.props
    return(
      <div>
        <WithTable  tableData={ tableData }
                    config={ columns } />
      </div>
    )
  }
}

export default FamilyEventTable