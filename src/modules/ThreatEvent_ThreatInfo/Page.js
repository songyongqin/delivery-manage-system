import React from 'react';
import * as tableConfig from './components/TableConfig';
import {formTextConfig} from './ConstConfig';
import {NAMESPACE} from './ConstConfig'

import ThreatEventContainerGenerator from '../../Generators/ThreatEventContainerGenerator/ThreatEventContainerGenerator';

export default ThreatEventContainerGenerator({
  tableConfig,
  formTextConfig,
  namespace:NAMESPACE
})
