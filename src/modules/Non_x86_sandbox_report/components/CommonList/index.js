import * as React from 'react'

const styles = require("./styles.css")
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
import Card from '../Cardxt'
import { Row, Col, Icon } from 'antd'

const getKeyText = (key, textConfig) => (key in textConfig ? textConfig[key] : key)







export default class CommonList extends React.PureComponent {
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