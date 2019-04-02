import { Moment as MomentInterface } from 'moment'
import { getTodayTimeUnix } from './getInitTime'

import Moment from 'moment'

export const momentToTimeStamp = (moment?: MomentInterface): number => {
  if (!moment) {
    return 0;
  }
  return moment.unix();
};

// export const momentToTimeStampRange = (momentList: (MomentInterface | void)[] = []): number[] =>
//   momentList.length === 0
//     ?
//     [0, momentToTimeStamp(Moment())]
//     :
//     momentList.map(momentToTimeStamp)

export const momentToTimeStampRange = (momentList: (MomentInterface | void)[] = []): number[] =>
  momentList.length === 0
    ?
    getTodayTimeUnix()
    :
    momentList.map(momentToTimeStamp)

