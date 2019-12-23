import { USER_NAMESPACE } from 'constants/model'
import { fetchTable, deleteUser, addUser } from './services'
import commonEffectCreator from 'domainUtils/commonEffectCreator'

export default {
  namespace: USER_NAMESPACE,
  effects: {
    fetchTable: commonEffectCreator(fetchTable),
    deleteUser: commonEffectCreator(deleteUser),
    addUser: commonEffectCreator(addUser),
  },
}