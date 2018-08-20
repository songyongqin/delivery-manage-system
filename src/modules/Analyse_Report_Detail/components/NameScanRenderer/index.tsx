import * as React from 'react'
import EnhancedTable from 'domainComponents/EnhancedTable'
import columnsCreator from 'utils/columnsCreator'
import { primaryColor } from 'themes/vars'


const FEATURE_TYPE = "featuretype",
  FEATURE = "feature",
  THREAT_TYPE = "threattype",
  JUDGE = "judge",
  DES = "description",
  THREAT_NAME = "threatname"


const dataIndexes = [FEATURE_TYPE, FEATURE, JUDGE, THREAT_TYPE, THREAT_NAME, DES]


const textConfig = {
  [FEATURE_TYPE]: "检出类型",
  [FEATURE]: "检出数据",
  [THREAT_TYPE]: "威胁类型",
  [THREAT_NAME]: "威胁名称",
  [JUDGE]: "恶意判定",
  [DES]: "威胁描述"
}

const getColumns = () => {
  return columnsCreator({
    dataIndexes,
    titleConfig: textConfig,
  })
}

export default ({ data = [], version = "" } = {}) => {
  if (data.length === 0) {
    return <div></div>
  }
  return <div>
    <h4 style={{ color: primaryColor, paddingLeft: "10px" }}>知识库版本号:{version}</h4>
    <EnhancedTable
      pagination={false}
      tableProps={{
        columns: getColumns(),
        // scroll: { y: 420 },
        dataSource: data.map((i, index) => {
          return {
            ...i,
            key: `${index}-item`
          }
        })
      }}>
    </EnhancedTable>

  </div>
}