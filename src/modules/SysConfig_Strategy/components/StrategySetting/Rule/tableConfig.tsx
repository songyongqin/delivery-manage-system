import React from 'react';
import CountUp from 'react-countup'
import Card from 'domainComponents/Card'
import { Menu, Button, Icon, Dropdown } from 'antd'
import {
  RULE_ID_DATAINDEX,
  RULE_OPERATION_KEY,
  RULE_DATAINDEX,
  RULE_PROTOCOLTYPE_DATAINDEX,
  RULE_THREAT_TYPE_DATAINDEX,
  ruleDataIndexes as dataIndexes,
  ruleTextConfig as textConfig,
} from '../../../constants'
import { getKeyText } from 'utils'
import columnsCreator from 'domainUtils/columnsCreator'
import { ruleItemsConfig } from '../../../constants'
import Tag from 'components/Tag'
import { pick } from 'utils'



function getRenderer({ protocolType, handle }) {
  let keyTextConfig = {

  };
  // threatnames.forEach(i => {
  //   keyTextConfig[i.key] = i.name;
  // })
  const ruleKeys = ruleItemsConfig[protocolType] || []

  return {
    [RULE_THREAT_TYPE_DATAINDEX]: value => getKeyText(value, keyTextConfig),
    [RULE_DATAINDEX]: value => {
      return Object.values(pick(ruleKeys, value)).map(i => (
        [
          <Tag color="#108ee9" key={`${i}-tag`}>{i}</Tag>,
          <br key={`${i}-br`} />
        ]
      ))

    },
    [RULE_OPERATION_KEY]: (value, records) => {
      const menu = (
        <Menu onClick={({ key }) => {
          handle && handle[key] && handle[key](records)
        }}>
          <Menu.Item key="edit">
            <Icon type="edit" />&nbsp;修改
          </Menu.Item>
          <Menu.Item key="delete">
            <Icon type="delete" />&nbsp;删除
          </Menu.Item>
        </Menu>
      )

      return (
        <div>
          <Dropdown overlay={menu} >
            <Button icon="ellipsis" />
          </Dropdown>
        </div>
      )
    }
  }

}

export const getColumns = ({ protocolType, handle }) => {

  return columnsCreator({
    dataIndexes,
    titleConfig: textConfig,
    renderer: getRenderer({ protocolType, handle }),
  })
}



