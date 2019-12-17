import * as React from 'react'
import { getKeyText } from 'utils/tools'
import { REG_KEY_ONLY_DATA_INDEX, REG_VALUE_ONLY_DATA_INDEX } from '../../ConstConfig'
import { primaryColor } from 'themes/vars'
import Tag from 'components/Tag'
import columnsCreator from 'utils/columnsCreator'
import EnhancedTable from 'domainComponents/EnhancedTable'
import OverflowTextWrapper from 'components/OverflowTextWrapper'

const CMD_LINE_DATA_INDEX = "cmdline",
  ACTION_DATA_INDEX = "action",
  CREATE_ACTION = "create",
  PID_DATA_INDEX = "pid",
  NAME_DATA_INDEX = "name"

const getColumns = () => {
  return columnsCreator({
    dataIndexes: [ACTION_DATA_INDEX, NAME_DATA_INDEX, PID_DATA_INDEX, CMD_LINE_DATA_INDEX],
    titleConfig: {
      [CMD_LINE_DATA_INDEX]: "命令行",
      [PID_DATA_INDEX]: "ID",
      [ACTION_DATA_INDEX]: "操作",
      [NAME_DATA_INDEX]: "进程名"
    },
    renderer: {
      // [CMD_LINE_DATA_INDEX]: value => <OverflowTextWrapper>{value}</OverflowTextWrapper>,
      // [NAME_DATA_INDEX]: value => <OverflowTextWrapper>{value}</OverflowTextWrapper>
    },
    extraProps: {
      [ACTION_DATA_INDEX]: {
        width: "120px"
      },
      [PID_DATA_INDEX]: {
        width: "100px"
      },
      [NAME_DATA_INDEX]: {
        width: "30%"
      }
    }
  })
}

export default (data = []) => {
  if (data.length === 0) {
    return <div></div>
  }
  return <div style={{ maxHeight: "500px", overflow: "hidden" }}>
    <EnhancedTable
      pagination={false}
      tableProps={{
        columns: getColumns(),
        scroll: { y: 420 },
        dataSource: data.map((i, index) => {
          return {
            ...i,
            key: `${index}`
          }
        })
      }}>
    </EnhancedTable>
  </div>
}