import * as React from 'react'
import { Router, Route, Switch, Redirect } from 'dva/router'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import { LocaleProvider } from 'antd'
import dynamic from 'dva/dynamic'
import MainWrapper from 'containers/MainWrapper'
import getLoginPage from 'routes/Login'
import getOverviewPage from 'routes/Overview'
import getAnalyseEventPage from 'routes/Analyse_Event'
import getAnalyseAttackChainPage from 'routes/Analyse_AttackChain'
import getAnalyseFallHostPage from 'routes/Analyse_FallHost'
import getEarlyWarningEmailPage from 'routes/EarlyWarning_Email'
import getAnalyseRankingPage from 'routes/Analyse_Ranking'
import {
  OVERVIEW_URL,
  LOGIN_URL,
  ANALYSE_EVENT_URL,
  ANALYSE_URL,
  ANALYSE_ATTACK_CHAIN_URL,
  ANALYSE_RANKING_URL,
  ANALYSE_FALL_HOST_URL,
  EARLY_WARNING_URL,
  EARLY_WARNING_EMAIL_URL
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
            <Route
              exact
              component={getAnalyseEventPage(app, ANALYSE_EVENT_URL)}
              path={ANALYSE_EVENT_URL} >
            </Route>
            <Route
              exact
              component={getAnalyseAttackChainPage(app, ANALYSE_ATTACK_CHAIN_URL)}
              path={ANALYSE_ATTACK_CHAIN_URL} >
            </Route>
            <Route
              exact
              component={getAnalyseFallHostPage(app, ANALYSE_FALL_HOST_URL)}
              path={ANALYSE_FALL_HOST_URL} >
            </Route>
            <Route
              exact
              component={getAnalyseRankingPage(app, ANALYSE_RANKING_URL)}
              path={ANALYSE_RANKING_URL} >
            </Route>
            <Route
              exact
              path={EARLY_WARNING_URL}
              render={() => (<Redirect to={EARLY_WARNING_EMAIL_URL} />)} />
            <Route
              exact
              component={getEarlyWarningEmailPage(app, EARLY_WARNING_EMAIL_URL)}
              path={EARLY_WARNING_EMAIL_URL} >
            </Route>
          </Switch>
        </MainWrapper>
      </LocaleProvider>

    </Router>
  );
}

export default RouterConfig
