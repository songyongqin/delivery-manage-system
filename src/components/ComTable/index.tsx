import * as React from 'react'
const styles = require("./styles.less")
import {Table} from 'antd'

class ComTable extends React.Component<any, any> {

  render() {
    const {data,columns} = this.props
    return (
      <Table onChange={this.props.handleChange} className = {styles['comTable']} dataSource={data} columns={columns} pagination={false} />
    )
  }
}
export default ComTable;
