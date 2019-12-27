import { PROJECT_NAMESPACE } from 'constants/model'
import { fetchTable, addProject } from './services'
import commonEffectCreator from 'domainUtils/commonEffectCreator'

export default {
  namespace: PROJECT_NAMESPACE,
  effects: {
    fetchTable: commonEffectCreator(fetchTable),
    addProject: commonEffectCreator(addProject),
  },
}