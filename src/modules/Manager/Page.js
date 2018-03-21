import React from 'react';
import { Menu, Button,Breadcrumb } from 'antd';

class Page extends React.Component{
  constructor(props) {
    super(props);

  }

  render=()=>{
    const {children}=this.props;

    return children
  }
}

export default Page;

