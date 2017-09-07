import React from 'react';
import styles from './styles.css'
import classnames from 'classnames';
import { Menu, Button,Breadcrumb,Table,Icon,Row,Col,Card,Badge } from 'antd';
import QueryForm from '../../components/TimestampForm';
import QueryIPForm from './components/QueryIPForm';
import {queryContainerGenerator} from '../../Generators/QueryContainerrGenerator/QueryContainerGenerator';
import JoSpin from '../../components/JoSpin/JoSpin';
import EnhanciveTable from '../../components/EnhanciveTable/EnhanciveTable';
import * as tableConfig from './components/TableConfig';
import {statisticDataindexes,statisticsTextConfig,tableTextConfig} from './ConstConfig';
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
    console.info(payload);
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

    const {queryFilters,lastReqTime}=this.props[NAMESPACE];

    return (
      <div key={"query-panel"} style={{margin:"15px 0"}}>
          {this.props.getContainerHeader({
            routes:this.props.routes,
            queryFilters,
            onQuery:this.onQuery
          })}
        <div style={{display:"inline-block",marginBottom:"10px"}}>
          <QueryIPForm key={"query-ip"+lastReqTime}
                       onSubmit={this.onQuery}
                       defaultValue={queryFilters}/>
        </div>
      </div>
    )
  };
  getResultsPanel=()=>{

    return (
      <div key="results-panel">
        {this.getDataResultPanel()}
      </div>
    )
  };
  onFilter=(value)=>{
    this.onQuery({attackCounts:value})
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
