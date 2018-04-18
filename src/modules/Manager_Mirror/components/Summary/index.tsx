import * as React from 'react'
import TableWithRemote from 'domainComponents/TableWithRemote'
import { MANAGER_MIRROR_SUMMARY_NAMESPACE } from 'constants/model'
import TagList from 'components/TagList'
import { Button } from 'antd'

const getColumns = (option) => {
  return [
    {
      title: '镜像ID',
      dataIndex: 'id',
      key: 'id',
    }, {
      title: '镜像名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '操作系统',
      dataIndex: 'sys',
      key: 'sys',
    }, {
      title: '交互程度',
      dataIndex: 'interaction',
      key: 'interaction',
    }, {
      title: '镜像版本',
      dataIndex: 'version',
      key: 'version',
    }, {
      title: '镜像MD5',
      dataIndex: 'md5',
      key: 'md5',
    },
    {
      title: '属性',
      dataIndex: 'props',
      key: 'props',
    }, {
      title: '依赖版本',
      dataIndex: 'dependVersion',
      key: 'dependVersion',
    }, {
      title: '镜像大小',
      dataIndex: 'size',
      key: 'size',
      render: record => {
        return record >= 1024 ? (record / 1024.0).toFixed(1) + "G" : record + "Mb"
      }
    }
  ]
}


const expandedRowRender = record => {
  const services = record.services;
  const port = record.port;
  return <table>
    <tbody>
      <tr>
        <td style={{ width: "10%" }}>支持的服务</td>
        <td>
          <TagList data={services} maxCount={8}></TagList>
        </td>
      </tr>
      <tr>
        <td>支持的端口</td>
        <td>
          <TagList data={port} maxCount={8}></TagList>
        </td>
      </tr>
    </tbody>
  </table>
}

export default class Summary extends React.Component<any, any>{
  render() {

    return (
      <div>
        <h3>镜像汇总</h3>
        <TableWithRemote
          getExpandedRowRenderer={_ => expandedRowRender}
          getColumns={getColumns}
          remoteNamespace={MANAGER_MIRROR_SUMMARY_NAMESPACE}>
        </TableWithRemote>
      </div>
    )
  }
}