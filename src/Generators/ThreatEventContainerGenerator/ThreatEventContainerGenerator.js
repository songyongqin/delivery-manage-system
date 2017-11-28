/**
 * Created by jojo on 2017/9/6.
 */
import React from 'react';
import { Menu, Button, Breadcrumb, Table, Icon, Row, Col, Card, Badge } from 'antd';
import { queryContainerGenerator } from '../QueryContainerrGenerator/QueryContainerGenerator';
import JoSpin from '../../components/JoSpin/index';
import EnhanciveTable from '../../domainComponents/EnhanciveTable/index';
import ThreatEventOperationPanel from '../../components/ThreatEventOperationPanel';
import { createMapDispatchWithPromise } from '../../utils/dvaExtraDispatch'
import * as tools from '../../utils/tools';
import WithOnQuery from '../QueryContainerDecorator/WithOnQuery';
import WithPageOnChange from '../QueryContainerDecorator/WithPageOnChangeQuery';
import { THREAT_TYPE_DATAINDEX, MAIN_NAMESPACE } from 'modules/ThreatEvent_ThreatInfo/ConstConfig'

const ENUM_THREAT_TYPE_DATA_INDEX = "threatType"

export default ({ tableConfig, formTextConfig, namespace }) => {
  const NAMESPACE = namespace;

  function mapStateToProps(state) {
    const { commonLayout } = state.layout;
    return {
      commonLayout,
      exportLoading: state.loading.effects[`${NAMESPACE}/post`],
      initFilters: state[NAMESPACE].initFilters,
      threatType: state[MAIN_NAMESPACE].queryResults[ENUM_THREAT_TYPE_DATA_INDEX] || {},
    }
  }

  function mapDispatchToProps(dispacth) {
    return {
      dispacth,
      post: (payload) => {
        return dispacth({
          type: `${NAMESPACE}/post`,
          payload: {
            ...payload
          }
        })
      }
    }
  }

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

      this.props.query({
        ...this.props[NAMESPACE].queryFilters,
        timestampRange: this.props.timestampRange,
        // value: null,
        ...this.props.initFilters,
        page: 1,
      })
    }
    onSelectChange = (payload) => {
      this.props.onQuery({ ...payload, page: 1 })
    }
    onExport = () => {
      this.props.post({ ...this.props[NAMESPACE].queryFilters }).then(result => {

        tools.download(result);
      })
    }
    getQueryPanel = () => {
      const { onQuery } = this.props;
      const { queryFilters } = this.props[NAMESPACE];
      const { commonLayout } = this.props;

      return <ThreatEventOperationPanel key="query-panel"
        handle={{
          onQuery,
          onSelectChange: this.onSelectChange,
          onExport: this.onExport
        }}
        loading={this.props.queryLoading}
        isDark={commonLayout.darkTheme}
        queryFilters={queryFilters}
        formTextConfig={formTextConfig} />
    };
    getResultsPanel = () => {
      return (
        <div key="results-panel">
          {this.getDataResultPanel()}
        </div>
      )
    };
    tableOnChange = (pagination, filters) => {
      this.props.query({
        ...this.props[NAMESPACE].queryFilters,
        timestampRange: this.props.timestampRange,
        ...filters,
        page: 1,
      })
    }
    getDataResultPanel = () => {

      const { commonLayout, pageOnChange, threatType } = this.props;
      const { queryResults, queryFilters, lastReqTime } = this.props[NAMESPACE];
      const { data } = queryResults;

      const filtersOption = {
        [THREAT_TYPE_DATAINDEX]: Object.keys(threatType),
      }

      const filterTextConfig = {
        [THREAT_TYPE_DATAINDEX]: threatType
      }

      const tableProps = {
        onChange: this.tableOnChange,
        columns: tableConfig.getColumns({ queryFilters, onQuery: this.props.onQuery, filtersOption, filterTextConfig }),
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
        <div key={"results-panel" + `${this.props.queryLoading}`}>
          <EnhanciveTable tableProps={tableProps}
            isDark={commonLayout.darkTheme}
            paginationProps={paginationProps} />
        </div>
      )
    };
    render = () => {

      const { queryLoading, exportLoading } = this.props;

      return (
        <div>
          <JoSpin spinning={queryLoading || exportLoading}>
            {this.getQueryPanel()}
            {this.getResultsPanel()}
          </JoSpin>

        </div>
      )
    }
  }
  return Page;
}






