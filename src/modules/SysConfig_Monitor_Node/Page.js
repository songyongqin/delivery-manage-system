import React from 'react';
import {
  NAMESPACE
} from './ConstConfig.js'
import { getCommonColumns } from '../SysConfig_Monitor/components/TableConfig'
import monitorContainerGenerator from '../../Generators/MonitorContainerGenerator'

export default monitorContainerGenerator({
  namespace: NAMESPACE,
  title: "蜜罐节点",
  getColumns: getCommonColumns
})

