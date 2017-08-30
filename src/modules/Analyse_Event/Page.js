import React from 'react';
import styles from './styles.css'
import classnames from 'classnames';
import { Menu, Button,Breadcrumb,Table,Icon,Row,Col,Card,Badge } from 'antd';
import QueryForm from './QueryForm';
import {queryContainerGenerator} from '../../utils/containerGenerator';
import JoSpin from '../../components/JoSpin/JoSpin';
import EnhanciveTable from '../../components/EnhanciveTable/EnhanciveTable';
import JoTag from '../../components/JoTag'
import * as tools from '../../utils/tools.js';
import tableColumnsGenerator from '../../utils/tableColumnsGenerator';

const rowsRenderer={
  description:value=>{
    try{
      return <div>
        {
          value.map((i,index)=>{
            return <div key={`${index}-des`}
                        style={{marginBottom:"8px"}}>
              <JoTag color={index%2===0?"#87d068":"#f50"}>
                {i}
              </JoTag>
            </div>
          })
        }
      </div>
    }catch(e){
      console.info(e);
    }
  }
}

const getColumns=({filtersOptions={},queryFilters,tableTextConfig})=>{

  const renderer={...rowsRenderer};

  const translateRows=["attackStage","action","level","actionStatus"];

  translateRows.forEach(k=>{
    let targetFilter=tableTextConfig.filter[k]||{};
    renderer[k]=value=>{
      return value in targetFilter?targetFilter[value]:value;
    }
  })

  const result=tableColumnsGenerator({
    keys:["attackStage","action","level","actionStatus","counts","description","attackTimes"],
    titleTextConfig:tableTextConfig.title,
    filterTextConfig:tableTextConfig.filter,
    filterOptions:filtersOptions,
    filteredValue:queryFilters,
    renderer
  })

  return result;

};

const getExpandedRowRender=({isDark,tableTextConfig})=>{
  const {expandedRow}=tableTextConfig;
  return (records)=>{

    const classes=classnames({
      [styles["expanded-row-dark"]]:isDark
    });

    const {details=[],advice}=records;
    return (
      <Card title={tools.getKeyText("title",expandedRow)}
            className={classes}>
        <table>
          <tbody>
          <tr>
            <td style={{padding:"10px 0px",width:"80px"}}>
              {tools.getKeyText("details",expandedRow.rows)}
            </td>
            <td style={{padding:"10px 0px"}}>
              <div>
                {details.map((d,index)=>{
                  return <JoTag key={'item-'+index} color="#87d068">
                    {d}
                  </JoTag>
                })}
              </div>
            </td>
          </tr>
          <tr>
            <td style={{padding:"10px 0px",width:"80px"}}>
              {tools.getKeyText("advice",expandedRow.rows)}
            </td>
            <td style={{padding:"10px 0px"}}>
              <JoTag color="#f50">{advice}</JoTag>
            </td>
          </tr>
          </tbody>
        </table>
      </Card>
    );
  };
};

const NAMESPACE="analyseEvent";

function mapStateToProps(state) {

  const {layoutConfig,languageConfig,commonLayout}=state.layout;

  return {
    filtersOptions:layoutConfig.filters[NAMESPACE],
    icons:layoutConfig.icons[NAMESPACE],
    commonLayout,
    tableTextConfig:languageConfig["zh-cn"].tableTextConfig[NAMESPACE],
    pageTextConfig:languageConfig.pageTextConfig[NAMESPACE],
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

    const {commonLayout,pageTextConfig,icons}=this.props,
          {statistics}=this.props[NAMESPACE].queryResults,
          {title,units,items}=pageTextConfig.statistics;

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

    const keys=Object.keys(statistics);
    const spanConfig={lg:{span:4},md:{span:8},sm:{span:12},xs:{span:24}};


    return (
      <div>
        <h2 className={titleClasses}>{title}</h2>
        <Row type="flex"
             justify="space-between"
             className={listClasses}>
          {keys.map(k=>{

            let titleClasses=classnames({
              ["txt-color-dark"]:commonLayout.darkTheme,
              [styles["title"]]:true,
            })

            return (
              <Col {...spanConfig}
                   key={'item-'+k}
                   className={styles["statistic-item-wrapper"]}>
                <div className={itemClasses}>
                    <span className={styles["statistic-item-icon"]}>
                      {icons.statistics[k]}
                    </span>
                    <p className={styles["counts"]}>{statistics[k]}{units[k]}</p>
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
  getDataResultPanel=()=>{

    const {filtersOptions,tableTextConfig,commonLayout}=this.props;
    const {queryResults,queryFilters,lastReqTime}=this.props[NAMESPACE];
    const {data}=queryResults;
    const tableProps={
      onChange:this.tableOnChange,
      columns:getColumns({filtersOptions,queryFilters,tableTextConfig}),
      expandedRowRender:getExpandedRowRender({isDark:commonLayout.darkTheme,tableTextConfig}),
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
    };

    return (
      <div key="results-panel">
        <EnhanciveTable title={tableTextConfig.tableTitle}
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
