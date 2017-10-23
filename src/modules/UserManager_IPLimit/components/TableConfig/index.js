/**
 * Created by jojo on 2017/9/5.
 */
import React from 'react';
import tableColumnsGenerator from '../../../../utils/tableColumnsGenerator';
import JoTag from '../../../../components/JoTag';
import { Icon, Switch, Card, Timeline, InputNumber, Button, Menu, Dropdown, Tooltip, Popconfirm } from 'antd';
import classnames from 'classnames';
import * as tools from '../../../../utils/tools';
import {
  dataIndexes,
  textConfig,
  roleTextConfig,
  ROLE_DATAINDEX,
  IP_RANGE_DATAINDEX,
  OPERATION_KEY
} from '../../ConstConfig';




const titleConfig = {}

Object.keys(textConfig).forEach(i => {
  titleConfig[i] = <p style={{ textAlign: "center" }}>{textConfig[i]}</p>
})

const extraProps = {
  [ROLE_DATAINDEX]: {
    width: "150px"
  },
  [OPERATION_KEY]: {
    width: "150px",
  },
  [IP_RANGE_DATAINDEX]: {
    width: "calc(100% - 300px)"
  }
}

export const getColumns = ({ getDelHandle, getOnAddClickHandle, isOpen }) => {


  return tableColumnsGenerator({
    keys: dataIndexes,
    titleTextConfig: titleConfig,
    renderer: {
      [ROLE_DATAINDEX]: value => <p style={{ textAlign: "center" }}>{tools.getKeyText(value, roleTextConfig)}</p>,
      [IP_RANGE_DATAINDEX]: value => (
        <div style={{ textAlign: "center", overflow: "hidden" }}>
          {/*<div style={{textAlign:"left",display:"inline-block",margin:"0 auto"}}>*/}
          {value.map((i, index) => (
            <JoTag color={isOpen ? "#108ee9" : null}
              key={`${index}-tag`}>
              {i}
              {
                isOpen
                  ?
                  <Popconfirm title={`是否删除${value[index]}?`}
                    onConfirm={getDelHandle(value[index])}>
                    {/* style={{color:"#d73435"}} */}
                    <a >
                      &nbsp;
                      <Icon type="delete" />
                    </a>
                  </Popconfirm>
                  :
                  <a style={{
                    cursor: "not-allowed"
                  }}>
                    &nbsp;
                    <Icon type="delete" />
                  </a>
              }
            </JoTag>
          ))}
          {/*</div>*/}
        </div>
      ),
      [OPERATION_KEY]: (value, records) => (
        <p style={{ textAlign: "center" }}>
          <Button type="primary"
            disabled={!isOpen}
            onClick={getOnAddClickHandle(records[ROLE_DATAINDEX])}>
            添加
          </Button>
        </p>
      )
    },
    extraProps,
  });

};


