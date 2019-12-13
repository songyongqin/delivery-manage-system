import * as React from 'react'
import { PROTOCOL_ANALYSIS } from '../../ConstConfig'
import columnsCreator from 'utils/columnsCreator'
import EnhancedTable from '../EnhancedTable'
import Tag from '../Tagxt'

const TCP = "tcp",
  HTTP = "http",
  UDP = "udp",
  MODBUS = "modbus",

  DNS = "dns",

  HOST = "hosts",

  C2 = "c2",

  C2_DETECT = "c2detect",

  DYNAMIC_C2 = "dynamic_c2",

  USUAL_C2 = "usual_c2",

  SIGN = "sign",

  C2_ADDR = "addr",

  C2_PORT = "port",

  PROTOCOL = "protocol",

  DATA = "data",

  HTTP_METHOD = "method",

  HTTP_PORT = "port",

  HTTP_URI = "uri",

  MODBUS_DATA = "data",

  MODBUS_PORT = "port",

  MODBUS_IP = "ip",

  TCP_TARGET_PORT = "dport",
  TCP_TARGET_IP = "dst",
  TCP_SOURCE_PORT = "sport",
  TCP_SOURCE_IP = "src",
  TCP_STATUS = "status",

  UDP_TARGET_PORT = "dport",
  UDP_TARGET_IP = "dst",
  UDP_SOURCE_PORT = "sport",
  UDP_SOURCE_IP = "src",
  UDP_STATUS = "status",

  DNS_HOST_NAME = "hostname",
  DNS_IP = "ip",
  DNS_STATUS = "status",


  HOST_IP = "ip",

  HOST_DES = "description",

  HOST_PORT = "port",

  C2_VALUE = "value",


  TAINTED_INFO = "taintedinfo"

const httpDataIndexes = [HTTP_METHOD, HTTP_URI, HTTP_PORT],
  modbusDataIndexes = [MODBUS_IP, MODBUS_PORT, MODBUS_DATA],
  tcpDataIndexes = [TCP_SOURCE_IP, TCP_SOURCE_PORT, TCP_TARGET_IP, TCP_TARGET_PORT, TCP_STATUS],
  udpDataIndexes = [UDP_SOURCE_IP, UDP_SOURCE_PORT, UDP_TARGET_IP, UDP_TARGET_PORT, UDP_STATUS],
  dnsDataIndexes = [DNS_HOST_NAME, DNS_IP, DNS_STATUS],
  hostDataIndexes = [HOST_IP, HOST_DES],
  c2DataIndexes = [C2_VALUE],
  usualC2DataIndexes = [C2_VALUE],
  dynamicC2DataIndexes = [C2_VALUE, TAINTED_INFO]

const httpTextConfig = {
  [HTTP_METHOD]: "方法",
  [HTTP_URI]: "URI",
  [HTTP_PORT]: "端口"
}

const modbusTextConfig = {
  [MODBUS_IP]: "IP",
  [MODBUS_PORT]: "端口",
  [MODBUS_DATA]: "数据"
}


export const tcpTextConfig = {
  [TCP_TARGET_IP]: "目的IP",
  [TCP_TARGET_PORT]: "目的端口",
  [TCP_SOURCE_IP]: "源IP",
  [TCP_SOURCE_PORT]: "源端口",
  [TCP_STATUS]: "状态"
}

export const udpTextConfig = {
  [UDP_TARGET_IP]: "目的IP",
  [UDP_TARGET_PORT]: "目的端口",
  [UDP_SOURCE_IP]: "源IP",
  [UDP_SOURCE_PORT]: "源端口",
  [UDP_STATUS]: "状态"
}

export const dnsTextConfig = {
  [DNS_HOST_NAME]: "域名",
  [DNS_IP]: "IP",
  [DNS_STATUS]: "状态"
}

export const hostTextConfig = {
  [HOST_IP]: "IP地址",
  [HOST_PORT]: "端口",
  [HOST_DES]: "IP所在地"
}

export const usualC2TextConfig = {
  [C2_VALUE]: "C&C domain/ip"
}

export const dynamicC2TextConfig = {
  [C2_VALUE]: "C&C domain/ip",
  [TAINTED_INFO]: "污点信息"
}

