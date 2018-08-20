import * as React from 'react'
import TreeCharts from 'domainComponents/TreeCharts/async'

const NAME_DATA_INDEX = "name",
  RELATION_TYPE_DATA_INDEX = "relationtype",
  ROOT = "Root",
  CHILD = "ChildProcess"

export default (data = []) => {
  const finalData = [
    {
      ...(data.find(i => i[RELATION_TYPE_DATA_INDEX] === ROOT) || {}),
      children: data.filter(i => i[RELATION_TYPE_DATA_INDEX] === CHILD)
    }
  ]

  if (finalData.length === 0) {
    return <div></div>
  }

  return <TreeCharts data={finalData}></TreeCharts>
}