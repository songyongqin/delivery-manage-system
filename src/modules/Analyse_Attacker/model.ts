import { ANALYSE_ATTACKED_VIEW } from 'constants/model'
import {  fetchAnalyseAttackedView,
          fetchAnalyseAttackedSearch } from './services'
import commonEffectCreator from 'domainUtils/commonEffectCreator'

export default {
  namespace: ANALYSE_ATTACKED_VIEW,
  effects: {
    fetchView: commonEffectCreator(fetchAnalyseAttackedView),
    fetchSearch: commonEffectCreator(fetchAnalyseAttackedSearch),
  }
}


