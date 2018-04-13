
import productionConfig from './config/production.json'
import analyseEventConfig from './config/table/analyseEvent.json'
import threatEventExploit from './config/table/threatEventExploit.json'
import threatEventThreatInfo from './config/table/threatEventThreatInfo.json'
import threatEventTool from './config/table/threatEventTool.json'

export default {
  '/config/production.json': productionConfig,
  '/config/table/analyseEvent.json':analyseEventConfig,
  '/config/table/threatEventExploit.json':threatEventExploit,
  '/config/table/threatEventThreatInfo.json':threatEventThreatInfo,
  '/config/table/threatEventTool.json':threatEventTool,
}

