import * as React from 'react'
import extraConnect from 'domainUtils/extraConnect'
import { SYSTEM_LOG_LOGIN_NAMESPACE } from 'constants/model'
import TableWithRemote from 'domainComponents/TableWithRemote'
import { getColumns } from './tableConfig'
import WithAnimateRender from 'components/WithAnimateRender'
import DateRangePicker from 'domainComponents/DateRangePicker'
import path from 'constants/path'
import WithConfig from 'domainComponents/WithConfig'
import combineColumnsConfig from 'domainUtils/combineColumnsConfig'
import { Button } from 'antd'
import { download } from 'utils'

const initialFilters = {
  timestampRange: [],
  userAccount: "",
  loginStatus: "",
  ip: "",
  page: 1,
  // limit: 50,
  limit: 20,
}


@extraConnect(
  state => {
    const effectsLoading = state.loading.effects
    return {
      exportLoading: effectsLoading[`${SYSTEM_LOG_LOGIN_NAMESPACE}/exportLoginLog`]
    }
  },
  dispatch => {
    return {
      exportLoginLog: payload => dispatch({
        type: `${SYSTEM_LOG_LOGIN_NAMESPACE}/exportLoginLog`,
        payload
      })
    }
  }

)
@WithConfig(path.layoutConfig.systemLogLogin)
@WithAnimateRender
export default class SystemLogLogin extends React.Component<any, any>{
  constructor(props) {
    super(props)
    this.state = {
      lastReqTime: 0,
      initialFilters,
      filters: initialFilters
    }
  }
  timestampRangeOnChange = (filters) => {
    this.setState({
      initialFilters: {
        ...this.state.initialFilters,
        ...filters
      },
      lastReqTime: new Date().getTime()
    })
  }
  onExportClick = () => {
    this.props.exportLoginLog(this.state.filters).then(res => {
      download(res)
    })
  }
  onChange = filters => {
    this.setState({
      filters
    })
  }
  render() {
    return (
      <div style={{ position: "relative" }}>
        <div style={{ float: "right", position: "absolute", right: "0", top: "-55px" }}>
          <DateRangePicker
            value={this.state.initialFilters.timestampRange}
            onChange={this.timestampRangeOnChange}>
          </DateRangePicker>
        </div>
        <div style={{ overflow: "hidden" }}>
          <Button
            loading={this.props.exportLoading}
            type="primary" style={{ float: "right", borderRadius: 5 }}
            onClick={this.onExportClick}>
            导出日志
          </Button>
        </div>
        {
          this.props.animateRender([
            <div key="table">
              <TableWithRemote
                onChange={this.onChange}
                initialFilters={this.state.initialFilters}
                key={`${this.state.lastReqTime}-table`}
                getColumns={option => {
                  return combineColumnsConfig(getColumns(option), this.props.config.columns)
                }}
                remoteNamespace={SYSTEM_LOG_LOGIN_NAMESPACE}>
              </TableWithRemote>
            </div>
          ])
        }
      </div>
    )
  }
}