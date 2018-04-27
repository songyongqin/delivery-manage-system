/*
该方法用于将 table 组件的两个 columns 配置合并在一起
*/

export default (beforeColumns, afterColumns) => {
  try {
    return beforeColumns.map(beforeColumn => {

      const { dataIndex } = beforeColumn

      const afterColumn = afterColumns.find(ac => ac.dataIndex === dataIndex)

      if (!afterColumn) {
        return beforeColumn
      }

      return {
        ...beforeColumn,
        ...afterColumn
      }
    })
  } catch (e) {
    console.error('combineColumnsConfig:', e)
    return beforeColumns
  }
}