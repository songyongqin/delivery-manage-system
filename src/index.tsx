import dva from 'dva'
import router from './router'
import createLoading from 'dva-loading'
import createLastEffectTime from 'domainUtils/dvaLastEffectTime'
import createHistory from 'history/createBrowserHistory'
import LayoutModel from 'models/layout'
import DomainUserModel from 'models/domainUser'
import SetupModel from 'models/setup'
import './themes/common.less'
import { initProductionConfig, getProduction } from 'domain/production'
import request from 'domainUtils/request'
import onError, { initGlobalOnErrorListener } from 'domainUtils/error'

// 1.history
const app = dva({
  history: createHistory(),
  onError: onError
})

// 2. Plugins
app.use(createLoading({ effects: true }))
app.use(createLastEffectTime())

// 3. Model
app.model(SetupModel)
app.model(DomainUserModel)
app.model(LayoutModel)

// 4. Router
app.router(router)

app.start("#root")