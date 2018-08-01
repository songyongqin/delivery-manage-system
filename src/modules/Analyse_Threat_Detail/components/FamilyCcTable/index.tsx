

import React from 'react'
import WithTable from 'components/WithTable'



interface props{
  tableData: Array<object>
}


class FamilyCcTable extends React.Component<props, any>{
  render(){
    // "c2": "string",
    // "threatFamily": "string",
    // "attackCount": "string"
    let columns = [
      { title:'序号', 
        dataIndex:'index',
        render: ( text, record, index ) => <div>{ index+1 }</div>
        },
      { title:'C&C', 
        dataIndex:'c2',
      },
      { title:'威胁家族', 
        dataIndex:'threatFamily',
      },
      { title:'攻击次数', 
        dataIndex:'attackCount',
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

export default FamilyCcTable