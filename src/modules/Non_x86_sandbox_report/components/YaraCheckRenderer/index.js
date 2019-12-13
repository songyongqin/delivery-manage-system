import * as React from 'react'
import columnsCreator from '../../../../utils/columnsCreator'
import EnhancedTable from '../../../../components/EnhancedTable'
const FAMILY_DATA_INDEX = "family",
  THREAT_NAME_DATA_INDEX = "threat_name",
  THREAT_TYPE_DATA_INDEX = "threat_type"

const getAvlColumns = () => {
  return columnsCreator({
    dataIndexes: [THREAT_TYPE_DATA_INDEX, THREAT_NAME_DATA_INDEX, FAMILY_DATA_INDEX],
    titleConfig: {
      [THREAT_TYPE_DATA_INDEX]: "威胁类型",
      [THREAT_NAME_DATA_INDEX]: "威胁名称",
      [FAMILY_DATA_INDEX]: "家族"
    },
    extraProps: {
      [THREAT_TYPE_DATA_INDEX]: {
        width: "30%"
      },
      [THREAT_NAME_DATA_INDEX]: {
        width: "40%"
      },
      [FAMILY_DATA_INDEX]: {
        width: "30%"
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
            key: `${index}-item`
          }
        })
      }}
      pagination={false}>
    </EnhancedTable>
  </div>

}