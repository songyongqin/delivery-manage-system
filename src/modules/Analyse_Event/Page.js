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
  ACTION_DATAINDEX,
  STATISTICS_NAMESPACE
} from './ConstConfig';
import EventStatisticsPanel from "./components/EventStatisticsPanel"
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
import { WithCommonConnect, WithCommonTableHandle, WithModal, WithContainerHeader } from 'domainComponents/HOSComponents'
const { compose } = tools;
import EventPanel from './components/EventPanel'

const mapStateToProps=state=>{

  return {
    eventFilters:state[NAMESPACE].filters,
    statisticsFilters:state[STATISTICS_NAMESPACE].filters,
  }
}

const mapDispatchToProps=dispatch=>(
  {
    queryStatistics:payload=>dispatch({
      type:`${NAMESPACE}/query`,
      payload,
    }),
    queryEvent:payload=>dispatch({
      type:`${STATISTICS_NAMESPACE}/query`,
      payload
    })
  }
)

const THREAT_EVENT_MODAL = "threatEvent";


@WithContainerHeader
@WithCommonConnect(NAMESPACE)
@WithModal()
@WithAnimateRender
@connect(mapStateToProps,mapDispatchToProps)
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

  timestampRangeOnChange = payload => {
    this.props.queryEvent({...this.props.eventFilters,...payload,page:1})
    this.props.queryStatistics({...payload})
  }

  getQueryPanel = () => {
    const { routes, filters } = this.props;
    return (
      <div key="query-panel" style={{ marginTop: "15px" }}>
        {this.props.getContainerHeader({
          routes,
          queryFilters: filters,
          onQuery: this.timestampRangeOnChange
        })}
      </div>
    )
  };
  getStatisticResultPanel = () => {

    const { isDark, results } = this.props
    return <EventStatisticsPanel
      getDetailsItemOnClickHandle={this.getDetailsItemOnClickHandle}
      key="statistics-panel">
    </EventStatisticsPanel>


  };
  getDataResultPanel = () => {

    return (
      <div key={"results-panel"}>
        <EventPanel></EventPanel>
      </div>
    )
  };
  render = () => {

    const { filters, results, modalVisible } = this.props;
    const { visible, activeKey } = this.state;

    return (
      <div>
        {this.props.animateRender([
          this.getQueryPanel(),
          this.getStatisticResultPanel(),
          this.getDataResultPanel(),
        ])}
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
