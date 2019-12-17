import * as React from 'react'
import { connect } from 'dva'
import classnames from 'classnames'
import Tag from 'components/Tag'
import { primaryColor } from 'themes/vars'
const styles = require("./styles.less")
import $ from 'jquery'
import 'jquery.nicescroll'
import {
  INFO_DATA_INDEX,
  DETAILS_DATA_INDEX,
  NAME_DATA_INDEX,
  VALUE_DATA_INDEX,
  behaviorDataIndexes,
  behaviorTextConfig
} from '../../ConstConfig'
import Card from 'domainComponents/Card'
import { Row, Col, Icon } from 'antd'
import { getKeyText } from 'utils'







export default class CommonList extends React.PureComponent<any, any>{
  constructor(props) {
    super(props)
  }
  initScroll = () => {
    $('.ant-card-body')
      .niceScroll({
        cursorborder: "",
        cursorcolor: "#cccccc",
        boxzoom: false,
        autohidemode: true,
        horizrailenabled: false,
      })
  }
  updateScroll = () => {
    try {
      $('.ant-card-body').getNiceScroll().resize()
    } catch (e) {

    }
  }
  removeScroll = () => {
    try {
      $('.ant-card-body').getNiceScroll().remove()
    } catch (e) {

    }
  }
  componentDidMount() {
    this.initScroll()
  }
  componentDidUpdate() {
    this.updateScroll()
  }
  componentWillUnmount() {
    this.removeScroll()
  }
  target = null
  render() {
    const { data, renderer = {} } = this.props

    return (
      <Card className={styles["behavior-panel"]}>
        <div ref={target => this.target = target}>
          <div className={styles["panel-left"]}>
            <Icon type="warning"></Icon>
          </div>
          <div className={styles["panel-right"]}>
            <table className={styles["common-table"]}>
              <tbody>
                {
                  behaviorDataIndexes.map((d, index) => {
                    const itemData = data[d]
                    return (
                      <tr key={`${index}`}>
                        <td className={styles["title-cell"]}>
                          {getKeyText(d, behaviorTextConfig)}
                        </td>
                        <td>
                          {d in renderer ? renderer[d](itemData) : itemData}
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
      </Card>
    )

  }
}