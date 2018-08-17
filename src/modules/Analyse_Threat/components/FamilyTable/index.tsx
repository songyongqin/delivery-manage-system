

import React from 'react'
import WithTableConfig from 'domainComponents/WithTableConfig'
import path from 'constants/path'
import WithTable from 'components/WithTable'
import combineColumnsConfig from 'domainUtils/combineColumnsConfig'
import TimeTag from 'components/TimeTag'
import { ANALYSE_THREAT_FAMILY_DETAIL_URL } from 'routes/config/path'
import WithPopover from 'components/WithPopover'
import OverflowTextWrapper from 'components/OverflowTextWrapper'
import ResetIcon from 'components/ResetIcon'

interface props{
  tableData: Array<object>
  tableBeforeFetch: (any) => any
  reset:(any) => any
}


@WithTableConfig(path.layoutConfig.analyseThreatFamily)
class FamilyTable extends React.Component<props, any>{
  render(){

    let columns = [
      { title:<ResetIcon onClick={ this.props.reset } /> , 
        dataIndex:'index',
        render: ( text, record, index ) => <div>{ index+1 }</div>
        },
      { title:'首次发现时间', 
        dataIndex:'firstTime',
        render: text => <TimeTag num={ text } />
      },
      { title:'最近发现时间', 
        dataIndex:'latelyTime',
        render: text => <TimeTag num={ text } />
      },
      { title:'威胁家族', 
        dataIndex:'threatFamily'
      },
      { title:'关联样本MD5', 
        dataIndex:'sampleMD5', 
      },
      { title:'威胁家族介绍', 
        dataIndex:'threatFamilyIntroduce',
        render: text => <WithPopover text={ text } style={{ maxWidth:300 }} />
        // render: text => <OverflowTextWrapper content={ text } >{text}</OverflowTextWrapper>
      },
      { title:'威胁事件次数',   
        dataIndex:'threatEventCount', 
      },
      { title:'受攻击资产数', 
        dataIndex:'attackedAssetsCount', 
      },
      { title:'关联C&C数', 
        dataIndex:'connectC2Count', 
      },
      { title:'详细信息', 
        dataIndex:'actions', 
        render: (text,record,index) =>
          <div style={{ textAlign:'center' }}  >
          
            <a  href={ `/#${ANALYSE_THREAT_FAMILY_DETAIL_URL}?threatFamily=${record.threatFamily}` }
                  style={{ cursor:'pointer', marginBottom:10, color:'#1890ff' }} >查看</a>
          </div>
      },
    ]

    let constants = this.props['config']['constants'] || { }
    
    const { tableData,  tableBeforeFetch } = this.props
    return(
      <div>
        <WithTable  tableData={ tableData }
                    constants={ constants }
                    config={ combineColumnsConfig(columns,this.props['config']['columns']) }
                    tableBeforeFetch={ tableBeforeFetch } />
      </div>
    )
  }
}

export default FamilyTable