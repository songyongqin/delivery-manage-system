import { Moment as MomentInterface } from 'moment'
import { momentToTimeStampRange } from 'utils'
import Moment from 'moment'


export default (momentList: (MomentInterface | void)[] = []): number[] => {
  const [beforeTimestamp, afterTimestamp] = momentToTimeStampRange(momentList)

  return [
    Moment(beforeTimestamp * 1000).hour(0).minute(0).second(0).unix(),
    Moment(afterTimestamp * 1000).hour(23).minute(59).second(59).unix()
  ]

}