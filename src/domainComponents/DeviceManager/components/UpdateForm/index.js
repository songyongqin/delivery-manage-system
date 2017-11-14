/**
 * Created by jojo on 2017/10/19.
 */
import React from 'react';
import {
  Upload,
  Form,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
  Slider,
  Radio,
  message as Message
} from 'antd';
import styles from './styles.css';
import classnames from 'classnames';
import {
  CODE_DATAINDEX,
  ID_DATAINDEX,
  LICENCE_STATUS_DATAINDEX,
  LICENCE_VALID_VALUE,
  HOST_IP_DATAINDEX,
  LIBRARY_VERSION_LIST_DATAINDEX,
  APPLIACTION_VERSION_DATAINDEX,
  ENGINE_VERSION_LIST_DATAINDEX,
  tableTextConfig,
} from '../../ConstConfig'
import EnhanciveTable from '../../../../domainComponents/EnhanciveTable';
const FormItem = Form.Item;
const Dragger = Upload.Dragger;
import JoTag from '../../../../components/JoTag';
const LICENCE_SUCCESS = 1;
const CommonCell = ({ value }) => (
  <div style={{ textAlign: "center" }}>{value}</div>
)
const LicenceBackPlaceholder = ({ isDark = false, shouldReload = false, onCancel }) => (
  <div >
    <h4 style={{
      color: "#108ee9",
      textAlign: "center",
      fontWeight: "500"
    }}>
      感谢您使用本产品，本次批量升级操作已完成，若存在升级失败的设备请尝试重新升级
    </h4>
    <table className={styles["placeholder-table"]}>
      <tbody>
        <tr className={isDark ? "lbl-dark" : ""}>
          <td>售后联系邮箱:</td>
          <td>antiy_shenzhen@antiy.cn</td>
        </tr>
        <tr className={isDark ? "lbl-dark" : ""}>
          <td>售后联系电话:</td>
          <td>0755-26806561</td>
        </tr>
      </tbody>
    </table>
    <div style={{ textAlign: "center" }}>
      <Button
        onClick={() => shouldReload ? window.location.reload() : onCancel()}
        size="large"
        type="primary">
        {
          shouldReload
            ?
            "确定(重新载入应用)"
            :
            "确定"
        }
      </Button>
    </div>
  </div >
)

const CommonListRenderer = ({ data }) => (
  <table>
    <tbody>
      {
        data.map((i, index) => (
          <tr key={`${index}-row`}>
            <td style={{ padding: "2px" }}>{i.name}</td>
            <td style={{ padding: "2px" }}>
              <JoTag color="#108ee9" style={{ marginBottom: "0" }}>{i.value}</JoTag>
            </td>
            <td style={{ padding: "2px" }}>
              {i.result}
            </td>
          </tr>
        ))
      }
    </tbody>
  </table>
)


const FILE_DATA_INDEX = "file",
  SERVER_URL_DATA_INDEX = "serverUrl",
  REMOTE_METHOD = "remote",
  LOCAL_METHOD = "local",
  DEVICE_LIST_DATA_INDEX = "deviceList"

@Form.create()
class WrappedForm extends React.Component {
  state = {
    result: [],
    fileVisible: false,
    disabledList: [],
    hasFail: false,
    method: REMOTE_METHOD,
    file: null,
    updateResult: []
  }
  static defaultProps = {
    defaultValue: { data: [] }
  }
  radioOnChange = e => {
    let { value } = e.target
    this.setState({
      method: value,
      file: null,
    })

  }
  switchFilePanel = value => this.setState({
    fileVisible: value
  })

