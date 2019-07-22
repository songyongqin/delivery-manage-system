

import React from 'react'
import tranformTime from 'utils/tranformTime'
import { Tag } from 'antd'


const TimeTag = ({ num,  str='YYYY-MM-DD HH:mm' }) => <div  >{tranformTime(num, str)}</div>


export default TimeTag