import dva from 'dva';
import './index.css';
import './styles/commonHack.css';
import router from './router';
import { useRouterHistory } from 'dva/router';
import { createHashHistory } from 'history';

import {combineExtraEffectsWithApp} from './utils/dvaExtraEffects';
import {combineExtraReducersWithApp} from './utils/dvaExtraReducers';
import combineExtraLoadingWtithApp from './utils/dvaExtraLoading'
import extraEffectsOptions from './configs/ExtraEffectsOptions';

import LayoutModel from './models/LayoutModel';
import AnalyseEventModel from './modules/Analyse_Event/Model';
import AnalyseAttackChainModel from './modules/Analyse_AttackChain/Model';
import AnalyseFallHostModel from './modules/Analyse_FallHost/Model';
import ThreatEventExploitModel from './modules/ThreatEvent_Exploit/Model'
import ThreatEventToolModel from './modules/ThreatEvent_Tool/Model';
import ThreatEventThreatInfoModel from './modules/ThreatEvent_ThreatInfo/Model';
import UserManagerModel from './modules/UserManager/Model';
import UserModel from './modules/User/Model';

// 1. Initialize
const app = dva({
  history: useRouterHistory(createHashHistory)({ queryKey: false }),
});


// 3. Model
// app.model(MainModel);
// app.model(HomeModel);
app.model(LayoutModel);
app.model(AnalyseEventModel);
app.model(AnalyseAttackChainModel);
app.model(AnalyseFallHostModel);
app.model(ThreatEventExploitModel);
app.model(ThreatEventToolModel);
app.model(ThreatEventThreatInfoModel);
app.model(UserModel);
app.model(UserManagerModel)

combineExtraLoadingWtithApp(app);
combineExtraEffectsWithApp(app,extraEffectsOptions);
combineExtraReducersWithApp(app);
// 4. Router
app.router(router);



// 5. Start
app.start('#root');


