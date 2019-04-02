import { queryString } from 'utils'
import { TIME_STAMP_RANGE } from 'constants'
import { momentToTimeStamp } from 'utils/moment'
import Moment from 'moment'
import domainMomentTimeStampRange from 'domainUtils/momentToTimeStampRange'
// //与业务耦合的queryString转换方法 
// export default (obj: object) => {

//   let finalObj = { ...obj }

//   //若约定的时间戳key存在于请求的参数中，则将其moment转换为unix时间戳 前者为当天的0时0分0秒 后者为23时59分59秒
//   if (TIME_STAMP_RANGE in obj) {

//     finalObj[TIME_STAMP_RANGE] = domainMomentTimeStampRange(obj[TIME_STAMP_RANGE])

//   }
//   return queryString.stringify(finalObj, { arrayMode: queryString.ArrayMode.SPLIT })
// }


//与业务耦合的queryString转换方法 
export default (obj: object) => {

  let finalObj = { ...obj }

  //若约定的时间戳key存在于请求的参数中，则将其moment转换为unix时间戳
  if (TIME_STAMP_RANGE in obj) {

    finalObj[TIME_STAMP_RANGE] = domainMomentTimeStampRange(obj[TIME_STAMP_RANGE])

  }
  return queryString.stringify(finalObj, { arrayMode: queryString.ArrayMode.SPLIT })
}