import React from 'react';
import classnames from 'classnames';
import { Menu, Button, Breadcrumb, Table, Icon, Row, Col, Card, Badge } from 'antd';
import QueryIPForm from './components/QueryIPForm';
import { queryContainerGenerator } from '../../Generators/QueryContainerrGenerator/QueryContainerGenerator';
import JoSpin from '../../components/JoSpin/index';
import EnhanciveTable from '../../domainComponents/EnhanciveTable/index';
import * as tableConfig from './components/TableConfig';
import { tableTextConfig } from './ConstConfig';
import {
  NAMESPACE,
  MAIN_NAMESPACE,
  EVENT_TYPE_DATA_INDEX,
  ATTACK_EVENT_TYPE_DATAINDEX,
  ATTACK_EVENT_TYPE_LIST_DATAINDEX
} from './ConstConfig'
import WithOnQuery from '../../Generators/QueryContainerDecorator/WithOnQuery';
import WithPageOnChange from '../../Generators/QueryContainerDecorator/WithPageOnChangeQuery';

function mapStateToProps(state) {
  const { commonLayout } = state.layout;
  return {
    commonLayout,
    eventTypeList: state[MAIN_NAMESPACE].queryResults[EVENT_TYPE_DATA_INDEX] || {}
  }
}

@queryContainerGenerator({
  namespace: NAMESPACE,
  mapStateToProps,
})
@WithOnQuery(NAMESPACE)
@WithPageOnChange(NAMESPACE)
class Page extends React.Component {
  constructor(props) {
    super(props);
  }
  tableOnChange = (pagination, filters, sorter) => {
    this.props.onQuery({ ...filters })
  };
  getQueryPanel = () => {
    const { onQuery, routes } = this.props;
    const { queryFilters, lastReqTime } = this.props[NAMESPACE];

    return (
      <div key={"query-panel"} style={{ margin: "15px 0" }}>
        {this.props.getContainerHeader({
          routes,
          queryFilters,
          onQuery,
        })}
        <div style={{ display: "inline-block", marginBottom: "10px" }}>
          <QueryIPForm key={"query-ip" + lastReqTime}
            onSubmit={onQuery}
            defaultValue={queryFilters} />
        </div>
      </div>
    )
  };
  getResultsPanel = () => {

    return (
      <div key="results-panel">
        {this.getDataResultPanel()}
      </div>
    )
  };
  onFilter = (value) => {
    this.props.onQuery({ attackCounts: value })
  };
  getDataResultPanel = () => {

    const { commonLayout, pageOnChange, eventTypeList } = this.props;
    const { queryResults, queryFilters, lastReqTime } = this.props[NAMESPACE];
    const { data } = queryResults;
    const isDark = commonLayout.darkTheme;

    const filters = {
      [ATTACK_EVENT_TYPE_LIST_DATAINDEX]: Object.keys(eventTypeList)
    }

    const filterTextConfig = {
      [ATTACK_EVENT_TYPE_LIST_DATAINDEX]: eventTypeList
    }
    const tableProps = {
      onChange: this.tableOnChange,
      columns: tableConfig.getColumns({
        queryFilters,
        onSubmit: this.onFilter,
        filters,
        filterTextConfig
      }),
      expandedRowRender: tableConfig.getExpandedRowRender({ isDark }),
      dataSource: data.map((i, index) => {
        return {
          ...i,
          key: `item-${index}-${lastReqTime}`
        }
      })
    };

    const paginationProps = {
      total: queryResults.total,
      current: queryFilters.page,
      onChange: pageOnChange,
      pageSize: queryFilters.limit,
    };

    return (
      <div key={"results-panel" + lastReqTime}>
        <EnhanciveTable title={tableTextConfig.title}
          tableProps={tableProps}
          isDark={isDark}
          paginationProps={paginationProps} />
      </div>
    )
  };
  render = () => {

    const pageClasses = classnames({
      // [styles["page"]]:true,
      // [styles["page-dark"]]:this.props.commonLayout.darkTheme
    });

    return (
      <div className={pageClasses}>
        <JoSpin spinning={this.props.queryLoading}>
          {this.props.animateRender([
            this.getQueryPanel(),
            this.getResultsPanel(),
          ])}
        </JoSpin>

      </div>
    )
  }
}

export default Page;
