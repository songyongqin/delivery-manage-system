

import React from 'react'
import { Pagination } from 'antd'
import classnames from 'classnames'
const style = require('./index.less')


const WithPagination = ({ current, total, onChange, limit=10}) => {

  let page = total/limit
  let isHidden = page -current >3
  let classes = classnames({
    [style['pagination_item']]: isHidden,
    [style['pagination_items']]:  !isHidden
  })

  return <Pagination current={ current } 
                    total={ total }
                    className={ classes }
                    onChange={ onChange }
                    defaultPageSize={ limit }
                    showTotal={ total => <div>共找到<span className={ style.total } >{total}</span>个结果</div> } />
}

export default WithPagination