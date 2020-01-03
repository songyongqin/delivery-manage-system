import { PROJECT_DETAIL_NAMESPACE } from 'constants/model'
import { fetchTable,updateProjectDetail, addRecord, updRecord } from './services'
import commonEffectCreator from 'domainUtils/commonEffectCreator'
import commonRequestCreator from 'domainUtils/commonRequestCreator'



export default {
  namespace: PROJECT_DETAIL_NAMESPACE,
  state:{
    project:{}
  },
  subscriptions:{

  },
  reducers:{
    save: (prestate, { payload }) => {
      if( typeof payload ==='object'){
        return { ...prestate, ...payload }
      }
      else return prestate
    }
  },
  effects: {
    fetchTable: commonEffectCreator(fetchTable),
    updateProjectDetail: commonEffectCreator(updateProjectDetail),
    addRecord: commonEffectCreator(addRecord),
    updRecord: commonEffectCreator(updRecord),
  },
}