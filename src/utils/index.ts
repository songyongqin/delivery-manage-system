
export { momentToTimeStampRange } from './moment'

export { getTemp, setTemp, setCache, getCache, delCache, delTemp } from './cache'

export { download } from './download'

export { delay } from './delay'

export { default as queryString } from './queryString'

import * as Ramda from 'ramda'


export const compose = Ramda.compose,

  isNil = Ramda.isNil,

  head = Ramda.head,

  last = Ramda.last,

  is = Ramda.is,

  omit = Ramda.omit,

  pick = Ramda.pick

export { default as getKeyText } from './getKeyText'

export { getFileMD5, getMD5 } from './md5'

export { default as pureOperation } from './pureOperation'

export { default as toDecimal } from './toDecimal'

export { default as exportData } from './exportData'

import lodash from 'lodash'

export const throttle = lodash.throttle

export const get = lodash.get

export const debounce = lodash.debounce

export const isFunction = func => {
  return Object.prototype.toString.call(func) === "[object Function]"
}


