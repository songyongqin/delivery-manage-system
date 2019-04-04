import * as React from 'react'
import { connect } from 'dva'
import { Select } from 'antd'

import WithCommonProps from 'domainComponents/WithCommonProps'
import EnhancedTable from 'domainComponents/EnhancedTable'
import { createMapDispatchWithPromise } from 'utils/dvaExtraDispatch'
import { NAMESPACE_FILE, FILETYPE, THREAT_TYPE, filterOption, PAGE_SIZE_RANGE } from '../../ConstConfig'
import * as TableConfig from './TableConfig'
const Option = Select.Option;
const styles = require("./styles.less")
@WithCommonProps
class Page extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      filterDropdownName: false,
      filterDropdownMD5: false,
    }
  }

  pageChangeHandler = (page) => {
    const { limit } = this.props;
    this.props.toFetch({ page, limit })
  }
  changeFilename = (e) => {
    this.props.toSave({ fileName: e.target.value })
  }
  searchFilename = () => {
    const { limit } = this.props;
    this.setState({ filterDropdownName: false });
    this.props.toFetch({ limit })
  }
  onInputChangeMD5 = (e) => {
    this.props.toSave({ md5: e.target.value })
  }
  onSearchMD5 = () => {
    const { limit } = this.props;
    this.setState({ filterDropdownMD5: false });
    this.props.toFetch({ limit });
  }
  downFile = (visible) => {
    this.setState({
      filterDropdownName: visible,
    });
  }
  downMD5 = (visible) => {
    this.setState({
      filterDropdownMD5: visible,
    });
  }
  handleChange = (value) => {
    this.props.toSave({ limit: value })
    this.props.toFetch({ limit: value });
  }
  render() {
    const { data, page, limit, fileType, threatType, judge, md5, fileName } = this.props;
    const { changeFilename, onInputChangeMD5, searchFilename, onSearchMD5, downFile, downMD5 } = this;
    const { filterDropdownName, filterDropdownMD5, searchName, searchMD5 } = this.state;
    const tableProps = {
      onChange: (pagination, filters) => {
        this.props.toSave(filters);
        this.props.toFetch({ limit })
      },
      className: styles["titleCenter"],
      columns: TableConfig.getColumns({

        searchName,
        searchMD5,

        changeFilename,
        onInputChangeMD5,

        md5,
        fileName,

        searchFilename,
        onSearchMD5,

        filterDropdownName,
        filterDropdownMD5,

        downFile,
        downMD5,

        page,
        limit,
        fileType,
        threatType,
        judge
      }),
      dataSource: data.map((i, index) => {
        return {
          ...i,
          key: `${index}`
        }
      }),
    }
    const paginationProps = {
      total: this.props.total,
      current: this.props.page,
      onChange: this.pageChangeHandler,
      pageSize: this.props.limit,
    };
    return (
      <div style={{ minHeight: "600px", color: "#A3B2C1" }} className={ styles.file } >

        {/* <span>每页条数：</span>
        <Select defaultValue="30" style={{ width: "100px", margin: "15px" }} onChange={this.handleChange}>
          {
            PAGE_SIZE_RANGE.map((i, index) =>
              <Option value={i} key={i}>{i}</Option>)
          }
        </Select> */}
        <EnhancedTable
          tableProps={tableProps}
          paginationProps={paginationProps}>
        </EnhancedTable>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return state[NAMESPACE_FILE]
}
const mapDispatchToProps = dispatch => {
  return {
    toFetch: payload => dispatch({
      type: `${NAMESPACE_FILE}/fetch`,
      payload,
    }),
    toSave: payload => dispatch({
      type: `${NAMESPACE_FILE}/save`,
      payload,
    }),
  }
}
export default connect(mapStateToProps, createMapDispatchWithPromise(mapDispatchToProps))(Page);
