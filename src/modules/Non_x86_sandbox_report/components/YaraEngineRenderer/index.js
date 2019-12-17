import * as React from 'react'
import columnsCreator from 'utils/columnsCreator'
import EnhancedTable from '../EnhancedTable'
const MD5_DATA_INDEX = "MD5",
  FILE_NAME_DATA_INDEX = "filename",
  THREAT_NAME_DATA_INDEX = "threatname",
  THREAT_TYPE_DATA_INDEX = "threattype",
  META_DATA_INDEX = "meta"

const getAvlColumns = () => {
  return columnsCreator({
    dataIndexes: [FILE_NAME_DATA_INDEX, MD5_DATA_INDEX, THREAT_NAME_DATA_INDEX, THREAT_TYPE_DATA_INDEX],
    titleConfig: {
      [MD5_DATA_INDEX]: "文件MD5",
      [FILE_NAME_DATA_INDEX]: "文件名",
      [THREAT_NAME_DATA_INDEX]: "病毒名",
      [THREAT_TYPE_DATA_INDEX]: '病毒类型'
    },
    extraProps: {
      [MD5_DATA_INDEX]: {
        width: "30%"
      },
      [FILE_NAME_DATA_INDEX]: {
        width: "30%"
      },
      [THREAT_NAME_DATA_INDEX]: {
        width: "30%"
      },
      [THREAT_TYPE_DATA_INDEX]: {
        width: "10%"
      }
    }
  })
}

export default (data = []) => {
  if (data.length === 0) {
    return <div></div>
  }
  return <div style={{ overflow: "hidden", maxHeight: "500px" }}>
    <EnhancedTable
      tableProps={{
        columns: getAvlColumns(),
        scroll: { y: 420 },
        dataSource: data.map((i, index) => {
          return {
            ...i,
            ...i[META_DATA_INDEX],
            key: `${index}-item`
          }
        })
      }}
      pagination={false}>
    </EnhancedTable>
  </div>

}