import * as React from 'react'
import columnsCreator from 'utils/columnsCreator'
import EnhancedTable from '../EnhancedTable'

const DES = "description",
  LEVEL = "level"



const getColumns = () => {
  return columnsCreator({
    dataIndexes: [DES, LEVEL],
    titleConfig: {
      [DES]: "发现危险",
      [LEVEL]: "危险等级"
    },
    renderer: {
      [LEVEL]: value => {
        return <span style={{ color: "#ff4d4f" }}>{"★".repeat(value)}</span>
      }
    },
    extraProps: {
      [LEVEL]: {
        width: "50%",
      }
    }
  })
}

export default (data = []) => {
  if (data.length === 0) {
    return <div></div>
  }
  return (
    <div style={{ maxHeight: "500px", overflow: "hidden" }}>
      <EnhancedTable
        pagination={false}
        tableProps={{
          columns: getColumns(),
          scroll: { y: 420 },
          dataSource: data.map((i, index) => {
            return {
              ...i,
              key: `${index}-item`,
            }
          })
        }}>
      </EnhancedTable>
    </div>
  )
}