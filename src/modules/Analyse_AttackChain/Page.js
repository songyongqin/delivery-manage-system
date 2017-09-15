import React from 'react';
import styles from './styles.css'
import classnames from 'classnames';
import { Menu, Button,Breadcrumb,Table,Icon,Row,Col,Card,Badge,Timeline,Checkbox,Switch } from 'antd';
import {queryContainerGenerator} from '../../Generators/QueryContainerrGenerator/QueryContainerGenerator';
import JoSpin from '../../components/JoSpin/JoSpin';
import EnhanciveTable from '../../components/EnhanciveTable/EnhanciveTable';
import * as tableConfig from  './components/TableConfig';


import {NAMESPACE} from './ConstConfig';


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
  getCheckboxOnChange=(value)=>{
    return (checked)=>{
      const {attackStage}=this.props[NAMESPACE].queryFilters;

      let attackStageMap={};

      attackStage.forEach(i=>{
        attackStageMap[i]=true;
      })

      attackStageMap[value]=checked;

      let newAttackStage=Object.keys(attackStageMap).filter(k=>attackStageMap[k]);

      this.onQuery({attackStage:newAttackStage})
    }
  };
  getQueryPanel=()=>{

    const {queryFilters}=this.props[NAMESPACE];
    return (
      <div key="query-panel" style={{margin:"15px 0"}}>
        {this.props.getContainerHeader({
          routes:this.props.routes,
          queryFilters,
          onQuery:this.onQuery
        })}
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
  getDataResultPanel=()=>{

    const {commonLayout}=this.props;
    const {queryResults,queryFilters,lastReqTime}=this.props[NAMESPACE];
    const {data}=queryResults;

    const tableProps={
      onChange:this.tableOnChange,
      columns:tableConfig.getColumns({
        queryFilters,
        getCheckboxOnChange:this.getCheckboxOnChange
      }),
      expandedRowRender:tableConfig.getExpandedRowRender({
        isDark:commonLayout.darkTheme,
      }),
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
      <div key="results-panel">
        <EnhanciveTable title={null}
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



