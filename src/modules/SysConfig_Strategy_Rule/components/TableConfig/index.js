/**
 * Created by jojo on 2017/9/5.
 */
import React from 'react';
import tableColumnsGenerator from '../../../../utils/tableColumnsGenerator';
import CountUp from 'react-countup';
import Card from '../../../../domainComponents/Card';
import StrategyRule from '../../../SysConfig_Strategy_Rule/Page';
import { Menu, Button, Icon, Dropdown } from 'antd';
import JoTag from '../../../../components/JoTag';
import {
  RULE_ID_DATAINDEX,
  RULE_OPERATION_KEY,
  RULE_DATAINDEX,
  RULE_PROTOCOLTYPE_DATAINDEX,
  RULE_THREAT_TYPE_DATAINDEX,
  dataIndexes,
  textConfig,
} from '../../ConstConfig';
import { getKeyText } from '../../../../utils/tools'


function getRenderer({ getModifyOpenHandle, getDelHandle, threatnames }) {
  let keyTextConfig = {

  };
  threatnames.forEach(i => {
    keyTextConfig[i.key] = i.name;
  })
  return {
    [RULE_THREAT_TYPE_DATAINDEX]: value => getKeyText(value, keyTextConfig),
    [RULE_DATAINDEX]: value => Object.values(value).map(i => (
      [
        <JoTag color="#108ee9" key={`${i}-tag`}>{i}</JoTag>,
        <br key={`${i}-br`} />
      ]
    )),
    [RULE_OPERATION_KEY]: (value, records) => {
      const menu = (
        <Menu>
          <Menu.Item >
            <span onClick={getModifyOpenHandle(records)}>
              <Icon type="edit" />&nbsp;修改
                </span>
          </Menu.Item>
          <Menu.Item >
            <span onClick={getDelHandle(records[RULE_ID_DATAINDEX])}>
              <Icon type="delete" />&nbsp;删除
                </span>
          </Menu.Item>
        </Menu>
      )

      return (
        <div>
          <Dropdown overlay={menu} >
            <Button icon="ellipsis" />
          </Dropdown>
          {/*<Button.Group>*/}
          {/*<Button type="primary" icon="edit">*/}
          {/*修改*/}
          {/*</Button>*/}
          {/*<Button type="danger" icon="delete">*/}
          {/*删除*/}
          {/*</Button>*/}
          {/*</Button.Group>*/}
        </div>
      )
    }
  }

}

export const getColumns = ({ getModifyOpenHandle, getDelHandle, threatnames } = {}) =>
  tableColumnsGenerator({
    keys: dataIndexes,
    titleTextConfig: textConfig,
    renderer: getRenderer({ getModifyOpenHandle, getDelHandle, threatnames }),
  })



