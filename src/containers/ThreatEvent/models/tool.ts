import { THREAT_EVENT_TOOL_NAMESPACE } from 'constants/model'
import { fetchThreatEventTool } from '../services'
import commonEffectCreator from 'domainUtils/commonEffectCreator'

export default {
  namespace: THREAT_EVENT_TOOL_NAMESPACE,
  effects: {
    fetch: commonEffectCreator(fetchThreatEventTool)
  }
}