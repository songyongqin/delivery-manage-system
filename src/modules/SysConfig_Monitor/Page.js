import React from 'react';
import styles from './styles.css'
import { Menu, Button,Breadcrumb } from 'antd';
import MonitorSettingForm from  './components/MonitorSettingForm'
class Page extends React.Component{
  constructor(props) {
    super(props);

  }

  render=()=>{




    return (
      <div >
        Monitor
        <MonitorSettingForm></MonitorSettingForm>
      </div>
    )
  }
}

export default Page;
