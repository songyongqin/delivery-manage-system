import React from 'react';
import { Router, Route, IndexRedirect, Redirect } from 'dva/router';
// import getRegisterModel from './utils/dvaRegisterModel';


import Main from './modules/Main/Page';

import Login from './modules/User/Page';

import Overview from './modules/Overview/Page';

import Analyse from './modules/Analyse/Page';

import AnalyseEvent from './modules/Analyse_Event/Page';
import AnalyseAttackChain from './modules/Analyse_AttackChain/Page';
import AnalyseFallHost from './modules/Analyse_FallHost/Page';
import AnalyseRanking from './modules/Analyse_Ranking/Page'
import AnalyseThreatDistribution from './modules/Analyse_ThreatDistribution/Page';
import AnalyseOverall from './modules/Analyse_Overall/Page';

import EarlyWarning from './modules/EarlyWarning/Page';
import EarlyWarningEmail from './modules/EarlyWarning_Email/Page'

import Report from './modules/Report/Page';


import SysConfig from './modules/SysConfig/Page';
import SysConfigNetwork from './modules/SysConfig_Network/Page';
import SysConfigMonitor from './modules/SysConfig_Monitor/Page';
import SysConfigStrategy from './modules/SysConfig_Strategy/Page';


import Manager from './modules/Manager/Page';
import ManagerDevice from './modules/Manager_Device/Page';
import ManagerVirtual from './modules/Manager_Virtual/Page';
import ManagerMirror from './modules/Manager_Mirror/Page';

import ThreatEvent from './modules/ThreatEvent/Page';

import UserManager from './modules/UserManager/Page';

import WhiteList from './modules/SysConfig_Strategy_WhiteList/Page';

import SystemLog from './modules/SystemLog/Page';
import SystemLogLogin from './modules/SystemLog_Login/Page';

import Snort from 'modules/Snort/Page'


function RouterConfig({ history, app }) {

  // const registerModel=getRegisterModel(app);

  return (
    <Router history={history} >


      <Route path="/"
        components={Main}>
        <Route path="/login" component={Login} />

        <IndexRedirect to="overview" />
        <Route path="overview" components={Overview} />
        <Route path="analyse" components={Analyse}>
          <IndexRedirect to="event" />
          <Route path="event" components={AnalyseEvent} />
          <Route path="attack-chain" components={AnalyseAttackChain} />
          <Route path="fall-host" components={AnalyseFallHost} />
          <Route path="ranking" components={AnalyseRanking} />
          <Route path="threat-distribution" components={AnalyseThreatDistribution} />
          <Route path="overall" components={AnalyseOverall} />
        </Route>
        <Route path="early-warning" components={EarlyWarning}>
          <IndexRedirect to="email" />
          <Route path="email" components={EarlyWarningEmail} />
        </Route>
        <Route path="report" components={Report} />
        <Route path="sys-config" components={SysConfig}>
          <IndexRedirect to="network" />
          <Route path="network" components={SysConfigNetwork} />
          <Route path="monitor" components={SysConfigMonitor} />
          <Route path="strategy" components={SysConfigStrategy} />
          {/* <Route path="white-list" components={WhiteList}/> */}
        </Route>
        <Route path="manager" components={Manager}>
          <IndexRedirect to="device" />
          <Route path="device" components={ManagerDevice} />
          <Route path="virtual-machine" components={ManagerVirtual} />
          <Route path="mirror" components={ManagerMirror} />
        </Route>
        <Route path="user-manager" components={UserManager} />
        <Route path="threat-event" components={ThreatEvent}>
        </Route>

        <Route path="sys-log" components={SystemLog}>
          <IndexRedirect to="login" />
          <Route path="login" components={SystemLogLogin} />
        </Route>
        <Route path="sys-log" components={SystemLog}>
          <IndexRedirect to="login" />
          <Route path="login" components={SystemLogLogin} />
        </Route>
        {/*<Redirect from="*" to="error"/>*/}
        <Route path="snort" components={Snort} />
      </Route>

    </Router>
  );
}

export default RouterConfig;
