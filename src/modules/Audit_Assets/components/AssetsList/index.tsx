import * as React from 'react'
import { Button, Row, Col, Modal, message } from 'antd'
import TableWithRemote from 'domainComponents/TableWithRemote'
import { getColumns } from './tableConfig'
import { AUDIT_ASSETS_NAMESPACE } from 'constants/model'
import TimeLabel from 'domainComponents/TimeLabel'
import AssetsDetail from '../AssetsDetail'
import ConfigForm from '../configForm'
import EditForm from '../editForm'
const styles = require('./style.less')
import {
  LASTUPDATETIME,
  ASSETSCOUNT,
  NEWASSETS,
  ATTACKEDASSETS,
  PORTCOUNT,
  LOOPHOLE
} from '../../constants'
import extraConnect from 'domainUtils/extraConnect'

const dataItems = [
  {
    value: ASSETSCOUNT,
    text: "资产总数",
    color: "#46C83D",
  },
  {
    value: NEWASSETS,
    text: "新增资产",
    color: "orange",
  },
  {
    value: ATTACKEDASSETS,
    text: "受害资产",
    color: "purple",
  },
  {
    value: PORTCOUNT,
    text: "端口总数",
    color: "#1890ff",
  },
  {
    value: LOOPHOLE,
    text: "漏洞总数",
    color: "#CD0000",
  }
]
@extraConnect(
  state => {
    return {
      loading: state.loading.effects[`${AUDIT_ASSETS_NAMESPACE}/fetchAuditAssets`]
    }
  },
  dispatch => {
    return {
      fetchAuditAssets: payload => dispatch(
        {
          type: `${AUDIT_ASSETS_NAMESPACE}/fetchAuditAssets`,
          payload
        }
      ),
      fetchAuditConfig: payload => dispatch(
        {
          type: `${AUDIT_ASSETS_NAMESPACE}/fetchAuditConfig`,
          payload
        }
      ),
      fetchAuditEdit: payload => dispatch(
        {
          type: `${AUDIT_ASSETS_NAMESPACE}/fetchAuditEdit`,
          payload
        }
      ),
      getfetchAuditConfig: payload => dispatch(
        {
          type: `${AUDIT_ASSETS_NAMESPACE}/getfetchAuditConfig`,
          payload
        }
      )
    }
  }
)
export default class CommonItem extends React.Component<any, any>{
  constructor(props) {
    super(props)
    this.state = {
      initialFilters: {
        page: 1,
        limit: 20,
      },
      lastReqTime: 0,
      data: [],
      dataList: [],
      detailVisible: false,
      configVisible: false,
      editVisible: false,
      assetsIp: "",
      defaultConfig: {},
      activeIp: ""
    }
  }
  componentDidMount() {

    this.props.fetchAuditAssets().then(
      payload => this.setState({
        data: payload
      })
    )
    this.props.getfetchAuditConfig().then(res => this.setState({
      defaultConfig: res
    }))
  }
  showDetailModal = (ip) => {
    this.setState({
      detailVisible: true,
      activeIp: ip
    });
  }
  showEditModal = (assetsIp) => {

    this.setState({
      editVisible: true,
      assetsIp
    });
  }
  showConfigModal = () => {
    this.setState({
      configVisible: true,
    });
  }
  handleOk = (values) => {
    this.props.fetchAuditConfig(values).then(res => {
      message.success('提交成功！')
      this.setState({
        configVisible: false,
      })
    }
    )
  }
  edit_handleOk = (values) => {
    this.props.fetchAuditEdit(values).then(res => {
      message.success('保存成功！')
      this.setState({
        editVisible: false,
        lastReqTime: new Date().getTime()
      })
    }
    )
  }
  handleCancel = (e) => {
    this.setState({
      detailVisible: false,
      configVisible: false,
      editVisible: false
    });
  }
  render() {
    const { data, initialFilters } = this.state;

    return (
      <div>
        最后更新时间:&nbsp;&nbsp;{data[LASTUPDATETIME] != -1 ? <TimeLabel times={data[LASTUPDATETIME]}></TimeLabel> : "暂无更新"}
        <Button type="primary" style={{ float: "right" }} onClick={this.showConfigModal}>资产扫描配置</Button>
        <div style={{ clear: "both", marginTop: "20px" }}>
          <Row gutter={20}>
            {
              dataItems.map(i => <Col key={i.value} span={4} push={2}>
                <div className={styles["div-box"]} style={{ background: i.color }}>
                  {i.text}<br />
                  <span style={{ fontWeight: "bold" }}>{data[i.value]}</span>
                </div>
              </Col>
              )
            }
          </Row>
        </div>
        <div>
          <TableWithRemote
            key={`${this.state.lastReqTime}-table`}
            initialFilters={initialFilters}
            getColumns={(option) => getColumns({
              ...option,
              showDetailModal: this.showDetailModal,
              showEditModal: this.showEditModal
            })}
            remoteNamespace={AUDIT_ASSETS_NAMESPACE}>
            ></TableWithRemote>
          <Modal
            // destroyOnClose={true}
            title="资产扫描配置"
            visible={this.state.configVisible}
            onCancel={this.handleCancel}
            onOk={this.handleOk}
            footer={null}
          >
            <ConfigForm onOk={this.handleOk} defaultConfig={this.state.defaultConfig}></ConfigForm>
          </Modal>
          <Modal
            destroyOnClose={true}
            width="80%"
            title="资产详情"
            visible={this.state.detailVisible}
            onCancel={this.handleCancel}
            footer={null}
          >
            <AssetsDetail activeIp={this.state.activeIp}></AssetsDetail>
          </Modal>
          <Modal
            title="编辑资产信息"
            visible={this.state.editVisible}
            onCancel={this.handleCancel}
            onOk={this.edit_handleOk}
            footer={null}
          >
            <EditForm onOk={this.edit_handleOk} assetsIp={this.state.assetsIp}></EditForm>
          </Modal>

        </div>
      </div>
    )
  }
}