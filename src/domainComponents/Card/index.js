/**
 * Created by jojo on 2017/10/11.
 */
import {Card} from 'antd';
import React from 'react';
import {connect} from 'dva';
import classnames from 'classnames';

const WithConnectCard=(props)=>{

  let finalProps={...props};
  delete finalProps.isDark;
  delete finalProps.dispatch;

  return <Card {...finalProps} className={classnames({
    [props.className||""]:true,
    ["card-dark"]:props.isDark,
  })}/>

}


const mapStateToProps=state=>({
  isDark:state.layout.commonLayout.darkTheme
})


export default connect(mapStateToProps)(WithConnectCard)
