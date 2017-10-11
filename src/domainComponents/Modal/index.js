/**
 * Created by jojo on 2017/10/11.
 */
import React from 'react';
import {Modal} from 'antd';
import {connect} from 'dva';
import classnames from 'classnames';

const WithConectModal=(props)=>{

  const modalClasses=classnames({
    [props.className]:true,
    ["modal"]:true,
    ["modal-dark"]:props.isDark,
  })

  return <Modal {...props} className={modalClasses}/>
}

const mapStateToProps=state=>({
  isDark:state.layout.commonLayout.darkTheme
})


export default connect(mapStateToProps)(WithConectModal)
