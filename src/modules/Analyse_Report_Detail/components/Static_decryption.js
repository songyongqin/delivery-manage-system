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
      detect_result = data.detect_result,
      dataSource = detect_result.map((i, index) => {
        return {
          ...i,
          key: `${index}-item`
        }
      })

    const columns = [{
      title: 'c2',
      dataIndex: 'c2',
      key: 'c2',
    }, {
      title: '家族',
      dataIndex: 'family',
      key: 'family',
    }];

    return (
      <div className={styles["table"]}>
        <Table dataSource={dataSource} columns={columns} />
      </div>

    )
  }
}
export default basicComps;
