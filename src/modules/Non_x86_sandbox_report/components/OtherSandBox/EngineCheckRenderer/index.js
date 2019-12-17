import * as React from 'react'
import columnsCreator from 'utils/columnsCreator'
import EnhancedTable from '../../EnhancedTable'
const FAMILY_DATA_INDEX = "family",
  THREAT_NAME_DATA_INDEX = "threat_name",
  THREAT_TYPE_DATA_INDEX = "threat_type",
  YARA_INDEX = 'yara'

const getYaraColumns = () => {
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

const Common = ({data = [], title, columns}) => {
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
  { key: YARA_INDEX, title: 'yara检测', columns: getYaraColumns() }
]


const EnginePage = (obj={}) => {
  try{
    return (
      <div>
        {
          arr.map(i => <Common key={i.key} columns={ i.columns } data={ obj[i.key] } title={ i.title } /> )
        }
      </div>)
  }
  catch(e){
    return <div></div>
  }
}

export default EnginePage