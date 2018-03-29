import * as React from 'react'
import Table from 'domainComponents/Table'
import { connect } from 'dva'
import extraConnect from 'domainUtils/extraConnect'
import Spin from 'domainComponents/Spin'
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
    initialFilters: {},
    initialData: [],
    initialTotal: 0,
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

    const { onChange } = this.props

    onChange && onChange(filters)

    this.setState({
      filters,
    })

    this.props.dispatch({
      type: `${this.props.remoteNamespace}/fetch`,
      payload: filters
    })
      .then(res => {
        this.setState({
          data: res.data,
          total: res.total
        })
      })
      .then(_ => {
        this.setState({
          loading: false
        })
      })
  }
  pageOnChange = current => {
    this.fetchData({
      ...this.state.filters,
      page: current
    })
  }
  tableOnChange = (_, filters) => {
    this.fetchData(filters)
  }
  render() {

    const { data, total, filters } = this.state
    const { theme, effectsLoading, remoteNamespace, getExpandedRowRenderer } = this.props
    const controlledLoading = "loading" in this.props
    const loading = controlledLoading ? this.props.loading : effectsLoading[`${remoteNamespace}/fetch`]


    return (
      <Spin spinning={loading}>
        <Table
          theme={theme}
          paginationProps={{
            total,
            onChange: this.pageOnChange,
            pageSize: filters.limit,
            current: filters.page,
          }}
          tableProps={{
            expandedRowRender: getExpandedRowRenderer && getExpandedRowRenderer({ filters, data, total }),
            columns: this.props.getColumns({
              fetchData: this.fetchData,
              filters
            }),
            dataSource: data.map((i, index) => {
              return {
                ...i,
                key: `${index}-item`
              }
            })
          }}>
        </Table>
      </Spin>
    )
  }
}

export default TableWithRemote