import * as React from 'react'
import columnsCreator from 'utils/columnsCreator'
import EnhancedTable from '../../EnhancedTable'
const  EXECVE_INDEX = 'execve',
  COMMAND_INDEX = 'command',
  ERROR_INDEX = 'error',
  // STATS_INDEX = 'stats',
  SUMMARY_INDEX = 'summary',
  TIME_INDEX = 'time',
  SECOND_INDEX = 'seconds',
  CALLS_INDEX = 'calls',
  SYSCALL_INDEX = 'syscall'

  const format = (num) => {
    // return (num.toFixed(2) + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')
   return num ===1 ? '失败' : '成功'
  }

const getExecveColumns = () => {
  return columnsCreator({
    dataIndexes: [COMMAND_INDEX, ERROR_INDEX],
    titleConfig: {
      [COMMAND_INDEX]: "命令",
      [ERROR_INDEX]: "执行状态"
    },
    renderer:{
      [ERROR_INDEX]: data => format(data)
    },
    extraProps: {
      [COMMAND_INDEX]: {
        width: "70%"
      },
      [ERROR_INDEX]: {
        width: "20%"
      }
    }
  })
}

const getSummaryColumns = () => {
  return columnsCreator({
    dataIndexes: [TIME_INDEX, SECOND_INDEX,CALLS_INDEX, SYSCALL_INDEX],
    titleConfig: {
      [TIME_INDEX]: "耗时占比(%)",
      [SECOND_INDEX]: "调用耗时(ms)",
      [CALLS_INDEX]: "调用次数",
      [SYSCALL_INDEX]: "调用函数"
    },
    extraProps: {
      [TIME_INDEX]: {
        width: "20%"
      },
      [SECOND_INDEX]: {
        width: "20%"
      },
      [CALLS_INDEX]: {
        width: "20%"
      },
      [SYSCALL_INDEX]: {
        width: "50%"
      }
    }
  })
}




const CommonTable = ({data = [], title, columns}) => {
  if (data.length === 0) {
    return <div></div>
  }
  return <div style={{ overflow: "hidden", maxHeight: "500px" }}>
    <EnhancedTable
      tableProps={{
        columns,
        scroll: { y: 420 },
        title: () => <div>{title}</div>,
        dataSource: data.map((i, index) => {
          return {
            ...i,
            key: `${index}-item`
          }
        })
      }}
      pagination={false}>
    </EnhancedTable>
  </div>

}

const arr = [
  { key:EXECVE_INDEX, title: '执行命令', columns: getExecveColumns() },
  { key:SUMMARY_INDEX, title: 'API调用概要', columns: getSummaryColumns() },
]


const NetPage = (obj={}) => {
  try{
    // return (
    //   <div>
    //     <CommonTable data={ obj['yara'] } title='yara检测' columns={ getExecveColumns() } />
    //   </div>)
    return (
      <div>
        {
          arr.map(i => <CommonTable key={ i.key } title={ i.title } columns={ i.columns } data={ obj[i.key] } /> )
        }
      </div>)
  }
  catch(e){
    return <div></div>
  }
}

export default NetPage