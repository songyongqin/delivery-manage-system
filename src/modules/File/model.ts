import { FILE_NAMESPACE } from 'constants/model'
import { fetchTable, addFile } from './services'
import commonEffectCreator from 'domainUtils/commonEffectCreator'

export default {
  namespace: FILE_NAMESPACE,
  effects: {
    fetchTable: commonEffectCreator(fetchTable),
    addFile: commonEffectCreator(addFile),
  },
}