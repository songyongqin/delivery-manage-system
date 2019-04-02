
import moment from 'moment'

const getDayNum = num => num*24*60*60

// export  const getOtherSenconds = num => moment().second( -getDayNum(num))

export  const getOtherSenconds = num => moment().subtract('seconds', getDayNum(num))


export const getWeekTime = () => {
  return [moment().subtract(6, "days"), moment().subtract(0, 'days')]
  // return [getOtherSenconds(7), getOtherSenconds(0)]
}

export const getTodayTime = () => {
  return [moment().subtract(0, "days"), moment().subtract(0, 'days')]
  // return [getOtherSenconds(1), getOtherSenconds(0)]
}

export const getTodayTimeUnix = () => getTodayTime().map(i => i.unix())