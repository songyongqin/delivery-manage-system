import * as React from 'react'
import TableWithRemote from 'domainComponents/TableWithRemote'
import { MANAGER_MIRROR_NODE_NAMESPACE } from 'constants/model'
import TagList from 'components/TagList'
import { Button } from 'antd'

const getColumns = (option) => {
  return [
    {
      title: '主机IP',
      dataIndex: 'hostIp',
      key: 'hostIp',
    }, {
      title: '本机镜像种类数量',
      dataIndex: 'nodeMirrorCounts',
      key: 'nodeMirrorCounts',
    }, {
      title: '控制中心镜像种类数量',
      dataIndex: 'controlMirrorCounts',
      key: 'controlMirrorCounts',
    }, {
      title: '未更新镜像名称列表',
      dataIndex: 'notUpdateList',
      key: 'notUpdateList',
      render: record => {
        return <TagList data={record} maxCount={4}></TagList>
      }
    },
    {
      title: '操作',
      key: 'interaction',
      render: records => {
        return <Button type="primary">升级镜像</Button>
      }
    }
  ]
}


export default class Summary extends React.Component<any, any>{
  render() {

    return (
      <div>
        <h3>蜜罐节点镜像状态</h3>
        <TableWithRemote
          getColumns={getColumns}
          remoteNamespace={MANAGER_MIRROR_NODE_NAMESPACE}>
        </TableWithRemote>
      </div>
    )
  }
}