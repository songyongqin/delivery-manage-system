import EnhanviceTable from 'domainComponents/EnhanciveTable'
import JoTag from 'components/JoTag'
import {
  HOST_IP_DATA_INDEX,
} from '../../ConstConfig'
import { Button } from 'antd'

const ADD_DATA_INDEX = "add",
  REMOVE_DATA_INDEX = "remove"

const columns = [
  {
    dataIndex: HOST_IP_DATA_INDEX,
    width: "150px",
    title: <p style={{ textAlign: "center" }}>主机IP</p>
  },
  {
    key: "result",
    title: <p style={{ textAlign: "center" }}>更新结果</p>,
    render: (records) => {
      if (records.status !== 1) {
        return <p style={{ textAlign: "center", color: "red" }}>
          X 更新失败 ,
          <br />
          原因：{records.message}
        </p>
      }
      if (records.status === 1) {
        return <table>
          <tbody>
            <tr>
              <td style={{ textAlign: "center" }}>新增的镜像</td>
              {/* <td style={{ textAlign: "center" }}>删除的镜像</td> */}
            </tr>
            <tr>
              <td>
                <div >
                  {
                    records["add"].map((i, index) => {
                      return <div key={`${index}-tag`} style={{ textAlign: "center" }}>
                        <JoTag color="#108ee9">
                          {i}
                        </JoTag>
                      </div>
                    })
                  }
                </div>
              </td>
              <td>
                {/* <div>
                  {
                    records["remove"].map((i, index) => {
                      return <div key={`${index}-tag`} style={{ textAlign: "center" }}>
                        <JoTag color="#108ee9">
                          {i}
                        </JoTag>
                      </div>
                    })
                  }
                </div> */}
              </td>
            </tr>
          </tbody>
        </table>
      }
    }
  }

]



export default ({ data = [], onConfirm }) => {
  return (
    <div>
      <EnhanviceTable
        tableProps={{
          dataSource: data.map((i, index) => ({
            ...i,
            key: `${index}-item`
          })),
          columns,
          scroll: { y: "500px" }
        }}
        pagination={false}>

      </EnhanviceTable>

      <div style={{ textAlign: "center", marginTop: "15px" }}>
        <Button type="primary" onClick={onConfirm}>确定 </Button>
      </div>

    </div>
  )
}