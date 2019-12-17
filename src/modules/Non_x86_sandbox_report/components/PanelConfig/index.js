import * as React from 'react'
import { connect } from 'dva'
import classnames from 'classnames'
const styles = require("./styles.css")
import {
  FILE_NAME_DATA_INDEX,
  TARGET_DATA_INDEX,
  BASIC_INFO_DATA_INDEX,
  BEHAVIOR_DATA_INDEX,
  DANGER_BEHAVIOR_DATA_INDEX,
  OTHER_BEHAVIOR_DATA_INDEX,
  CORE_BEHAVIOR_DATA_INDEX,
  SCAN_DATA_INDEX,
  FILE_SCAN_DATA_INDEX,
  ENGINE_DETECT_DATA_INDEX,
  SCAN_ENGINE_DATA_INDEX,
  AVL_ENGINE,
  YARA_ENGINE,
  STATIC_INFO_DATA_INDEX,
  DOC_STRUCTURE_DATA_INDEX,
  PE_STRUCTURE_DATA_INDEX,
  STRINGS_DATA_INDEX,
  NETWORK_DATA_INDEX,
  REG_BEHAVIOR_DATA_INDEX,
  BASIC_BEHAVIOR_DATA_INDEX,
  MUTEX_DATA_INDEX,
  FILE_BEHAVIOR_DATA_INDEX,
  REG_KEY_ONLY_DATA_INDEX,
  REG_VALUE_ONLY_DATA_INDEX,
  PROCESS_TREE_DATA_INDEX,
  PROCESS_INFO_DATA_INDEX,
  PROCESS_BEHAVIOR_DATA_INDEX,
  SUMMARY_DATA_INDEX,
  ANALYSE_ENV_DATA_INDEX,
  ANALYSE_STATUS_DATA_INDEX,
  basicPanelTextConfig,
  basicInfoDataIndexes,
  SUMMARY_DESCRIPTION,
  behaviorDataIndexes,
  NAME_DATA_INDEX,
  VALUE_DATA_INDEX,
  DETAILS_DATA_INDEX,
  INFO_DATA_INDEX,
  behaviorTextConfig,
  DETECT_RESULTS_DATA_INDEX,
  LEVEL_DATA_INDEX,
  NAME_SCAN_DATA_INDEX,
  NAME_SCAN_DETECT_RESULTS
} from '../../ConstConfig'
import { Row, Col, Icon } from 'antd'

import avlEngineRenderer from '../AvlEngineRenderer'
import yaraEngineRenderer from '../YaraEngineRenderer'
import stringsRenderer from '../StringsRenderer'
import structureRenderer from '../StructureRenderer'
import fileBehaviorRenderer from '../FileBehaviorRenderer'
import regBehaviorRenderer from '../RegBehaviorRenderer'
import processInfoRenderer from '../ProcessInfoRenderer'
import mutexRenderer from '../MutexRenderer'
import processTreeRenderer from '../ProcessTreeRenderer'
import CommonList from '../CommonList'
import basicInfoRenderer from '../BasicInfoRenderer'
import networkRenderer from '../NetworkRenderer'
import nameScanRenderer from '../NameScanRenderer'
import summaryRenderer from '../SummaryRenderer'
import ThreatIntelligence from '../ThreatIntelligence'
import networkScanRenderer from '../NetworkScanRenderer'

import OtherBasicInfoRenderer from '../OtherSandBox/BasicInfoRenderer'
import EngineCheckRenderer from '../OtherSandBox/EngineCheckRenderer'
import NetRenderer from '../OtherSandBox/NetRenderer'
import CommnuicationRenderer from '../OtherSandBox/CommnuicationRenderer'

// import summarizeRenderer from '../OtherSandBox/SummarizeRenderer'



import $ from 'jquery'

import 'jquery.nicescroll'
import StaticAnalyseRenderer from '../OtherSandBox/StaticAnalyseRenderer';
import TreeRenderer from '../OtherSandBox/TreeRenderer';
import FileActionRenderer from '../OtherSandBox/FileActionRenderer'
import SpecialRenderer from '../OtherSandBox/SpecialRenderer'

export const getFileName = (content) => {
  try {
    return content[BASIC_INFO_INDEX]['file_name']
  } catch (e) {
    console.error(e)
    return null
  }
}

const getBasicInfo = content => {
  try {
    let obj = {
      ...content[TARGET_DATA_INDEX],
      ...content[SUMMARY_DATA_INDEX],
      ...content[TARGET_DATA_INDEX][BASIC_INFO_DATA_INDEX],
      [ANALYSE_ENV_DATA_INDEX]: content[ANALYSE_ENV_DATA_INDEX],
    }
    return obj
  } catch (e) {
    console.error(e)
    return null
  }
}

