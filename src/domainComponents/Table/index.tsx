import { Table, Pagination, Icon } from 'antd'
import * as React from 'react'
import classnames from 'classnames'
import { connect } from 'dva'
import Tag from 'components/Tag'
const styles = require("./styles.less")
import WithCommonProps from 'domainComponents/WithCommonProps'
import $ from 'jquery'
import 'jquery.nicescroll'
import InputDropdown from './InputDropdown'
import { primaryColor } from 'themes/vars'
import { get } from 'utils'

const isFiltered = (filter) => {
  try {
    return filter.length !== 0
  } catch (e) {
    return false
  }
}

const extraColumns = (columns, {
  onFilterDropdownVisibleChange,
  filterDropdownVisibleList,
  filters,
  inputFilterOnChange
}) => {
  return columns.map(column => {
    if (column["conditionType"] === "input") {
      const dataIndex = column.dataIndex
      const visible = filterDropdownVisibleList.includes(dataIndex)

      return {
        ...column,
        filterDropdown: <InputDropdown
          dataIndex={dataIndex}
          onSubmit={filter => {
            onFilterDropdownVisibleChange(dataIndex, false)
            inputFilterOnChange(filter)
          }}
          type={get(column, ["inputRule", "type"]) || "any"}
          value={filters[dataIndex]}
          visible={visible}>
        </InputDropdown>,
        filterDropdownVisible: visible,
        filterIcon: isFiltered(filters[dataIndex])
          ?
          <Icon type="search" style={{ color: primaryColor }}></Icon>
          :
          <Icon type="search"></Icon>,
        onFilterDropdownVisibleChange: value => onFilterDropdownVisibleChange(dataIndex, value)
      }
    }
    return column
  })
}


const dataSource = [{
  key: '1',
  name: '胡彦斌',
  age: 32,
  address: '西湖区湖底公园1号'
}, {
  key: '2',
  name: '胡彦祖',
  age: 42,
  address: '西湖区湖底公园1号'
}];

const columns = [{
  title: '姓名',
  dataIndex: 'name',
  key: 'name',
}, {
  title: '年龄',
  dataIndex: 'age',
  key: 'age',
}, {
  title: '住址',
  dataIndex: 'address',
  key: 'address',
}];


class EnhancedTable extends React.Component<any, any>{
  constructor(props) {
    super(props)
    this.state = {
      filterDropdownVisibleList: []
    }
  }
  onFilterDropdownVisibleChange = (dataIndex, value) => {
    const { filterDropdownVisibleList } = this.state
    this.setState({
      filterDropdownVisibleList: value
        ?
        [...filterDropdownVisibleList, dataIndex]
        :
        filterDropdownVisibleList.filter(i => i !== dataIndex)
    })

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
  inputFilterOnChange = (filter) => {
    try {
      const { onChange, filters } = this.props.tableProps
      onChange && onChange({}, { ...filters, ...filter }, {})
    } catch (e) {

    }
  }
  render() {
    let {
      title = null,
      tableProps = { className: "", filters: {} },
      paginationProps = { total: 0, pageSize: 10 },
      pagination = true,
      theme
    } = this.props

    const expanded = "expandedRowRender" in tableProps && tableProps["expandedRowRender"]

    const classes = classnames({
      // [styles[theme]]: true,
      [styles["table"]]: true,
      [tableProps.className]: tableProps.className || false,
      [styles["expandable-table"]]: expanded
    })

    const paginationClasses = classnames({
      [styles["pagination"]]: true,
      [styles[theme]]: true
    })

    tableProps = {
      ...tableProps,
      columns: extraColumns(tableProps.columns,
        {
          onFilterDropdownVisibleChange: this.onFilterDropdownVisibleChange,
          filterDropdownVisibleList: this.state.filterDropdownVisibleList,
          filters: tableProps.filters,
          inputFilterOnChange: this.inputFilterOnChange
        }),
    }

    return (
      <div style={{ height: "100%", width: "100%" }} ref={target => this.target = target}>
        <Table
          pagination={false}
          {...tableProps}
          className={classes}
          expandRowByClick={!!expanded}
        />
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
    )
  }
}


export default WithCommonProps(EnhancedTable)