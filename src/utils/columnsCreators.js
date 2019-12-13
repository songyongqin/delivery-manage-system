import * as React from 'react'
import { Icon } from 'antd'
//基于antd的columns配置产出的一个方法 在产生较复杂的col时 可使用该方法
const getKeyText = (key, textConfig) => (key in textConfig ? textConfig[key] : key)

export default (
  {
    dataIndexes = [],
    titleConfig = {},
    filtersTextConfig = {},
    filtersConfig = {},
    filteredValue = {},
    renderer = {},
    extraProps = {}
  }
) => {

  return dataIndexes
    .map(key => {

      let column = {
        title: getKeyText(key, titleConfig),
        dataIndex: key
      }

      if (key in renderer) {
        column.render = renderer[key]
      }

      if (key in filtersConfig) {

        let targetTextConfig = filtersTextConfig[key] || {},
          targetFilters = filtersConfig[key] || []

        column.filters = targetFilters.map(f => (
          {
            text: getKeyText(f, targetTextConfig),
            value: f
          }
        ))

        column.filteredValue = filteredValue[key]
        column.filterIcon = <Icon type="filter" style={{ color: "#108ee9" }}></Icon>

      }

      if (key in extraProps) {
        column = {
          ...column,
          ...extraProps[key]
        }
      }

      return column
    })
}



