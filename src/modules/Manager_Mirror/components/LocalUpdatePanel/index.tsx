import { Menu, Badge, Button, Breadcrumb, Upload, Icon, Progress, Row, Col } from 'antd'
import { connect } from 'dva'
import {
  OPERATION_NAMESPACE,
  UPLOAD_STATUS,
  MERGE_STATUS,
  COMMON_STATUS,
  INIT_STATUS,
} from '../../ConstConfig'
import classnames from 'classnames'
import EnhanciveTable from 'domainComponents/Table'
import { getFileMD5 } from 'utils'
import JoSpin from 'domainComponents/Spin'
import JoTag from 'components/Tag'
const { Dragger } = Upload
import UpdateResultPanel from '../UpdateResultPanel'
import * as React from 'react'
import extraConnect from 'domainUtils/extraConnect'

const mapStateToProps = state => (
  {
    // isDark: state.layout.commonLayout.darkTheme,
    creating: state.loading.effects[`${OPERATION_NAMESPACE}/createUploadTask`],
    uploading: state.loading.effects[`${OPERATION_NAMESPACE}/putFileChunk`],
    merging: state.loading.effects[`${OPERATION_NAMESPACE}/mergeUploadTask`],
    localUploadInfo: state[OPERATION_NAMESPACE].localUploadInfo,
    initLoading: state.loading.effects[`${OPERATION_NAMESPACE}/initUploadTask`]
  }
)

const mapDispatchToProps = (dispatch, ownProps) => {

  return {
    initUploadTask: payload => dispatch({
      type: `${OPERATION_NAMESPACE}/initUploadTask`,
      payload
    }),
    putFileChunk: () => {
      ownProps.hideOptionPanel()
      return dispatch({
        type: `${OPERATION_NAMESPACE}/putFileChunk`
      })
    },
    initLocalUploadInfo: payload => dispatch({
      type: `${OPERATION_NAMESPACE}/initLocalUploadInfo`,
      payload
    }),
  }
}
const DraggerPanel = ({ onChange, isDark }) => {

  const lblClasses = classnames({
    // ["lbl-dark"]: isDark
  })

  const fileProps = {
    multiple: false,
    showUploadList: false,
    beforeUpload: (file) => {
      onChange && onChange(file)
      return false;
    },
  };

  return (
    <div style={{ marginTop: 16, height: 180 }}>
      <Dragger {...fileProps}>
        <p className="ant-upload-drag-icon" style={{ marginTop: "15px" }}>
          <Icon type="file-text" />
        </p>
        <p className={lblClasses}>点击或拖拽文件到此处</p>
      </Dragger>
    </div>
  )
}




const UploadPanel = ({
  file,
  uploadInfo = {},
  isDark,
  creating,
  uploadHandle,
  uploading,
  onRemove,
  merging,
  localUploadInfo,
  initLoading,
  onCancel
}) => {

  const { status, mergeResult } = (localUploadInfo || {}) as any



  if (status === MERGE_STATUS && !merging) {

    return <UpdateResultPanel onCancel={onCancel} res={mergeResult}></UpdateResultPanel>

  }

  const disabled = status === UPLOAD_STATUS || status === MERGE_STATUS || initLoading

  const tableProps = {
    dataSource: [
      {
        ...localUploadInfo,
        key: "uploadInfo"
      }
    ],
    columns: [
      {
        dataIndex: "fileName",
        title: "文件名",
      },
      {
        dataIndex: "fileSize",
        title: "文件大小",
        render: value => {
          const fileSizeMB = Math.ceil(value / 1024 / 1024)
          return fileSizeMB < 1024 ? `${fileSizeMB}MB` : `${(fileSizeMB / 1024).toFixed(2)}GB`
        }
      },
      {
        dataIndex: "progress",
        title: "文件上传状态",
        render: value => {
          if (merging) {
            return <p>
              <Icon type="loading"></Icon>
              &nbsp;
            上传完毕正在更新...
          </p>
          }

          if (initLoading) {
            return <p>
              <Icon type="loading"></Icon>
              &nbsp;
              正在初始化任务...
            </p>
          }
          const percent = Math.ceil(value * 100)
          console.info(value)
          let progressStatus = percent === 100 ? "success" : null

          progressStatus = status === UPLOAD_STATUS ? "active" : progressStatus

          return (
            <div style={{ padding: "5px" }}>
              <Progress
                status={progressStatus}
                percent={percent} >
              </Progress>
            </div>
          )
        }
      },
      {
        key: "operation",
        title: "操作",
        render: records => {
          return (
            <div>
              <Button
                loading={status === UPLOAD_STATUS}
                disabled={disabled}
                style={{ marginRight: "15px" }}
                onClick={uploadHandle}
                type="primary"
                icon="upload">
                上传
              </Button>
              <Button
                disabled={disabled}
                icon="delete"
                onClick={onRemove}>
                删除
              </Button>
            </div>
          )
        }
      }
    ]
  }

  return (
    <div>
      <JoSpin spinning={merging}>
        <EnhanciveTable
          tableProps={tableProps}
          pagination={false}>

        </EnhanciveTable>
      </JoSpin>
    </div>
  )

}



const _LocalUpdatePanel = ({
  uploadInfo,
  isDark,
  uploading,
  creating,
  merging,
  mergeInfo,
  localUploadInfo,
  initLoading,
  initLocalUploadInfo,
  putFileChunk,
  initUploadTask,
  onCancel
}) => {

  const { status } = localUploadInfo

  const fileOnChange = file => initUploadTask({ file })
  if (status === COMMON_STATUS) {
    return (
      <DraggerPanel
        onChange={fileOnChange}
        isDark={isDark}>
      </DraggerPanel>
    )
  }

  return (
    <UploadPanel
      onCancel={onCancel}
      isDark={isDark}
      merging={merging}
      uploadHandle={putFileChunk}
      onRemove={initLocalUploadInfo}
      localUploadInfo={localUploadInfo}
      uploading={uploading}
      initLoading={initLoading}>
    </UploadPanel>
  )
}


export default extraConnect(mapStateToProps, mapDispatchToProps)(_LocalUpdatePanel)
