"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var styles = require("./styles.css");
var antd_1 = require("antd");
var classnames = require("classnames");
var Nav_1 = require("./components/Nav");
var LayoutIOperateList_1 = require("./components/LayoutIOperateList");
var dva_1 = require("dva");
var dvaExtraDispatch_1 = require("../../utils/dvaExtraDispatch");
var ConstConfig_1 = require("../UserManager/ConstConfig");
var ConstConfig_2 = require("./ConstConfig");
var ModifyPasswordForm_1 = require("./components/ModifyPasswordForm");
var NAMESPACE = "main";
function mapStateToProps(state) {
    return _a = {},
        _a[NAMESPACE] = state[NAMESPACE],
        _a.layout = state.layout,
        _a.commonLayout = state.layout.commonLayout,
        _a.routeConfig = state.layout.routeConfig,
        _a.languageConfig = state.layout.languageConfig,
        _a.userData = state.user.userData,
        _a.putPasswordLoading = state.loading["user/putPassword"],
        _a.productType = state.user.productType.type,
        _a;
    var _a;
}
function mapDispatchToProps(dispatch, ownProps) {
    return {
        dispatch: dispatch,
        setCommonLayout: function (payload) {
            return dispatch({
                type: "layout/setCommonLayout",
                payload: __assign({}, payload)
            });
        },
        deleteSign: function (payload) {
            return dispatch({
                type: "user/deleteSign",
                payload: __assign({}, payload)
            });
        },
        putPassword: function (payload) {
            return dispatch({
                type: "user/putPassword",
                payload: __assign({}, payload)
            });
        },
        initConfig: function () { return dispatch({
            type: "main/query"
        }); }
    };
}
var Page = (function (_super) {
    __extends(Page, _super);
    function Page(props) {
        var _this = _super.call(this, props) || this;
        _this.componentDidMount = function () {
            // this.props.initConfig();
        };
        _this.switchModal = function () {
            _this.setState({
                modifyPassword: !_this.state.modifyPassword
            });
        };
        _this.createSetCommonLayoutHandle = function (type, value) {
            return function () {
                _this.props.setCommonLayout((_a = {},
                    _a[type] = value,
                    _a));
                var _a;
            };
        };
        _this.getNav = function () {
            var _a = _this.props, languageConfig = _a.languageConfig, commonLayout = _a.commonLayout, routeConfig = _a.routeConfig, userData = _a.userData;
            var navMini = commonLayout.navMini, language = commonLayout.language, darkTheme = commonLayout.darkTheme;
            var classes = classnames((_b = {},
                _b[styles["nav-wrapper"]] = true,
                _b[styles["nav-wrapper-mini"]] = navMini,
                _b));
            return (<div className={classes}>
        <Nav_1.default isMini={navMini} activeKey={window.location.hash.substr(1)} isDark={darkTheme} isAdmin={userData.isAdmin} productType={_this.props.productType} routeConfig={routeConfig} titleConfig={languageConfig[language].routes}/>
      </div>);
            var _b;
        };
        _this.getContent = function () {
            var commonLayout = _this.props.commonLayout;
            var navMini = commonLayout.navMini;
            var classes = classnames((_a = {},
                _a[styles["content-wrapper"]] = true,
                _a[styles["content-wrapper-common"]] = !navMini,
                _a[styles["content-wrapper-expand"]] = navMini,
                _a));
            return (<div className={classes}>
        <div className={styles["main-children-wrapper"]}>
          {_this.props.children}
        </div>
        <antd_1.BackTop style={{ right: "30px" }}/>
      </div>);
            var _a;
        };
        _this.getLayoutOperateList = function () {
            var _a = _this.props.commonLayout, darkTheme = _a.darkTheme, navMini = _a.navMini, language = _a.language;
            var status = {
                nav: navMini,
                theme: darkTheme,
                lang: language === "zh-cn",
            };
            var handle = {
                nav: _this.createSetCommonLayoutHandle("navMini", !navMini),
                theme: _this.createSetCommonLayoutHandle("darkTheme", !darkTheme),
                lang: _this.createSetCommonLayoutHandle("language", language === "zh-cn" ? "en-us" : "zh-cn")
            };
            return (<LayoutIOperateList_1.default status={status} isDark={darkTheme} handle={handle}/>);
        };
        _this.getHeader = function () {
            var _a = _this.props, languageConfig = _a.languageConfig, commonLayout = _a.commonLayout;
            var language = commonLayout.language, darkTheme = commonLayout.darkTheme;
            document.title = languageConfig[language].title;
            document.body.style.background = darkTheme ? "rgb(28,35,59)" : "#F1F1F1";
            var headerClasses = classnames((_b = {},
                _b[styles["header"]] = true,
                _b[styles["header-dark"]] = darkTheme,
                _b));
            return (<header className={headerClasses}>
        <div className={styles["header-left"]}>
          {_this.getLayoutOperateList()}
        </div>
        {_this.getHeaderRight()}
        <h1 className={styles["title"]}>
          {languageConfig[language].title}
        </h1>
      </header>);
            var _b;
        };
        _this.getHeaderRight = function () {
            var _a = _this.props.userData, userAccount = _a.userAccount, role = _a.role;
            var menu = (<antd_1.Menu>
        <antd_1.Menu.ItemGroup key="message" title={<div style={{ padding: "5px 10px" }}>
            <span style={{ color: "#108ee9", fontWeight: "900" }}>{userAccount}</span>
            <span>{ConstConfig_1.tableTextConfig.enums.role[role]}</span>
          </div>}>
        </antd_1.Menu.ItemGroup>
        <antd_1.Menu.Item key="modify-password">
          <a onClick={_this.switchModal}>
            <antd_1.Icon type="lock"/>&nbsp;&nbsp;修改密码
          </a>
        </antd_1.Menu.Item>
        <antd_1.Menu.Item key="sign-out">
          <a onClick={_this.props.deleteSign}>
            <antd_1.Icon type="logout"/>&nbsp;&nbsp;注销
          </a>
        </antd_1.Menu.Item>
      </antd_1.Menu>);
            return (<div className={styles["header-right"]}>

        <span>欢迎回来，</span>
        <antd_1.Dropdown overlay={menu}>
          <a style={{ color: "#108EE9" }}>
            {userAccount}
             <antd_1.Icon type="down"/>
          </a>
        </antd_1.Dropdown>
      </div>);
        };
        _this.modifyPasswordHandle = function (payload) {
            _this.props.putPassword(payload)
                .then(function (result) {
                antd_1.message.success(ConstConfig_2.modifyPasswordTextConfig.notification);
                _this.switchModal();
            });
        };
        _this.render = function () {
            // if(!this.props[NAMESPACE].isInit){
            //   return null;
            // }
            if (_this.props.location.pathname === "/login") {
                return _this.props.children;
            }
            var darkTheme = _this.props.commonLayout.darkTheme;
            var isDark = darkTheme;
            var pageClasses = classnames((_a = {},
                _a[styles["page"]] = true,
                _a[styles["page-dark"]] = isDark,
                _a));
            var modalClasses = classnames((_b = {},
                _b["modal"] = true,
                _b["modal-dark"] = isDark,
                _b));
            return (<div className={pageClasses}>
        {_this.getHeader()}
        {_this.getNav()}
        {_this.getContent()}
        <antd_1.Modal visible={_this.state.modifyPassword} key={_this.state.modifyPassword + "-modify-password"} footer={null} maskClosable={true} className={modalClasses} onCancel={_this.switchModal} style={{ top: "200px" }} title={ConstConfig_2.modifyPasswordTextConfig.title}>
          <ModifyPasswordForm_1.default isDark={isDark} loading={_this.props.putPasswordLoading} onSubmit={_this.modifyPasswordHandle}/>
        </antd_1.Modal>
      </div>);
            var _a, _b;
        };
        _this.state = {
            loading: false,
            modifyPassword: false
        };
        document.body.style.overflowX = "hidden";
        return _this;
    }
    return Page;
}(React.Component));
Page = __decorate([
    dva_1.connect(mapStateToProps, dvaExtraDispatch_1.createMapDispatchWithPromise(mapDispatchToProps))
], Page);
exports.default = Page;
