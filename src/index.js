import dva from 'dva';
import './index.css';
import './styles/commonHack.css';
import createLoading from 'dva-loading'
import createLastEffectTime from 'utils/dvaLastEffectTime'
import router from './router';
import { useRouterHistory } from 'dva/router';
import { createHashHistory } from 'history';

import { combineExtraEffectsWithApp } from './utils/dvaExtraEffects';
import { combineExtraReducersWithApp } from './utils/dvaExtraReducers';
import extraEffectsOptions from './configs/ExtraEffectsOptions';

import MainModel from './modules/Main/Model';
import LayoutModel from './models/LayoutModel';
import AnalyseEventModel from './modules/Analyse_Event/Model';
import AnalyseAttackChainModel from './modules/Analyse_AttackChain/Model';
import AnalyseFallHostModel from './modules/Analyse_FallHost/Model';
import ThreatEventExploitModel from './modules/ThreatEvent_Exploit/Model'
import ThreatEventToolModel from './modules/ThreatEvent_Tool/Model';
import ThreatEventThreatInfoModel from './modules/ThreatEvent_ThreatInfo/Model';
import UserManagerModel from './modules/UserManager/Model';
import UserModel from './modules/User/Model';
import EarlyWarningEmailReceiveModel from './modules/EarlyWarning_EmailReceive/Model';
import EarlyWarningEmailSendModel from './modules/EarlyWarning_EmailSend/Model';
import ManagerDeviceControlDiskModel from './modules/Manager_Device_Control_Disk/Model';
import ManagerDeviceControlModel from './modules/Manager_Device_Control/Model';
import ManagerDeviceNodeDiskModel from './modules/Manager_Device_Node_Disk/Model';
import ManagerDeviceNodeModel from './modules/Manager_Device_Node/Model';
import ManagerDeviceVMModel from './modules/Manager_Virtual/Model'
import SysConfigNetworkModel from './modules/SysConfig_Network/Model';
import StrategyModel from './modules/SysConfig_Strategy_Strategy/Model';
import StrategyThreatnameModel from './modules/SysConfig_Strategy_Threatname/Model';
import StrategyRuleModel from './modules/SysConfig_Strategy_Rule/Model';
import WhiteListModel from './modules/SysConfig_Strategy_WhiteList/Model';
import IPLimitModel from './modules/UserManager_IPLimit/Model';
import MonitorControlModel from './modules/SysConfig_Monitor_Control/Model';
import MonitorIDSModel from './modules/SysConfig_Monitor_IDS/Model';
import MonitorNodeModel from './modules/SysConfig_Monitor_Node/Model';
import OverallNetBasicModel from './modules/Analyse_Overall_NetBasic/Model';
import OverallModel from './modules/Analyse_Overall/Model';
import AnalyseRankingModel from './modules/Analyse_Ranking/Model';
import AnalyseDistributionModel from './modules/Analyse_ThreatDistribution/Model'
import AnalyseOverallPcapModel from './modules/Analyse_Overall_PCAP/Model';
import AnalyseOverallCaptureModel from './modules/Analyse_Overall_Capture/Model';
import AnalyseOverallSystemModel from './modules/Analyse_Overall_System/Model';
import AnalyseOverallNetModel from './modules/Analyse_Overall_Net/Model';
import OverviewModel from './modules/Overview/Model';
import OverviewStatisticsModel from './modules/Overview/models/Statistics'
import OverviewRankingModel from './modules/Overview_Ranking/Model';
import OverviewFlowModel from './modules/Overview_Flow/Model';
import SysLogLoginModel from './modules/SystemLog_Login/Model'
import ReportModel from './modules/Report/Model';
import DeviceNodeIdsModel from './modules/Manager_Device_Node_IDS/Model'
import AnalyseEventStatisticsModel from './modules/Analyse_Event/models/Statistics'
// 1. Initialize
const app = dva({
  history: useRouterHistory(createHashHistory)({ queryKey: false }),
});

app.use(createLoading({ effects: true }));
app.use(createLastEffectTime())

// 3. Model
app.model(MainModel);
// app.model(HomeModel);
app.model(LayoutModel);
app.model(AnalyseEventModel);
app.model(AnalyseAttackChainModel);
app.model(AnalyseFallHostModel);
app.model(ThreatEventExploitModel);
app.model(ThreatEventToolModel);
app.model(ThreatEventThreatInfoModel);
app.model(UserModel);
app.model(UserManagerModel);
app.model(EarlyWarningEmailReceiveModel);
app.model(EarlyWarningEmailSendModel);
app.model(ManagerDeviceControlDiskModel);
app.model(ManagerDeviceControlModel);
app.model(ManagerDeviceNodeDiskModel);
app.model(ManagerDeviceNodeModel);
app.model(ManagerDeviceVMModel);
app.model(SysConfigNetworkModel);
app.model(StrategyModel);
app.model(StrategyThreatnameModel);
app.model(StrategyRuleModel);
app.model(WhiteListModel);
app.model(IPLimitModel);
app.model(MonitorControlModel);
app.model(MonitorIDSModel);
app.model(MonitorNodeModel);
app.model(OverallNetBasicModel);
app.model(OverallModel);
app.model(AnalyseRankingModel);
app.model(AnalyseDistributionModel);
app.model(AnalyseOverallPcapModel);
app.model(AnalyseOverallCaptureModel);
app.model(AnalyseOverallSystemModel);
app.model(AnalyseOverallNetModel)
app.model(OverviewModel);
app.model(OverviewRankingModel)
app.model(OverviewFlowModel)
app.model(SysLogLoginModel)
app.model(ReportModel)
app.model(DeviceNodeIdsModel)
app.model(AnalyseEventStatisticsModel)
app.model(OverviewStatisticsModel)

combineExtraEffectsWithApp(app, extraEffectsOptions);
combineExtraReducersWithApp(app);

// 4. Router
app.router(router);



// 5. Start
app.start('#root');


