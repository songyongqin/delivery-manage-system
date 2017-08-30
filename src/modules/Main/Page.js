import React from 'react';
import styles from './styles.css'
import { Menu, Button,Breadcrumb,Spin,Modal,Table,BackTop } from 'antd';
import classnames from 'classnames';
import Icon from '../../components/JoIcon';
import Nav from './components/Nav';
import LayoutOperateList from './components/LayoutIOperateList';
import JoBreadcrumb from '../../components/JoBreadcrumb/JoBreadcrumb';
import JoSpin from '../../components/JoSpin/JoSpin';
import CopyToClipboard from 'react-copy-to-clipboard';

import { connect } from 'dva';
import {createMapDispatchWithPromise} from "../../utils/dvaExtraDispatch";

function mapStateToProps(state) {
  return {
    layout:state.layout,
    commonLayout:state.layout.commonLayout,
    routeConfig:state.layout.routeConfig,
    languageConfig:state.layout.languageConfig
  }
}

function mapDispatchToProps(dispatch,ownProps) {
  return {
    dispatch,
    setCommonLayout:(payload)=>{
      return dispatch({
        type:"layout/setCommonLayout",
        payload:{
          ...payload
        }
      })
    }
  }
}

@connect(mapStateToProps,createMapDispatchWithPromise(mapDispatchToProps))
class Page extends React.Component{

  constructor(props) {
    super(props);
    this.state={
      loading:false,
    }
  }

  createSetCommonLayoutHandle=(type,value)=>{
    return ()=>{
      this.props.setCommonLayout({
        [type]:value,
      })
    }
  };

  getNav=()=>{
    const {languageConfig,commonLayout,routeConfig}=this.props;
    const {navMini,language,darkTheme}=commonLayout;

    const classes=classnames({
        [styles["nav-wrapper"]]:true,
        [styles["nav-wrapper-mini"]]:navMini,
      });

    return (
      <div className={classes}>
        <Nav isMini={navMini}
             activeKey={window.location.hash.substr(1)}
             isDark={darkTheme}
             routeConfig={routeConfig}
             titleConfig={languageConfig[language].routes}/>
      </div>
    )
  };

  getContent=()=>{
    const {languageConfig,commonLayout}=this.props;
    const {navMini,language,darkTheme}=commonLayout;
    const {routes:routesTitleConfig}=languageConfig[language];

    let classes=classnames({
      [styles["content-wrapper"]]:true,
      [styles["content-wrapper-common"]]:!navMini,
      [styles["content-wrapper-expand"]]:navMini,
    });

    return (
      <div className={classes}>
        <JoBreadcrumb routes={this.props.routes}
                      isDark={darkTheme}
                      routesTitleConfig={routesTitleConfig}
                      title={<Icon type="home4"/>}/>
        <div className={styles["main-children-wrapper"]}>
          {this.props.children}
        </div>
        <BackTop style={{right:"30px"}} />
      </div>
    )
  };

  getLayoutOperateList=()=>{

    const {darkTheme,navMini,language}=this.props.commonLayout;

    const status={
      nav:navMini,
      theme:darkTheme,
      lang:language,
    };

    const handle={
      nav:this.createSetCommonLayoutHandle("navMini",!navMini),
      theme:this.createSetCommonLayoutHandle("darkTheme",!darkTheme),
      lang:this.createSetCommonLayoutHandle("language",language==="zh-cn"?"en-us":"zh-cn")
    };

    return (
      <LayoutOperateList status={status}
                         isDark={darkTheme}
                         handle={handle}/>
    )
  };

  getHeader=()=>{
    const {languageConfig,commonLayout}=this.props;
    const {language,darkTheme}=commonLayout;

    document.title=languageConfig[language].title;
    document.body.style.background=darkTheme?"rgb(28,35,59)":"#F1F1F1";
    const headerClasses=classnames({
      [styles["header"]]:true,
      [styles["header-dark"]]:darkTheme,
    });

    return (
      <header className={headerClasses}>
        <div className={styles["header-left"]}>
          {this.getLayoutOperateList()}
        </div>
        <div className={styles["header-right"]}>
        </div>
        <h1 className={styles["title"]}>
          {languageConfig[language].title}
        </h1>
      </header>
    )
  };

  render=()=>{

    const {darkTheme}=this.props.commonLayout;

    const pageClasses=classnames({
      [styles["page"]]:true,
      [styles["page-dark"]]:darkTheme
    });


    return (
      <div className={pageClasses}>
        {this.getHeader()}
        {this.getNav()}
        {this.getContent()}
      </div>
    )
  }
}






export default Page;
