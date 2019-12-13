import React from 'react';
import { Tag } from 'antd';
import styles from './comps.css';


class basicComps extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    const { data } = this.props,
      detect_result = data.detect_result;
    return (
      <div className={styles["table"]}>
        <table>
          <tbody>
            <tr>
              <th>威胁判定:</th>
              <td>{detect_result.detect}</td>
            </tr>
            <tr>
              <th>威胁名称:</th>
              <td>{detect_result.threatname}</td>
            </tr>
          </tbody>
        </table>
      </div>

    )
  }
}
export default basicComps;
