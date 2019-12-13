import * as React from 'react'
import { Tag } from 'antd'
import columnsCreator from 'utils/columnsCreator'
import EnhancedTable from '../EnhancedTable'

const FEATURE_DATA_INDEX = "feature",
  TAGS_DATA_INDEX = "tags",
  TI_TYPE_DATA_INDEX = "ti_type",
  THREATNAME_DATA_INDEX = "threatname",
  ACCURACY_DATA_INDEX = "accuracy",
  THREAT_TYPE_DATA_INDEX = "threattype"

const getColumns = () => {
  return columnsCreator({
    dataIndexes: [FEATURE_DATA_INDEX, TI_TYPE_DATA_INDEX, THREAT_TYPE_DATA_INDEX, TAGS_DATA_INDEX, THREATNAME_DATA_INDEX, ACCURACY_DATA_INDEX],
    titleConfig: {
      [FEATURE_DATA_INDEX]: "情报特征",
      [TI_TYPE_DATA_INDEX]: "情报类型",
      [THREAT_TYPE_DATA_INDEX]: "威胁类型",
      [TAGS_DATA_INDEX]: "情报标签",
      [THREATNAME_DATA_INDEX]: "病毒名称",
      [ACCURACY_DATA_INDEX]: "准确度"
    },
    renderer: {
      [TAGS_DATA_INDEX]: value => {

        const color = "#108ee9";
        try {
          return <div>{value.map(i => <Tag>{i}</Tag>)}</div>

        } catch (e) {
          console.info(e);
        }
      },
      [THREAT_TYPE_DATA_INDEX]: value => {

        const color = "#108ee9";

        try {
          return <Tag color={color}>{value}</Tag>

        } catch (e) {
          console.info(e);
        }
      },
      [ACCURACY_DATA_INDEX]: value => value === 1 ? "精确" : value === 0 ? "一般" : null
    },
    extraProps: {
      [FEATURE_DATA_INDEX]: {
        width: "30%"
      },
      [TI_TYPE_DATA_INDEX]: {
        width: "10%"
      },
      [THREAT_TYPE_DATA_INDEX]: {
        width: "15%"
      },
      [TAGS_DATA_INDEX]: {
        width: "15%"
      },
      [THREATNAME_DATA_INDEX]: {
        width: "20%"
      },
      [ACCURACY_DATA_INDEX]: {
        width: "10%"
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