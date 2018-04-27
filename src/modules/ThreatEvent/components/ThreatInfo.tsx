import { getThreatInfoColumns } from '../tableConfig'
import commonTableContainerCreator from 'domainUtils/commonTableContainerCreator'
import { THREAT_EVENT_THREAT_INFO_NAMESPACE } from 'constants/model'
import { LIGHT_THEME } from 'constants/theme'
import * as React from 'react'
import LimitSelect from 'domainComponents/LimitSelect'
import TableWithRemote from 'domainComponents/TableWithRemote'
import Spin from 'domainComponents/Spin'
import WithConfig from 'domainComponents/WithConfig'
import combineColumnsConfig from 'domainUtils/combineColumnsConfig'
import path from 'constants/path'
import { Button, Dropdown, Menu } from 'antd'
import extraConnect from 'domainUtils/extraConnect'
import momentToTimestampRange from 'domainUtils/momentToTimeStampRange'
import { download } from 'utils'

const initialFilters = {
  timestampRange: [],
  limit: 20,
  page: 1,
}

@extraConnect(
  state => {
    return {
      exportLoading: state.loading.effects[`${THREAT_EVENT_THREAT_INFO_NAMESPACE}/export`]
    }
  },
  dispatch => {
    return {
      export: payload => dispatch({
        type: `${THREAT_EVENT_THREAT_INFO_NAMESPACE}/export`,
        payload
      })
    }
  }
)
@WithConfig(path.layoutConfig.threatEventThreatInfo)
export default class extends React.Component<any, any>{
  static defaultProps = {
    initialFilters: {}
  }
  constructor(props) {
    super(props)
    this.state = {
      filters: {
        ...initialFilters,
        ...props.initialFilters
      },
      lastReqTime: 0
    }
  }
  limitOnChange = (filters) => {
    this.setState({
      filters: {
        ...this.state.filters,
        ...filters,
      },
      lastReqTime: new Date().getTime()
    })
  }
  onChange = (filters) => {
    this.setState({
      filters
    })
  }
  onExport = (payload) => {
    this.props.export({
      ...this.state.filters,
      timestampRange: momentToTimestampRange(this.state.filters.timestampRange),
      ...payload
    }).then(result => {
      download(result)
    })
  }
  render() {

    const menu = <Menu onClick={(e) => {
      this.onExport({ format: "xml" })
    }}>
      <Menu.Item key="xml">导出为XML</Menu.Item>
    </Menu>

    return (
      <div >
        <Spin spinning={this.props.exportLoading}>
          <div style={{ overflow: "hidden" }}>
            <div style={{ float: "left" }}>
              <LimitSelect
                defaultValue={this.state.filters}
                onChange={this.limitOnChange}>
              </LimitSelect>
            </div>
            <div style={{ float: "right" }}>
              <Dropdown.Button
                type="primary"
                onClick={() => {
                  this.onExport({ format: "json" })
                }}
                overlay={menu}>
                导出为JSON
            </Dropdown.Button>
            </div>
          </div>
          <TableWithRemote
            onChange={this.onChange}
            getColumns={options => {
              return combineColumnsConfig(getThreatInfoColumns(options), this.props.config.columns)
            }}
            remoteNamespace={THREAT_EVENT_THREAT_INFO_NAMESPACE}
            theme={LIGHT_THEME}
            initialFilters={{ ...this.state.filters, ...this.props.initialFilters }}
            key={`table-con-${this.state.lastReqTime}`}>
          </TableWithRemote>
        </Spin>
      </div>
    )
  }
}