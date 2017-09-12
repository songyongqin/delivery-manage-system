import React from 'react';
import { Menu, Button,Breadcrumb,Table,Icon,Row,Col,Card,Badge } from 'antd';
import {queryContainerGenerator} from '../../Generators/QueryContainerrGenerator/QueryContainerGenerator';
import EnhanciveTable from '../../components/EnhanciveTable/EnhanciveTable';
import * as tableConfig from './components/TableConfig';
import {NAMESPACE} from './ConstConfig'
import styles from './styles.css';

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
class Page extends React.Component{
  constructor(props) {
    super(props);
  }
  getResultsPanel=()=>{

    const {commonLayout}=this.props;
    const {queryResults,lastReqTime}=this.props[NAMESPACE];
    const tableProps={
      onChange:this.tableOnChange,
      columns:tableConfig.getColumns({isDark:commonLayout.darkTheme}),
      dataSource:[
        {
          ...queryResults,
          key:"device-control"
        }
      ]
    };
    return (
        <EnhanciveTable key={`${lastReqTime}-device-table`}
                        inverse={true}
                        tableProps={tableProps}
                        isDark={commonLayout.darkTheme}
                        pagination={false}/>
    )
  };
  render=()=> {

    return this.getResultsPanel()
  }
}

export default Page;