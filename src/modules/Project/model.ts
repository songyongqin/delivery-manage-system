import { PROJECT_NAMESPACE } from 'constants/model'
import { fetchTable, addProject, changeState } from './services'
import commonEffectCreator from 'domainUtils/commonEffectCreator'

export default {
  namespace: PROJECT_NAMESPACE,
  effects: {
    fetchTable: commonEffectCreator(fetchTable),
    addProject: commonEffectCreator(addProject),
    changeState: commonEffectCreator(changeState),
  },
}