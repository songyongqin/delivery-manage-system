import React from 'react';
import {
  NAMESPACE
} from './ConstConfig.js'
import { getNodeColumns } from '../SysConfig_Monitor/components/TableConfig'
import monitorContainerGenerator from '../../Generators/MonitorContainerGenerator'

export default monitorContainerGenerator({
  namespace: NAMESPACE,
  title: "流量监测系统",
  getColumns: getNodeColumns
})

