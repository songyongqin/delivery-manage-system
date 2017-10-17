"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by jojo on 2017/10/11.
 */
var antd_1 = require("antd");
var react_1 = require("react");
var dva_1 = require("dva");
var classnames = require("classnames");
var WithConnectCard = function (props) {
    var finalProps = __assign({}, props);
    delete finalProps.isDark;
    delete finalProps.dispatch;
    return <antd_1.Card {...finalProps} className={classnames((_a = {},
        _a[props.className || ""] = true,
        _a["card-dark"] = props.isDark,
        _a["card"] = true,
        _a))}/>;
    var _a;
};
var mapStateToProps = function (state) { return ({
    isDark: state.layout.commonLayout.darkTheme
}); };
exports.default = dva_1.connect(mapStateToProps)(WithConnectCard);
//# sourceMappingURL=index.jsx.map