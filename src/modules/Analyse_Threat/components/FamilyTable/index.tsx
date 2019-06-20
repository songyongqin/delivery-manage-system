

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
import { setCache } from 'utils/cache'
const detailpng = require('../../../../public/static/icon/detail.png') 
interface props{
  tableData: Array<object>
  tableBeforeFetch: (any) => any
  reset:(any) => any
  timestampRange: Array<number>
}


@WithTableConfig(path.layoutConfig.analyseThreatFamily)
class FamilyTable extends React.Component<props, any>{

  // setStorage = timestampRange => {
  //   setCache('timestampRange', timestampRange )
  // }

  render(){
    // console.log(this.props.timestampRange)
    let columns = [
      { title:'', 
        dataIndex:'actions', 
        className: 'none',
        render: (text,record,index) =>
          <div style={{ textAlign:'center' }}  >
          
            <a  href={ `/#${ANALYSE_THREAT_FAMILY_DETAIL_URL}?threatFamily=${record.threatFamily}` }
                  style={{ cursor:'pointer', marginBottom:10, color:'#4F5DCA' }} onClick={ e => setCache('timestampRange', this.props.timestampRange ) } >
                    <img src={ detailpng } alt='查看' style={{ width:14, height:14 }} />
                  </a>
          </div>
      },
      { title:'威胁家族', 
        dataIndex:'threatFamily'
      },
      { title:'关联样本MD5', 
        dataIndex:'sampleMD5', 
      },
      { title:'威胁家族介绍', 
        dataIndex:'threatFamilyIntroduce',
        width:300,
        render: text => <WithPopover text={ text } style={{ maxWidth:300 }} />
        // render: text => <OverflowTextWrapper content={ text } >{text}</OverflowTextWrapper>
      },
      { title:'受攻击资产数', 
        dataIndex:'attackedAssetsCount', 
      },
      { title:'关联C&C数', 
        dataIndex:'connectC2Count', 
      },
      { title:'威胁事件次数',   
        dataIndex:'threatEventCount', 
      },
      { title:'首次发生时间',
        // title:<ResetIcon onClick={ this.props.reset } >首次发生时间</ResetIcon >, 
        dataIndex:'firstTime',
        render: text => <TimeTag num={ text } />
      },
      { title:'最近发生时间', 
        dataIndex:'latelyTime',
        render: text => <TimeTag num={ text } />
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