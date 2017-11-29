import React from 'react';
import moment from 'moment';
import JoTag from './JoTag';
import { getTimeDiff } from 'utils/tools';
const getTimeFormat = time => moment(time * 1000).format("YYYY-MM-DD HH:mm");

export default ({ times = [] }) => {
  if (times.length === 1) {
    return <div> <JoTag color="#108ee9">{getTimeFormat(times[0])}</JoTag> </div>
  }
  if (times.length === 2) {
    const nth1 = getTimeFormat(times[0]),
      nth2 = getTimeFormat(times[1]);

    return (
      <div style={{ display: "inline-block" }}>
        <JoTag color="#108ee9">{nth1}</JoTag>
        &nbsp;至&nbsp;&nbsp;
        <JoTag color="#108ee9">{nth2}</JoTag>
      </div>
    )
  }
  return <span></span>;
}


