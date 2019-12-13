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
    const { data } = this.props;

    const engine_detect = data.engine_detect,
      virus_total = engine_detect.virus_total,
      detect_result = virus_total.detected ? virus_total.detect_result : null,
      tags = virus_total.detected ? detect_result.tags : [];

    return (
      <div className={styles["table"]}>
        <table>
          <tbody>
            <tr>
              <th>文件名称:</th>
              <td>{data.filename}</td>
            </tr>
            <tr>
              <th>文件来源:</th>
              <td>{data.source}</td>
            </tr>
            <tr>
              <th>MD5:</th>
              <td>{data.md5}</td>
            </tr>
            <tr>
              <th>SHA1:</th>
              <td>{detect_result ? detect_result.sha1 : null}</td>
            </tr>

            <tr>
              <th>SHA256:</th>
              <td>{detect_result ? detect_result.sha256 : null}</td>
            </tr>
            <tr>
              <th>样本类型:</th>
              <td>{data.format}</td>
            </tr>

            <tr>
              <th>来源URL:</th>
              <td>{data.headstream}</td>
            </tr>
            <tr>
              <th>文件大小:</th>
              <td>{data.size}</td>
            </tr>
            <tr>
              <th>提交时间:</th>
              <td>{data.timestamp}</td>
            </tr>

            <tr>
              <th>文件标签:</th>
              <td>{tags.map(i => <Tag color="#2db7f5">{i}</Tag>)}</td>
            </tr>
          </tbody>
        </table>
      </div>

    )
  }
}
export default basicComps;