const getOtherBasicInfo = content => {
  try {
    return content[BASIC_INFO_INDEX]
  } catch (e) {
    console.error(e)
    return null
  }
}

// const getSummarize = content => {
//   try {
//     return content[SUMMARIZE]
//   } catch (e) {
//     console.error(e)
//     return null
//   }
// }

const getDangerBehavior = content => {
  try {
    return content[BEHAVIOR_DATA_INDEX][DANGER_BEHAVIOR_DATA_INDEX]
  } catch (e) {
    console.error(e)
    return []
  }
}

const getCoreBehavior = content => {
  try {
    return content[BEHAVIOR_DATA_INDEX][CORE_BEHAVIOR_DATA_INDEX]
  } catch (e) {
    console.error(e)
    return []
  }
}

const getOtherBehavior = content => {
  try {
    return content[BEHAVIOR_DATA_INDEX][OTHER_BEHAVIOR_DATA_INDEX]
  } catch (e) {
    console.error(e)
    return []
  }
}

const getAvlScan = content => {
  try {
    let data = []
    content[SCAN_DATA_INDEX][FILE_SCAN_DATA_INDEX]
      .forEach(i => {
        const innerItems = i[ENGINE_DETECT_DATA_INDEX].filter(j => {
          return j[SCAN_ENGINE_DATA_INDEX] === AVL_ENGINE
        })
        data = [
          ...data,
          ...innerItems.reduce((target, item) => {
            item[DETECT_RESULTS_DATA_INDEX].forEach(innerItem => {
              target.push({
                ...i,
                ...item,
                ...innerItem
              })
            })
            return target
          }, [])]
      })
    const extraData = content[SCAN_DATA_INDEX][FILE_SCAN_DATA_INDEX].filter(i => {
      return i[ENGINE_DETECT_DATA_INDEX].length === 0
    })
    return [...data, ...extraData]

  } catch (e) {
    console.error(e)
    return []
  }
}

const getYaraScan = content => {
  try {
    let data = []
    content[SCAN_DATA_INDEX][FILE_SCAN_DATA_INDEX]
      .forEach(i => {
        const innerItems = i[ENGINE_DETECT_DATA_INDEX].filter(j => {
          return j[SCAN_ENGINE_DATA_INDEX] === YARA_ENGINE
        })
        data = [
          ...data,
          ...innerItems.reduce((target, item) => {
            item[DETECT_RESULTS_DATA_INDEX].forEach(innerItem => {
              target.push({
                ...i,
                ...item,
                ...innerItem
              })
            })
            return target
          }, [])]
      })
    const extraData = content[SCAN_DATA_INDEX][FILE_SCAN_DATA_INDEX].filter(i => {
      return i[ENGINE_DETECT_DATA_INDEX].length === 0
    })
    return [...data, ...extraData]

  } catch (e) {
    console.error(e)
    return []
  }
}

const getStructureData = content => {
  try {
    return {
      [DOC_STRUCTURE_DATA_INDEX]: content[STATIC_INFO_DATA_INDEX][DOC_STRUCTURE_DATA_INDEX],
      [PE_STRUCTURE_DATA_INDEX]: content[STATIC_INFO_DATA_INDEX][PE_STRUCTURE_DATA_INDEX]
    }
  } catch (e) {
    console.error(e)
    return {
      [DOC_STRUCTURE_DATA_INDEX]: {},
      [PE_STRUCTURE_DATA_INDEX]: {}
    }
  }
}

const getStrings = content => {
  try {
    return content[STATIC_INFO_DATA_INDEX][STRINGS_DATA_INDEX]
  } catch (e) {
    console.error(e)
    return []
  }
}

const getNetwork = content => {
  try {
    return content[NETWORK_DATA_INDEX]
  } catch (e) {
    console.error(e)
    return {}
  }
}

const getFileBehavior = content => {
  try {
    return content[BEHAVIOR_DATA_INDEX][BASIC_BEHAVIOR_DATA_INDEX][FILE_BEHAVIOR_DATA_INDEX]
  } catch (e) {
    console.error(e)
    return []
  }
}

