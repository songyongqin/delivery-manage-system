import { Moment as MomentInterface } from 'moment'
import { momentToTimeStampRange } from 'utils'
import Moment from 'moment'
/**
 * 将moment转换为 timestampRange 字段的 unix 时间戳 
 */

export default (momentList: (MomentInterface | void)[] = []): number[] => {
  const [beforeTimestamp, afterTimestamp] = momentToTimeStampRange(momentList)

  return [
    Moment(beforeTimestamp * 1000).hour(0).minute(0).second(0).unix(),
    Moment(afterTimestamp * 1000).hour(23).minute(59).second(59).unix()
  ]

}