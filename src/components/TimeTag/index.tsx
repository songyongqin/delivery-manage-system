

import React from 'react'
import tranformTime from 'utils/tranformTime'
import { Tag } from 'antd'


const TimeTag = ({ num }) => <Tag color={ '#1890ff' } >{tranformTime(num)}</Tag>


export default TimeTag