import * as React from 'react'
import Table from 'domainComponents/Table'
import { connect } from 'dva'
import extraConnect from 'domainUtils/extraConnect'
import Spin from 'domainComponents/Spin'
import WithTable from "components/WithTable"
import WithPagination from 'components/WithPagination'
// interface OnChange {
//   (filters: object): void
// }

// interface GetColumns {
//   (...args): any[]
// }

// interface Props {
//   initialFilters: object,
//   // onChange?:OnChange,
//   loading?: boolean,
//   remoteNamespace: string,
//   getColumns: GetColumns
// }

@extraConnect(
  state => {
    return {
      effectsLoading: state.loading.effects
    }
  },
  dispatch => {
    return {
      dispatch,
    }
  })
class TableWithRemote extends React.Component<any, any>{
  static defaultProps = {
    initialFilters: {
      limit: 10,
      page: 1,
    },
    initialData: [],
    initialTotal: 0,
    pagination: true,
    lastReqTime: 0,
    tableProps: {},
    stopFetchOnFiltersChange: false
  }
  constructor(props) {
    super(props)
    this.state = {
      total: props.initialTotal,
      data: props.initialData,
      filters: {
        ...props.initialFilters,
      }
    }
  }
  componentDidMount() {
    this.fetchData(this.state.filters)
  }
  fetchData = filters => {
    const { onChange, onDataChange, onFinal } = this.props

    filters['limit'] = this.state.filters.limit || 10

    onChange && onChange(filters)

    this.setState({
      filters,
    })

    this.props.dispatch({
      type: `${this.props.remoteNamespace}/fetch`,
      payload: filters
    })
      .then(res => {

        onDataChange && onDataChange(res)
        this.setState({
          data: res.data,
          total: res.total
        })
      })
      .then(_ => {

        this.setState({
          loading: false,
          lastReqTime: new Date().getTime()
        })

        onFinal && onFinal()
      })
  }
  pageOnChange = current => {
    this.fetchData({
      ...this.state.filters,
      page: current,
    })
  }
  tableOnChange = (_, filters, sorter) => {
    const obj = { ...sorter }
    if (obj['columnKey']) {
      obj[obj['columnKey']] = obj['order'] !== "descend"  //降序
      delete obj['columnKey']
      delete obj['column']
      delete obj['field']
      delete obj['order']
    }
    const { stopFetchOnFiltersChange, tableOnChange } = this.props
    tableOnChange && tableOnChange(filters)

    if (stopFetchOnFiltersChange) {
      return
    }


    this.fetchData({
      ...this.state.filters,
      ...filters,
      ...obj,
      page: 1
    })
  }
  render() {

    const { data, total, filters, lastReqTime, initialFilters } = this.state
    const {
      theme,
      effectsLoading,
      remoteNamespace,
      getExpandedRowRenderer,
      pagination,
      rowSelection,
      getKey,
      tableProps,
      getColumns
    } = this.props
    const controlledLoading = "loading" in this.props
    const loading = controlledLoading ? this.props.loading : effectsLoading[`${remoteNamespace}/fetch`]
    console.log(getColumns({
      fetchData: this.fetchData,
      filters,
      data
    }))
    const finalTableProps: any = {
      expandedRowRender: getExpandedRowRenderer && getExpandedRowRenderer({ filters, data, total }),
      columns: getColumns ? getColumns({
        fetchData: this.fetchData,
        filters,
        data
      }) : [],
      dataSource: data.map((i, index) => {
        return {
          key: getKey ? getKey(i, index) : `${index}-${lastReqTime}-item`,
          ...i
        }
      }),
      rowSelection,
      onChange: this.tableOnChange,
      filters: this.state.filters,
      ...tableProps
    }

    return (
      <Spin spinning={loading}>
        {/* <Table
          theme={theme}
          pagination={pagination}
          paginationProps={{
            total,
            onChange: this.pageOnChange,
            pageSize: filters.limit,
            current: filters.page,
          }}
          tableProps={finalTableProps}>
        </Table> */}
        <WithTable config={ getColumns({
                        // fetchData: this.fetchData,
                        filters,
                        data
                      }) }
                    tableData={ data.map((i, index) => {
                      return {
                        key: getKey ? getKey(i, index) : `${index}-${lastReqTime}-item`,
                        ...i
                      }
                    }) }
                    tableBeforeFetch={ this.fetchData } />
          <WithPagination current={ filters.page } total={ total } onChange={ this.pageOnChange  } limit={ filters.limit } />
      </Spin>
    )
  }
}

export default TableWithRemote