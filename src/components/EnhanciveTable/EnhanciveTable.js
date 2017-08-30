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
  });

  const titleClasses=classnames({
    ["secondary-title"]:true,
    ["secondary-title-dark"]:isDark,
  });

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
        <Table className={classes}
               pagination={false}
               bordered={false}
               {...tableProps} />
        {
          pagination
            ?
            <Pagination style={{marginTop:"15px"}}
                        showTotal={(total, range)=>
                          <div>共找到&nbsp;
                            <JoTag color={isDark?"#108ee9":"#108ee9"} >
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
