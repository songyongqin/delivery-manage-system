
import moment from 'moment'


export const getWeekTime = () => {
  return [moment().startOf('week'), moment().subtract(0, 'days')]
}

export const getTodayTime = () => {
  return [moment().subtract(0, "days"), moment().subtract(0, 'days')]
}