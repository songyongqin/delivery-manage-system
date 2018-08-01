

import React from 'react'
import WithTable from 'components/WithTable'



interface props{
  tableData: Array<object>
}


class LoopholeAssetsTable extends React.Component<props, any>{
  render(){

    let columns = [
      { title:'序号', 
        dataIndex:'index',
        render: ( text, record, index ) => <div>{ index+1 }</div>
        },
      { title:'受害资产IP', 
        dataIndex:'attackedAssetsIP',
      },
      { title:'资产状态', 
        dataIndex:'assetStates',
      },
      { title:'受攻击次数', 
        dataIndex:'attackedCount',
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

export default LoopholeAssetsTable