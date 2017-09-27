/**
 * Created by 13944 on 2017/8/6.
 */
import {Table,Pagination,Spin} from 'antd'
import styles from './styles.css';
import React from 'react';
import classnames from 'classnames';
import JoTag from '../../components/JoTag';
/*
* 控制列展开属性，点击列时可展开
* */
class ExpandControlTable extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      expandedRowKeys:[]
    }
  }
  onRowClick=(record)=>{
    this.handleExpanededRowKeys(record.key);
  }
  onExpand=(expanded,record)=>{
    this.handleExpanededRowKeys(record.key);
  }
  handleExpanededRowKeys=(key)=>{
    const {expandedRowKeys}=this.state;

    let keyIndex=expandedRowKeys.indexOf(key);

    if(keyIndex===-1){
      return this.setState({
        expandedRowKeys:[...expandedRowKeys,key]
      })
    }

    this.setState({
      expandedRowKeys:[
        ...expandedRowKeys.slice(0,keyIndex),
        ...expandedRowKeys.slice(keyIndex+1)]
    })

  }
  render=()=>{



    return (
      <Table pagination={false}
             rowClassName={()=>{
               if(this.props.expandedRowRender){
                 return styles["expanded"];
               }
             }}
             bordered={false}
             onRowClick={this.onRowClick}
             onExpand={this.onExpand}
             {...this.props}
             expandedRowKeys={this.state.expandedRowKeys}/>
    )
  }
}


export default ({inverse=false,title=null,tableProps={},paginationProps={},loading=false,pagination=true,isDark=true})=>{

  const classes=classnames({
    [styles["dark"]]:isDark,
    [styles["light"]]:!isDark,
    [styles["table"]]:true,
    [styles["inverse-color"]]:inverse,
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
        <ExpandControlTable {...tableProps} className={classes}/>
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



