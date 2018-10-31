

import React from 'react'
import tranformTime from 'utils/tranformTime'
import { Tag } from 'antd'


const TimeTag = ({ num }) => <div  >{tranformTime(num)}</div>


export default TimeTag