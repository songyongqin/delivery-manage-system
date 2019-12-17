import { Table, Pagination } from 'antd'
import * as React from 'react'
import classnames from 'classnames'


import Tag from '../Tag'
const styles = require("./styles.css")
import $ from 'jquery'
import 'jquery.nicescroll'

class ExpandControlTable extends React.Component {
  state = {
    expandedRowKeys: []
  }
  constructor(props) {
    super(props)
  }
  onRowClick = record => {
    this.handleExpandedRowKeys(record.key)
  }
  onExpand = record => {
    this.handleExpandedRowKeys(record.key)
  }
  handleExpandedRowKeys = key => {

    const { expandedRowKeys } = this.state

    let keyIndex = expandedRowKeys.indexOf(key)

    if (keyIndex === -1) {
      return this.setState({
        expandedRowKeys: [...expandedRowKeys, key]
      })
    }

    this.setState({
      expandedRowKeys: [
        ...expandedRowKeys.slice(0, keyIndex),
        ...expandedRowKeys.slice(keyIndex + 1)]
    })
  }
  render() {
    return (
      <Table
        pagination={false}
        size={"small"}
        {...this.props}>
      </Table>
    )
  }
}


class EnhancedTable extends React.Component {
  constructor(props) {
    super(props)
  }
  target = null
  componentDidMount() {
    this.initNiceScroll()
  }
  componentWillUnmount() {
    this.removeNiceScroll()
  }
  componentDidUpdate() {
    this.resizeNiceScroll()
  }
  haveScroll = () => {
    const haveScroll = "scroll" in this.props.tableProps
    if (this.target && haveScroll) {
      return true
    }
    return false
  }
  resizeNiceScroll() {
    if (!this.haveScroll()) {
      return
    }
    $('.ant-table-body', this.target).getNiceScroll().resize()
  }
  removeNiceScroll() {
    if (!this.haveScroll()) {
      return
    }
    $('.ant-table-body', this.target).getNiceScroll().remove()
  }
  initNiceScroll = () => {

    if (!this.haveScroll()) {
      return
    }
    $('.ant-table-body', this.target).css({
      overflow: "hidden"
    })
    setTimeout(() => {
      $('.ant-table-body', this.target)
        .niceScroll({
          cursorborder: "",
          cursorcolor: "#cccccc",
          boxzoom: false,
          autohidemode: true
        })
    }, 1000)
  }
  render() {
    const {
      expanded = false,
      title = null,
      tableProps = { className: "" },
      paginationProps = { total: 0, pageSize: 10 },
      pagination = true,
      theme
    } = this.props


    return <div style={{ height: "100%", width: "100%" }} ref={target => this.target = target}>
      {
        expanded
          ?
          <ExpandControlTable
            {...tableProps}
          // className={classes}
          />
          :
          <Table
            pagination={false}
            size={"small"}
            {...tableProps}

          // className={classes} 
          />
      }
      {
        pagination
          ?
          <Pagination style={{ margin: "15px 8px 15px 8px", }}
            // className={paginationClasses}
            showTotal={(total, range) => (
              <div
              // className={paginationClasses}
              >
                共找到&nbsp;
                <Tag color={"#108ee9"} >
                  {paginationProps.total}
                </Tag>
                个结果
              </div>
            )}
            {...paginationProps} />
          : null
      }
    </div>
  }
}


export default EnhancedTable