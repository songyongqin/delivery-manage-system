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
import getAnalyseThreatDistributionPage from 'routes/Analyse_ThreatDistribution'
import getSysConfigMonitorPage from 'routes/SysConfig_Monitor'
import getSysConfigNetworkPage from 'routes/SysConfig_Network'
import getDeviceManagerPage from 'routes/Manager_Device'
import getUserManagerPage from 'routes/UserManager'
import getVMManagerPage from 'routes/Manager_VM'
import getStrategyPage from 'routes/SysConfig_Strategy'
import getOverallPage from 'routes/Analyse_Overall'
import {
  OVERVIEW_URL,
  LOGIN_URL,
  ANALYSE_EVENT_URL,
  ANALYSE_URL,
  ANALYSE_ATTACK_CHAIN_URL,
  ANALYSE_RANKING_URL,
  ANALYSE_FALL_HOST_URL,
  ANALYSE_THREAT_DIS_URL,
  ANALYSE_OVERALL_URL,
  EARLY_WARNING_URL,
  EARLY_WARNING_EMAIL_URL,
  SYS_CONFIG_URL,
  SYS_CONFIG_MONITOR_URL,
  SYS_CONFIG_NETWORK_URL,
  SYS_CONFIG_STRATEGY_URL,
  MANAGER_DEVICE_URL,
  USER_MANAGER_URL,
  MANAGER_VM_URL,
  ROOT_URL,
  MANAGER_URL
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
              component={getAnalyseThreatDistributionPage(app, ANALYSE_THREAT_DIS_URL)}
              path={ANALYSE_THREAT_DIS_URL} >
            </Route>
            <Route
              exact
              component={getOverallPage(app, ANALYSE_OVERALL_URL)}
              path={ANALYSE_OVERALL_URL} >
            </Route>
            {/* 威胁预警 */}
            <Route
              exact
              path={EARLY_WARNING_URL}
              render={() => (<Redirect to={getDefaultRoute(EARLY_WARNING_URL)} />)} />
            <Route
              exact
              component={getEarlyWarningEmailPage(app, EARLY_WARNING_EMAIL_URL)}
              path={EARLY_WARNING_EMAIL_URL} >
            </Route>
            {/* 系统配置 */}
            <Route
              exact
              path={SYS_CONFIG_URL}
              render={() => (<Redirect to={getDefaultRoute(SYS_CONFIG_URL)} />)} />
            <Route
              exact
              component={getSysConfigNetworkPage(app, SYS_CONFIG_NETWORK_URL)}
              path={SYS_CONFIG_NETWORK_URL} >
            </Route>
            <Route
              exact
              component={getSysConfigMonitorPage(app, SYS_CONFIG_MONITOR_URL)}
              path={SYS_CONFIG_MONITOR_URL} >
            </Route>
            <Route
              exact
              component={getStrategyPage(app, SYS_CONFIG_STRATEGY_URL)}
              path={SYS_CONFIG_STRATEGY_URL} >
            </Route>
            {/* 设备管理 */}
            <Route
              exact
              path={MANAGER_URL}
              render={() => (<Redirect to={getDefaultRoute(MANAGER_URL)} />)} />
            <Route
              exact
              component={getDeviceManagerPage(app, MANAGER_DEVICE_URL)}
              path={MANAGER_DEVICE_URL} >
            </Route>
            <Route
              exact
              component={getVMManagerPage(app, MANAGER_VM_URL)}
              path={MANAGER_VM_URL} >
            </Route>

            <Route
              exact
              component={getUserManagerPage(app, USER_MANAGER_URL)}
              path={USER_MANAGER_URL} >
            </Route>


          </Switch>
        </MainWrapper>
      </LocaleProvider>

    </Router>
  );
}


