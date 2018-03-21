import * as React from 'react'
import Table from 'domainComponents/Table'
import { connect } from 'dva'
import extraConnect from 'domainUtils/extraConnect'
import Spin from 'domainComponents/Spin'
import { isFunction } from 'utils'

interface Fetch {
  (filters: object): Promise<object>
}

interface GetColumns {
  (...args): any[]
}

interface Option {
  getColumns: GetColumns,
  initialFilters: object,
  disabledLoading?: boolean,
  namespace: string,
  theme?: string,
}

interface CommonTableContainerCreator {
  (option: Option): any
}



const commonTableContainerCreator: CommonTableContainerCreator = ({
  getColumns,
  initialFilters,
  disabledLoading = false,
  namespace,
  theme,
}) => {

  const mapStateToProps = state => {
    return {
      loading: state.loading.effects[`${namespace}/fetch`]
    }
  }

  const mapDispatchToProps = dispatch => {
    return {
      fetch: payload => dispatch({
        type: `${namespace}/fetch`,
        payload
      })
    }
  }

  @extraConnect(mapStateToProps, mapDispatchToProps)
  class CommonTableContainer extends React.Component<any, any>{
    static defaultProps = {
      initialFilters
    }
    constructor(props) {
      super(props)
      this.state = {
        total: 0,
        data: [],
        filters: {
          ...initialFilters,
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
      this.props.fetch(filters)
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
    tableOnChange = () => {

    }
    render() {

      const { data, total, filters } = this.state
      const { loading } = this.props

      return (
        <Spin spinning={loading && !disabledLoading}>
          <Table
            theme={theme}
            paginationProps={{
              total,
              onChange: this.pageOnChange,
              pageSize: filters.limit,
              current: filters.page
            }}
            tableProps={{
              columns: getColumns({
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

  return CommonTableContainer

}

export default commonTableContainerCreator

