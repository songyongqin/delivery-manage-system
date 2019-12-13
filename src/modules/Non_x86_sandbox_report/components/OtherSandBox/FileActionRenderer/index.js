import * as React from 'react'
import columnsCreator from 'utils/columnsCreator'
import EnhancedTable from '../../EnhancedTable'
const  CREATE_INDEX = 'create',
  FILE_MD5_INDEX = 'file_md5',
  FIlE_PATH_INDEX = 'file_path',
  OPEN_FAILED_INDEX = 'open_failed',
  ERROR_INDEX = 'error',
  FILE_INDEX = 'file',
  READ_INDEX = 'read',
  FILE_NAME_INDEX = 'file_name',
  FILE_SIZE_INDEX = 'file_size'

  const format = (num) => {
    return (num.toFixed(2) + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')
  }

const getCreateColumns = () => {
  return columnsCreator({
    dataIndexes: [FILE_MD5_INDEX, FILE_NAME_INDEX,FIlE_PATH_INDEX, FILE_SIZE_INDEX ],
    titleConfig: {
      [FILE_MD5_INDEX]: "文件MD5",
      [FILE_NAME_INDEX]: "文件名称",
      [FIlE_PATH_INDEX]: "文件路径",
      [FILE_SIZE_INDEX]: "文件大小"
    },
    renderer:{
      [FILE_SIZE_INDEX]: data => format(data / 1024) + "KB"
    },
    extraProps: {
      [FILE_MD5_INDEX]: {
        width: "30%"
      },
      [FILE_NAME_INDEX]: {
        width: "30%"
      },
      [FIlE_PATH_INDEX]: {
        width: "30%"
      },
      [FILE_SIZE_INDEX]: {
        width: "10%"
      }
    }
  })
}

const getOpenFailedColumns = () => {
  return columnsCreator({
    dataIndexes: [FILE_INDEX, ERROR_INDEX],
    titleConfig: {
      [FILE_INDEX]: "文件",
      [ERROR_INDEX]: "错误原因"
    },
    extraProps: {
      [FILE_INDEX]: {
        width: "30%"
      },
      [ERROR_INDEX]: {
        width: "50%"
      }
    }
  })
}

const getReadColumns = () => {
  return columnsCreator({
    dataIndexes: [FILE_NAME_INDEX, FILE_SIZE_INDEX],
    renderer:{
      [FILE_SIZE_INDEX]: data => format(data / 1024) + "KB"
    },
    titleConfig: {
      [FILE_NAME_INDEX]: "文件名称 ",
      [FILE_SIZE_INDEX]: "文件大小",
    },
    extraProps: {
      [FILE_NAME_INDEX]: {
        width: "50%"
      },
      [FILE_SIZE_INDEX]: {
        width: "30%"
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
  { key:CREATE_INDEX, title: '创建文件', columns: getCreateColumns() },
  { key:OPEN_FAILED_INDEX, title: '打开失败文件', columns: getOpenFailedColumns() },
  { key:READ_INDEX, title: '读取文件', columns: getReadColumns() },
]


const NetPage = (obj={}) => {
  try{
    // return (
    //   <div>
    //     <CommonTable data={ obj['yara'] } title='yara检测' columns={ getCreateColumns() } />
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