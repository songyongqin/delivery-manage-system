import React from 'react';
import styles from './styles.css'
import { Menu, Button,Breadcrumb,Tabs,Card } from 'antd';
import {connect} from 'dva';
import classnames from 'classnames';


class Page extends React.Component{
  render=()=> {
    
    return (
      <div >
        {this.props.children}
      </div>
    )
  }
}

export default Page;
