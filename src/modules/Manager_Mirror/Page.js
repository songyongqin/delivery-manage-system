import React from 'react';
import styles from './styles.css'
import { Menu, Button,Breadcrumb } from 'antd';
import {
  WithAnimateRender,
  WithBreadcrumb
} from 'components/HOSComponents';

@WithAnimateRender
@WithBreadcrumb
class Page extends React.Component{
  constructor(props) {
    super(props);

  }
  getHeader=()=>{
    return <div key="header">
      {this.props.getBreadcrumb(this.props.routes)}
    </div>
  }
  render=()=>{




    return (
      <div>
        {this.props.animateRender([
            this.getHeader()
        ])}
      </div>
    )
  }
}

export default Page;
