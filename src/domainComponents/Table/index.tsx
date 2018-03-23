import { Table, Pagination } from 'antd'
import * as React from 'react'
import classnames from 'classnames'
import { connect } from 'dva'
import Tag from 'components/Tag'
const styles = require("./styles.less")
import WithCommonProps from 'domainComponents/WithCommonProps'
import $ from 'jquery'
import 'jquery.nicescroll'

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
      title = null,
      tableProps = { className: "" },
      paginationProps = { total: 0, pageSize: 10 },
      pagination = true,
      theme
    } = this.props

    const expanded = "expandedRowRender" in tableProps && tableProps["expandedRowRender"]

    const classes = classnames({
      [styles[theme]]: true,
      [styles["table"]]: true,
      [tableProps.className]: tableProps.className,
      [styles["expandable-table"]]: expanded
    })

    const paginationClasses = classnames({
      [styles["pagination"]]: true,
      [styles[theme]]: true
    })

    return <div style={{ height: "100%", width: "100%" }} ref={target => this.target = target}>
      <Table
        pagination={false}
        size={"small"}
        {...tableProps}
        expandRowByClick={!!expanded}
        className={classes} />
      {
        pagination
          ?
          <Pagination style={{ marginTop: "15px" }}
            className={paginationClasses}
            showTotal={(total, range) => (
              <div className={paginationClasses}>
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


export default WithCommonProps(EnhancedTable)