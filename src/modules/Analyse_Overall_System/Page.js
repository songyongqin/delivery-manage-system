import React from 'react';
import styles from './styles.css'
import { Menu, Button, Breadcrumb } from 'antd';
import classnames from 'classnames';
import { connect } from 'dva';
import { createMapDispatchWithPromise } from '../../utils/dvaExtraDispatch'
import {
  NAMESPACE,
  FILE_NAME_DATA_INDEX,
  MD5_DATA_INDEX,
  FAMILY_DATA_INDEX,
  EVENT_ACTION_DATA_INDEX,
  MAIN_NAMESPACE,
  ACTION_DATAINDEX,
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
// import QueryForm from '../../components/QueryForm'
import LimitForm from 'domainComponents/LimitForm'

const mapStateToProps = state => {
  const { commonLayout } = state.layout;
  return {
    isDark: commonLayout.darkTheme,
    timestampRange: state[ANALYSE_NAMESPACE].timestampRange,
    action: state[MAIN_NAMESPACE].queryResults[EVENT_ACTION_DATA_INDEX] || {}
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
  tableOnChange = (pagination, filters, sorter) => {
    this.props.onQuery({ ...filters, page: 1 })
  };
  onQuery = payload => this.props.onQuery({
    timestampRange: this.props.timestampRange,
    ...payload,
  })
  render = () => {

    const { isDark, queryLoading, action } = this.props;
    const { queryResults, queryFilters, lastReqTime } = this.props[NAMESPACE]
    const { data, total } = queryResults;

    const filters = {
      [ACTION_DATAINDEX]: Object.keys(action)
    }

    const filterTextConfig = {
      [ACTION_DATAINDEX]: action,
    }


    const tableProps = {
      onChange: this.tableOnChange,
      // expandedRowRender: expandedRowRender,
      columns: getColumns({ queryFilters, filters, filterTextConfig, onQuery: this.props.onQuery }),
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
            <LimitForm
              isDark={isDark}
              onSubmit={this.props.onQuery}
              defaultValue={queryFilters}
              loading={queryLoading}>
            </LimitForm>
          </div>
          <EnhanciveTable
            key={`${this.props.queryLoading}-table`}
            tableProps={tableProps}
            paginationProps={paginationProps}>
          </EnhanciveTable>
        </JoSpin>
      </div>
    )
  }
}

export default Page;
