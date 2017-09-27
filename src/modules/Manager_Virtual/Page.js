import React from 'react';
import classnames from 'classnames';
import { Menu, Button,Breadcrumb,Table,Icon,Row,Col,Card,Badge } from 'antd';
import {queryContainerGenerator} from '../../Generators/QueryContainerrGenerator/QueryContainerGenerator';
import JoSpin from '../../components/JoSpin/index';
import EnhanciveTable from '../../components/EnhanciveTable/index';
import * as tableConfig from './components/TableConfig/index';
import WithOnQuery from '../../Generators/QueryContainerDecorator/WithOnQuery';
import WithPageOnChange from '../../Generators/QueryContainerDecorator/WithPageOnChangeQuery';
import {WithBreadcrumb} from '../../components/HOSComponents/index'
import styles from './styles.css'
import {createMapDispatchWithPromise} from '../../utils/dvaExtraDispatch'


import {
  tableTextConfig,
  NAMESPACE,
  HOST_IP_DATAINDEX,
  HONEYPOT_IP_DATAINDEX,
} from './ConstConfig';



function mapStateToProps(state) {
  const {commonLayout}=state.layout;
  return {
    commonLayout,
  }
}

function mapDispatchToProps(dispatch) {
  return {
   getNodeIpList:()=>{
     return dispatch({
       type:`${NAMESPACE}/getNodeIpList`
     })
   },
   getVMIpList:(payload)=>{
     return dispatch({
       type:`${NAMESPACE}/getVMIpList`
     })
   }

  }
}


@queryContainerGenerator({
  namespace:NAMESPACE,
  mapStateToProps,
  mapDispatchToProps:createMapDispatchWithPromise(mapDispatchToProps)
})

@WithBreadcrumb
@WithOnQuery(NAMESPACE)
@WithPageOnChange(NAMESPACE)
class Page extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      [HOST_IP_DATAINDEX]:[],
      [HONEYPOT_IP_DATAINDEX]:[],
    }
  }
  componentDidMount=()=>{

    const {queryFilters}=this.props[NAMESPACE];
    if(queryFilters[HOST_IP_DATAINDEX].length!==0){
      this.getVMIpList();
    }
    this.getNodeIpList();
  }
  getNodeIpList=()=>{
    this.props.getNodeIpList().then(result=>{
      this.setState({
        [HOST_IP_DATAINDEX]:result,
      })
    })
  }
  getVMIpList=(hostIp)=>{
    this.props.getVMIpList({hostIp}).then(result=>{
      this.setState({
        [HONEYPOT_IP_DATAINDEX]:result,
      })
    })
  }
  tableOnChange=(pagination, filters, sorter)=>{
    //判断主机IP是否与上一次相同 不同则清空蜜罐ip选项
    const {queryFilters}=this.props[NAMESPACE],
          lastHostIP=queryFilters[HOST_IP_DATAINDEX][0],
          newHostIP=filters[HOST_IP_DATAINDEX][0],
          shouldInit=lastHostIP!==newHostIP,
          finalFilter=shouldInit?{...filters,[HONEYPOT_IP_DATAINDEX]:[]}:{...filters};

    this.props.onQuery(finalFilter)
    this.getVMIpList(filters[HOST_IP_DATAINDEX]);
  };
  getQueryPanel=()=>{
    // const {onQuery,routes}=this.props;
    // const {queryFilters,lastReqTime}=this.props[NAMESPACE];

    return (
      <div key={"query-panel"} style={{margin:"15px 0"}}>
        {this.props.getBreadcrumb(this.props.routes)}
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

    const {commonLayout,pageOnChange}=this.props;
    const {queryResults,queryFilters,lastReqTime}=this.props[NAMESPACE];
    const {data}=queryResults;
    const isDark=commonLayout.darkTheme;

    const filterOptions={
      [HOST_IP_DATAINDEX]:this.state[HOST_IP_DATAINDEX],
      [HONEYPOT_IP_DATAINDEX]:this.state[HONEYPOT_IP_DATAINDEX]
    };

    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.info(selectedRows);
      },
    };


    const tableProps={
      rowSelection,
      className:styles["table"],
      onChange:this.tableOnChange,
      columns:tableConfig.getColumns({
        filterOptions,
        queryFilters,
        onSubmit:this.onFilter}),
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


    const classes=classnames({
      ["card-dark"]:commonLayout.darkTheme
    });

    return (
      <div key={"results-panel"}>
        <Card title={"虚拟蜜罐"}
              className={classes}>
          <Button style={{marginBottom:"15px"}}
                  type="primary"
                  icon="plus">创建蜜罐</Button>
          <EnhanciveTable title={tableTextConfig.title}
                          tableProps={tableProps}
                          inverse={true}
                          isDark={isDark}
                          paginationProps={paginationProps}/>
        </Card>
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
