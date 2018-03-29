import * as React from 'react'
import TableWithRemote from 'domainComponents/TableWithRemote'
import extraConnect from 'domainUtils/extraConnect'
import MonitorSettingForm from '../MonitorSettingForm'
import Card from 'domainComponents/Card'
const styles = require('./styles.less')
import { Icon } from 'antd'
import { primaryColor } from 'themes/vars'
import { Choose, When, Otherwise } from 'components/ControlStatements'
import Spin from 'domainComponents/Spin'

const mapStateToProps = state => {
  return {
    effectsLoading: state.loading.effects
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch
  }
}


@extraConnect(mapStateToProps, mapDispatchToProps)
export default class Monitor extends React.Component<any, any>{
  constructor(props) {
    super(props)
    this.state = {
      lastReqTime: 0,
      config: {
        moduleList: {},
        period: 0,
      },
      loading: false
    }
  }
  componentDidMount() {
    this.fetchConfig()
  }
  onSubmit = config => {
    this.props.dispatch({
      type: `${this.props.remoteNamespace}/putConfig`,
      payload: config
    })
      .then(_ => {
        this.setState({
          lastReqTime: new Date().getTime()
        })
      })
  }
  fetchConfig = () => {
    this.setState({
      loading: true
    })

    this.props.dispatch({
      type: `${this.props.remoteNamespace}/fetchConfig`,
      payload: {
        type: this.props.initialFilters["type"]
      }
    })
      .then(res => {
        this.setState({
          config: res
        })
      })
      .then(_ => {
        this.setState({
          loading: false
        })
      })
  }
  render() {
    const { remoteNamespace, initialFilters, getColumns, effectsLoading } = this.props

    const { lastReqTime, config } = this.state

    const fetchLogLoading = effectsLoading[`${remoteNamespace}/fetch`]

    const fetchConfigLoading = effectsLoading[`${remoteNamespace}/fetchConfig`]

    const putConfigLoading = effectsLoading[`${remoteNamespace}/putConfig`]

    const modules = Object.keys(config["moduleList"])

    const moduleList = Object.entries(config["moduleList"]).filter(([key, value]) => value === 1).map(([key, value]) => key)

    const defaultValue = {
      ...config,
      moduleList,
      checkedAll: moduleList.length === modules.length && modules.length !== 0
    }

    return (
      <div className={styles["flex-wrap"]} style={{ padding: "10px" }}>
        <Card style={{ width: "300px" }}
          title={<div> <Icon type="setting" style={{ color: primaryColor }}></Icon> 自检周期与模块检测设置</div>}>
          <Choose>
            <When condition={fetchConfigLoading}>
              <Icon type="loading"></Icon>
            </When>
            <Otherwise>
              <Spin spinning={putConfigLoading}>
                <MonitorSettingForm
                  key={`${lastReqTime}-form`}
                  items={modules}
                  defaultValue={defaultValue}
                  onSubmit={this.onSubmit}
                  itemTextConfig={{}} />
              </Spin>
            </Otherwise>
          </Choose>
        </Card>
        <Card
          style={{ marginLeft: "15px", width: "calc(100% - 315px)" }}
          title={<div> <Icon type="file-text" style={{ color: primaryColor }}></Icon> 监控记录</div>}>
          <TableWithRemote
            key={`${lastReqTime}-monitor-log`}
            initialFilters={initialFilters}
            getColumns={getColumns}
            remoteNamespace={remoteNamespace}>
          </TableWithRemote>
        </Card>
      </div>
    )
  }
}