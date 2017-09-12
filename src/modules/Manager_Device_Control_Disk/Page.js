import React from 'react';
import classnames from 'classnames';
import { Button,Table,message as Message } from 'antd';
import {queryContainerGenerator} from '../../Generators/QueryContainerrGenerator/QueryContainerGenerator';
import ThresholdSelect from '../../components/ThresholdSelect';
import {NAMESPACE,NOTIFICATIONS} from './ConstConfig'
import {createMapDispatchWithPromise} from '../../utils/dvaExtraDispatch'


function mapStateToProps(state) {
  const {commonLayout}=state.layout;
  return {
    commonLayout,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    put:payload=>{
      return dispatch({
        type:`${NAMESPACE}/put`,
        payload
      })
    }
  }
}

@queryContainerGenerator({
  namespace:NAMESPACE,
  mapStateToProps,
  mapDispatchToProps:createMapDispatchWithPromise(mapDispatchToProps),
})
class Page extends React.Component{
  constructor(props) {
    super(props);
  }
  putHandle=(payload)=>{
    this.props.put(payload)
      .then(result=>{
        Message.success(NOTIFICATIONS);
      })
  }
  render=()=> {
    const {isDark,queryLoading,lastReqTime}=this.props;
    const {queryResults}=this.props[NAMESPACE]
    return (
      <ThresholdSelect key={`${lastReqTime}-select`}
                       onSubmit={this.putHandle}
                       defaultValue={queryResults.threshold}
                       isDark={isDark} loading={queryLoading}/>
    )
  }
}

export default Page;
