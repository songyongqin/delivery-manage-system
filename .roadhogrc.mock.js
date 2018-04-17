
import appConfig from './config/app.json'
import analyseEventConfig from './config/table/analyseEvent.json'
import threatEventExploit from './config/table/threatEventExploit.json'
import threatEventThreatInfo from './config/table/threatEventThreatInfo.json'
import threatEventTool from './config/table/threatEventTool.json'

export default {
  '/static/config/appConfig.json': appConfig,
  '/static/config/table/analyseEvent.json': analyseEventConfig,
  '/static/config/table/threatEventExploit.json': threatEventExploit,
  '/static/config/table/threatEventThreatInfo.json': threatEventThreatInfo,
  '/static/config/table/threatEventTool.json': threatEventTool,
}

