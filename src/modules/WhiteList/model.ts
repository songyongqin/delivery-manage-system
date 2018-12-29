import { WHITE_LIST } from 'constants/model'
import {  getWhiteList,
  postWhiteList, delWhiteList, postWhiteListUse } from './services'
import commonEffectCreator from 'domainUtils/commonEffectCreator'

export default {
  namespace: WHITE_LIST,
  effects: {
    get: commonEffectCreator(getWhiteList),
    post: commonEffectCreator(postWhiteList),
    del: commonEffectCreator(delWhiteList),
    postUse: commonEffectCreator(postWhiteListUse)
  }
}