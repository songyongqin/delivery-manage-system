import EnhanviceTable from 'domainComponents/EnhanciveTable'
import { JoTag } from 'components/JoTag'
import {
  HOST_IP_DATA_INDEX,
} from '../../ConstConfig'

const ADD_DATA_INDEX = "add",
  REMOVE_DATA_INDEX = "remove"

const columns = [
  {
    dataIndex: HOST_DATA_INDEX,
    title: "主机IP"
  },
  {
    dataIndex: ADD_DATA_INDEX,
    title: "新增的镜像",
    render: value => {
      return <div>
        {
          value.map((i, index) => {
            return <div key={`${index}-tag`}>
              <JoTag>
                {i}
              </JoTag>
            </div>
          })
        }
      </div>
    }
  },
  {
    dataIndex: REMOVE_DATA_INDEX,
    title: "删除的镜像",
    render: value => {
      return <div>
        {
          value.map((i, index) => {
            return <div key={`${index}-tag`}>
              <JoTag>
                {i}
              </JoTag>
            </div>
          })
        }
      </div>
    }
  }
]



export default ({ data }) => {
  return (
    <EnhanviceTable
      tableProps={{
        dataSource: data,
        columns,
      }}
      pagination={false}>

    </EnhanviceTable>
  )
}