const getRegBehavior = content => {
  try {
    return {
      [REG_KEY_ONLY_DATA_INDEX]: content[BEHAVIOR_DATA_INDEX][BASIC_BEHAVIOR_DATA_INDEX][REG_BEHAVIOR_DATA_INDEX][REG_KEY_ONLY_DATA_INDEX],
      [REG_VALUE_ONLY_DATA_INDEX]: content[BEHAVIOR_DATA_INDEX][BASIC_BEHAVIOR_DATA_INDEX][REG_BEHAVIOR_DATA_INDEX][REG_VALUE_ONLY_DATA_INDEX],
    }
  } catch (e) {
    console.error(e)
    return {
      [REG_KEY_ONLY_DATA_INDEX]: [],
      [REG_VALUE_ONLY_DATA_INDEX]: []
    }
  }
}
const getThreatIntelligence = content => {
  try {
    return content[THREATINTELLIGENCE]
  } catch (e) {
    console.error(e)
    return []
  }
}


const getEngineCheckRenderer = content => {
  try {
    return content[ENGINE_CHECK_INDEX]
  } catch (e) {
    console.error(e)
    return []
  }
}

const getNetAnalyseRenderer = content => {
  try {
    return content[NETWORK_ANALYSE_INDEX]
  } catch (e) {
    console.error(e)
    return []
  }
}

const getCommnuicationRender = content => {
  try {
    return content[COMMNUICATION_INDEX]
  } catch (e) {
    console.error(e)
    return []
  }
}

const getStaticAnalyseRenderer = content => {
  try {
    return content[STATIC_ANALYSE_INDEX]
  } catch (e) {
    console.error(e)
    return {}
  }
}

const getPtreeRenderer = content => {
  try {
    return content[PTREE_INDEX]
  } catch (e) {
    console.error(e)
    return {}
  }
}

const getFileRenderer = content => {
  try {
    return content[FILE_INDEX]
  } catch (e) {
    console.error(e)
    return {}
  }
}

const getSpecialRenderer = content => {
  try {
    return content[SPECIAL_INDEX]
  } catch (e) {
    console.error(e)
    return {}
  }
}

const getProcessInfo = content => {
  try {
    return content[BEHAVIOR_DATA_INDEX][BASIC_BEHAVIOR_DATA_INDEX][PROCESS_BEHAVIOR_DATA_INDEX][PROCESS_INFO_DATA_INDEX]
  } catch (e) {
    console.error(e)
    return []
  }
}

const getProcessTree = content => {
  try {
    return content[BEHAVIOR_DATA_INDEX][BASIC_BEHAVIOR_DATA_INDEX][PROCESS_BEHAVIOR_DATA_INDEX][PROCESS_TREE_DATA_INDEX]
  } catch (e) {
    console.error(e)
    return {}
  }
}

const getMutex = content => {
  try {
    return content[BEHAVIOR_DATA_INDEX][BASIC_BEHAVIOR_DATA_INDEX][MUTEX_DATA_INDEX]
  } catch (e) {
    console.error(e)
    return []
  }
}

const NAME_SCAN_KNOW_DATA_INDEX = "know",
  NAME_LIB_VERSION_DATA_INDEX = "namelib_version"

const getNameScan = content => {
  try {
    return {
      data: content[SCAN_DATA_INDEX][NAME_SCAN_DATA_INDEX]
        .map(i => (
          i[NAME_SCAN_DETECT_RESULTS]
            .map(j => ({
              ...j,
              ...j[NAME_SCAN_KNOW_DATA_INDEX]
            }))
        ))
        .reduce((target, item) => [...target, ...item], []),

      version: content[SCAN_DATA_INDEX][NAME_LIB_VERSION_DATA_INDEX]
    }
  } catch (e) {
    console.error(e)
    return {
      data: [],
      version: ""
    }
  }
}


const NETWORK_SCAN = "networkscan",
  NET_LIB_VERSION = "netlib_version",
  NET_SCAN_DETECT_RESULTS = "detect_results",
  KNOW_DATA_INDEX = "know"

const getNetworkScan = content => {
  try {
    return {
      data: content[SCAN_DATA_INDEX][NETWORK_SCAN]
        .map(i => {
          return i[DETECT_RESULTS_DATA_INDEX]
            .map(j => {
              return {
                ...j,
                ...j[KNOW_DATA_INDEX]
              }
            })
        })
        .reduce((target, item) => [...target, ...item], []),

      version: content[SCAN_DATA_INDEX][NET_LIB_VERSION]
    }
  } catch (e) {
    console.error(e)
    return {
      version: "",
      data: []
    }
  }
}


