import * as React from 'react'

import columnsCreator from 'utils/columnsCreator'
import EnhancedTable from '../../EnhancedTable'
import { Tabs } from 'antd'

import { 
  DOMAIN_INDEX, 
  DNS_INDEX,
  IP_INDEX,
  PORT_INDEX,
  PROTOCOL_INDEX,
  URL_INDEX,
  IOC_INDEX,
  TCP_INDEX,
  UDP_INDEX,
  HTTP_INDEX,
  HTTPS_INDEX,
  MODBUS_INDEX,
  S7_INDEX,
  BACNET_INDEX,
  ENIP_INDEX,
  CIP_INDEX,
  DNP3_INDEX,
  HART_IP_INDEX,
  OMRON_INDEX,
  PROFINET_INDEX,
  IPS_INDEX,

  
  getTcpColumns,
  getUdpColumns,
  getHttpColumns,
  getHttpsColumns,
  getDnsColumns,
  getModbusColumns,
  getS7Columns,
  getBacnetColumns,
  getEnipColumns,
  getCipColumns,
  getDnp3Columns,
  getHartipColumns,
  getOmronColumns,
  getProfinetColumns,

  getIpsColumns,
  getPortColumns,
  getProtocolColumns,
  getUrlcolColumns,
  getIoccolColumns,
  getDomainColumns,
 } from './constants'




const CommonTable = ({data = [], title='', columns}) => {
  let obj = {
    columns,
    scroll: { y: 420 },
    dataSource: data.map((i, index) => {
      return {
        ...i,
        key: `${index}-item`
      }
    })
  }
  if(title){
    obj['title'] = function(currentPageData){
      return <div  >{title}</div>
    }
  }

  if (data.length === 0) {
    return <div></div>
  }
  return <div style={{ overflow: "hidden", maxHeight: "500px" }}>
    <EnhancedTable
      tableProps={ obj }
      pagination={false}>
    </EnhancedTable>
  </div>

}

const arr = [
  
  // { key:DOMAIN_INDEX, title: '域名解析', columns: getDomainColumns() },
  // { key:DNS_INDEX, title: 'DNS请求', columns: getTcpColumns() },
  { key:IPS_INDEX, title: '访问的IP列表', columns: getIpsColumns() },
  { key:PORT_INDEX, title: '使用的端口列表', columns: getPortColumns() },
  { key:PROTOCOL_INDEX, title: '使用的通信协议', columns: getProtocolColumns() },
  // { key:URL_INDEX, title: '关联URL列表', columns: getUrlcolColumns() },
  { key:IOC_INDEX, title: '威胁指标(IOC)', columns: getIoccolColumns() },
]

const netAnalyseArr = [
  { key:TCP_INDEX, title: 'TCP', columns: getTcpColumns() },
  { key:UDP_INDEX, title: 'UDP', columns: getUdpColumns() },
  { key:HTTP_INDEX, title: 'HTTP', columns: getHttpColumns() },
  { key:HTTPS_INDEX, title: 'HTTPS', columns: getHttpsColumns() },
  { key:DNS_INDEX, title: 'DNS', columns: getDnsColumns() }
]

const countrolAnalyseArr = [
  { key:MODBUS_INDEX, title: 'MODBUS', columns: getModbusColumns() },
  { key:S7_INDEX, title: 'S7COMM', columns: getS7Columns() },
  { key:BACNET_INDEX, title: 'BACNET', columns: getBacnetColumns() },
  { key:ENIP_INDEX, title: 'ENIP', columns: getEnipColumns() },
  { key:CIP_INDEX, title: 'CIP', columns: getCipColumns() },
  { key:DNP3_INDEX, title: 'DNP3', columns: getDnp3Columns() },
  { key:HART_IP_INDEX, title: 'HART_IP', columns: getHartipColumns() },
  { key:OMRON_INDEX, title: 'OMRON', columns: getOmronColumns() },
  { key:PROFINET_INDEX, title: 'PROFINET', columns: getProfinetColumns() }
]


const NetPage = (obj={}) => {
  try{
    return (
      <div>
        <Item arr={ netAnalyseArr } obj={ obj } title='网络协议分析' />
        <Item arr={ countrolAnalyseArr } obj={ obj } title='工控协议分析' />
        {
           arr.map(i => <CommonTable key={ i.key } title={ i.title } columns={ i.columns } data={ obj[i.key] } /> )
         }
      </div>)
    // return (
    //   <div>
    //     {
    //       arr.map(i => <CommonTable key={ i.key } title={ i.title } columns={ i.columns } data={ obj[i.key] } /> )
    //     }
  }
  catch(e){
    return <div></div>
  }
}

const Item = ({ arr, obj, title}) => {
  return(
    <div style={{ marginBottom:15 }} >
      <div>{ title }</div>
      <Tabs defaultActiveKey={ arr[0].key } >
        {
          arr.map(i => 
            <Tabs.TabPane tab={ i.title } key={ i.key }  >
              <CommonTable  columns={ i.columns } data={ obj[i.key] } />
            </Tabs.TabPane>
          )
        }
      </Tabs>
    </div>
    
  )
}

export default NetPage