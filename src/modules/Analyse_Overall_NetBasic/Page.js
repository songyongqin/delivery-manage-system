import React from 'react';
import styles from './styles.css'
import { Menu, Button, Breadcrumb } from 'antd';
import SelectForm from './components/SelectForm'
import classnames from 'classnames';
import { connect } from 'dva';
import { createMapDispatchWithPromise } from '../../utils/dvaExtraDispatch'
import {
  NAMESPACE, THREATJUDGE_DATA_INDEX, THREAT_TYPE_TEXT, THREAT_TYPE
} from './ConstConfig';
import {
  NAMESPACE as ANALYSE_NAMESPACE
} from '../Analyse_Overall/ConstConfig'
import { getColumns } from './components/TableConfig'
import EnhanciveTable from '../../domainComponents/EnhanciveTable'
import WithOnQuery from '../../Generators/QueryContainerDecorator/WithOnQuery';
import WithPageOnChange from '../../Generators/QueryContainerDecorator/WithPageOnChangeQuery';
import { queryContainerGenerator } from '../../Generators/QueryContainerrGenerator/QueryContainerGenerator';
import JoSpin from '../../components/JoSpin'

const mapStateToProps = state => {
  const { commonLayout } = state.layout;
  return {
    isDark: commonLayout.darkTheme,
    timestampRange: state[ANALYSE_NAMESPACE].timestampRange
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
    this.props.onQuery({ ...filters })
  };
  render = () => {

    const { isDark, queryLoading } = this.props;
    const { queryResults, queryFilters, lastReqTime } = this.props[NAMESPACE]
    const { data, total } = queryResults;
    const tableProps = {
      onChange: this.tableOnChange,
      columns: getColumns({ queryFilters, onQuery: this.props.onQuery }),
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
            <SelectForm key={`${lastReqTime}-form`}
              isDark={isDark}
              defaultValue={queryFilters}
              onSubmit={this.props.onQuery}></SelectForm>
          </div>
          <EnhanciveTable
            key={`${this.props.queryLoading}-table`}
            tableProps={tableProps}
            paginationProps={paginationProps}></EnhanciveTable>
        </JoSpin>
      </div>
    )
  }
}

export default Page;
