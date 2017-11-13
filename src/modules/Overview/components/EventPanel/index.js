import { WithCommonConnect, WithCommonTableHandle, WithModal, WithContainerHeader } from 'domainComponents/HOSComponents'
import EnhanciveTable from 'domainComponents/EnhanciveTable';
import * as tools from 'utils/tools.js';
import * as tableConfig from '../TableConfig';
import JoSpin from 'components/JoSpin'
import {
  tableTextConfig,
  EVENT_NAMESPACE,
  EVENT_ACTION_DATA_INDEX,
  MAIN_NAMESPACE,
  ACTION_DATAINDEX
} from '../../ConstConfig';
import { connect } from 'dva'
const { compose } = tools;

const mapStateToProps = state => {
  const { commonLayout } = state.layout;
  return {
    commonLayout,
    action: state[MAIN_NAMESPACE].queryResults[EVENT_ACTION_DATA_INDEX] || {},
  }
}


const EventPanel = ({
  pageOnChange,
  tableOnChange,
  action,
  lastQueryTime,
  commonLayout,
  results,
  filters,
  query,
  queryLoading,
}) => {


  const { data, total } = results
  const { page, limit } = filters
  const isDark = commonLayout.darkTheme

  const filtersOption = {
    [ACTION_DATAINDEX]: Object.keys(action),
  }

  const filterTextConfig = {
    [ACTION_DATAINDEX]: action
  }

  const onFilter = (value) => {
    query({
      ...filters,
      mergeCounts: value,
      page: 1
    })
  };

  const tableProps = {
    onChange: tableOnChange,
    columns: tableConfig.getColumns({
      queryFilters: filters,
      onSubmit: onFilter,
      filters: filtersOption,
      filterTextConfig
    }),
    dataSource: data.map((i, index) => {
      return {
        ...i,
        key: `item-${index}-${lastQueryTime}`
      }
    })
  };

  const paginationProps = {
    total: total,
    current: page,
    onChange: pageOnChange,
    pageSize: limit,
  };

  return (
    <div key={"results-panel"}>
      <JoSpin spinning={queryLoading}>
        <EnhanciveTable
          title={"最近紧急事件"}
          key={"table" + lastQueryTime}
          tableProps={tableProps}
          paginationProps={paginationProps} />
      </JoSpin>

    </div>
  )

}

export default compose(
  WithCommonConnect(EVENT_NAMESPACE),
  WithCommonTableHandle,
  connect(mapStateToProps)
)(EventPanel)