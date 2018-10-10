import * as React from 'react'
import {
  THREAT_TYPE_DATA_INDEX,
  basicInfoDataIndexes,
  basicPanelTextConfig,
  SUMMARY_DATA_INDEX,
  SUMMARY_DESCRIPTION,
  SIZE_DATA_INDEX,
  FILE_NAME_DATA_INDEX
} from '../../ConstConfig'
import { Row, Col, Icon } from 'antd'
const styles = require("./styles.less")
import Tag from 'components/Tag'
import { primaryColor } from 'themes/vars'
import SituationOverFlow from 'components/SituationOverFlow'

const format = (num) => {
  return (num.toFixed(2) + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')
}

const basicInfoGirdLayout = {
  xs: {
    span: 24
  },
  sm: {
    span: 24
  },
  md: {
    span: 24
  },
  lg: {
    span: 12
  },
  xl: {
    span: 12
  },
  xxl: {
    span: 12
  }
}


const keyRendererConfig = {
  [SIZE_DATA_INDEX]: data => {
    return format(data / 1024) + "KB"
  },
  [FILE_NAME_DATA_INDEX]: data => <SituationOverFlow>{data}</SituationOverFlow>,
  [THREAT_TYPE_DATA_INDEX]: data => {
    return data.map((i, index) => {
      return (
        <Tag key={`${index}`}
          color={primaryColor}>
          {i}
        </Tag>
      )
    })
  }
}


export default data => {
  console.log(basicInfoDataIndexes, data)
  return (
    <Row>
      <Col {...basicInfoGirdLayout}>
        <table className={styles["basic-info-table"]}>
          <tbody>
            {
              basicInfoDataIndexes.map(key => {
                let content = data[key]
                return (
                  <tr key={key}>
                    <td className={styles["title-cell"]}>{basicPanelTextConfig[key]}</td>
                    <td>
                      {
                        key in keyRendererConfig ? keyRendererConfig[key](content) : content
                      }
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </Col>
      <Col {...basicInfoGirdLayout}>
        <table className={styles["basic-info-table"]}>
          <tbody>
            <tr>
              <td className={styles["title-cell"]}>{basicPanelTextConfig[SUMMARY_DESCRIPTION]}</td>
              <td>
                {data[SUMMARY_DESCRIPTION]}
              </td>
            </tr>
          </tbody>
        </table>
      </Col>
    </Row>
  )
}