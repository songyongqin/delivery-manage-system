import dva from 'dva';
import './index.css';
import './commonHack.css';
import router from './router';
import { useRouterHistory } from 'dva/router';
import { createHashHistory } from 'history';

import {combineExtraEffectsWithApp} from './utils/dvaExtraEffects';
import {combineExtraReducersWithApp} from './utils/dvaExtraReducers';
import combineExtraLoadingWtithApp from './utils/dvaExtraLoading'
import extraEffectsOptions from './configs/ExtraEffectsOptions';

import LayoutModel from './models/LayoutModel';
import AnalyseEventModel from './modules/Analyse_Event/Model';
// 1. Initialize
const app = dva({
  history: useRouterHistory(createHashHistory)({ queryKey: false }),
});


// 3. Model
// app.model(MainModel);
// app.model(HomeModel);
app.model(LayoutModel);
app.model(AnalyseEventModel);

combineExtraLoadingWtithApp(app);
combineExtraEffectsWithApp(app,extraEffectsOptions);
combineExtraReducersWithApp(app);
// 4. Router
app.router(router);



// 5. Start
app.start('#root');