  handleUpdate = (e) => {
    e.preventDefault();
    const { onSubmit, form, handle, defaultValue, } = this.props;
    const { method, file } = this.state;
    const { updateLocal, updateRemote } = handle;

    let serverUrl = form.getFieldValue(SERVER_URL_DATA_INDEX);


    const deviceList = defaultValue.data.map(i => i[ID_DATAINDEX]);

    const res = method === REMOTE_METHOD
      ?
      updateRemote({ deviceList, serverUrl })
      :
      updateLocal({ deviceList, file })

    res.then(result => this.setState({
      updateResult: result,
    }))
  }
  handleGetVersion = (e) => {
    e.preventDefault();
    const { onSubmit, form, handle, defaultValue } = this.props;
    const { method, file } = this.state;
    const { getUpdateInfoRemote, getUpdateInfoLocal } = handle;

    let serverUrl = form.getFieldValue(SERVER_URL_DATA_INDEX);

    if (method === REMOTE_METHOD && serverUrl.trim().length === 0) {
      return form.setFields({ [SERVER_URL_DATA_INDEX]: { value: "", errors: [new Error("服务器地址不能为空")] } })
    }

    if (method === LOCAL_METHOD && !file) {
      return form.setFields({ [FILE_DATA_INDEX]: { value: "", errors: [new Error("本地升级文件不能为空")] } })
    }

    const deviceList = defaultValue.data.map(i => i[ID_DATAINDEX]);

    const res = method === REMOTE_METHOD
      ?
      getUpdateInfoRemote({ deviceList, serverUrl })
      :
      getUpdateInfoLocal({ deviceList, file })

    res.then(result => this.setState({
      result
    }))

  }
  clearError = () => {
    try {
      this.props.form.setFields({ [FILE_DATA_INDEX]: { value: " " } })
    } catch (e) {
      console.info(e)
    }

  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { isDark, loading, defaultValue = { data: [] }, style } = this.props;
    const { result, fileVisible, disabledList, shouldReload, updateResult } = this.state;
    const lblClasses = classnames({
      "lbl-dark": isDark
    })
    console.info(result)

    const { data = [] } = defaultValue;
    const haveResult = result.length !== 0,
      haveUpdateResult = updateResult.length !== 0;

    const versionColumns = [
      {
        dataIndex: APPLIACTION_VERSION_DATAINDEX,
        title: <p style={{ textAlign: "center" }}>{tableTextConfig.colTitles[APPLIACTION_VERSION_DATAINDEX]}</p>,
        render: (value, records) => {
          const deviceId = records[ID_DATAINDEX];
          const valueTag = <JoTag
            color="#108ee9"
            style={{ marginBottom: "0" }}>
            {value}
          </JoTag>
          if (haveResult) {
            const target = result.find(i => i[ID_DATAINDEX] === deviceId),
              version = target[APPLIACTION_VERSION_DATAINDEX];
            return (
              version
                ?
                <div style={{ textAlign: "center" }}>
                  {valueTag}
                  <br />
                  可升级至&nbsp;
                  <br />
                  <JoTag color="#108ee9">{version}</JoTag>
                </div>
                :
                <div style={{ textAlign: "center" }}>
                  {valueTag}
                  <br />
                  已是最新版本
                </div>
            )
          }

          return <CommonCell value={valueTag}></CommonCell>
        }
      },
      {
        dataIndex: LIBRARY_VERSION_LIST_DATAINDEX,
        title: <p style={{ textAlign: "center" }}>{tableTextConfig.colTitles[LIBRARY_VERSION_LIST_DATAINDEX]}</p>,
        render: (value, records) => {
          const deviceId = records[ID_DATAINDEX];


          if (haveResult) {
            const target = result.find(i => i[ID_DATAINDEX] === deviceId),
              versionMap = {};

            target[LIBRARY_VERSION_LIST_DATAINDEX].forEach(i => {
              versionMap[i.name] = i.version
            })

            return <CommonListRenderer
              data={value.map(i => {
                const { version } = i;
                const newVersion = versionMap[i.name];
                return {
                  ...i,
                  value: version,
                  result: newVersion
                    ?
                    <div>
                      可升级至&nbsp;<JoTag color="#108ee9">{newVersion}</JoTag>
                    </div>
                    :
                    <div>
                      已是最新版本
                    </div>
                }

              })}></CommonListRenderer>
          }

          return <CommonListRenderer
            data={value.map(i => ({
              ...i,
              value: i.version
            }))}></CommonListRenderer>

        }
      },
      {
        dataIndex: ENGINE_VERSION_LIST_DATAINDEX,
        title: <p style={{ textAlign: "center" }}>{tableTextConfig.colTitles[ENGINE_VERSION_LIST_DATAINDEX]}</p>,
        render: (value, records) => {
          const deviceId = records[ID_DATAINDEX];

          if (haveResult) {
            const target = result.find(i => i[ID_DATAINDEX] === deviceId),
              versionMap = {};

            target[ENGINE_VERSION_LIST_DATAINDEX].forEach(i => {
              versionMap[i.name] = i.version
            })

            return <CommonListRenderer
              data={value.map(i => {
                const { version } = i;
                const newVersion = versionMap[i.name];
                return {
                  ...i,
                  value: version,
                  result: newVersion
                    ?
                    <div>
                      可升级至&nbsp;<JoTag color="#108ee9">{newVersion}</JoTag>
                    </div>
                    :
                    <div>
                      已是最新版本
                    </div>
                }

              })}></CommonListRenderer>
          }

          return <CommonListRenderer
            data={value.map(i => ({
              ...i,
              value: i.version
            }))}></CommonListRenderer>

        }
      }
    ]

    const resultColumns = [
      {
        key: "result",
        title: <p style={{ textAlign: "center" }}>更新结果</p>,
        render: records => {
          const deviceId = records[ID_DATAINDEX];
          const { status, message } = updateResult.find(i => i[ID_DATAINDEX] === deviceId);
          if (status === 1) {
            return <p style={{ color: "#108ee9", textAlign: "center" }}>
              <Icon type="check"></Icon> &nbsp;更新成功<br />
            </p>
          }

          return <p style={{ color: "red", textAlign: "center" }}>
            <Icon type="close"></Icon> &nbsp;更新失败<br />
            原因: {message}
          </p>
        }
      }
    ]

    const tableProps = {
      dataSource: data.map((i, index) => ({
        ...i,
        key: `${index}-item`,
      })),
      columns: [
        {
          dataIndex: ID_DATAINDEX,
          title: <p style={{ textAlign: "center" }}>设备唯一标识</p>,
          width: haveUpdateResult ? null : "140px"
        },
        {
          dataIndex: HOST_IP_DATAINDEX,
          title: <p style={{ textAlign: "center" }}>主机IP</p>,
          width: haveUpdateResult ? null : "140px",
          render: value => <CommonCell value={value}></CommonCell>
        },
        ...(haveUpdateResult ? resultColumns : versionColumns)
      ]
    }





    const validateData = data.filter(i => i[LICENCE_STATUS_DATAINDEX] !== LICENCE_VALID_VALUE);

    const isMulti = validateData.length > 1;


    const { clearError } = this;

    const fileProps = {
      name: "file",
      multiple: false,
      showUploadList: false,
      beforeUpload: (file, fileList) => {
        this.setState({
          file,
        })
        return false;
      },
      onChange: (e) => {
        clearError()
        return false;
      }
    }

    return (
      <Form>
        <div style={{ marginBottom: "15px" }}>
          <EnhanciveTable
            tableProps={tableProps}
            pagination={false}>
          </EnhanciveTable>
        </div>
        {
          haveResult
            ?
            <div>
              {
                haveUpdateResult
                  ?
                  <LicenceBackPlaceholder
                    isDark={isDark}
                    shouldReload={shouldReload}
                    onCancel={this.props.onCancel}>
                  </LicenceBackPlaceholder>
                  :
                  <div style={{ textAlign: "center" }}>
                    <Button
                      type="primary"
                      onClick={this.handleUpdate}>
                      更新
                    </Button>
                  </div>
              }


            </div>
            :
            <Row>
              <Col >
                <Radio.Group
                  style={{ width: "100%" }}
                  value={this.state.method}
                  onChange={this.radioOnChange}>
                  <Row>
                    <Col span={12} style={{ textAlign: "center" }}>
                      <Radio value="remote"><span className={lblClasses}>远程升级</span></Radio>
                    </Col>
                    <Col span={12} style={{ textAlign: "center" }}>
                      <Radio value="local"><span className={lblClasses}>本地升级</span></Radio>
                    </Col>
                  </Row>

                </Radio.Group>
              </Col>
              <Col >
                <div style={{ width: "650px", margin: "10px auto 0" }}>
                  {
                    this.state.method === "local"
                      ?
                      <div>
                        <FormItem
                          style={{ margin: "10px 0" }}
                          required={false}
                          hasFeedback={true}
                        >
                          {getFieldDecorator("file", {
                          })(
                            <Dragger {...fileProps} style={{ margin: "10px 0" }} disabled={loading}>
                              <p className="ant-upload-drag-icon" style={{ marginTop: "15px" }}>
                                <Icon type="file-text" />
                              </p>
                              <p className={lblClasses}>点击或拖拽文件到此处</p>
                            </Dragger>
                            )}
                        </FormItem>

                      </div>
                      :
                      <div style={{ margin: "10px 0" }}>
                        <FormItem
                          style={{ margin: "0" }}
                          wrapperCol={{ span: 19 }}
                          labelCol={{ span: 5 }}
                          label={<span className={lblClasses}>升级服务器地址</span>}
                          required={false}
                          hasFeedback={true}
                        >
                          {getFieldDecorator("serverUrl", {
                            initialValue: "",
                            rules: [
                              {
                                required: true, message: "服务器地址不能为空"
                              }
                            ]
                          })(
                            <Input placeholder="请填写升级服务器地址" disabled={loading}>
                            </Input>
                            )}
                        </FormItem>
                      </div>
                  }
                </div>
              </Col>
              <Col>
                <div style={{ textAlign: "center", marginTop: "20px" }}>
                  <Button type="primary" size="large" onClick={this.handleGetVersion}>获取升级版本信息</Button>
                </div>
              </Col>
            </Row>
        }

      </Form>
    );
  }
}

export default WrappedForm;
