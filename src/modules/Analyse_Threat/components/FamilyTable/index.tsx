

import React from 'react'
import WithTableConfig from 'domainComponents/WithTableConfig'
import path from 'constants/path'
import WithTable from 'components/WithTable'
import combineColumnsConfig from 'domainUtils/combineColumnsConfig'
import TimeTag from 'components/TimeTag'
import { ANALYSE_THREAT_FAMILY_DETAIL_URL } from 'routes/config/path'


interface props{
  tableData: Array<object>
  tableBeforeFetch: (any) => any
}


@WithTableConfig(path.layoutConfig.analyseThreatFamily)
class FamilyTable extends React.Component<props, any>{
  render(){

    let columns = [
      { title:'序号', 
        dataIndex:'index',
        render: ( text, record, index ) => <div>{ index }</div>
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