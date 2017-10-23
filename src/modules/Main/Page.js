import React from 'react';
import styles from './styles.css'
import { Menu, Button, Breadcrumb, Spin, Modal, Table, BackTop, Dropdown, Icon, message as Message } from 'antd';
import classnames from 'classnames';
import Nav from './components/Nav';
import LayoutOperateList from './components/LayoutIOperateList'
import { connect } from 'dva';
import { createMapDispatchWithPromise } from "../../utils/dvaExtraDispatch";
import { tableTextConfig } from '../UserManager/ConstConfig';
import { modifyPasswordTextConfig } from './ConstConfig';
import ModifyPasswordForm from './components/ModifyPasswordForm';


const NAMESPACE = "main";

function mapStateToProps(state) {


  return {
    [NAMESPACE]: state[NAMESPACE],
    layout: state.layout,
    commonLayout: state.layout.commonLayout,
    routeConfig: state.layout.routeConfig,
    languageConfig: state.layout.languageConfig,
    userData: state.user.userData,
    putPasswordLoading: state.loading["user/putPassword"],
    productType: state.user.productType.type,
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    dispatch,
    setCommonLayout: (payload) => {
      return dispatch({
        type: "layout/setCommonLayout",
        payload: {
          ...payload
        }
      })
    },
    deleteSign: (payload) => {
      return dispatch({
        type: "user/deleteSign",
        payload: {
          ...payload,
        }
      })
    },
    putPassword: (payload) => {
      return dispatch({
        type: "user/putPassword",
        payload: {
          ...payload,
        }
      })
    },
    initConfig: () => dispatch({
      type: "main/query"
    })
  }
}

@connect(mapStateToProps, createMapDispatchWithPromise(mapDispatchToProps))
class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      modifyPassword: false
    }

    document.body.style.overflowX = "hidden";

  }
  componentDidMount = () => {
    this.props.initConfig();
  }
  switchModal = () => {
    this.setState({
      modifyPassword: !this.state.modifyPassword
    })
  }
  createSetCommonLayoutHandle = (type, value) => {
    return () => {
      this.props.setCommonLayout({
        [type]: value,
      })
    }
  };

  getNav = () => {
    const { languageConfig, commonLayout, routeConfig, userData } = this.props;
    const { navMini, language, darkTheme } = commonLayout;

    const classes = classnames({
      [styles["nav-wrapper"]]: true,
      [styles["nav-wrapper-mini"]]: navMini,
      // ["animated"]:true,
      // ["fadeInLeft"]:true,
    });
    return (
      <div className={classes}>
        <Nav isMini={navMini}
          activeKey={window.location.hash.substr(1)}
          isDark={darkTheme}
          isAdmin={userData.isAdmin}
          productType={this.props.productType}
          routeConfig={routeConfig}
          titleConfig={languageConfig[language].routes} />
      </div>
    )
  };

  getContent = () => {
    const { commonLayout } = this.props;
    const { navMini } = commonLayout;

    let classes = classnames({
      [styles["content-wrapper"]]: true,
      [styles["content-wrapper-common"]]: !navMini,
      [styles["content-wrapper-expand"]]: navMini,
      // ["animated"]:true,
      // ["zoomIn"]:true,
      // ["fadeIn"]:true,
    });

    return (
      <div className={classes}>
        <div className={styles["main-children-wrapper"]}>
          {this.props.children}
        </div>
        <BackTop style={{ right: "30px" }} />
      </div>
    )
  };

  getLayoutOperateList = () => {

    const { darkTheme, navMini, language } = this.props.commonLayout;

    const status = {
      nav: navMini,
      theme: darkTheme,
      lang: language === "zh-cn",
    };

    const handle = {
      nav: this.createSetCommonLayoutHandle("navMini", !navMini),
      theme: this.createSetCommonLayoutHandle("darkTheme", !darkTheme),
      lang: this.createSetCommonLayoutHandle("language", language === "zh-cn" ? "en-us" : "zh-cn")
    };

    return (
      <LayoutOperateList status={status}
        isDark={darkTheme}
        handle={handle} />
    )
  };

  getHeader = () => {
    const { languageConfig, commonLayout } = this.props;
    const { language, darkTheme } = commonLayout;

    document.title = languageConfig[language].title;
    document.body.style.background = darkTheme ? "rgb(28,35,59)" : "#F1F1F1";
    const headerClasses = classnames({
      [styles["header"]]: true,
      [styles["header-dark"]]: darkTheme,
      // ["animated"]:true,
      // ["fadeInDown"]:true,
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
  getHeaderRight = () => {

    const { userAccount, role, isAdmin } = this.props.userData;

    const tipTextConfig = {
      admin: "说明：管理员属于授权用户,可对系统所有界面进行查看和操作",
      common: "说明：普通用户属于非授权用户，可对系统部分界面进行查看和操作"
    }

    const menu = (
      <Menu>
        <Menu.ItemGroup key="message" title={
          <div style={{ padding: "5px 10px" }}>
            <span style={{ color: "#108ee9", fontWeight: "900" }}>{userAccount}</span>
            &nbsp;&nbsp;
            <span>{tableTextConfig.enums.role[role]}</span>
          </div>
        }>
        </Menu.ItemGroup>
        <Menu.ItemGroup key="tip">
          <p style={{
            maxWidth: "240px",
            overflow: "hidden",
            wordBreak: "break-all",
            padding: "5px",
            color: "#cccccc"
          }}>
            {isAdmin ? tipTextConfig.admin : tipTextConfig.common}
          </p>
        </Menu.ItemGroup>
        <Menu.Item key="modify-password">
          <a onClick={this.switchModal}>
            <Icon type="lock" />&nbsp;&nbsp;修改密码
          </a>
        </Menu.Item>
        <Menu.Item key="sign-out">
          <a onClick={this.props.deleteSign}>
            <Icon type="logout" />&nbsp;&nbsp;注销
          </a>
        </Menu.Item>
      </Menu>
    );

    return (
      <div className={styles["header-right"]}>

        <span>欢迎回来，</span>
        <Dropdown overlay={menu}>
          <a style={{ color: "#108EE9" }}>
            {userAccount}
            <Icon type="down" />
          </a>
        </Dropdown>
      </div>
    )
  }
  modifyPasswordHandle = (payload) => {
    this.props.putPassword(payload)
      .then(result => {

        Message.success(modifyPasswordTextConfig.notification)
        this.switchModal();
      })
  }
  render = () => {

    // if(!this.props[NAMESPACE].isInit){
    //   return null;
    // }

    if (this.props.location.pathname === "/login") {
      return this.props.children;
    }
    const { darkTheme } = this.props.commonLayout;

    const isDark = darkTheme;

    const pageClasses = classnames({
      [styles["page"]]: true,
      [styles["page-dark"]]: isDark,
      // ["animated"]:true,
      // ["fadeIn"]:true,
    });

    const modalClasses = classnames({
      ["modal"]: true,
      ["modal-dark"]: isDark
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
          style={{ top: "200px" }}
          title={modifyPasswordTextConfig.title}>
          <ModifyPasswordForm isDark={isDark}
            loading={this.props.putPasswordLoading}
            onSubmit={this.modifyPasswordHandle} />
        </Modal>
      </div>
    )
  }
}






export default Page;
