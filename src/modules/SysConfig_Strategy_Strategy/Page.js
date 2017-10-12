import React from 'react';
import styles from './styles.css';
import {
  Menu,
  Button,
  Breadcrumb,
  Icon,
  message as Message,
  Popover
} from 'antd';
import {WithAnimateRender,WithBreadcrumb} from '../../components/HOSComponents/index'
import {createMapDispatchWithPromise} from '../../utils/dvaExtraDispatch'
import JoSpin from '../../components/JoSpin';
import {connect} from 'dva';
import classnames from 'classnames';
import * as tableConfig from './components/TableConfig';
import EnhanciveTable from '../../domainComponents/EnhanciveTable';
import Card from '../../domainComponents/Card';
import {
  NAMESPACE,
  USERFUL_VALUE,
  UN_USEFUL_VALUE,
  PROTOCOLTYPE_DATAINDEX,
} from './ConstConfig'
import StrategyThreatnameModule from '../SysConfig_Strategy_Threatname/Page';
import * as tools from '../../utils/tools';

const {curry}=tools;

const CardTitle=({selectedRows=[],createPutStrategy,applyHandle,switchExpandPage})=>(
  <div style={{overflow:"hidden"}}>
    <div style={{float:"left"}}>
      <Button.Group>
        <Button type="primary"
                onClick={createPutStrategy(USERFUL_VALUE)}
                disabled={selectedRows.length===0}>
          <Icon type="check"/>启用
        </Button>
        <Button type="danger"
                onClick={createPutStrategy(UN_USEFUL_VALUE)}
                disabled={selectedRows.length===0}
                className="btn-danger">
          关闭<Icon type="close"/>
        </Button>
      </Button.Group>
      <Button type="primary"
              icon="plus"
              style={{marginLeft:"15px"}}>
        新增特征
      </Button>
    </div>
    <div style={{float:"right"}}>
      <Button type="primary"
              onClick={applyHandle}
              icon="save">
        应用
      </Button>
      {/*<Button type="primary"*/}
              {/*onClick={switchExpandPage}*/}
              {/*style={{marginLeft:"15px"}}*/}
              {/*icon="setting">*/}
        {/*威胁等级配置*/}
      {/*</Button>*/}
    </div>
  </div>
)



const mapStateToProps=state=>{
  const effectLoading=state.loading.effects;

  return {
    [NAMESPACE]:state[NAMESPACE],
    commonLayout:state.layout.commonLayout,
    loading:effectLoading[`${NAMESPACE}/query`]||
    effectLoading[`${NAMESPACE}/put`]||
    effectLoading[`${NAMESPACE}/apply`]
  }

}

const mapDispatchToProps=dispatch=>({
  get:()=>dispatch({
    type:`${NAMESPACE}/query`
  }),
  put:payload=>dispatch({
    type:`${NAMESPACE}/put`,
    payload,
  }),
  apply:()=>dispatch({
    type:`${NAMESPACE}/apply`
  })
})

const getTableRowKey=(index,lastReqTime)=>`item-${index}-${lastReqTime}`



@connect(mapStateToProps,createMapDispatchWithPromise(mapDispatchToProps))
@WithAnimateRender
@WithBreadcrumb
class Page extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      selectedRows:[],
      expanded:true,
      expandedRowIndexes:[0],
    }

  }
  /***************************************/
  getExpandRowOnChange=index=>()=>this.state.expandedRowIndexes.includes(index)
    ?
    this.removeExpandedRow(index)
    :
    this.addExpandedRow(index)
  /***************************************/
  addExpandedRow=index=>this.setState({
    expandedRowIndexes:[...this.state.expandedRowIndexes,index]
  })
  /***************************************/
  removeExpandedRow=index=>this.setState({
    expandedRowIndexes:this.state.expandedRowIndexes.filter(i=>i!==index)
  })
  /***************************************/
  clearExpandRow=()=>this.setState({
    expandedRowIndexes:[]
  })
  /***************************************/

  switchExpandPage=()=>{
    this.setState({
      expanded:!this.state.expanded
    })
  }
  getBreadcrumb=()=>{
    return (
      <div key="breadcrumb-panel" style={{margin:"15px 0"}}>
        {this.props.getBreadcrumb(this.props.routes)}
      </div>
    )
  }

  componentDidMount=()=>{
    this.props.get();
  }

  setSelectedRows=(selectedRows)=>this.setState({
    selectedRows
  })

  getUsefulOnChangeHandle=protocolType=>value=>{

    this.clearExpandRow()
    this.props.put({
      [protocolType]:value?USERFUL_VALUE:UN_USEFUL_VALUE
    })
      .then(this.props.get)
      .catch(this.props.get)
  }

  createPutStrategy=value=>()=>{
    this.clearExpandRow();
    let payload={};
    this.state.selectedRows.forEach(i=>payload[i[PROTOCOLTYPE_DATAINDEX]]=value)
    this.props.put(payload)
      .then(curry(Message.success,"修改成功"))
      .then(this.props.get)
      .then(this.initSelected)
  }

  applyHandle=()=>this.props.apply()
    .then(curry(Message.success,"应用成功"))
    .then(this.props.get)


  initSelected=()=>this.setState({
    selectedRows:[]
  })
  getContentPanel=()=>{

    const {queryResults,lastReqTime}=this.props[NAMESPACE];
    const {data}=queryResults;
    const {
      getUsefulOnChangeHandle,
      createPutStrategy,
      applyHandle,
      switchExpandPage,
      getExpandRowOnChange,
    }=this;
    const {selectedRows,expandedRowIndexes} =this.state;
    const tableProps={
      expandIconAsCell:false,
      expandIconColumnIndex:-1,
      expandedRowKeys:expandedRowIndexes.map(index=>getTableRowKey(index,lastReqTime)),
      columns:tableConfig.getColumns({
        getUsefulOnChangeHandle,
        getExpandRowOnChange,
      }),
      dataSource:data.map((i,index)=>({
        ...i,
        key: getTableRowKey(index,lastReqTime)
      })),
      rowSelection:{
        onChange: (selectedRowKeys, selectedRows) =>this.setSelectedRows(selectedRows)
      },
      expandedRowRender:tableConfig.getExpandedRowRenderer({expandedRowIndexes})
    };

    const title=<CardTitle selectedRows={selectedRows}
                           applyHandle={applyHandle}
                           switchExpandPage={switchExpandPage}
                           createPutStrategy={createPutStrategy}/>


    return (
     <div key="content-panel" style={{padding:"15px 0"}}>
        <Card title={title}>
          <EnhanciveTable title={null}
                          expanded={false}
                          key={`${lastReqTime}-table`}
                          inverse={true}
                          tableProps={tableProps}
                          pagination={false}/>
        </Card>
     </div>
    )
  }
  render=()=>{


    const {commonLayout}=this.props,
          isDark=commonLayout.darkTheme,
          {expanded}=this.state

    const expandPageClasses=classnames({
      [styles["expand-page"]]:true,
      [styles["expand-page-dark"]]:isDark,
      [styles["expanded"]]:expanded,
    })


    const contentClasses=classnames({
      [styles["content"]]:true,
      [styles["content-shrink"]]:expanded
    })

    return (
        <div>
          <div className={expandPageClasses}
               id="strategy-expand-page">
            <StrategyThreatnameModule/>
          </div>
          <div className={contentClasses}>
            <JoSpin spinning={this.props.loading}>
              {
                this.props.animateRender([
                  this.getBreadcrumb(),
                  this.getContentPanel()
                ])
              }
            </JoSpin>
          </div>
        </div>
    )
  }
}

export default Page;
