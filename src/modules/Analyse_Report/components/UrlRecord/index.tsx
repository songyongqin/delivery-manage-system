
import * as React from 'react'
import { connect } from 'dva'
import { Select } from 'antd'
import Tag from 'components/Tag'
import classnames from 'classnames'
import WithCommonProps from 'domainComponents/WithCommonProps'
import EnhancedTable from 'domainComponents/EnhancedTable'
import { createMapDispatchWithPromise } from 'utils/dvaExtraDispatch'
import { NAMESPACE_URL, PAGE_SIZE_RANGE } from '../../ConstConfig'
import * as TableConfig from './TableConfig'
const Option = Select.Option;
const styles = require("./styles.less")
@WithCommonProps
class Page extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      filterDropdownUrl: false,
      filterDropdownMD5: false,
    }
  }
  pageChangeHandler = (page) => {
    this.props.toFetch({ page })
  }
  changeFilename = (e) => {
    this.props.toSave({ url: e.target.value })
  }
  searchFilename = () => {
    this.setState({ filterDropdownUrl: false });
    this.props.toFetch({})
  }
  onInputChangeMD5 = (e) => {
    this.props.toSave({ md5: e.target.value })
  }
  onSearchMD5 = () => {
    this.setState({ filterDropdownMD5: false });
    this.props.toFetch({});
  }
  downUrl = (visible) => {
    this.setState({
      filterDropdownUrl: visible,
    });
  }
  downMD5 = (visible) => {
    this.setState({
      filterDropdownMD5: visible,
    });
  }
  handleChange = (value) => {
    this.props.toSave({ limit: value });
    this.props.toFetch({});
  }
  render() {
    const { data, page, limit, judge, md5, url, threatType } = this.props;
    const { changeFilename, onInputChangeMD5, searchFilename, onSearchMD5, downUrl, downMD5 } = this;
    const { filterDropdownUrl, filterDropdownMD5, searchName, searchMD5, } = this.state;
    const tableProps = {
      onChange: (pagination, filters) => {
        const payload = {
          judge: filters.judge ? filters.judge : [],
          threatType: filters.threatType ? filters.threatType : [],
        }
        this.props.toSave(payload);
        this.props.toFetch({})
      },
      className: styles["titleCenter"],
      columns: TableConfig.getColumns({

        searchName,
        searchMD5,

        changeFilename,
        onInputChangeMD5,

        md5,
        url,

        searchFilename,
        onSearchMD5,

        filterDropdownUrl,
        filterDropdownMD5,

        downUrl,
        downMD5,

        page,
        limit,
        judge,
        threatType
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
      <div style={{ minHeight: "600px", color: "#A3B2C1" }}>

        <span>每页条数：</span>
        <Select defaultValue="30" style={{ width: "100px", margin: "15px" }} onChange={this.handleChange}>
          {
            PAGE_SIZE_RANGE.map((i, index) =>
              <Option value={i} key={i}>{i}</Option>)
          }
        </Select>
        <EnhancedTable
          tableProps={tableProps}
          paginationProps={paginationProps}>
        </EnhancedTable>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return state[NAMESPACE_URL]
}
const mapDispatchToProps = dispatch => {
  return {
    toFetch: payload => dispatch({
      type: `${NAMESPACE_URL}/fetch`,
      payload,
    }),
    toSave: payload => dispatch({
      type: `${NAMESPACE_URL}/save`,
      payload,
    }),
  }
}
export default connect(mapStateToProps, createMapDispatchWithPromise(mapDispatchToProps))(Page);
