

import React from 'react'
import WithTableConfig from 'domainComponents/WithTableConfig'
import path from 'constants/path'
import WithTable from 'components/WithTable'
import combineColumnsConfig from 'domainUtils/combineColumnsConfig'
import TimeTag from 'components/TimeTag'
import { ANALYSE_THREAT_LOOPHOLE_DETAIL_URL } from 'routes/config/path'
import ResetIcon from 'components/ResetIcon'
import { setCache } from 'utils/cache'
const detailpng = require('../../../../public/static/icon/detail.png') 
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
      { title:'', 
        className: 'none',
        dataIndex:'actions', 
        render: (text,record,index) =>
          <div style={{ textAlign:'center' }}  >
          {/* 此处通过dva router里面的link路由跳转将会强制转换，但是通过a标签就可以执行 */}
            <a  href={ `/#${ANALYSE_THREAT_LOOPHOLE_DETAIL_URL}?loophole=${record.loophole}` }
                  style={{ cursor:'pointer', marginBottom:10, color:'#4F5DCA' }} onClick={ e => setCache('timestampRange', this.props.timestampRange ) } >
                    <img src={ detailpng } alt='查看' style={{ width:14, height:14 }} />
                  </a>
          </div>
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