export const BASIC_INFO = "basic-info",
  DANGER_BEHAVIOR = "danger-behavior",
  CORE_BEHAVIOR = "core-behavior",
  OTHER_BEHAVIOR = "other-behavior",
  AVL_SCAN = "avl-scan",
  YARA_SCAN = "yara-scan",
  STRUCTURE = "structure",
  STRINGS = "strings",
  NETWORK = "network",
  FILE_BEHAVIOR = "file-behavior",
  REG_BEHAVIOR = "reg-behavior",
  PROCESS_INFO = "process-info",
  PROCESS_TREE = "process-tree",
  MUTEX = "mutex",
  SUMMARY = "summary",

  ENGINE_CHECK_INDEX = 'engine',
  NETWORK_ANALYSE_INDEX = 'network',
  COMMNUICATION_INDEX = 'communication',
  STATIC_ANALYSE_INDEX = 'static_analysis',
  PTREE_INDEX = 'ptree',
  API_CALL_INDEX = 'apiCall',
  FILE_INDEX = 'file',
  SPECIAL_INDEX = 'special',
  DYNAMIC_ANALYSE_INDEX = 'dynamicAnalyse',
  BASIC_INFO_INDEX = 'basic_info',

  THREATINTELLIGENCE = "threat_intelligence",

  NAME_SCAN = "name-scan",

  NET_WORK_SCAN = "network-scan",

  SUMMARIZE = "summarize"

export const panelKeys = [

  // BASIC_INFO,
  BASIC_INFO_INDEX,
  ENGINE_CHECK_INDEX,
  NETWORK_ANALYSE_INDEX,
  COMMNUICATION_INDEX,
  STATIC_ANALYSE_INDEX,
  PTREE_INDEX,
  FILE_INDEX,
  SPECIAL_INDEX,

  // THREATINTELLIGENCE,
  // SUMMARY,
  // DANGER_BEHAVIOR,
  // CORE_BEHAVIOR,
  // OTHER_BEHAVIOR,
  // AVL_SCAN,
  // // NET_WORK_SCAN,
  // YARA_SCAN,
  // NAME_SCAN,
  // STRUCTURE,
  // STRINGS,
  // NETWORK,
  // FILE_BEHAVIOR,
  // REG_BEHAVIOR,
  // PROCESS_INFO,
  // PROCESS_TREE,
  // MUTEX
]

export const panelTitleConfigs = {
  [BASIC_INFO]: "基础信息/概述",
  [ENGINE_CHECK_INDEX]: "引擎检测",
  [NETWORK_ANALYSE_INDEX]: "网络分析",
  [COMMNUICATION_INDEX]: "通信检测",
  [STATIC_ANALYSE_INDEX]: "静态分析",
  [PTREE_INDEX]: "进程树",
  [FILE_INDEX]: '文件操作',
  [SPECIAL_INDEX]: "动态行为",
  [THREATINTELLIGENCE]: "威胁情报",
  [SUMMARY]: "汇总发现",
  [DANGER_BEHAVIOR]: "威胁行为",
  [CORE_BEHAVIOR]: "核心目的",
  [OTHER_BEHAVIOR]: "其他行为",
  [AVL_SCAN]: "AVL检测",
  [YARA_SCAN]: "YARA检出",
  [NET_WORK_SCAN]: "通信检测",
  [STRUCTURE]: "PE结构/DOC结构",
  [STRINGS]: "提取字符串",
  [NETWORK]: "网络分析",
  [FILE_BEHAVIOR]: "文件操作",
  [REG_BEHAVIOR]: "注册表监控",
  [PROCESS_INFO]: "进程监控",
  [PROCESS_TREE]: "衍生关系图",
  [MUTEX]: "创建互斥量",
  [NAME_SCAN]: "名称检测",


  [BASIC_INFO_INDEX]: '基本信息'
}

export const panelDataHandleConfigs = {
  [BASIC_INFO]: getBasicInfo,
  [ENGINE_CHECK_INDEX]: getEngineCheckRenderer,
  [NETWORK_ANALYSE_INDEX]: getNetAnalyseRenderer,
  [COMMNUICATION_INDEX]: getCommnuicationRender,
  [STATIC_ANALYSE_INDEX]: getStaticAnalyseRenderer,
  [PTREE_INDEX]: getPtreeRenderer,
  [FILE_INDEX]: getFileRenderer,
  [SPECIAL_INDEX]: getSpecialRenderer,

  [THREATINTELLIGENCE]: getThreatIntelligence,
  [SUMMARY]: getDangerBehavior,
  [DANGER_BEHAVIOR]: getDangerBehavior,
  [CORE_BEHAVIOR]: getCoreBehavior,
  [OTHER_BEHAVIOR]: getOtherBehavior,
  [AVL_SCAN]: getAvlScan,
  [YARA_SCAN]: getYaraScan,
  [NET_WORK_SCAN]: getNetworkScan,
  [STRUCTURE]: getStructureData,
  [STRINGS]: getStrings,
  [NETWORK]: getNetwork,
  [FILE_BEHAVIOR]: getFileBehavior,
  [REG_BEHAVIOR]: getRegBehavior,
  [PROCESS_INFO]: getProcessInfo,
  [PROCESS_TREE]: getProcessTree,
  [MUTEX]: getMutex,
  [NAME_SCAN]: getNameScan,

  [BASIC_INFO_INDEX]: getOtherBasicInfo,
  // [SUMMARIZE]: getSummarize,
}

