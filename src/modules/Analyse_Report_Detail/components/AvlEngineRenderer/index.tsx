import * as React from 'react'
import columnsCreator from 'utils/columnsCreator'
import EnhancedTable from 'domainComponents/EnhancedTable'
const MD5_DATA_INDEX = "MD5",
  FILE_NAME_DATA_INDEX = "filename",
  THREAT_NAME_DATA_INDEX = "threatname"

const getAvlColumns = () => {
  return columnsCreator({
    dataIndexes: [FILE_NAME_DATA_INDEX, MD5_DATA_INDEX, THREAT_NAME_DATA_INDEX],
    titleConfig: {
      [MD5_DATA_INDEX]: "文件MD5",
      [FILE_NAME_DATA_INDEX]: "文件名",
      [THREAT_NAME_DATA_INDEX]: "病毒名"
    },
    extraProps: {
      [MD5_DATA_INDEX]: {
        width: "33%"
      },
      [FILE_NAME_DATA_INDEX]: {
        width: "33%"
      },
      [THREAT_NAME_DATA_INDEX]: {
        width: "33%"
      },
    }
  })
}

export default (data = []) => {
  if (data.length === 0) {
    return <div></div>
  }
  return <div style={{ maxHeight: "500px", overflow: "hidden" }}>
    <EnhancedTable
      tableProps={{
        columns: getAvlColumns(),
        scroll: { y: 420 },
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