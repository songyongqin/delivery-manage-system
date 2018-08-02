

import moment from 'moment'



const transformTimeStamp = (arr:Array<any> ) => {
  if(!Array.isArray(arr)){
    console.error('type err, parmas not to be array' )
    return []
  }
  else if(arr.length===0){
    return [ 0, moment().endOf('days').unix() ]
  }
  else if(arr.length===2) {
    return [ getFirstTime(arr[0]),  getSencondTime(arr[1]) ]
  }
  else {
    console.error('参数格式错误，正确的格式应该是： []或者[moment, moment]')
    return []
  }
}

const getFirstTime = moments => {
  if(moments){
    return  moment(moments).startOf('days').unix()
  }
}

const getSencondTime = moments => {
  if(moments){
    return moment(moments).endOf('days').unix()
  }
}

export default transformTimeStamp