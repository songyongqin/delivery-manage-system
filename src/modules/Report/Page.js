import React from 'react';
import { Menu, Button, Breadcrumb } from 'antd';
import Table_attack_components from './components/Table_attack/index'
import Table_threat_event_components from './components/Table_threat_event/index'
import Table_fall_host_components from './components/Table_fall_host/index'
import Table_threat_info_components from './components/Table_threat_info/index'
import Table_mal_ip_components from './components/Table_mal_ip/index'
import Table_mal_domain_components from './components/Table_mal_domain/index'
import Table_suffer_host_call_on_record_components from './components/Table_suffer_host_call_on_record/index'
import Table_have_communicate_inside_ip_components from './components/Table_have_communicate_inside_ip/index'
import Table_call_on_ip_components from './components/Table_call_on_ip/index'
import Table_call_on_domain_components from './components/Table_call_on_domain/index'
import Chart_statistical_components from './components/Chart_statistical/index'
class Page extends React.Component {
  constructor(props) {
    super(props);

  }

  render = () => {




    return (
      <div >
        <Table_attack_components {...this.props} />
        <br /> <br />
        <Table_threat_event_components {...this.props} />
        <br /> <br />
        <Table_fall_host_components {...this.props} />
        <br /> <br />
        <Table_threat_info_components {...this.props} />
        <br /> <br />
        <Table_mal_ip_components {...this.props} />
        <br /> <br />
        <Table_mal_domain_components {...this.props} />
        <br /> <br />
        <Table_suffer_host_call_on_record_components {...this.props} />
        <br /> <br />
        <Table_have_communicate_inside_ip_components {...this.props} />
        <br /> <br />
        <Table_call_on_ip_components {...this.props} />
        <br /> <br />
        <Table_call_on_domain_components {...this.props} />
        <Chart_statistical_components {...this.props} />


      </div>
    )
  }
}

export default Page;
