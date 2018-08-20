import columnsCreator from 'utils/columnsCreator'
import { dataIndexes, dataIndexTextConfig } from '../../ConstConfig'
import OverflowTextWrapper from 'components/OverflowTextWrapper'
import ReportLink from 'domainComponents/ReportLink'
import { MD5_DATA_INDEX, FILE_NAME_DATA_INDEX, OPERATION_COL_KEY } from '../../ConstConfig'
import * as React from 'react'

const textItemRenderer = value => (
  <OverflowTextWrapper>{value}</OverflowTextWrapper>
)


export const getColumns = () => {
  return columnsCreator({
    dataIndexes,
    titleConfig: dataIndexTextConfig,
    renderer: {
      [MD5_DATA_INDEX]: textItemRenderer,
      [FILE_NAME_DATA_INDEX]: textItemRenderer,
      [OPERATION_COL_KEY]: (value, records) => {
        return <ReportLink data={records}></ReportLink>
      }
    },
  })
}
