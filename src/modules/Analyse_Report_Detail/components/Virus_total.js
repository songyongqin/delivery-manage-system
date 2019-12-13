import React from 'react';
import { Tag, Badge, Table, Input } from 'antd';
import styles from './comps.css';
const { TextArea } = Input;
import ScrollWrapper from '../../../components/ScrollWrapper/index'

class basicComps extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    const { data } = this.props,
      detect_result = data.detect_result,
      scans_detail = detect_result.scans_detail,
      dataSource = scans_detail.map((i, index) => {
        return {
          ...i,
          key: `${index}-item`
        }
      })

    const columns = [{
      title: '反病毒引擎',
      dataIndex: 'engine',
      key: 'engine',
      width: "50%"
    }, {
      title: '检测结果',
      dataIndex: 'result',
      key: 'result',
      width: "50%"
    }];

    return (
      <div>
        <div className={styles["table"]}>
          <table>
            <tbody>
              <tr>
                <th>是否脱壳:</th>
                <td> {detect_result.format ? <span><Badge status="success" />是</span> : <span><Badge status="error" />否</span>}</td>
              </tr>
              <tr>
                <th>itw:</th>
                <td>{detect_result.ITW_urls
                  ?
                  <ScrollWrapper>
                    {
                      detect_result.ITW_urls.map((i, index) => {
                        return <p style={{ margin: "0" }} key={`${index}`}>{i}</p>
                      })
                    }
                  </ScrollWrapper>

                  :
                  null}</td>
              </tr>
              <tr>
                <th>最近提交时间:</th>
                <td>{detect_result.last_seen}</td>
              </tr>
              <tr>
                <th>多引擎检测率:</th>
                <td>{detect_result.scans}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className={styles["anttable"]}>
          <Table dataSource={dataSource} columns={columns} scroll={{ y: 375 }} pagination={false} />
        </div>

      </div>

    )
  }
}
export default basicComps;
