import React from 'react';
import styles from './styles.css'
import { Menu, Button,Breadcrumb,Tabs,Card ,message as Message} from 'antd';
import {connect} from 'dva';
import classnames from 'classnames';
import {textConfig,NAMESPACE} from './ConstConfig'
import JoSpin from '../../components/JoSpin/index';
import ReceiveEmailConfigForm from './components/ReceiveEmailConfigForm';
import {queryContainerGenerator} from '../../Generators/QueryContainerrGenerator/QueryContainerGenerator';
import {createMapDispatchWithPromise} from '../../utils/dvaExtraDispatch'
import * as tools from '../../utils/tools';

function mapStateToProps(state) {
  const {commonLayout}=state.layout;
  return {
    commonLayout,
    userData:state.user.userData,
    putLoading:state.loading.effects[`${NAMESPACE}/put`]
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    put:(payload)=>{
      return dispatch({
        type:`${NAMESPACE}/put`,
        payload,
      })
    }
  }
}

@queryContainerGenerator({
  namespace:NAMESPACE,
  mapStateToProps,
  mapDispatchToProps:createMapDispatchWithPromise(mapDispatchToProps)
})
class Page extends React.Component{
  constructor(props) {
    super(props);
  }
  componentDidMount=()=>{
    this.props.query();
  }
  putConfig=(payload)=>{
    const {queryLoading,putLoading}=this.props;
    if(queryLoading||putLoading){
      return;
    }
    return this.props.put(payload)
      .then(tools.curry(Message.success,textConfig.notification))
  }
  getConfigPanel=()=>{

    const {commonLayout,isAdmin}=this.props;

    const {queryResults} =this.props[NAMESPACE];

    return (
      <ReceiveEmailConfigForm key={`receive-from`}
                              isAdmin={isAdmin}
                              onSubmit={this.putConfig}
                              isDark={commonLayout.darkTheme}
                              defaultValue={queryResults}/>
    )
  }
  render=()=> {

    const {putLoading}=this.props;

    const pageClasses=classnames({
      [styles["page"]]:true,
      [styles["page-dark"]]:this.props.commonLayout.darkTheme
    })
    return (
      <div className={pageClasses}>
        <JoSpin spinning={this.props.queryLoading||putLoading}>
          {this.getConfigPanel()}
        </JoSpin>
      </div>
    )
  }
}

export default Page;

