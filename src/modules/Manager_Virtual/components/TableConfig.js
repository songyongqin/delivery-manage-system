/**
 * Created by jojo on 2017/9/5.
 */
import React from 'react';
import tableColumnsGenerator from '../../../utils/tableColumnsGenerator';
import {
  tableRowDataIndexes,
  tableTextConfig,
  HONEYPOT_TYPE_ROW_KEY
}from '../ConstConfig';
import {Progress,Row,Col,Badge,Button} from 'antd'
import JoTag from '../../../components/JoTag';

import classnames from 'classnames';

const honeypotTypeRenderer=records=>{
  console.info(records)
  return <pre>
    123123123
  </pre>
}



export const getColumns=({isDark,isAdmin,handle})=>{


  const renderer={
    [HONEYPOT_TYPE_ROW_KEY]:honeypotTypeRenderer
  }

  const columns=tableColumnsGenerator({
    keys:tableRowDataIndexes,
    renderer,
    titleTextConfig:tableTextConfig.rowTitles,
  });
  return [
    ...columns,
  ]

};


