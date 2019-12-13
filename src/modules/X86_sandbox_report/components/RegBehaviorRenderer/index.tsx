import * as React from 'react'
import { getKeyText } from 'utils/tools'
import { REG_KEY_ONLY_DATA_INDEX, REG_VALUE_ONLY_DATA_INDEX } from '../../ConstConfig'
import { primaryColor } from 'themes/vars'
import Tag from 'components/Tag'
import Tabs from 'domainComponents/Tabs'
import $ from 'jquery'
import 'jquery.nicescroll'
import ScrollWrapper from 'components/ScrollWrapper'

const KEY_PATH_DATA_INDEX = "keypath",
  ACTION_DATA_INDEX = "action",
  NEW_ACTION = "new",
  DELETE_ACTION = "delete",
  VALUE_LIST_DATA_INDEX = "valuelist",
  DATA_DATA_INDEX = "data",
  VALUE_NAME_DATA_INDEX = "valuename"

export default (data) => {

  const createRegData = data[REG_VALUE_ONLY_DATA_INDEX]
    .filter(i => i[ACTION_DATA_INDEX] === NEW_ACTION),

    delRegData = data[REG_KEY_ONLY_DATA_INDEX]
      .filter(i => i[ACTION_DATA_INDEX] === DELETE_ACTION)

  if (delRegData.length + createRegData.length === 0) {
    return <div></div>
  }

  return <div>
    <Tabs>
      <Tabs.TabPane tab={`新增注册表(${createRegData.length})`} key="new">
        <ScrollWrapper>
          <ul>
            {
              createRegData.map((i, index) => {
                return <li key={`${index}`} style={{ margin: "5px 0" }}>
                  <Tag overflow={1e5} color={primaryColor} style={{ marginBottom: "5px" }}>
                    {i[KEY_PATH_DATA_INDEX]}
                  </Tag>
                  <div>
                    {
                      i[VALUE_LIST_DATA_INDEX].map((j, innerIndex) => {
                        return <p style={{ margin: 0 }} key={`${innerIndex}`}>
                          {`${j[VALUE_NAME_DATA_INDEX]}=${j[DATA_DATA_INDEX]}`}
                        </p>
                      })
                    }
                  </div>
                </li>
              })
            }
          </ul>
        </ScrollWrapper>

      </Tabs.TabPane>
      <Tabs.TabPane tab={`删除注册表(${delRegData.length})`} key="delete">
        <ScrollWrapper>
          <ul>
            {
              delRegData.map((i, index) => {
                return <li key={`${index}`} style={{ margin: "5px 0" }}>
                  <Tag overflow={1e5} color={primaryColor} style={{ marginBottom: "5px" }}>
                    {i[KEY_PATH_DATA_INDEX]}
                  </Tag>
                </li>
              })
            }
          </ul>
        </ScrollWrapper>
      </Tabs.TabPane>
    </Tabs>
  </div>
}