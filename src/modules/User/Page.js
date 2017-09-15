/**
 * Created by jojo on 2017/8/21.
 */
import React from 'react';
import styles from './styles.css';
import {connect} from 'dva';
import classnames from 'classnames';
import LoginForm from './components/LoginForm';
import {Alert} from 'antd';
import {createMapDispatchWithPromise} from '../../utils/dvaExtraDispatch'


function mapStateToProps(state) {

  const {commonLayout}=state.layout;

  return {
    commonLayout,
    loading:state.loading.effects["user/postSign"]
  }
}


function mapDispacthToProps(dispatch) {
  return {
    dispatch,
    postSign:(payload)=>{
      return dispatch({
        type:"user/postSign",
        payload:{
          ...payload,
        }
      })
    }
  }
}

@connect(mapStateToProps,createMapDispatchWithPromise(mapDispacthToProps))
class Page extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      err:null,
      shouldShakeModal:false,

    }
  }
  postSignHandle=(payload)=>{
    return this.props.postSign(payload)
      .then(result=>{

        window.location.reload()

      })
      .catch(msg=>{

        this.setState({
          err:msg,
        })
        this.shakeModal();
      })
  }
  shakeModal=()=>{

    this.setState({
      shouldShakeModal:true
    });

    setTimeout(()=>{
      this.setState({
        shouldShakeModal:false
      });
    },500);
  };
  render=()=>{

    const {shouldShakeModal,err}=this.state;

    const isDark=this.props.commonLayout.darkTheme;

    const formWrapperClasses=classnames({
      ["fadeIn"]:!shouldShakeModal&&!err,
      ['headShake']:shouldShakeModal,
      ['animated']:true,
      [styles["login-modal-form"]]:true,
      [styles["login-modal-form-dark"]]:isDark
    });

    const pageClasses=classnames({
      [styles["page"]]:true,
      [styles["page-dark"]]:isDark
    });

    const modalClasses=classnames({
      [styles["login-modal"]]:true,
    })

    const titleClasses=classnames({
      [styles["title"]]:true,
      [styles["title-dark"]]:isDark
    })


    return (
      <div className={pageClasses}>
        <div className={modalClasses}>

          {
            err
              ?
              <Alert message={err}
                     key={`${new Date().getTime()}`}
                     style={{marginBottom:"15px"}}
                     showIcon
                     type="error"
                     closable/>
              :
              null
          }
          <div className={formWrapperClasses}>
            <h1 className={titleClasses}>安天捕风蜜罐系统</h1>
            <LoginForm onSubmit={this.postSignHandle}
                       isDark={isDark}
                       loading={this.props.loading}/>
          </div>

        </div>
      </div>
    )
  }
}


export default Page;
