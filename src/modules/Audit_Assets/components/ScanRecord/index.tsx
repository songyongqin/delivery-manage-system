import * as React from 'react'
import { Modal } from 'antd'
import { getColumns, getColumns_record } from './tableConfig'
import TableWithRemote from 'domainComponents/TableWithRemote'
import { ASSETS_CONFIG_NAMESPACE, ASSETS_RECORD_NAMESPACE, ASSETS_NEWRECORD_NAMESPACE } from 'constants/model'
import Card from 'domainComponents/Card'
import RecordDetail from '../RecordDetail/'

export default class LastEvent extends React.PureComponent<any, any>{
  constructor(props) {
    super(props)
    this.state = {
      detailVisible: false,
      scanTime: null,
      initialFilters: {
        page: 1,
        limit: 20,
      }
    }
  }
  showDetailModal = (scanTime) => {
    this.setState({
      detailVisible: true,
      scanTime
    });
  }
  handleCancel = (e) => {
    this.setState({
      detailVisible: false,
    });
  }
  render() {
    return (
      <div style={{ width: "90%", marginLeft: "5%" }}>
        <h3>当前扫描任务</h3>
        <TableWithRemote
          pagination={false}
          getColumns={getColumns}
          remoteNamespace={ASSETS_NEWRECORD_NAMESPACE}
          initialFilters={{
            ...this.state.initialFilters
          }}>
        </TableWithRemote>

        <h3 style={{ marginTop: "20px" }}>历史扫描记录</h3>
        <TableWithRemote
          getColumns={(option) => getColumns_record({
            ...option,
            showDetailModal: this.showDetailModal,
          })}
          remoteNamespace={ASSETS_RECORD_NAMESPACE}
          initialFilters={{
            ...this.state.initialFilters,
          }}>
        </TableWithRemote>
        <Modal
          width="80%"
          title="资产详情"
          visible={this.state.detailVisible}
          onCancel={this.handleCancel}
          footer={null}
        >
          <RecordDetail scanTime={this.state.scanTime}></RecordDetail>
        </Modal>
      </div>
    )
  }
}