const safeRenderWrapper = renderer => data => {
  // console.log('data', data, renderer)
  try {
    return renderer(data)
  } catch (e) {
    return (
      <pre>
        {
          JSON.stringify(data, null, 2)
        }
      </pre>
    )
  }
}


const behaviorGirdLayout = {
  xs: {
    span: 24
  },
  sm: {
    span: 24
  },
  md: {
    span: 24
  },
  lg: {
    span: 12
  },
  xl: {
    span: 12
  },
  xxl: {
    span: 8
  }
}

const infoRenderItemStyle = {
  wordBreak: "break-all",
  float: "left",
  margin: 0
}



const infoRender = (infoData = []) => {
  return infoData.map(i => {
    return i[DETAILS_DATA_INDEX].map((j, index) => {
      return <div style={{ marginBottom: "15px", overflow: "hidden" }} key={`${index}`}>
        <p style={infoRenderItemStyle}>
          {`${j[NAME_DATA_INDEX]}`}
        </p>
        <p style={infoRenderItemStyle}>
          {"="}
        </p>
        <p style={infoRenderItemStyle}>
          {`${j[VALUE_DATA_INDEX]}`}
        </p>
      </div>
    })
  })
}

const behaviorItemRenderer = {
  [INFO_DATA_INDEX]: infoRender,
  [LEVEL_DATA_INDEX]: value => {
    return <span style={{ color: "#ff4d4f" }}>{"★".repeat(value)}</span>
  }
}

const behaviorRenderer = (data = []) => {
  return (
    <Row gutter={5}>
      {
        data.map((i, index) => {
          return (
            <Col {...behaviorGirdLayout} key={`${index}`}  >
              <CommonList data={i} renderer={behaviorItemRenderer}></CommonList>
            </Col>
          )
        })
      }
    </Row>
  )
}

export const rendererConfig = {
  [BASIC_INFO]: safeRenderWrapper(basicInfoRenderer),
  [THREATINTELLIGENCE]: safeRenderWrapper(ThreatIntelligence),
  [SUMMARY]: safeRenderWrapper(summaryRenderer),
  [NET_WORK_SCAN]: safeRenderWrapper(networkScanRenderer),
  [DANGER_BEHAVIOR]: safeRenderWrapper(behaviorRenderer),
  [CORE_BEHAVIOR]: safeRenderWrapper(behaviorRenderer),
  [OTHER_BEHAVIOR]: safeRenderWrapper(behaviorRenderer),
  [AVL_SCAN]: safeRenderWrapper(avlEngineRenderer),
  [YARA_SCAN]: safeRenderWrapper(yaraEngineRenderer),
  [STRUCTURE]: safeRenderWrapper(structureRenderer),
  [STRINGS]: safeRenderWrapper(stringsRenderer),
  [NETWORK]: safeRenderWrapper(networkRenderer),
  [FILE_BEHAVIOR]: safeRenderWrapper(fileBehaviorRenderer),
  [REG_BEHAVIOR]: safeRenderWrapper(regBehaviorRenderer),
  [PROCESS_INFO]: safeRenderWrapper(processInfoRenderer),
  [PROCESS_TREE]: safeRenderWrapper(processTreeRenderer),
  [MUTEX]: safeRenderWrapper(mutexRenderer),
  [NAME_SCAN]: safeRenderWrapper(nameScanRenderer),

  [BASIC_INFO_INDEX]: safeRenderWrapper(OtherBasicInfoRenderer),
  [ENGINE_CHECK_INDEX]: safeRenderWrapper(EngineCheckRenderer),
  [NETWORK_ANALYSE_INDEX]: safeRenderWrapper(NetRenderer),
  [COMMNUICATION_INDEX]: safeRenderWrapper(CommnuicationRenderer),
  [STATIC_ANALYSE_INDEX]: safeRenderWrapper(StaticAnalyseRenderer),
  [PTREE_INDEX]: safeRenderWrapper(TreeRenderer),
  [FILE_INDEX]: safeRenderWrapper(FileActionRenderer),
  [SPECIAL_INDEX]: safeRenderWrapper(SpecialRenderer),
  // [SUMMARIZE]: safeRenderWrapper(summarizeRenderer),
}
