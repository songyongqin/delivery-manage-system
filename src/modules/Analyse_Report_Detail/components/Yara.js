import React from 'react';
import { Tag, Badge, Table } from 'antd';
import styles from './comps.css';


class basicComps extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    const { data } = this.props,
      rules = data.detect_result.rules,
      dataSource = rules.map((i, index) => {
        return {
          ...i,
          key: `${index}-item`
        }
      })

    const columns = [{
      title: '规则名称',
      dataIndex: 'rulename',
      key: 'rulename',
      width: "30%"
    }, {
      title: '威胁名称',
      dataIndex: 'threat_name',
      key: 'threat_name',
      width: "20%"
    }, {
      title: '威胁类型',
      dataIndex: 'threat_type',
      key: 'threat_type',
      width: "10%"
    }, {
      title: '家族',
      dataIndex: 'family',
      key: 'family',
      width: "20%"
    }, {
      title: '作者',
      dataIndex: 'author',
      key: 'author',
      width: "20%"
    }];

    return (
      <div>
        <div className={styles["table"]}>
          <table>
            <tbody>
              <tr>
                <th>是否脱壳:</th>
                <td> {data.upx ? <span><Badge status="success" />是</span> : <span><Badge status="error" />否</span>}</td>
              </tr>
              <tr>
                <th>yara规则库版本:</th>
                <td>{data.lib_version}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={styles["anttable"]}>
          <Table dataSource={dataSource} columns={columns} scroll={{ y: 380 }} pagination={false} />
        </div>
      </div>

    )
  }
}
export default basicComps;
