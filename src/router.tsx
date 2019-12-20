import * as React from 'react'
import { Router, Route, Switch, Redirect } from 'dva/router'
// import zhCN from 'antd/lib/locale-provider/zh_CN'
import zhCN from 'antd/es/locale/zh_CN';
import { LocaleProvider } from 'antd'
import dynamic from 'dva/dynamic'
import MainWrapper from 'modules/MainWrapper'
import getLoginPage from 'routes/Login'
import getOverviewPage from 'routes/Overview'

//syq
import getHomePage from 'routes/Home'
import getSystemPage from 'routes/System'


import {
  LOGIN_URL,
  ANALYSE_URL,
  ROOT_URL,

  HOME_URL,
  PROJECT_URL,
  CUSTOMER_URL,
  FILE_URL,
  SYSTEM_URL,
  USER_URL
} from 'routes/config/path'
import { getNavConfig, getDefaultRoute } from 'navConfig'


export default ({ history, app }) => {
  return (
    <Router history={history}>
      <LocaleProvider locale={zhCN}>
        <MainWrapper>
          <Switch>
            <Route
              exact
              path="/"
              render={() => (<Redirect to={getDefaultRoute(ROOT_URL)} />)} />
            {/* 登录 */}
            <Route
              path={LOGIN_URL}
              exact
              component={getLoginPage(app, LOGIN_URL)}>
            </Route>
            {/* 首页 */}
            <Route
              path={HOME_URL}
              exact
              component={getHomePage(app, HOME_URL)} />

            {/* 项目管理 */}
            <Route
              path={PROJECT_URL}
              exact
              component={getOverviewPage(app, PROJECT_URL)} />
            {/* 文档类型管理 */}
            {/* <Route
              path={FILE_URL}
              exact
              component={getOverviewPage(app, FILE_URL)} /> */}
            {/* 系统日志 */}
            <Route
              path={SYSTEM_URL}
              exact
              component={getSystemPage(app, SYSTEM_URL)} />
            {/* 用户管理 */}
            {/* <Route
              path={USER_URL}
              exact
              component={getOverviewPage(app, USER_URL)} /> */}
            {/* 威胁分析 */}
            <Route
              exact
              path={ANALYSE_URL}
              render={() => (<Redirect to={getDefaultRoute(ANALYSE_URL)} />)} />
            {/* 事件视图 */}
          </Switch>
        </MainWrapper>
      </LocaleProvider>

    </Router>
  );
}


