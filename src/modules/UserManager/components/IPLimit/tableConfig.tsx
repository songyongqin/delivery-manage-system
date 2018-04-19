/**
 * Created by jojo on 2017/9/5.
 */
import * as React from 'react'
import Tag from 'components/Tag'
import { Icon, Switch, Card, Timeline, InputNumber, Button, Menu, Dropdown, Tooltip, Popconfirm } from 'antd'
import classnames from 'classnames'
import * as tools from 'utils'
import {
  dataIndexes,
  textConfig,
  roleTextConfig,
  ROLE_DATAINDEX,
  IP_RANGE_DATAINDEX,
  OPERATION_KEY
} from '../../constants'
import columnsCreator from 'domainUtils/columnsCreator'


const titleConfig = {}

Object.keys(textConfig).forEach(i => {
  titleConfig[i] = <div style={{ textAlign: "center" }}>{textConfig[i]}</div>
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

export const getColumns = ({ handle = {} }) => {

  return columnsCreator({
    dataIndexes: dataIndexes,
    titleConfig: titleConfig,
    renderer: {
      [ROLE_DATAINDEX]: value => <div style={{ textAlign: "center" }}>{tools.getKeyText(value, roleTextConfig)}</div>,
      [IP_RANGE_DATAINDEX]: (value, records) => (
        <div style={{ textAlign: "center", overflow: "hidden" }}>
          {value.map((i, index) => (
            <Tag color={"#108ee9"}
              style={{ marginBottom: "5px" }}
              key={`${index}-tag`}>
              {i}
              <Popconfirm title={`是否删除${value[index]}?`} onConfirm={_ => handle["delete"] && handle["delete"]({ ip: i, type: records.role })}>
                <a>
                  &nbsp;
                  <Icon type="delete" />
                </a>
              </Popconfirm>
            </Tag>
          ))}
        </div>
      ),
      [OPERATION_KEY]: (value, records) => (
        <div style={{ textAlign: "center" }}>
          <Button icon="plus" type="primary" onClick={_ => handle["add"] && handle["add"](records)}>
            添加
          </Button>
        </div>
      )
    },
    extraProps,
  })

}


