/**
 * Created by jojo on 2017/10/9.
 */
import React from 'react';
import { Menu, Button, Breadcrumb, Card,Switch,Icon,message as Message } from 'antd';
import {WithAnimateRender,WithBreadcrumb} from '../../components/HOSComponents/index'
import {createMapDispatchWithPromise} from '../../utils/dvaExtraDispatch'
import JoSpin from '../../components/JoSpin';
import {connect} from 'dva';
import classnames from 'classnames';
import {
  NAMESPACE as STRATEGY_NAMESPACE,
}from '../SysConfig_Strategy_Strategy/ConstConfig'
import {NAMESPACE as RULE_NAMESPACE} from '../SysConfig_Strategy_Rule/ConstConfig';
import {NAMESPACE　as THREAT_NAME_NAMESPACE} from '../SysConfig_Strategy_Threatname/ConstConfig';
import StrategeModule from '../SysConfig_Strategy_Strategy/Page';

const mapStateToProps=state=>{
  const effectLoading=state.loading.effects;
  return {
    commonLayout:state.layout.commonLayout,
    loading:effectLoading[`${STRATEGY_NAMESPACE}/query`]||
            effectLoading[`${STRATEGY_NAMESPACE}/put`]||
            effectLoading[`${RULE_NAMESPACE}/query`]||
            effectLoading[`${RULE_NAMESPACE}/put`]||
            effectLoading[`${THREAT_NAME_NAMESPACE}/query`]||
            effectLoading[`${THREAT_NAME_NAMESPACE}/put`]||
            effectLoading[`${STRATEGY_NAMESPACE}/apply`]
  }
}

const mapDispatchToProps=dispatch=>({
  getStrategy:()=>dispatch({
    type:`${STRATEGY_NAMESPACE}/query`
  }),
})

@connect(mapStateToProps,createMapDispatchWithPromise(mapDispatchToProps))
@WithAnimateRender
@WithBreadcrumb
class Page extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      visible:{
      }
    }
  }
  getBreadcrumb=()=>{
    return <div key="breadcrumb-panel" style={{margin:"15px 0"}}>
      {this.props.getBreadcrumb(this.props.routes)}
    </div>
  }

  getContentPanel=()=>{

    return (
      <div key="content-panel" style={{padding:"15px 0"}}>
        <StrategeModule setSelectedRows={this.setSelectedRows}/>
      </div>
    )
  }
  render=()=>{


    return (
      <div>
        <JoSpin spinning={this.props.loading}>
          {
            this.props.animateRender([
              this.getBreadcrumb(),
              this.getContentPanel()
            ])
          }
        </JoSpin>
        
      </div>
    )
  }
}

export default Page;
