import { SYS_CONFIG_STRATEGY_SETTING } from 'constants/model'
import { _fetchStrategySetting, putStrategySetting, applyStrategySetting, fetchDate } from '../services'
import commonEffectCreator from 'domainUtils/commonEffectCreator'

export default {
  namespace: SYS_CONFIG_STRATEGY_SETTING,
  effects: {
    fetch: commonEffectCreator(_fetchStrategySetting),
    put: commonEffectCreator(putStrategySetting, 500),
    apply: commonEffectCreator(applyStrategySetting, 500),
    fetchDate: commonEffectCreator(fetchDate),
  }
}