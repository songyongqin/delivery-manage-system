import { AUDIT_CAUGHTTASK_NAMESPACE } from 'constants/model'
import { fetchcaughtTask, putCaughtTask, delCaughtTask, postCaughtTask } from '../services'
import commonEffectCreator from 'domainUtils/commonEffectCreator'

export default {
  namespace: AUDIT_CAUGHTTASK_NAMESPACE,
  effects: {
    fetch: commonEffectCreator(fetchcaughtTask),
    putCaughtTask: commonEffectCreator(putCaughtTask),
    delCaughtTask: commonEffectCreator(delCaughtTask),
    postCaughtTask: commonEffectCreator(postCaughtTask)
  }
}