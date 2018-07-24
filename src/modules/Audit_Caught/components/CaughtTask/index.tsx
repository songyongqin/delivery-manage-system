import * as React from 'react'
import { Button, Row, Col, Modal, message } from 'antd'
import TableWithRemote from 'domainComponents/TableWithRemote'
import { getColumns } from './tableConfig'
import { AUDIT_CAUGHTTASK_NAMESPACE } from 'constants/model'
import TimeLabel from 'domainComponents/TimeLabel'
const styles = require('./style.less')

import extraConnect from 'domainUtils/extraConnect'
@extraConnect(
  state => {
    return {
      loading: state.loading.effects[`${AUDIT_CAUGHTTASK_NAMESPACE}/putCaughtTask`]
    }
  },
  dispatch => {
    return {
      fetch: payload => dispatch({
        type: `${AUDIT_CAUGHTTASK_NAMESPACE}/fetch`,
        payload
      }),
      putCaughtTask: payload => dispatch({
        type: `${AUDIT_CAUGHTTASK_NAMESPACE}/putCaughtTask`,
        payload
      }),
      delCaughtTask: payload => dispatch({
        type: `${AUDIT_CAUGHTTASK_NAMESPACE}/delCaughtTask`,
        payload
      })
    }
  }
)

export default class CommonItem extends React.Component<any, any>{
  constructor(props) {
    super(props)
    this.state = {
      initialFilters: {
        page: 1,
        limit: 15,
      },
      lastReqTime: 0,
      taskId: "",
      total: 0
    }
  }
  putTask = (id) => {

    this.props.putCaughtTask({ id }).then(
      res => {
        this.setState({ taskId: id })
        message.success("已取消任务！")
      }
    )
  }

  delTask = (id) => {

    this.props.delCaughtTask({ id }).then(
      res => {
        message.success("已删除任务！")
        this.props.fetch(this.state.initialFilters).then(
          res => this.setState({
            taskId: ""
          })
        )
      }
    )

  }
  render() {
    return (
      <div>
        <TableWithRemote
          key={`${this.state.lastReqTime}-table`}
          initialFilters={this.state.initialFilters}
          // onDataChange={(payload) => console.info({ total: payload.total })}
          getColumns={
            (option) => getColumns({
              ...option,
              putTask: this.putTask,
              delTask: this.delTask,
              taskId: this.state.taskId
            })
          }
          remoteNamespace={AUDIT_CAUGHTTASK_NAMESPACE}>
          ></TableWithRemote>

      </div>
    )
  }
}