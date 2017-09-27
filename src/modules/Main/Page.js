import React from 'react';
import styles from './styles.css'
import { Menu, Button,Breadcrumb,Spin,Modal,Table,BackTop,Dropdown,Icon,message as Message} from 'antd';
import classnames from 'classnames';
import Nav from './components/Nav';
import LayoutOperateList from './components/LayoutIOperateList'
import { connect } from 'dva';
import {createMapDispatchWithPromise} from "../../utils/dvaExtraDispatch";
import {tableTextConfig} from '../UserManager/ConstConfig';
import {modifyPasswordTextConfig} from './ConstConfig';
import ModifyPasswordForm from './components/ModifyPasswordForm';

function mapStateToProps(state) {
  return {
    layout:state.layout,
    commonLayout:state.layout.commonLayout,
    routeConfig:state.layout.routeConfig,
    languageConfig:state.layout.languageConfig,
    userData:state.user.userData,
    putPasswordLoading:state.loading["user/putPassword"]
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
    },
    deleteSign:(payload)=>{
      return dispatch({
        type:"user/deleteSign",
        payload:{
          ...payload,
        }
      })
    },
    putPassword:(payload)=>{
      return dispatch({
        type:"user/putPassword",
        payload:{
          ...payload,
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
      modifyPassword:false
    }

    document.body.style.overflowX="hidden";

  }
  switchModal=()=>{
    this.setState({
      modifyPassword:!this.state.modifyPassword
    })
  }
  createSetCommonLayoutHandle=(type,value)=>{
    return ()=>{
      this.props.setCommonLayout({
        [type]:value,
      })
    }
  };

  getNav=()=>{
    const {languageConfig,commonLayout,routeConfig,userData}=this.props;
    const {navMini,language,darkTheme}=commonLayout;

    const classes=classnames({
        [styles["nav-wrapper"]]:true,
        [styles["nav-wrapper-mini"]]:navMini,
        ["animated"]:true,
        ["fadeInLeft"]:true,
      });
    console.info(routeConfig)
    return (
      <div className={classes}>
        <Nav isMini={navMini}
             activeKey={window.location.hash.substr(1)}
             isDark={darkTheme}
             isAdmin={userData.isAdmin}
             routeConfig={routeConfig}
             titleConfig={languageConfig[language].routes}/>
      </div>
    )
  };

  getContent=()=>{
    const {commonLayout}=this.props;
    const {navMini}=commonLayout;

    let classes=classnames({
      [styles["content-wrapper"]]:true,
      [styles["content-wrapper-common"]]:!navMini,
      [styles["content-wrapper-expand"]]:navMini,
      ["animated"]:true,
      ["zoomIn"]:true,
      ["fadeIn"]:true,
    });

    return (
      <div className={classes}>
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
      lang:language==="zh-cn",
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
      ["animated"]:true,
      ["fadeInDown"]:true,
    });

    return (
      <header className={headerClasses}>
        <div className={styles["header-left"]}>
          {this.getLayoutOperateList()}
        </div>
        {this.getHeaderRight()}
        <h1 className={styles["title"]}>
          {languageConfig[language].title}
        </h1>
      </header>
    )
  };
  getHeaderRight=()=>{

    const {userAccount,role}=this.props.userData;

    const menu = (
      <Menu>
        <Menu.ItemGroup key="message" title={
          <div style={{padding:"5px 10px"}}>
            <span style={{color:"#108ee9",fontWeight:"900"}}>{userAccount}</span>
            <span>{tableTextConfig.enums.role[role]}</span>
          </div>
        }>
        </Menu.ItemGroup>
        <Menu.Item key="modify-password">
          <a onClick={this.switchModal}>
            <Icon type="lock"/>&nbsp;&nbsp;修改密码
          </a>
        </Menu.Item>
        <Menu.Item key="sign-out">
          <a onClick={this.props.deleteSign}>
            <Icon type="logout"/>&nbsp;&nbsp;注销
          </a>
        </Menu.Item>
      </Menu>
    );

    return (
      <div className={styles["header-right"]}>

        <span>欢迎回来，</span>
        <Dropdown overlay={menu}>
          <a style={{color:"#108EE9"}}>
            {userAccount}
             <Icon type="down" />
          </a>
        </Dropdown>
      </div>
    )
  }
  modifyPasswordHandle=(payload)=>{
    this.props.putPassword(payload)
      .then(result=>{

        Message.success(modifyPasswordTextConfig.notification)
        this.switchModal();
      })
  }
  render=()=>{

    const {darkTheme}=this.props.commonLayout;

    const isDark=darkTheme;

    const pageClasses=classnames({
      [styles["page"]]:true,
      [styles["page-dark"]]:isDark,
      ["animated"]:true,
      ["fadeIn"]:true,
    });

    const modalClasses=classnames({
      ["modal"]:true,
      ["modal-dark"]:isDark
    });

    return (
      <div className={pageClasses}>
        {this.getHeader()}
        {this.getNav()}
        {this.getContent()}
        <Modal visible={this.state.modifyPassword}
               key={`${this.state.modifyPassword}-modify-password`}
               footer={null}
               maskClosable={true}
               className={modalClasses}
               onCancel={this.switchModal}
               style={{top:"200px"}}
               title={modifyPasswordTextConfig.title}>
          <ModifyPasswordForm isDark={isDark}
                              loading={this.props.putPasswordLoading}
                              onSubmit={this.modifyPasswordHandle}/>
        </Modal>
      </div>
    )
  }
}






export default Page;
