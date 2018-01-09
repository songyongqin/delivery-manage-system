import React from 'react';
import styles from './styles.css'
import {
  Menu,
  Button,
  Breadcrumb,
  Spin,
  Modal,
  Table,
  BackTop,
  Card,
  Dropdown,
  Icon,
  message as Message,
  Badge,
  Popover,
  Row,
  Col,
  Steps,
  Tooltip,
  Collapse
} from 'antd';
import classnames from 'classnames';
import Nav from './components/Nav';
import LayoutOperateList from './components/LayoutIOperateList'
import { connect } from 'dva';
import { createMapDispatchWithPromise } from "../../utils/dvaExtraDispatch";
import { tableTextConfig } from '../UserManager/ConstConfig';
import { modifyPasswordTextConfig } from './ConstConfig';
import ModifyPasswordForm from './components/ModifyPasswordForm';
import {
  NAMESPACE as VM_NAMESPACE
} from '../../modules/Manager_Virtual/ConstConfig'
import { getTemp } from '../../utils/tools'
import { HONEYPOT_CREATE_LIST_CACHE_NAMESPACE } from '../../modules/Manager_Virtual/Model'
import { NODE, IDS, STAND_ALONE, IDS_STAND_ALONE, DISTRIBUTION } from "configs/ConstConfig"
import { NAMESPACE as DEVICE_MANAGER_NAMESPACE } from 'modules/Manager_Device/ConstConfig'
import { ID_DATAINDEX } from 'modules/Manager_Virtual/ConstConfig'
const NAMESPACE = "main";

const honeypotCreateStatusTip = {
  0: "正在获取蜜罐创建状态",
  1: "等待蜜罐获取配置",
  2: "蜜罐成功获取配置信息,等待蜜罐配置完成",
  3: "正在创建快照",
  4: "蜜罐创建成功"
}

