import moment from 'moment'
export const getTime = (times) => {
  let time = moment(times, 'YYYY-MM-DD').valueOf().toString()
  return time.substring(0,time.length-3)
}