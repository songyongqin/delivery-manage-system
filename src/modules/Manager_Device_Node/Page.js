import React from 'react';
import { Menu, Button,Breadcrumb,Table,Icon,Row,Col,Card,Badge } from 'antd';
import {queryContainerGenerator} from '../../Generators/QueryContainerrGenerator/QueryContainerGenerator';
import EnhanciveTable from '../../domainComponents/EnhanciveTable/index';
import * as tableConfig from '../Manager_Device/components/TableConfig/index';
import {NAMESPACE} from './ConstConfig'
import styles from './styles.css';
import WithOnQuery from '../../Generators/QueryContainerDecorator/WithOnQuery';
import WithPageOnChange from '../../Generators/QueryContainerDecorator/WithPageOnChangeQuery';
import classnames from 'classnames';

function mapStateToProps(state) {
  const {commonLayout}=state.layout;
  return {
    commonLayout,
    userData:state.user.userData,
  }
}

@queryContainerGenerator({
  namespace:NAMESPACE,
  mapStateToProps,
})
@WithOnQuery(NAMESPACE)
@WithPageOnChange(NAMESPACE)
class Page extends React.Component{
  constructor(props) {
    super(props);
  }
  getResultsPanel=()=>{

    const {commonLayout,userData}=this.props;
    const {queryResults,lastReqTime,queryFilters}=this.props[NAMESPACE];
    const {isAdmin}=userData;

    const tableProps={
      columns:tableConfig.getColumns({
        isAdmin,
        isDark:commonLayout.darkTheme
      }),
      dataSource:queryResults.data.map((i,index)=>{
        return {
          ...i,
          key:`item-${index}-${lastReqTime}`
        }
      }),
      className:classnames({
        [styles["table-selectable"]]:isAdmin
      })
    };


    if(isAdmin){
      tableProps.rowSelection={
        onChange: (selectedRowKeys, selectedRows) => {
          this.props.setSelectedRows(selectedRows)
        },
      };
    }

    const paginationProps={
      total:queryResults.total,
      current:queryFilters.page,
      onChange:this.props.pageOnChange,
      pageSize:queryFilters.limit,
    };

    return (
        <EnhanciveTable key={`${lastReqTime}-device-table`}
                        inverse={true}
                        tableProps={tableProps}
                        paginationProps={paginationProps}
                        isDark={commonLayout.darkTheme}/>
    )
  };
  render=()=> {

    return this.getResultsPanel()
  }
}

export default Page;
