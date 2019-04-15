

import React from 'react'
import WithTableConfig from 'domainComponents/WithTableConfig'
import path from 'constants/path'
import WithTable from 'components/WithTable'
import combineColumnsConfig from 'domainUtils/combineColumnsConfig'
import TimeTag from 'components/TimeTag'
import { ANALYSE_THREAT_LOOPHOLE_DETAIL_URL } from 'routes/config/path'
import ResetIcon from 'components/ResetIcon'
import { setCache } from 'utils/cache'

interface props{
  tableData: Array<object>
  tableBeforeFetch: (any) => any
  reset: (any) => any
  timestampRange: Array<number>
}


@WithTableConfig(path.layoutConfig.analyseThreatLoophole)
class FamilyTable extends React.Component<props, any>{
  render(){

    let columns = [
      // { title: <ResetIcon onClick={ this.props.reset } />, 
      //   dataIndex:'index',
      //   render: ( text, record, index ) => <div>{ index+1 }</div>
      //   },
      { title:<ResetIcon onClick={ this.props.reset } >首次受攻击时间</ResetIcon >, 
        dataIndex:'firstTime',
        render: text => <TimeTag num={ text } />
      },
      { title:'最近发现时间', 
        dataIndex:'latelyTime',
        render: text => <TimeTag num={ text } />
      },
      { title:'攻击利用漏洞', 
        dataIndex:'loophole'
      },
      { title:'存在的漏洞类型', 
        dataIndex:'loopholeTypes', 
      },
      { title:'修补策略', 
        dataIndex:'repairStrategy', 
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
          {/* 此处通过dva router里面的link路由跳转将会强制转换，但是通过a标签就可以执行 */}
            <a  href={ `/#${ANALYSE_THREAT_LOOPHOLE_DETAIL_URL}?loophole=${record.loophole}` }
                  style={{ cursor:'pointer', marginBottom:10, color:'#4F5DCA' }} onClick={ e => setCache('timestampRange', this.props.timestampRange ) } >查看</a>
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