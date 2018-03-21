import EnhanviceTable from 'domainComponents/EnhanciveTable'
import { HONEYPOT_IP_DATAINDEX, OPERATION_SHUTDOWN_VALUE, OPERATION_START_VALUE, OPERATION_INIT_VALUE } from '../../ConstConfig'
import { Icon } from 'antd'

const templateConfig = {
  [OPERATION_INIT_VALUE]: records => (
    records.status === 1
      ?
      <p style={{ color: "#108ee9", textAlign: "center" }}>
        <Icon type="check"></Icon> &nbsp;
        还原初始蜜罐成功<br />
      </p>
      :
      <p style={{ textAlign: "center", color: "red" }}>
        <Icon type="close"></Icon> &nbsp;
        还原初始蜜罐失败<br />
        原因: {records.message}
      </p>
  ),
  [OPERATION_START_VALUE]: records => (
    records.status === 1
      ?
      <p style={{ color: "#108ee9", textAlign: "center" }}>
        <Icon type="check"></Icon> &nbsp;
        开机成功<br />
      </p>
      :
      <p style={{ textAlign: "center", color: "red" }}>
        <Icon type="close"></Icon> &nbsp;
        开机失败
        <br />
        原因: {records.message}
      </p>
  ),
  [OPERATION_SHUTDOWN_VALUE]: records => (
    records.status === 1
      ?
      <p style={{ color: "#108ee9", textAlign: "center" }}>
        <Icon type="check"></Icon> &nbsp;
        关机成功<br />
      </p>
      :
      <p style={{ textAlign: "center", color: "red" }}>
        <Icon type="close"></Icon> &nbsp;
        关机失败
        <br />
        原因: {records.message}
      </p>
  ),
  "delete": records => (
    records.status === 1
      ?
      <p style={{ color: "#108ee9", textAlign: "center" }}>
        <Icon type="check"></Icon> &nbsp;
      删除蜜罐成功<br />
      </p>
      :
      <p style={{ textAlign: "center", color: "red" }}>
        <Icon type="close"></Icon> &nbsp;
      删除蜜罐失败
      <br />
        原因: {records.message}
      </p>
  )
}


const getColumns = type => {

  return [
    {
      dataIndex: HONEYPOT_IP_DATAINDEX,
      width: "200px",
      title: <p style={{ textAlign: "center" }}>蜜罐IP</p>,
      render: value => <p style={{ textAlign: "center" }}>{value}</p>
    },
    {
      key: "result",
      width: "300px",
      title: <p style={{ textAlign: "center" }}>操作结果</p>,
      render: templateConfig[type]
    }
  ]
}


export default ({ data, type }) => {
  const tableProps = {
    dataSource: data.map((i, index) => {
      return {
        ...i,
        key: `${index}-item`
      }
    }),
    columns: getColumns(type),
    scroll: { y: "500" }
  }
  return (
    <EnhanviceTable tableProps={tableProps} pagination={false}>
    </EnhanviceTable>
  )
}