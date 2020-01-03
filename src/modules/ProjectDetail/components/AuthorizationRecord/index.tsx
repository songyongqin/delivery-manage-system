import * as React from 'react'
import extraConnect from 'domainUtils/extraConnect'
import WithCommonProps from 'domainComponents/WithCommonProps'
import WithAnimateRender from 'components/WithAnimateRender'
const styles = require("./styles.less")
import { FILE_NAMESPACE } from 'constants/model'
import Spin from 'domainComponents/Spin'
import {Button} from 'antd'
import ComTable from 'components/ComTable'
import moment from 'moment'
import AuthorizationRecordUpd from '../AuthorizationRecordUpd'

const mapStateToProps = state => {
  return {
    state,
    loading: state.loading.effects[`${FILE_NAMESPACE}/fetchTable`] || state.loading.effects[`${FILE_NAMESPACE}/addFile`]
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchTable: payload => dispatch({
      type: `${FILE_NAMESPACE}/fetchTable`,
      payload
    }),
  }
}

@extraConnect(mapStateToProps, mapDispatchToProps)
@WithAnimateRender
@WithCommonProps
class Page extends React.Component<any, any> {

  state = {
    popVisible: false,
    updateData:{
      id: 0,
      lastDue: 0,
      authorizedTime: '',
      latestDueDate: 0,
      state: '',
      remarks: ''
    }
  }

  openPop = () => {
    this.setState({popVisible:true})
  }
  closePop = () => {
    this.setState({popVisible:false})
  }

  update = (text, record)=> {
    let updateData = {...this.state.updateData, ...record}
    this.setState({
      updateData
    },()=>{
      this.openPop()
    })
  }

  render() {
    const { loading, data } = this.props
    const dataSource = data.map((i,index) => {
      i.key = index + 1
      return i
    })
    const columns = [
      {
        title: '序号',
        dataIndex: 'key',
        align:'center',
        key:'key',
        sorter: (a, b) => a.key - b.key,
      },
      {
        title: '上次到期时间',
        dataIndex: 'lastDue',
        align:'center',
        key:'lastDue',
        render: (text, record) => 
          <span>{moment(record.lastDue).format("YYYY-MM-DD")}</span>
      },
      {
        title: '授权时长',
        dataIndex: 'authorizedTime',
        align:'center',
        key:'authorizedTime',
      },
      {
        title: '最新到期时间',
        dataIndex: 'latestDueDate',
        align:'center',
        key:'latestDueDate',
        render: (text, record) => 
          <span>{moment(record.latestDueDate).format("YYYY-MM-DD")}</span>
      },
      {
        title: '状态',
        dataIndex: 'state',
        align:'center',
        key:'state',
      },
      {
        title: '备注',
        dataIndex: 'remarks',
        align:'center',
        key:'remarks',
      },
      {
        title: '操作行为',
        dataIndex: 'operationBehavior',
        align:'center',
        key:'operationBehavior',
        render: (text, record) => 
          <Button style={{marginLeft:15}} type='primary' disabled={ this.props.state.domainUser.userData.role===3 } onClick={_ => this.update(text, record)}>
            修改文档
          </Button>
      },
    ]
    const {role} = this.props.state.domainUser.userData
    const {popVisible, updateData} = this.state
    return (
      <Spin spinning={ loading }>
        <div key="system">
          {
            dataSource.length === 0
            ?
            <span>等待文件上传</span>
            :
            <ComTable data = {dataSource} columns = {columns} />
          }
          <AuthorizationRecordUpd closePop = {this.closePop} pid={this.props.pid} id={this.props.id} data = {updateData} getTable={this.props.getTable} popVisible={popVisible} />
        </div>
      </Spin>
    )
  }
}
export default Page;
