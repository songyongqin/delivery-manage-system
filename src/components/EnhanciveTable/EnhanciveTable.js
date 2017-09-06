/**
 * Created by 13944 on 2017/8/6.
 */
import {Table,Pagination,Spin} from 'antd'
import styles from './EnhanciveTable.css';
import React from 'react';
import classnames from 'classnames';
import JoTag from '../../components/JoTag';
export default ({title=null,tableProps={},paginationProps={},loading=false,pagination=true,isDark=true})=>{

  const classes=classnames({
    [styles["dark"]]:isDark,
    [styles["light"]]:!isDark,
    [styles["table"]]:true,
    [tableProps.className]:!!tableProps.className
  });


  const titleClasses=classnames({
    ["secondary-title"]:true,
    ["secondary-title-dark"]:isDark,
  });

  const paginationClasses=classnames({
    [styles["pagination-dark"]]:isDark
  })

  return (
    <div style={{height:"100%",width:"100%"}}>
      <Spin spinning={loading}>
        {
          title
            ?
            <h2 className={titleClasses}>{title}</h2>
            :
            null
        }
        <Table pagination={false}
               bordered={false}
               {...tableProps}
               className={classes}/>
        {
          pagination
            ?
            <Pagination style={{marginTop:"15px"}}
                        showTotal={(total, range)=>
                          <div className={paginationClasses}>共找到&nbsp;
                            <JoTag color={"#108ee9"} >
                              {paginationProps.total}
                            </JoTag>
                            个结果
                          </div>}
                        {...paginationProps}/>
            :null
        }
      </Spin>
    </div>
  )
}
