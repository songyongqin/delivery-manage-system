import React from 'react';
import styles from './styles.css'
import { Menu, Button, Breadcrumb, Upload, Icon, Progress } from 'antd';
import {
  WithAnimateRender,
  WithBreadcrumb
} from 'components/HOSComponents';
import { connect } from 'dva'
import {
  OPERATION_NAMESPACE,
  UPLOAD_STATUS,
  MERGE_STATUS,
  COMMON_STATUS
} from './ConstConfig'
import { createMapDispatchWithPromise } from 'utils/dvaExtraDispatch'
import classnames from 'classnames';
import EnhanciveTable from 'domainComponents/EnhanciveTable';
import { getFileMd5 } from 'utils/tools'
import JoSpin from 'components/JoSpin'
const { Dragger } = Upload;

const mapStateToProps = state => (
  {
    uploadInfo: state[OPERATION_NAMESPACE].uploadInfo,
    mergeInfo: state[OPERATION_NAMESPACE].mergeInfo,
    isDark: state.layout.commonLayout.darkTheme,
    creating: state.loading.effects[`${OPERATION_NAMESPACE}/createUploadTask`],
    uploading: state.loading.effects[`${OPERATION_NAMESPACE}/putFileChunk`],
    merging: state.loading.effects[`${OPERATION_NAMESPACE}/mergeUploadTask`],
    localUpdateStatus: state[OPERATION_NAMESPACE].localUpdateStatus
  }
)

const mapDispatchToProps = dispatch => (
  {
    createUploadTask: payload => dispatch({
      type: `${OPERATION_NAMESPACE}/createUploadTask`,
      payload
    }),
    saveUploadProgress: payload => dispatch({
      type: `${OPERATION_NAMESPACE}/saveUploadProgress`,
      payload,
    }),
    getUploadTask: payload => dispatch({
      type: `${OPERATION_NAMESPACE}/getUploadTask`
    })
  }
)

const DraggerPanel = ({ onChange, isDark }) => {

  const lblClasses = classnames({
    ["lbl-dark"]: isDark
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
  merging
 }) => {

  const disabled = creating || uploading || uploadInfo.loading || merging

  const tableProps = {
    dataSource: [
      {
        ...uploadInfo,
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
          if (creating) {
            return <p>
              <Icon type="loading"></Icon>
              &nbsp;
              正在检测文件...
            </p>
          }
          const percent = Math.ceil(value * 100)
          return (
            <div style={{ padding: "5px" }}>
              <Progress
                status={percent === 100 ? "success" : "active"}
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
      <EnhanciveTable
        tableProps={tableProps}
        pagination={false}>

      </EnhanciveTable>
    </div>
  )

}


@connect(mapStateToProps, createMapDispatchWithPromise(mapDispatchToProps))
class Demo extends React.Component {
  state = {
    file: null,
    md5: null,
  }
  fileOnChange = file => {
    this.setState({ file })
    this.props.saveUploadProgress({
      fileName: file.name,
      fileSize: file.size,
      progress: 0,
    })

  }
  fileOnRemove = () => this.setState({ file: null })
  onUpload = () => {
    this.props.createUploadTask({
      file: this.state.file,
    })
  }

  render() {
    const { file, calculating } = this.state;
    const { uploadInfo, isDark, uploading, creating, merging, mergeInfo, localUpdateStatus } = this.props;

    const uploadResult =
      file
        ?
        <UploadPanel
          file={file}
          merging={merging}
          isDark={isDark}
          uploading={uploading}
          creating={creating}
          uploadHandle={this.onUpload}
          onRemove={this.fileOnRemove}
          uploadInfo={uploadInfo}>
        </UploadPanel>
        :
        <DraggerPanel
          onChange={this.fileOnChange}
          isDark={isDark}>
        </DraggerPanel>

    console.info(mergeInfo.result)

    return (
      <div>
        <JoSpin spinning={merging}>
          {
            mergeInfo.result
              ?
              <pre>
                {
                  JSON.stringify(mergeInfo.result, null, 2)
                }
              </pre>
              :
              uploadResult
          }
        </JoSpin>
      </div>
    );
  }
}



@WithAnimateRender
@WithBreadcrumb
class Page extends React.Component {
  constructor(props) {
    super(props);

  }
  getHeader = () => {
    return <div key="header">
      {this.props.getBreadcrumb(this.props.routes)}
    </div>
  }
  render = () => {




    return (
      <div>
        {this.props.animateRender([
          this.getHeader()
        ])}
        <Demo></Demo>
      </div>
    )
  }
}

export default Page;
