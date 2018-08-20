import * as React from 'react'
import { connect } from 'dva'
import Tag from 'components/Tag'
import classnames from 'classnames'
import WithCommonProps from 'domainComponents/WithCommonProps'
import EnhancedTable from 'domainComponents/EnhancedTable'
import { createMapDispatchWithPromise } from 'utils/dvaExtraDispatch'
import * as TableConfig from './TableConfig'
import { Icon, Modal } from 'antd'
import DetectionSettingForm from 'modules/Detection/components/DetectionSettingForm'
@WithCommonProps
class Page extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      total: 0,
      limit: 10,
      page: 1,

      visible: false,
      detectionSetting: null,

      optionConfig: [],
      index_url: 0,
    }
  }
  pageChangeHandler = (page) => {
    this.setState({
      page
    })
  }

  sliceArray(array, size) {
    var result = [];
    for (var x = 0; x < Math.ceil(array.length / size); x++) {
      var start = x * size;
      var end = start + size;
      result.push(array.slice(start, end));
    }
    return result;
  }

  render() {

    const { data } = this.props;
    const minHeight = data.length;
    const tableProps = {
      scroll: { y: 420 },
      columns: TableConfig.getColumns({}),
      dataSource: data.map((i, index) => {
        return {
          ...i,
          key: `${index}`
        }
      }),
    }
    // const paginationProps = {
    //   total: total,
    //   current: page,
    //   onChange: this.pageChangeHandler,
    //   pageSize: limit,
    // };

    return (
      <div style={{ minHeight: `${minHeight}px`, color: "#A3B2C1" }}>
        <EnhancedTable
          tableProps={tableProps}
          pagination={false}
        >
        </EnhancedTable>
      </div>
    )
  }
}
export default Page;
