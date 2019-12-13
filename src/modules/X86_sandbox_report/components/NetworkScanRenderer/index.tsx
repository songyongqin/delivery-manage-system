import * as React from 'react'
import EnhancedTable from 'domainComponents/EnhancedTable'
import columnsCreator from 'utils/columnsCreator'
import { getKeyText } from 'utils/tools'
import { Badge } from 'antd'
import { primaryColor } from 'themes/vars'

const PROTOCOL_DATA_INDEX = "protocol",
  NAME_DATA_INDEX = "name",
  THREAT_TYPE_DATA_INDEX = "threattype",
  KILL_CHAIN_DATA_INDEX = "killchain",
  FAMILY_DATA_INDEX = "family"



const getColumns = () => {
  return columnsCreator({
    dataIndexes: [NAME_DATA_INDEX, THREAT_TYPE_DATA_INDEX, PROTOCOL_DATA_INDEX, FAMILY_DATA_INDEX, KILL_CHAIN_DATA_INDEX],
    titleConfig: {
      [PROTOCOL_DATA_INDEX]: "协议类型",
      [NAME_DATA_INDEX]: "病毒名",
      [THREAT_TYPE_DATA_INDEX]: "恶意类型",
      [KILL_CHAIN_DATA_INDEX]: "杀伤链",
      [FAMILY_DATA_INDEX]: "家族"
    },
    // renderer: {
    //   [ACTION_DATA_INDEX]: value => <span>{getKeyText(value, actionTextConfig)}</span>
    // },
    extraProps: {
      [PROTOCOL_DATA_INDEX]: {
        width: "20%"
      },
      [NAME_DATA_INDEX]: {
        width: "20%"
      },
      [THREAT_TYPE_DATA_INDEX]: {
        width: "20%"
      },
      [KILL_CHAIN_DATA_INDEX]: {
        width: "20%"
      },
      [FAMILY_DATA_INDEX]: {
        width: "20%"
      }
    }
  })
}

export default ({ data = [], version = "" } = {}) => {
  if (data.length === 0) {
    return <div></div>
  }
  return (
    <div style={{ maxHeight: "500px", overflow: "hidden" }}>
      <h4 style={{ color: primaryColor, paddingLeft: "10px" }}>知识库版本号:{version}</h4>
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