import { FILE_REPORT } from './ConstConfig'
import commonEffectCreator from 'domainUtils/commonEffectCreator'
import { fetchDetail } from './services'


export default {
    namespace: FILE_REPORT,
    effects: {
      detail: commonEffectCreator(fetchDetail)
    }
  }