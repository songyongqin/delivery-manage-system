/**
 * Created by jojo on 2017/9/5.
 */
import React from 'react';
import tableColumnsGenerator from '../../../utils/tableColumnsGenerator';
import JoTag from '../../../components/JoTag';
import {Icon,Switch,Card,Timeline,InputNumber,Button} from 'antd';
import classnames from 'classnames';
import * as tools from '../../../utils/tools';
import {rowDataIndexes,tableTextConfig,OPREATION_ROW_KEY} from '../ConstConfig';
import {} from '../ConstConfig';


export const getColumns=()=>{

  const columns = tableColumnsGenerator({
    keys:rowDataIndexes,
    titleTextConfig:tableTextConfig.rowTitles,
  });

  return [
    ...columns,
    {
      title:tableTextConfig.rowTitles[OPREATION_ROW_KEY],
      key:OPREATION_ROW_KEY,
      render:records=>{
        return (
          <div>
            operation
          </div>
        )
      }
    }
  ]

};


