import * as React from 'react'
import { Router, Route, Switch, Redirect } from 'dva/router'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import { LocaleProvider } from 'antd'
import dynamic from 'dva/dynamic'
import MainWrapper from 'containers/MainWrapper'
import getLoginPage from 'routes/Login'
import getOverviewPage from 'routes/Overview'
import getThreatAnalyseEventPage from 'routes/ThreatAnalyse_Event'
import {
  OVERVIEW_URL,
  LOGIN_URL,
  ANALYSE_EVENT_URL,
  ANALYSE_URL,
} from 'routes/config/path'

function RouterConfig({ history, app }) {
  return (
    <Router history={history}>
      <LocaleProvider locale={zhCN}>
        <MainWrapper>
          <Switch>
            <Route
              exact
              path="/"
              render={() => (<Redirect to={OVERVIEW_URL} />)} />
            <Route
              path={LOGIN_URL}
              exact
              component={getLoginPage(app, LOGIN_URL)}>
            </Route>
            <Route
              path={OVERVIEW_URL}
              exact
              component={getOverviewPage(app, OVERVIEW_URL)} />
            <Route
              exact
              path={ANALYSE_URL}
              render={() => (<Redirect to={ANALYSE_EVENT_URL} />)} />
            {/* <Route
              exact
              component={getThreatAnalyseEventPage(app, ANALYSE_EVENT_URL)}
              path={ANALYSE_EVENT_URL} >
            </Route> */}
          </Switch>
        </MainWrapper>
      </LocaleProvider>

    </Router>
  );
}

export default RouterConfig
