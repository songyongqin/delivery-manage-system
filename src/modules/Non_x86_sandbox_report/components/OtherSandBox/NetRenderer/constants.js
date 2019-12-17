import columnsCreator from 'utils/columnsCreator'
import React from 'react'

 export const IP_INDEX = "ip",
PORT_INDEX = "port",
DOMAIN_INDEX = "domain",
STATE_INDEX = 'state',
DNS_INDEX = "dns",
PROTOCOL_INDEX = 'protocol',
URL_INDEX = 'url',
IOC_INDEX = 'ioc',
PAYLOAD_INDEX = 'payload',

TCP_INDEX = 'tcp',
UDP_INDEX = 'udp',
HTTP_INDEX = 'http',
HTTPS_INDEX ='https',
MODBUS_INDEX = 'modbus',
S7_INDEX = 's7',
BACNET_INDEX = 'bacnet',
ENIP_INDEX = 'enip',
CIP_INDEX = 'cip',
DNP3_INDEX = 'dnp3',
HART_IP_INDEX = 'hart_ip',
OMRON_INDEX = 'omron',
PROFINET_INDEX = 'profinet',
IPS_INDEX = 'ips',
METHOD_INDEX = 'method',
STATUS_INDEX = 'status'


const titleConfig = {
  [IP_INDEX]: "IP",
  [PORT_INDEX]: "端口",
  [PAYLOAD_INDEX]: "Payload",
  [DOMAIN_INDEX]: "域名",
  [STATE_INDEX]: "状态",
  [PROTOCOL_INDEX]: "通信协议",
  [URL_INDEX]: "Url",
  [IOC_INDEX]: "IOC",
  [STATUS_INDEX]: '状态',
  [METHOD_INDEX]: '方法'
}

const commonClumns = () => {
  return columnsCreator({
    dataIndexes: [IP_INDEX, PORT_INDEX, PAYLOAD_INDEX],
    titleConfig,
    extraProps: {
      [IP_INDEX]: {
        width: "30%"
      },
      [PORT_INDEX]: {
        width: "30%"
      },
      [PAYLOAD_INDEX]: {
        width: "40%"
      }
    }
  })
}

export const getTcpColumns = commonClumns

export const getUdpColumns = commonClumns

export const getHttpColumns = () => {
  return columnsCreator({
    dataIndexes: [METHOD_INDEX, URL_INDEX],
    titleConfig: { ...titleConfig, url: 'url' },
    extraProps: {
      [METHOD_INDEX]: {
        width: "30%"
      },
      [URL_INDEX]: {
        width: "70%"
      }
    }
  })
}

export const getHttpsColumns = commonClumns

export const getDnsColumns = () => {
  return columnsCreator({
    dataIndexes: [DOMAIN_INDEX, IP_INDEX, STATE_INDEX],
    titleConfig: {
      [IP_INDEX]: "IP",
      [DOMAIN_INDEX]: "域名",
      [STATE_INDEX]: "状态"
    },
    extraProps: {
      [IP_INDEX]: {
        width: "40%"
      },
      [PORT_INDEX]: {
        width: "30%"
      },
      [STATE_INDEX]: {
        width: "20%"
      }
    },
    renderer:{
      [STATE_INDEX]: (num) =>  <div>{num===0?'失活':'正常'}</div>
    }
  })
}

export const getModbusColumns = commonClumns

export const getS7Columns = commonClumns

export const getBacnetColumns = commonClumns

export const getEnipColumns = commonClumns

export const getCipColumns = commonClumns

export const getDnp3Columns = commonClumns

export const getHartipColumns = commonClumns

export const getOmronColumns = commonClumns

export const getProfinetColumns = commonClumns

export const getDomainColumns = () => {
  return columnsCreator({
    dataIndexes: [DOMAIN_INDEX, IP_INDEX, STATE_INDEX],
    titleConfig: {
      [IP_INDEX]: "IP",
      [DOMAIN_INDEX]: "域名",
      [STATE_INDEX]: "状态"
    },
    extraProps: {
      [IP_INDEX]: {
        width: "40%"
      },
      [PORT_INDEX]: {
        width: "30%"
      },
      [STATE_INDEX]: {
        width: "20%"
      }
    }
  })
}

export const getIpsColumns = () => {
  return columnsCreator({
    dataIndexes: [IP_INDEX , 'location.longitude', 'location.latitude', 'location'],
    titleConfig: {
      [IP_INDEX]: "IP",
      ['location.longitude']: '经度',
      ['location.latitude']: '纬度',
      ['location']: '地区'
    },
    extraProps: {
      [IP_INDEX]: {
        width: "30%"
      },
      ['location.longitude']: {
        width: "20%"
      },
      ['location.latitude']: {
        width: "20%"
      },
      ['location']: {
        width: "30%"
      }
    },
    renderer: {
      ['location']: text => <pre>{ text? `${text['country']}   ${text['city']}`: null }</pre>
    }

  })
}

export const getPortColumns = () => {
  return columnsCreator({
    dataIndexes: [PORT_INDEX],
    titleConfig: {
      [PORT_INDEX]: "端口"
    },
    extraProps: {
      [PORT_INDEX]: {
        width: "40%"
      }
    }
  })
}

export const getProtocolColumns = () => {
  return columnsCreator({
    dataIndexes: [PROTOCOL_INDEX],
    titleConfig: {
      [PROTOCOL_INDEX]: "通信协议"
    },
    extraProps: {
      [PROTOCOL_INDEX]: {
        width: "40%"
      }
    }
  })
}

export const getUrlcolColumns = () => {
  return columnsCreator({
    dataIndexes: [URL_INDEX],
    titleConfig: {
      [URL_INDEX]: "Url"
    },
    extraProps: {
      [URL_INDEX]: {
        width: "40%"
      }
    }
  })
}

export const getIoccolColumns = () => {
  return columnsCreator({
    dataIndexes: [IOC_INDEX],
    titleConfig: {
      [IOC_INDEX]: "IOC"
    },
    extraProps: {
      [IOC_INDEX]: {
        width: "40%"
      }
    }
  })
}