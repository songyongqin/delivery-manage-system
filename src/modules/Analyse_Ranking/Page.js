import React from 'react';
import styles from './styles.css'
import classnames from 'classnames';
import { Menu, Button, Breadcrumb, Table, Icon, Row, Col, Card, Badge, Modal } from 'antd';
import { queryContainerGenerator } from '../../Generators/QueryContainerrGenerator/QueryContainerGenerator';
import JoSpin from '../../components/JoSpin/index';
import EnhanciveTable from '../../domainComponents/EnhanciveTable/index';
import * as tools from '../../utils/tools.js';
import {

  NAMESPACE,
} from './ConstConfig';

import JoIcon from '../../components/JoIcon';
import { Link } from 'dva/router';
import ThreatEvent from '../ThreatEvent/Page';
import { routerRedux } from 'dva/router';
import CountUp from 'react-countup';
import WithOnQuery from '../../Generators/QueryContainerDecorator/WithOnQuery';
import WithPageOnChange from '../../Generators/QueryContainerDecorator/WithPageOnChangeQuery';
import ReactEcharts from 'echarts-for-react';
import BarChart from 'domainComponents/BarChart'

const mapStateToProps = state => ({
  options: state[NAMESPACE].options,
  results: state[NAMESPACE].splitResults,
  loading: state[NAMESPACE].loading,
  optionLoading: state.loading.effects[`${NAMESPACE}/getRankingOption`]
})

const mapDispatchToProps = dispatch => ({
  querySplit: payload => dispatch({
    type: `${NAMESPACE}/querySplit`,
    payload
  })
})

@queryContainerGenerator({
  namespace: NAMESPACE,
  mapStateToProps,
  mapDispatchToProps

})
@WithOnQuery(NAMESPACE)
@WithPageOnChange(NAMESPACE)
class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      activeKey: null,
    }
  }
  switchModal = () => {
    this.setState({
      visible: !this.state.visible
    })
  }
  setActiveKey = (key) => {
    this.setState({
      activeKey: key,
    })
  }
  tableOnChange = (pagination, filters, sorter) => {
    this.props.onQuery({ ...filters, page: 1 })
  };
  timestampRangeOnChange = payload => {

    this.props.options.map(option => this.props.querySplit({
      ...payload,
      option
    }))

  }
  getQueryPanel = () => {
    const { routes, commonLayout } = this.props;
    const { queryFilters } = this.props[NAMESPACE];


    return (
      <div key="query-panel" style={{ marginTop: "15px" }}>
        {this.props.getContainerHeader({
          routes,
          queryFilters,
          onQuery: this.timestampRangeOnChange
        })}
      </div>
    )
  };
  getContentPanel = () => {
    const { routes, commonLayout, options, results, loading } = this.props;

    const { queryResults } = this.props[NAMESPACE];
    const { data: rankingListData } = queryResults;


    return (
      <div key="bar list">
        {
          options.map((i, index) => {
            return (
              <JoSpin key={`bar-chart-${index}`} spinning={loading[i]}>
                <BarChart data={results[i] || []} ></BarChart>
              </JoSpin>
            )
          })
        }
      </div>
    )
  }
  render = () => {

    return (
      <JoSpin spinning={this.props.optionLoading}>
        {this.props.animateRender([
          this.getQueryPanel(),
          this.getContentPanel(),
        ])}
      </JoSpin>
    )
  }
}

export default Page;
