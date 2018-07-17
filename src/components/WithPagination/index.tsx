

import React from 'react'
import { Pagination , Tag} from 'antd'


const WithPagination = ({ current, total, onChange }) => {
  return <Pagination current={ current } 
                    total={ total }
                    onChange={ onChange }
                    showTotal={ total => <div>共找到 &nbsp;<Tag color={ '#1890ff' } >{total}</Tag>个结果</div> } />
}

export default WithPagination