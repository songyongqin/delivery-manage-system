import { SYS_CONFIG_STRATEGY_SETTING } from 'constants/model'
import { fetchStrategySetting, putStrategySetting, applyStrategySetting } from '../services'
import commonEffectCreator from 'domainUtils/commonEffectCreator'

export default {
  namespace: SYS_CONFIG_STRATEGY_SETTING,
  effects: {
    fetch: commonEffectCreator(fetchStrategySetting),
    put: commonEffectCreator(putStrategySetting, 500),
    apply: commonEffectCreator(applyStrategySetting, 500)
  }
}