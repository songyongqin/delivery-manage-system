import { MANAGER_MIRROR_SUMMARY_NAMESPACE } from 'constants/model'
import {
  fetchMirrorSummary
} from '../services'
import commonEffectCreator from 'domainUtils/commonEffectCreator'

export default {
  namespace: MANAGER_MIRROR_SUMMARY_NAMESPACE,
  effects: {
    fetch: commonEffectCreator(fetchMirrorSummary),

  }
}