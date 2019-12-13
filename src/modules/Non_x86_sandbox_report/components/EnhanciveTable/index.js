/**
 * Created by 13944 on 2017/8/6.
 */
import {Table,Pagination,Tag,Spin} from 'antd'

import React from 'react';

export default ({title=null,tableProps={},paginationProps={},loading=false,pagination=true})=>{


  return (
    <div style={{height:"100%",width:"100%"}}>
      <Spin spinning={loading}>
        {
          title
            ?
            <h2 className="title-small">{title}</h2>
            :
            null
        }
        <Table pagination={false} bordered {...tableProps} />
        {
          pagination
            ?
            <Pagination style={{marginTop:"15px"}}
                        showTotal={(total, range)=>
                          <div>共找到&nbsp;
                            <Tag color="#49a9ee">
                              {paginationProps.total}
                            </Tag>
                            个结果
                          </div>}
                        {...paginationProps}/>
            :null
        }
      </Spin>
    </div>
  )
}
