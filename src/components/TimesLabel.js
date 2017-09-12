import React from 'react';
import moment from 'moment';
import JoTag from './JoTag';
const getTimeFormat=time=>moment(time*1000).format("YYYY-MM-DD hh:mm");

export default ({times=[]})=>{

  if(times.length===1){
    return <div> <JoTag color="#108ee9">{getTimeFormat(times[0])}</JoTag> </div>
  }
  if(times.length===2){
    return (
      <div>
        <JoTag color="#108ee9">{getTimeFormat(times[0])}</JoTag>
        &nbsp;至&nbsp;&nbsp;
        <JoTag color="#108ee9">{getTimeFormat(times[1])} </JoTag>
      </div>
    )
  }
  return times;
}


