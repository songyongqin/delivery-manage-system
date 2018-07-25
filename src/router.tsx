import * as React from 'react'
import { Router, Route, Switch, Redirect } from 'dva/router'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import { LocaleProvider } from 'antd'
import dynamic from 'dva/dynamic'
import MainWrapper from 'modules/MainWrapper'
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
import getReportPage from 'routes/Report'
import getSystemLogLoginPage from 'routes/SysLog_Login'
import getManagerMirrorPage from 'routes/Manager_Mirror'
import getSnortPage from 'routes/Snort'
import getFileRestorePage from 'routes/FileRestore'
import getAuditEventPage from 'routes/Audit_Event'
import getAuditAssetsPage from 'routes/Audit_Assets'

import getAnalyseEventViewPage from 'routes/Analyse_Event_View'
import getAnalyseAttackedPage from 'routes/Analyse_Attacked'
import getAnalyseAttackedDetailPage from 'routes/Analyse_Attacked_Detail'
import getAnalyseAttackerPage from 'routes/Analyse_Attacker'
import getAnalyseAttackerDetailPage from 'routes/Analyse_Attacker_Detail'
import getAnalyseThreatPage from 'routes/Analyse_Threat'
import getAnalyseThreatDetalPage from 'routes/Analyse_Threat_detail'
import getAuditCaughtPage from 'routes/Audit_Caught'
import getThreatReportPage from 'routes/Threat_Report'

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
  MANAGER_URL,
  REPORT_URL,
  SYS_LOG_URL,
  SYS_LOG_LOGIN_URL,
  MANAGER_MIRROR_URL,
  SNORT_URL,
  FILE_RESTORE,


  // ANALYSE_URL,

  // ANALYSE_EVENT_URL,

  ANALYSE_ATTACKED_ASSETS_URL,

  ANALYSE_ATTACKED_ASSETS_DETAL_URL,

  ANALYSE_ATTACK_URL,

  ANALYSE_ATTACK_DETAL_URL,

  ANALYSE_THREAT_URL,

  ANALYSE_THREAT_FAMILY_DETAIL_URL,

  ANALYSE_THREAT_LOOPHOLE_DETAIL_URL,

  AUDIT_URL,

  AUDIT_EVENT_URL,

  AUDIT_ASSETS_URL,


  AUDIT_CAUGHT_URL,

  STRATEGY_URL,

  CONFIG_URL,

  CONFIG_USER_MANAGER_URL,

  CONFIG_DEVICE_MANAGER_URL,

  CONFIG_SYS_LOG_URL,

  CONFIG_SYS_LOG_LOGIN_URL,

  CONFIG_SYS_CONFIG_URL,

  CONFIG_SYS_CONFIG_NETWORK_URL,

  CONFIG_SYS_CONFIG_MONITOR_URL,

  CONFIG_SYS_CONFIG_WARN_URL,
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
            <Route
              exact
              component={getAnalyseEventViewPage(app, ANALYSE_EVENT_URL)}
              path={ANALYSE_EVENT_URL} >
            </Route>
            {/* 受攻击资产视图 */}
            <Route
              exact
              component={getAnalyseAttackedPage(app, ANALYSE_ATTACKED_ASSETS_URL)}
              path={ANALYSE_ATTACKED_ASSETS_URL} >
            </Route>
            {/* 受攻击资产视图详情 */}
            <Route
              exact
              component={getAnalyseAttackedDetailPage(app, ANALYSE_ATTACKED_ASSETS_DETAL_URL)}
              path={ANALYSE_ATTACKED_ASSETS_DETAL_URL} >
            </Route>
            {/* 攻击者视图 */}
            <Route
              exact
              component={getAnalyseAttackerPage(app, ANALYSE_ATTACK_URL)}
              path={ANALYSE_ATTACK_URL} >
            </Route>
            {/* 攻击者视图详情 */}
            <Route
              exact
              component={getAnalyseAttackerDetailPage(app, ANALYSE_ATTACK_DETAL_URL)}
              path={ANALYSE_ATTACK_DETAL_URL} >
            </Route>
            {/* 威胁视图 */}
            <Route
              exact
              component={getAnalyseThreatPage(app, ANALYSE_THREAT_URL)}
              path={ANALYSE_THREAT_URL} >
            </Route>
            {/* 威胁视图详情-威胁家族 */}
            <Route
              exact
              component={getAnalyseThreatDetalPage(app, ANALYSE_THREAT_FAMILY_DETAIL_URL)}
              path={ANALYSE_THREAT_FAMILY_DETAIL_URL} >
            </Route>
            {/* 威胁视图详情-攻击利用漏洞 */}
            <Route
              exact
              component={getAnalyseThreatDetalPage(app, ANALYSE_THREAT_LOOPHOLE_DETAIL_URL)}
              path={ANALYSE_THREAT_LOOPHOLE_DETAIL_URL} >
            </Route>
            {/* 攻击链分析 */}
            {/* <Route
              exact
              component={getAnalyseAttackChainPage(app, ANALYSE_ATTACK_CHAIN_URL)}
              path={ANALYSE_ATTACK_CHAIN_URL} >
            </Route> */}
            {/* 失陷主机分析 */}
            {/* <Route
              exact
              component={getAnalyseFallHostPage(app, ANALYSE_FALL_HOST_URL)}
              path={ANALYSE_FALL_HOST_URL} >
            </Route> */}
            {/* 图表统计 */}
            {/* <Route
              exact
              component={getAnalyseRankingPage(app, ANALYSE_RANKING_URL)}
              path={ANALYSE_RANKING_URL} >
            </Route> */}
            {/* 威胁分布 */}
            {/* <Route
              exact
              component={getAnalyseThreatDistributionPage(app, ANALYSE_THREAT_DIS_URL)}
              path={ANALYSE_THREAT_DIS_URL} >
            </Route> */}
            {/* 全局分析 */}
            {/* <Route
              exact
              component={getOverallPage(app, ANALYSE_OVERALL_URL)}
              path={ANALYSE_OVERALL_URL} >
            </Route> */}
            {/* 威胁预警 */}
            {/* <Route
              exact
              path={EARLY_WARNING_URL}
              render={() => (<Redirect to={getDefaultRoute(EARLY_WARNING_URL)} />)} /> */}
            {/* 告警设置 */}
            <Route
              exact
              component={getEarlyWarningEmailPage(app, CONFIG_SYS_CONFIG_WARN_URL)}
              path={CONFIG_SYS_CONFIG_WARN_URL} >
            </Route>
            {/* 系统配置 */}
            <Route
              exact
              path={CONFIG_SYS_CONFIG_URL}
              render={() => (<Redirect to={getDefaultRoute(CONFIG_SYS_CONFIG_URL)} />)} />
            {/* 网卡配置 */}
            <Route
              exact
              component={getSysConfigNetworkPage(app, CONFIG_SYS_CONFIG_NETWORK_URL)}
              path={CONFIG_SYS_CONFIG_NETWORK_URL} >
            </Route>
            {/* 自我监控 */}
            <Route
              exact
              component={getSysConfigMonitorPage(app, CONFIG_SYS_CONFIG_MONITOR_URL)}
              path={CONFIG_SYS_CONFIG_MONITOR_URL} >
            </Route>
            {/* 策略配置 */}
            <Route
              exact
              component={getStrategyPage(app, STRATEGY_URL)}
              path={STRATEGY_URL} >
            </Route>
            {/* 蜜罐管理 */}
            {/* <Route
              exact
              path={MANAGER_URL}
              render={() => (<Redirect to={getDefaultRoute(MANAGER_URL)} />)} /> */}
            {/* 设备管理 */}
            <Route
              exact
              component={getDeviceManagerPage(app, CONFIG_DEVICE_MANAGER_URL)}
              path={CONFIG_DEVICE_MANAGER_URL} >
            </Route>
            {/* 虚拟蜜罐管理 */}
            {/* <Route
              exact
              component={getVMManagerPage(app, MANAGER_VM_URL)}
              path={MANAGER_VM_URL} >
            </Route> */}
            {/* <Route
              exact
              component={getManagerMirrorPage(app, MANAGER_MIRROR_URL)}
              path={MANAGER_MIRROR_URL} >
            </Route> */}
            {/*用户管理*/}
            <Route
              exact
              component={getUserManagerPage(app, CONFIG_USER_MANAGER_URL)}
              path={CONFIG_USER_MANAGER_URL} >
            </Route>
            {/*威胁报告*/}
            <Route
              exact
              component={getThreatReportPage(app, REPORT_URL)}
              path={REPORT_URL} >
            </Route>
            {/* 系统日志 */}
            <Route
              exact
              path={CONFIG_SYS_LOG_URL}
              render={() => (<Redirect to={getDefaultRoute(CONFIG_SYS_LOG_URL)} />)} />
            {/* 登陆日志 */}
            <Route
              exact
              component={getSystemLogLoginPage(app, CONFIG_SYS_LOG_LOGIN_URL)}
              path={CONFIG_SYS_LOG_LOGIN_URL} >
            </Route>
            {/* Snort */}
            {/* <Route
              exact
              component={getSnortPage(app, SNORT_URL)}
              path={SNORT_URL} >
            </Route> */}
            {/* 文件还原 */}
            {/* <Route
              exact
              component={getFileRestorePage(app, FILE_RESTORE)}
              path={FILE_RESTORE} >
            </Route> */}audit-assets

            <Route
              exact
              component={getAuditEventPage(app, AUDIT_EVENT_URL)}
              path={AUDIT_EVENT_URL} >
            </Route>
            <Route
              exact
              component={getAuditAssetsPage(app, AUDIT_ASSETS_URL)}
              path={AUDIT_ASSETS_URL} >
            </Route>
            <Route
              exact
              component={getAuditCaughtPage(app, AUDIT_CAUGHT_URL)}
              path={AUDIT_CAUGHT_URL} >
            </Route>
          </Switch>
        </MainWrapper>
      </LocaleProvider>

    </Router>
  );
}


