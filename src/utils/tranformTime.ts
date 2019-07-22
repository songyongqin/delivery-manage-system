

import moment from 'moment'

const transformTime = (num: number,  str='YYYY-MM-DD HH:mm'):string =>{
  if (isNaN(num)|| typeof num !=='number' ){
    // console.error('type error, it want to be number, but recived:  '+ typeof num)
  }
  return trans(num, str)
}

const trans = (num:number, str='YYYY-MM-DD HH:mm'):string => {
 return moment(num*1000).format(str)
}

export default transformTime