import * as React from 'react'
import EnhancedTable from 'domainComponents/EnhancedTable'
import columnsCreator from 'utils/columnsCreator'
import { getKeyText } from 'utils'
import { Badge } from 'antd'
const ACTION_DATA_INDEX = "action",
  PATH_DATA_INDEX = "path",

  DELETE_ACTION = "Delete",
  ADD_ACTION = "Add"


const actionTextConfig = {
  [DELETE_ACTION]: <p style={{ margin: "0" }}> <Badge status="error"></Badge>删除 </p>,
  [ADD_ACTION]: <p style={{ margin: "0" }}> <Badge status="success"></Badge>新增 </p>
}

const getColumns = () => {
  return columnsCreator({
    dataIndexes: [ACTION_DATA_INDEX, PATH_DATA_INDEX],
    titleConfig: {
      [ACTION_DATA_INDEX]: "操作",
      [PATH_DATA_INDEX]: "文件路径"
    },
    renderer: {
      [ACTION_DATA_INDEX]: value => <span>{getKeyText(value, actionTextConfig)}</span>
    },
    extraProps: {
      [ACTION_DATA_INDEX]: {
        width: "100px"
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