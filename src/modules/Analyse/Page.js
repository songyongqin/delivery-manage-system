import React from 'react';
import styles from './styles.css'
import { Menu, Button,Breadcrumb } from 'antd';

class Page extends React.Component{
  constructor(props) {
    super(props);

  }

  render=()=>{
    const {children}=this.props;



    return (
      <div >
        {children}
      </div>
    )
  }
}

export default Page;
