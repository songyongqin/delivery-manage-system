

import moment from 'moment'

const transformTime = (num: number):string =>{
  if (isNaN(num)|| typeof num !=='number' ){
    // console.error('type error, it want to be number, but recived:  '+ typeof num)
  }
  return trans(num)
}

const trans = (num:number):string => {
 return moment(num*1000).format('YYYY-MM-DD HH:mm')
}

export default transformTime