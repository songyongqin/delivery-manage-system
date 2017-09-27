/**
 * Created by jojo on 2017/9/6.
 */
import React from 'react';
import { Menu, Button,Breadcrumb,Table,Icon,Row,Col,Card,Badge } from 'antd';
import {queryContainerGenerator} from '../QueryContainerrGenerator/QueryContainerGenerator';
import JoSpin from '../../components/JoSpin/index';
import EnhanciveTable from '../../components/EnhanciveTable/index';
import ThreatEventOperationPanel from '../../components/ThreatEventOperationPanel';
import {createMapDispatchWithPromise} from '../../utils/dvaExtraDispatch'
import * as tools from '../../utils/tools';
import WithOnQuery from '../QueryContainerDecorator/WithOnQuery';
import WithPageOnChange from '../QueryContainerDecorator/WithPageOnChangeQuery';

export default ({tableConfig,formTextConfig,namespace})=>{
  const NAMESPACE=namespace;

  function mapStateToProps(state) {
    const {commonLayout}=state.layout;
    return {
      commonLayout,
      exportLoading:state.loading.effects[`${NAMESPACE}/post`]
    }
  }

  function mapDispatchToProps(dispacth) {
    return {
      dispacth,
      post:(payload)=>{
        return dispacth({
          type:`${NAMESPACE}/post`,
          payload:{
            ...payload
          }
        })
      }
    }
  }

  @queryContainerGenerator({
    namespace:NAMESPACE,
    mapStateToProps,
    mapDispatchToProps:createMapDispatchWithPromise(mapDispatchToProps)
  })
  @WithOnQuery(NAMESPACE)
  @WithPageOnChange(NAMESPACE)
  class Page extends React.Component{
    constructor(props) {
      super(props);
    }
    componentDidMount=()=>{
      this.props.query({
        timestampRange:this.props.timestampRange,
        value:null
      })
    }
    onSelectChange=(payload)=>{
      this.props.onQuery({...payload,page:1})
    }
    onExport=()=>{
      this.props.post({timestampRange:this.props.timestampRange}).then(result=>{

        tools.download(result);
      })
    }
    getQueryPanel=()=>{
      const {onQuery}=this.props;
      const {queryFilters}=this.props[NAMESPACE];
      const {commonLayout}=this.props;

      return <ThreatEventOperationPanel key="query-panel"
                                        handle={{
                                          onQuery,
                                          onSelectChange:this.onSelectChange,
                                          onExport:this.onExport
                                        }}
                                        loading={this.props.queryLoading}
                                        isDark={commonLayout.darkTheme}
                                        queryFilters={queryFilters}
                                        formTextConfig={formTextConfig}/>
    };
    getResultsPanel=()=>{
      return (
        <div key="results-panel">
          {this.getDataResultPanel()}
        </div>
      )
    };
    getDataResultPanel=()=>{

      const {commonLayout,pageOnChange}=this.props;
      const {queryResults,queryFilters,lastReqTime}=this.props[NAMESPACE];
      const {data}=queryResults;

      const tableProps={
        columns:tableConfig.getColumns({queryFilters}),
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
        onChange:pageOnChange,
        pageSize:queryFilters.limit,
      };

      return (
        <div key={"results-panel"+lastReqTime}>
          <EnhanciveTable tableProps={tableProps}
                          isDark={commonLayout.darkTheme}
                          paginationProps={paginationProps}/>
        </div>
      )
    };
    render=()=> {

      const {queryLoading,exportLoading}=this.props;

      return (
        <div>
          <JoSpin spinning={queryLoading||exportLoading}>
            {this.getQueryPanel()}
            {this.getResultsPanel()}
          </JoSpin>

        </div>
      )
    }
  }
  return Page;
}






