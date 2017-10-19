import React from 'react';
import styles from './styles.css'
import { Menu, Button,Breadcrumb,Tabs,Card ,message as Message} from 'antd';
import {connect} from 'dva';
import classnames from 'classnames';
import {textConfig,NAMESPACE} from './ConstConfig'
import JoSpin from '../../components/JoSpin/index';
import SendEmailConfigForm from './components/SendEmailConfigForm/index';
import {queryContainerGenerator} from '../../Generators/QueryContainerrGenerator/QueryContainerGenerator';
import {createMapDispatchWithPromise} from '../../utils/dvaExtraDispatch'
import * as tools from '../../utils/tools';

function mapStateToProps(state) {
  const {commonLayout}=state.layout;
  return {
    commonLayout,
    userData:state.user.userData,
    loading:state.loading.effects[`${NAMESPACE}/put`]||
    state.loading.effects[`${NAMESPACE}/test`]
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
    },
    test:(payload)=>{
      return dispatch({
        type:`${NAMESPACE}/test`,
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
      .then(result=>{
        Message.success(textConfig.notification);
      })
  }
  onTest=payload=>{
    const {queryLoading,putLoading}=this.props;
    if(queryLoading||putLoading){
      return;
    }
    return this.props.test(payload)
      .then(tools.curry(Message.success,"邮件服务器连接成功，可正常发送邮件"))
      .catch(tools.curry(Message.error,"邮件服务器连接不成功，请检查发件箱设置或当前网络环境"))
  }
  getConfigPanel=()=>{

    const {commonLayout}=this.props;

    const {queryResults} =this.props[NAMESPACE];

    return (
      <SendEmailConfigForm key={`receive-from`}
                           onSubmit={this.putConfig}
                           onTest={this.onTest}
                           isDark={commonLayout.darkTheme}
                           defaultValue={queryResults}/>
    )
  }
  render=()=> {

    const {loading}=this.props;

    const pageClasses=classnames({
      [styles["page"]]:true,
      [styles["page-dark"]]:this.props.commonLayout.darkTheme
    })
    return (
      <div className={pageClasses}>
        <JoSpin spinning={this.props.queryLoading||loading}>
          {this.getConfigPanel()}
        </JoSpin>
      </div>
    )
  }
}

export default Page;

