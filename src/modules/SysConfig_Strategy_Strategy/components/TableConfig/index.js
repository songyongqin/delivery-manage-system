/**
 * Created by jojo on 2017/9/5.
 */
import React from 'react';
import tableColumnsGenerator from '../../../../utils/tableColumnsGenerator';
import CountUp from 'react-countup';

import {
  dataIndexes,
  textConfig,
  TOTAL_DATAINDEX,
  STRATEGY_OPERATION_KEY,
  USEFUL_DATAINDEX,
  USERFUL_VALUE,
  PROTOCOLTYPE_DATAINDEX
}from '../../ConstConfig';


import {Button,Switch,Icon} from 'antd'

function getRenderer({getUsefulOnChangeHandle,}) {
  return {
    [TOTAL_DATAINDEX]:value=><CountUp  start={value}
                                       end={value}
                                       separator={","}
                                       useGrouping={true}
                                       duration={1}
                                       delay={0}/>,
    [USEFUL_DATAINDEX]:(value,records)=><Switch  checkedChildren={<Icon type="check" />}
                                                 onChange={getUsefulOnChangeHandle(records[PROTOCOLTYPE_DATAINDEX])}
                                                 unCheckedChildren={<Icon type="cross" />}
                                                 defaultChecked={value===USERFUL_VALUE}/>,
    [STRATEGY_OPERATION_KEY]:(value,records)=><Button type="primary">配置</Button>
  }

}

export const getColumns=({getUsefulOnChangeHandle}={})=>tableColumnsGenerator({
  keys:dataIndexes,
  titleTextConfig:textConfig,
  renderer:getRenderer({getUsefulOnChangeHandle}),
})
