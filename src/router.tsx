import * as React from 'react'
import { Router, Route, Switch, Redirect } from 'dva/router'
// import zhCN from 'antd/lib/locale-provider/zh_CN'
import zhCN from 'antd/es/locale/zh_CN';
import { LocaleProvider } from 'antd'
import dynamic from 'dva/dynamic'
import MainWrapper from 'modules/MainWrapper'
import getLoginPage from 'routes/Login'
import getOverviewPage from 'routes/Overview'

import {
  OVERVIEW_URL,
  LOGIN_URL,
  ANALYSE_EVENT_URL,
  ANALYSE_URL,
  ROOT_URL,
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
            {/* 威胁概览 */}
            <Route
              path={OVERVIEW_URL}
              exact
              component={getOverviewPage(app, OVERVIEW_URL)} />
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


