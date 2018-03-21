import React from 'react';
import styles from './styles.css'
import { Menu, Button, Breadcrumb } from 'antd';
import classnames from 'classnames';
import { connect } from 'dva';
import { createMapDispatchWithPromise } from '../../utils/dvaExtraDispatch'
import {
  NAMESPACE,
  MAIN_NAMESPACE,
  ACTION_DATA_INDEX,
  EVENT_ACTION_DATA_INDEX,
  NET_TOOL_DATA_INDEX,
  TOOL_DATA_INDEX
} from './ConstConfig';
import {
  NAMESPACE as ANALYSE_NAMESPACE
} from '../Analyse_Overall/ConstConfig'
import { getColumns, expandedRowRender } from './components/TableConfig'
import EnhanciveTable from '../../domainComponents/EnhanciveTable'
import WithOnQuery from '../../Generators/QueryContainerDecorator/WithOnQuery';
import WithPageOnChange from '../../Generators/QueryContainerDecorator/WithPageOnChangeQuery';
import { queryContainerGenerator } from '../../Generators/QueryContainerrGenerator/QueryContainerGenerator';
import JoSpin from '../../components/JoSpin'
import QueryForm from './components/QueryForm'

const mapStateToProps = state => {
  const { commonLayout } = state.layout;
  return {
    isDark: commonLayout.darkTheme,
    timestampRange: state[ANALYSE_NAMESPACE].timestampRange,
    action: state[MAIN_NAMESPACE].queryResults[EVENT_ACTION_DATA_INDEX] || {},
    netTool: state[MAIN_NAMESPACE].queryResults[NET_TOOL_DATA_INDEX] || {}
  }
}

const mapDispatchToProps = dispatch => ({

})

@queryContainerGenerator({
  namespace: NAMESPACE,
  mapStateToProps,
  mapDispatchToProps: createMapDispatchWithPromise(mapDispatchToProps)
})
@WithOnQuery(NAMESPACE)
@WithPageOnChange(NAMESPACE)
class Page extends React.Component {
  constructor(props) {
    super(props);

  }
  componentDidMount = () => {
    // if (!this.props[NAMESPACE].isInit) {
    //   this.onQuery();
    // }
  }
  onQuery = payload => this.props.onQuery({
    timestampRange: this.props.timestampRange,
    ...payload,
  })
  tableOnChange = (pagination, filters, sorter) => {
    this.props.onQuery({ ...filters, page: 1 })
  };
  render = () => {

    const { isDark, queryLoading, action, netTool } = this.props;
    const { queryResults, queryFilters, lastReqTime } = this.props[NAMESPACE]
    const { data, total } = queryResults;

    const filters = {
      [ACTION_DATA_INDEX]: Object.keys(action),
      [TOOL_DATA_INDEX]: Object.keys(netTool)
    }

    const filterTextConfig = {
      [ACTION_DATA_INDEX]: action,
      [TOOL_DATA_INDEX]: netTool,
    }

    const tableProps = {
      onChange: this.tableOnChange,
      columns: getColumns({ queryFilters, filters, filterTextConfig, onQuery: this.props.onQuery }),
      expandedRowRender,
      dataSource: data.map((i, index) => ({
        ...i,
        key: `${lastReqTime}-${index}-item`
      }))
    }

    const paginationProps = {
      total: total,
      current: queryFilters.page,
      onChange: this.props.pageOnChange,
      pageSize: queryFilters.limit,
    };

    return (
      <div >
        <JoSpin spinning={queryLoading}>
          <div style={{ marginBottom: "15px" }}>
            <QueryForm
              isDark={isDark}
              defaultValue={queryFilters}
              loading={queryLoading}
              textConfig={{ placeholder: "端口搜索 如：8080" }}
              onSubmit={this.props.onQuery}>
            </QueryForm>
          </div>
          <EnhanciveTable
            key={`${queryLoading}-table`}
            tableProps={tableProps}
            paginationProps={paginationProps}>
          </EnhanciveTable>
        </JoSpin>
      </div>
    )
  }
}

export default Page;
