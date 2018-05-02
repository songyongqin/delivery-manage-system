import * as React from 'react';
import Tag from 'components/Tag'
import constConfig, { stageRowDataIndexes, rowDataIndexes } from './constants'
import { Icon, Switch, Timeline, Row, Col } from 'antd'
import classnames from 'classnames'
import * as tools from 'utils'
import TimeLabel from 'components/TimeLabel'
import Card from 'domainComponents/Card'
import columnsCreator from 'domainUtils/columnsCreator'
const styles = require("./styles.less")

const { tableTextConfig } = constConfig

const stageRowRenderer = (value) => {
  if (!value) {
    return;
  }
  return (
    <div>
      {value.map((i, index) => {
        return <div key={`${index}-title`}>{i.title}</div>
      })}
    </div>
  )
};

const attackTimesRenderer = value => {
  return <TimeLabel times={value} />
}

export const getColumns = ({ queryFilters, getCheckboxOnChange }) => {

  const renderer = { attackTimes: attackTimesRenderer },
    titleRenderer = {}


  stageRowDataIndexes.forEach(i => {

    renderer[i] = stageRowRenderer;

    titleRenderer[i] = (
      <div style={{ height: "30px", lineHeight: "30px" }}>
        {tableTextConfig.rowTitles[i]}
      </div>
    )
  })

  return columnsCreator({
    dataIndexes: rowDataIndexes,
    titleConfig: { ...tableTextConfig.rowTitles, ...titleRenderer },
    renderer
  })

}

export const getExpandedRowRender = ({ isDark }) => {
  const { expandedRow, rowTitles: title } = tableTextConfig;
  return (records) => {



    const cardKeys = Object.keys(records).filter(i => stageRowDataIndexes.indexOf(i) !== -1)

    const rows = []

    const ROW_ITEM_COUNT = 2

    cardKeys.forEach((k, index) => {
      const ROW_INDEX = Math.round((index + 1) / ROW_ITEM_COUNT) - 1

      rows[ROW_INDEX] = rows[ROW_INDEX] || [];
      rows[ROW_INDEX].push(<Card title={tools.getKeyText(k, title)}
        key={`${k}-card`}
        className={styles["flex-item"]}
      >
        <Timeline>
          {records[k].map((i, index) => {
            return (
              <Timeline.Item key={`${index}-timeline-item`}>
                <div>
                  <Tag color="#108ee9">{i.title}</Tag>
                  <br /><br />
                  {expandedRow.description + ":"}{i.details}
                </div>
              </Timeline.Item>
            )
          })}
        </Timeline>
      </Card>)

    })

    return (
      rows.map((r, index) => {
        return (
          <div key={`${index}-row`}
            className={styles["flex"]}
          >
            {r}
          </div>
        )
      })
    )
  }
}