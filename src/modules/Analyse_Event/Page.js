import React from 'react';
import styles from './styles.css'
import classnames from 'classnames';
import { Menu, Button, Breadcrumb, Table, Icon, Row, Col, Card, Badge } from 'antd';
import { queryContainerGenerator } from '../../Generators/QueryContainerrGenerator/QueryContainerGenerator';
import JoSpin from 'components/JoSpin';
import EnhanciveTable from 'domainComponents/EnhanciveTable';
import * as tools from 'utils/tools.js';
import * as tableConfig from './components/TableConfig';
import {
  statisticDataIndexes,
  statisticsTextConfig,
  tableTextConfig,
  haveDetailsDataIndexes,
  FALLHOST_DATAINDEX,
  NAMESPACE,
  EVENT_ACTION_DATA_INDEX,
  MAIN_NAMESPACE,
  ACTION_DATAINDEX
} from './ConstConfig';
import EventStatisticsPanel from "domainComponents/EventStatisticsPanel"
import JoIcon from '../../components/JoIcon';
import { Link } from 'dva/router';
import ThreatEvent from '../ThreatEvent/Page';
import { routerRedux } from 'dva/router';
import CountUp from 'react-countup';
import WithOnQuery from '../../Generators/QueryContainerDecorator/WithOnQuery';
import WithPageOnChange from '../../Generators/QueryContainerDecorator/WithPageOnChangeQuery';
import Modal from 'domainComponents/Modal'
import { connect } from 'dva'
import { WithAnimateRender } from 'components/HOSComponents'
import { WithCommonConnect, WithCommonTableHandle, WithModal,WithContainerHeader } from 'domainComponents/HOSComponents'

const mapStateToProps = state => {
  const { commonLayout } = state.layout;
  return {
    commonLayout,
    action: state[MAIN_NAMESPACE].queryResults[EVENT_ACTION_DATA_INDEX] || {},
  }
}

const THREAT_EVENT_MODAL = "threatEvent";


@WithContainerHeader
@WithCommonConnect(NAMESPACE)
@WithCommonTableHandle
@WithModal()
@WithAnimateRender
@connect(mapStateToProps)
class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: null,
    }
  }

  setActiveKey = (key) => {
    this.setState({
      activeKey: key,
    })
  }

  getDetailsItemOnClickHandle = key => () => {
    this.props.switchModal(THREAT_EVENT_MODAL)
    this.setState({
      activeKey: key
    })
  }

  timestampRangeOnChange = payload => this.props.onSearch(payload)

  getQueryPanel = () => {
    const { routes, filters } = this.props;
    return (
      <div key="query-panel" style={{ marginTop: "15px" }}>
        {this.props.getContainerHeader({
            routes,
            queryFilters:filters,
            onQuery: this.timestampRangeOnChange
          })}
      </div>
    )
  };
  getStatisticResultPanel = () => {

    const { commonLayout, results } = this.props

    return <EventStatisticsPanel
      isDark={commonLayout.darkTheme}
      data={results.statistics}
      getDetailsItemOnClickHandle={this.getDetailsItemOnClickHandle}
      key="statistics-panel">
    </EventStatisticsPanel>


  };
  onFilter = (value) => {
    this.props.query({
      ...this.props.filters,
      mergeCounts: value,
      page: 1
    })
  };
  getDataResultPanel = () => {
    const {
      pageOnChange,
      tableOnChange,
      action,
      lastQueryTime,
      commonLayout,
      results,
      filters
    } = this.props
    const { data, total } = results
    const { page, limit } = filters
    const isDark = commonLayout.darkTheme

    const filtersOption = {
      [ACTION_DATAINDEX]: Object.keys(action),
    }

    const filterTextConfig = {
      [ACTION_DATAINDEX]: action
    }


    const tableProps = {
      onChange: tableOnChange,
      columns: tableConfig.getColumns({
        queryFilters: filters,
        onSubmit: this.onFilter,
        filters: filtersOption,
        filterTextConfig
      }),
      expandedRowRender: tableConfig.getExpandedRowRender({ isDark }),
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
        <EnhanciveTable title={tableTextConfig.title}
          key={"table" + lastQueryTime}
          tableProps={tableProps}
          paginationProps={paginationProps} />
      </div>
    )
  };
  render = () => {

    const { filters, results, modalVisible } = this.props;
    const { visible, activeKey } = this.state;

    return (
      <div>
        <JoSpin spinning={this.props.queryLoading}>
          {this.props.animateRender([
            this.getQueryPanel(),
            this.getStatisticResultPanel(),
            this.getDataResultPanel(),
          ])}
        </JoSpin>
        <Modal width={"90%"}
          style={{ top: "80px" }}
          key={`${modalVisible[THREAT_EVENT_MODAL]}-modal-threat-event`}
          footer={null}
          visible={modalVisible[THREAT_EVENT_MODAL]}
          onCancel={this.props.createSwitchModal(THREAT_EVENT_MODAL)}>
          <ThreatEvent
            defaultActiveKey={activeKey}
            timestampRange={filters.timestampRange} />
        </Modal>
      </div>
    )
  }
}

export default Page;
