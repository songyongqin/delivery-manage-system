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