const itemKeyList = [USUAL_C2, DYNAMIC_C2, MODBUS, HTTP, TCP, UDP, DNS, HOST]


const itemsConfig = {
  [MODBUS]: {
    dataIndexes: modbusDataIndexes,
    titleConfig: modbusTextConfig
  },
  [HTTP]: {
    dataIndexes: httpDataIndexes,
    titleConfig: httpTextConfig
  },
  [TCP]: {
    dataIndexes: tcpDataIndexes,
    titleConfig: tcpTextConfig
  },
  [UDP]: {
    dataIndexes: udpDataIndexes,
    titleConfig: udpTextConfig
  },
  [DNS]: {
    dataIndexes: dnsDataIndexes,
    titleConfig: dnsTextConfig
  },
  [HOST]: {
    dataIndexes: hostDataIndexes,
    titleConfig: hostTextConfig
  },
  [DYNAMIC_C2]: {
    dataIndexes: dynamicC2DataIndexes,
    titleConfig: dynamicC2TextConfig,
    renderer: {
      [TAINTED_INFO]: (value = []) => {
        return <div>
          {
            value.map((i, index) => {
              return <Tag key={`${index}-item`} color={"#40a9ff"}>{i}</Tag>
            })
          }
        </div>
      }
    }
  },
  [USUAL_C2]: {
    dataIndexes: usualC2DataIndexes,
    titleConfig: usualC2TextConfig
  }
}

const itemTitleConfig = {
  [MODBUS]: "modbus",
  [HTTP]: "HTTP",
  [TCP]: "TCP",
  [UDP]: "UDP",
  [DNS]: "域名解析",
  [HOST]: "地域",
  [USUAL_C2]: "C&C(网络发包解析)",
  [DYNAMIC_C2]: "C&C（动态监控污点追踪）"
}


const getHostData = (data) => {
  return Object.entries(data[HOST]).map(([key, value]) => {
    return {
      [HOST_IP]: key,
      [HOST_DES]: value,
      // [HOST_PORT]: value[HOST_PORT]
    }
  })
}

const getUsualC2Data = (data) => {
  try {
    const c2DetectData = data[C2_DETECT],
      usualC2Data = c2DetectData[USUAL_C2] || { [SIGN]: [] }

    return usualC2Data[SIGN].map(i => {
      return {
        value: i,
      }
    })
  } catch (e) {
    console.error(e)

    return []
  }
}

const getDynamicC2Data = (data) => {
  try {
    const c2DetectData = data[C2_DETECT],
      dynamicC2Data = c2DetectData[DYNAMIC_C2] || []

    return dynamicC2Data.map(i => {
      let sign = i[SIGN]
      return {
        ...i,
        value: `${sign[C2_ADDR]}:${sign[C2_PORT]}`
      }
    })
  } catch (e) {
    console.error(e)

    return []
  }
}

export default (data) => {

  const protocolAnalysis = data[PROTOCOL_ANALYSIS]
  const finalData = {}

  protocolAnalysis.forEach(i => {
    if (itemKeyList.includes(i[PROTOCOL])) {
      finalData[i[PROTOCOL]] = i[DATA]
    }
  })

  finalData[HOST] = getHostData(data)

  finalData[DYNAMIC_C2] = getDynamicC2Data(data)

  finalData[USUAL_C2] = getUsualC2Data(data)

  const finalItemKeys = itemKeyList.filter(i => i in finalData)

  return <div>
    {
      finalItemKeys.map(i => {

        const config = itemsConfig[i] || { dataIndexes: [] },
          itemData = (finalData[i] || [])
        if (itemData.length === 0) {
          return <div key={`${i}-item`}></div>
        }

        return <div key={`${i}-item`} style={{ marginBottom: "15px" }}>
          <h3 style={{ color: "#40a9ff", paddingLeft: "15px" }}>{itemTitleConfig[i]}</h3>
          <EnhancedTable
            tableProps={{
              columns: columnsCreator(config),
              // scroll: { y: 400 },
              dataSource: itemData.map((i, index) => {
                return {
                  ...i,
                  key: `${index}-item`
                }
              })
            }}
            pagination={false}>
          </EnhancedTable>
        </div>
      })
    }

  </div>
}