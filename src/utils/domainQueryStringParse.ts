import { queryString, momentToTimeStampRange } from 'utils'
// import { TIME_STAMP_RANGE } from 'configs/ConstConfig'
import { momentToTimeStamp } from 'utils/moment'
import Moment from 'moment'

const TIME_STAMP_RANGE = "timestampRange"

export default (obj: object) => {

  let finalObj = { ...obj }

  if (TIME_STAMP_RANGE in obj) {

    finalObj[TIME_STAMP_RANGE] = momentToTimeStampRange(obj[TIME_STAMP_RANGE])

    const [beforeTime, afterTime] = finalObj[TIME_STAMP_RANGE]

    finalObj[TIME_STAMP_RANGE] = [
      Moment(beforeTime * 1000).hour(0).minute(0).second(0).unix(),
      Moment(afterTime * 1000).hour(23).minute(59).second(59).unix()
    ]

  }
  return queryString.stringify(finalObj, { arrayMode: queryString.ArrayMode.SPLIT })
}