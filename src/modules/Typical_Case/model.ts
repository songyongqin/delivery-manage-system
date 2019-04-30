import { TYPICAL_CASE_NAMESPACE } from 'constants/model'
import {  getArr  } from './services'
import commonEffectCreator from 'domainUtils/commonEffectCreator'

export default {
  namespace: TYPICAL_CASE_NAMESPACE,
  effects: {
    get: commonEffectCreator(getArr),
  }
}