const FINAL_CREATE_STATUS = 4


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
    productInfo: state.user.productType,
    honeypotCreateList: state[VM_NAMESPACE].createList,
    createStatusPanelVisible: state[VM_NAMESPACE].createStatusPanelVisible

  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    dispatch,
    changeOverdueTipVisible: payload => dispatch({
      type: `${DEVICE_MANAGER_NAMESPACE}/changeOverdueTipVisible`,
      payload
    }),
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
    }),
    getStatus: payload => dispatch({
      type: `${VM_NAMESPACE}/getStatus`,
      payload,
    }),
    removeCreateStatus: payload => dispatch({
      type: `${VM_NAMESPACE}/removeCreateStatus`,
      payload,
    }),
    switchStatusPanel: payload => dispatch({
      type: `${VM_NAMESPACE}/switchStatusPanel`,
      payload,
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

    const { languageConfig, commonLayout } = props;
    const { language, darkTheme } = commonLayout;

    // document.title = (props.languageConfig[language] || {}).title;

  }
  componentDidMount = () => {
    this.props.initConfig();
    this.getTempCreateListStatus();
  }
  getTempCreateListStatus = () => {
    let createList = getTemp(HONEYPOT_CREATE_LIST_CACHE_NAMESPACE) || {};
    Object.keys(createList).forEach(honeypotId => this.props.getStatus({ honeypotId }))
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
          changeOverdueTipVisible={this.props.changeOverdueTipVisible}
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

    let footerClasses = classnames({
      [styles["footer"]]: true,
      [styles["footer-dark"]]: commonLayout.darkTheme,
      ["lbl-dark"]: commonLayout.darkTheme
    })

    return (
      <div className={classes}>
        <div className={styles["main-children-wrapper"]} id="main-children-wrapper">
          {this.props.children}
        </div>
        <BackTop style={{ right: "30px" }} />
        <footer>
          <p className={footerClasses}>
            © 2017 Antiy Labs
          </p>
        </footer>
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

    document.title = (languageConfig[language] || {}).title;
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
    const { honeypotCreateList, createStatusPanelVisible, productInfo, productType } = this.props;

    const tipTextConfig = {
      admin: "说明：管理员属于授权用户,可对系统所有界面进行查看和操作",
      common: "说明：普通用户属于非授权用户，可对系统部分界面进行查看和操作"
    }

    const tipStyle = {
      maxWidth: "240px",
      overflow: "hidden",
      wordBreak: "break-all",
      color: "#cccccc"
    }
    const menu = (
      <Menu>
        <Menu.ItemGroup key="message" title={
          <div style={{ padding: "5px" }}>
            <span style={{ color: "#108ee9", fontWeight: "900" }}>{userAccount}</span>
            &nbsp;&nbsp;
            <span>{tableTextConfig.enums.role[role]}</span>
            <div style={tipStyle}>
              {isAdmin ? tipTextConfig.admin : tipTextConfig.common}
            </div>
          </div>
        }>
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

    const honeypotCreateListData = [...Object.entries(honeypotCreateList)].reverse();
    const createStatus = (
      <div style={{ width: "400px", maxHeight: "700px", overflowY: "scroll", overflowX: "hidden" }}>
        {
          honeypotCreateListData.length === 0
            ?
            <p style={{ textAlign: "center", height: "50px", lineHeight: "50px" }}>
              <Icon type="frown"></Icon>&nbsp;没有正在创建的蜜罐
            </p>
            :
            <Collapse defaultActiveKey={honeypotCreateListData.map((i, index) => `${index}-row`)}>
              {
                honeypotCreateListData.map(([honeypotId, { data, status, error }], index) => {
                  const iconStyle = { color: "#108ee9", fontSize: "40px" },
                    closable = status === FINAL_CREATE_STATUS || error
                  return (
                    <Collapse.Panel
                      key={`${index}-row`}
                      header={<div >
                        {`蜜罐名称:${data.honeypotName}`}
                        <div style={{ float: "right" }}>
                          <Button
                            onClick={() => this.props.removeCreateStatus({ [ID_DATAINDEX]: honeypotId })}
                            icon="close"
                            size="small"
                            style={{ marginRight: "10px" }}
                            disabled={!closable}>
                          </Button>
                        </div>
                      </div>}
                      style={{ marginBottom: "10px" }}>
                      <Row gutter={20}>
                        <Col span={4} style={{ height: "40px", lineHeight: "40px", textAlign: "center" }}>
                          {
                            status === FINAL_CREATE_STATUS && !error
                            &&
                            <Icon type="check-circle-o" style={iconStyle} />
                          }
                          {
                            status !== FINAL_CREATE_STATUS && !error
                            &&
                            <Icon type="loading" style={iconStyle}></Icon>
                          }
                          {
                            error
                            &&
                            <Tooltip title="错误">
                              <Icon type="close-circle-o" style={{ ...iconStyle, color: "red" }} />
                            </Tooltip>

                          }
                        </Col>
                        <Col span={20} className={error ? styles["step-error"] : ""} style={{ paddingLeft: "20px" }} >
                          {/* <p style={{ marginBottom: "15px" }}>创建状态</p> */}
                          <Steps direction="vertical" size="small" current={status} >
                            {
                              [0, 1, 2, 3, 4].map((i, index) => <Steps.Step
                                key={`${i}-step`}
                                description={honeypotCreateStatusTip[i]} />)
                            }
                          </Steps>
                        </Col>
                      </Row>
                    </Collapse.Panel>
                  )
                })
              }
            </Collapse>
        }
      </div>
    )

    const creatingCount = honeypotCreateListData.filter(([honeypotId, item]) => item.status !== FINAL_CREATE_STATUS).length;


    return (
      <div className={styles["header-right"]}>
        <p style={{ marginRight: "10px", display: "inline-block" }}>
          {
            productInfo.type === NODE
            &&
            <Tooltip title="此为该蜜罐节点主机的IP，用于区分不同的蜜罐节点">
              蜜罐节点：<span style={{ color: "#108ee9" }}>{`${productInfo.ip}`}</span>
            </Tooltip>
          }
          {
            productInfo.type === IDS
            &&
            <Tooltip title="此为该流量监测设备节点主机的IP，用于区分不同的流量监测设备节点">
              流量监测设备节点：<span style={{ color: "#108ee9" }}>{`${productInfo.ip}`}</span>
            </Tooltip>
          }
        </p>
        <span>欢迎回来，</span>
        <Dropdown overlay={menu}>
          <a style={{ color: "#108EE9" }}>
            {userAccount}
            <Icon type="down" />
          </a>
        </Dropdown>
        &nbsp;&nbsp;&nbsp;
        {
          (productType === DISTRIBUTION || productType === STAND_ALONE)
            ?
            <Popover
              trigger="click"
              onVisibleChange={value => this.props.switchStatusPanel(value)}
              visible={createStatusPanelVisible}
              title={<p><Icon type="desktop" />&nbsp;&nbsp;蜜罐虚拟机创建状态</p>}
              placement="bottomRight"
              content={createStatus}>
              <Badge count={creatingCount}>
                <a>
                  <Icon type="notification"></Icon>
                </a>
              </Badge>
            </Popover>
            :
            null
        }
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
