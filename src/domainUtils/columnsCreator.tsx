import * as React from 'react'
import { Icon } from 'antd'
import getKeyText from 'utils/getKeyText'
//基于antd的columns配置产出的一个方法 在产生较复杂的col时 可使用该方法

interface ColumnsCreatorParams {
  dataIndexes?: string[],
  titleConfig?: object,
  filtersTextConfig?: object,
  filtersConfig?: object,
  filteredValue?: object,
  renderer?: object,
  extraProps?: object
}

export default ({
  dataIndexes = [],
  titleConfig = {},
  filtersTextConfig = {},
  filtersConfig = {},
  filteredValue = {},
  renderer = {},
  extraProps = {}
}: ColumnsCreatorParams) => {

  return dataIndexes
    .map(key => {

      let column: any = {
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



