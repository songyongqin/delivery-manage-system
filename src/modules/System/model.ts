import { SYSTEM_NAMESPACE } from 'constants/model'
import { fetchTable, fetchExport } from './services'
import commonEffectCreator from 'domainUtils/commonEffectCreator'

export default {
  namespace: SYSTEM_NAMESPACE,
  effects: {
    fetchTable: commonEffectCreator(fetchTable),
    fetchExport: commonEffectCreator(fetchExport),
  },
}