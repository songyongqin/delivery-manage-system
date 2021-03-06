import { Table, Pagination } from 'antd'
import * as React from 'react'
import classnames from 'classnames'

import Tag from 'components/Tag'
const styles = require("./styles.less")
import WithCommonProps from 'domainComponents/WithCommonProps'
import $ from 'jquery'
import 'jquery.nicescroll'

class ExpandControlTable extends React.Component<any, any> {
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


class EnhancedTable extends React.Component<any, any>{
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

    const classes = classnames({
      [styles[theme]]: true,
      [styles["table"]]: true,
      [tableProps.className]: tableProps.className
    });


    const paginationClasses = classnames({
      [styles["pagination"]]: true,
      [styles[theme]]: true
    })

    // console.log(tableProps)
    return <div style={{ height: "100%", width: "100%" }} ref={target => this.target = target}>
      {
        expanded
          ?
          <ExpandControlTable
            {...tableProps}
            className={classes}
          />
          :
          <Table
            pagination={false}
            size={"small"}
            {...tableProps}

            className={classes} />
      }
      {
        pagination
          ?
          <Pagination style={{ marginTop: "15px" }}
            className={paginationClasses}
            showTotal={(total, range) => (
              // <div className={paginationClasses}>
              //   共找到&nbsp;
              //   <Tag color={"#108ee9"} >
              //     {paginationProps.total}
              //   </Tag>
              //   个结果
              // </div>
              <div>共找到<span className={ styles.total } >{total}</span>个结果</div>
            )}
            {...paginationProps} />
          : null
      }
    </div>
  }
}


export default WithCommonProps(EnhancedTable)