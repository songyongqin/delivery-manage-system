import React from 'react';
import styles from './styles.css'
import classnames from 'classnames';
import { Menu, Button,Breadcrumb,Table,Icon,Row,Col,Card,Badge } from 'antd';
import QueryForm from '../../components/TimestampForm';
import {queryContainerGenerator} from '../../utils/containerGenerator';
import JoSpin from '../../components/JoSpin/JoSpin';
import EnhanciveTable from '../../components/EnhanciveTable/EnhanciveTable';
import * as tools from '../../utils/tools.js';
import * as tableConfig from './components/TableConfig';
import {statisticDataIndexes,statisticsTextConfig,tableTextConfig} from './ConstConfig';
import {NAMESPACE} from './ConstConfig'

function mapStateToProps(state) {
  const {commonLayout}=state.layout;
  return {
    commonLayout,
  }
}

@queryContainerGenerator({
  namespace:NAMESPACE,
  mapStateToProps,
})
class Page extends React.Component{
  constructor(props) {
    super(props);
  }
  onQuery=(payload)=>{

    this.props.query({
      ...this.props[NAMESPACE].queryFilters||[],
      ...payload||{},
    });

  };
  pageOnChange=(current)=>{
    this.onQuery({page:current})
  };
  tableOnChange=(pagination, filters, sorter)=>{
    this.onQuery({...filters})
  };
  getQueryPanel=()=>{

    const {queryFilters}=this.props[NAMESPACE];

    return (
      <div key="query-panel" style={{margin:"15px 0"}}>
        <QueryForm defaultValue={queryFilters}
                   onSubmit={this.onQuery}/>
      </div>
    )
  };
  getResultsPanel=()=>{


    return (
      <div key="results-panel">
        {this.getStatisticResultPanel()}
        {this.getDataResultPanel()}
      </div>
    )
  };
  getStatisticResultPanel=()=>{

    const {commonLayout}=this.props,
          {statistics}=this.props[NAMESPACE].queryResults,
          {title,units,items,icons}=statisticsTextConfig;

    const listClasses=classnames({
      [styles["statistic-list"]]:true,
      [styles["statistic-list-dark"]]:commonLayout.darkTheme
    });

    const itemClasses=classnames({
      [styles["statistic-item"]]:true,
      ["shadow-hover"]:true,
    });

    const titleClasses=classnames({
      ["secondary-title"]:true,
      ["secondary-title-dark"]:commonLayout.darkTheme,
    });

    const spanConfig={lg:{span:4},md:{span:8},sm:{span:12},xs:{span:24}};


    return (
      <div>
        <h2 className={titleClasses}>{title}</h2>
        <Row type="flex"
             justify="space-between"
             className={listClasses}>
          {statisticDataIndexes.map(k=>{

            let titleClasses=classnames({
              ["txt-color-dark"]:commonLayout.darkTheme,
              [styles["title"]]:true,
            });

            return (
              <Col {...spanConfig}
                   key={'item-'+k}
                   className={styles["statistic-item-wrapper"]}>
                <div className={itemClasses}>
                    <span className={styles["statistic-item-icon"]}>
                      {icons[k]}
                    </span>
                    <p className={styles["counts"]}>
                      {statistics[k]}{units[k]}
                    </p>
                    <h3 className={titleClasses}>
                      {tools.getKeyText(k,items)}
                    </h3>
                </div>
              </Col>
            )
          })}
        </Row>
      </div>
    )
  };
  onFilter=(value)=>{
    this.onQuery({mergeCounts:value})
  };
  getDataResultPanel=()=>{

    const {commonLayout}=this.props;
    const {queryResults,queryFilters,lastReqTime}=this.props[NAMESPACE];
    const {data}=queryResults;

    const tableProps={
      onChange:this.tableOnChange,
      columns:tableConfig.getColumns({queryFilters,onSubmit:this.onFilter}),
      expandedRowRender:tableConfig.getExpandedRowRender({isDark:commonLayout.darkTheme}),
      dataSource:data.map((i,index)=>{
        return {
          ...i,
          key:`item-${index}-${lastReqTime}`
        }
      })
    };

    const paginationProps={
      total:queryResults.total,
      current:queryFilters.page,
      onChange:this.pageOnChange,
      pageSize:queryFilters.limit,
    };

    return (
      <div key={"results-panel"+lastReqTime}>
        <EnhanciveTable title={tableTextConfig.title}
                        tableProps={tableProps}
                        isDark={commonLayout.darkTheme}
                        paginationProps={paginationProps}/>
      </div>
    )
  };
  render=()=> {

    const pageClasses=classnames({
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
