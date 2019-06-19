
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

export const getOverTime = (num=3) => {
  if(num&&/^\d+$/.test(String(num))){
    let nums = Number(num) -1 || 0
    return [moment().subtract(nums, "days"), moment().subtract(0, 'days')]
  }
  else return []

}
//从 obj为this.props  this.props.state.layout中取出initTimeStampRange
export const getInitTimeMonent = (obj) => {
  try{
    return obj['state']['layout']['initTimeStampRange']
  }
  catch(err){
    return []
  }
}

export const getTodayTimeUnix = () => getTodayTime().map(i => i.unix())