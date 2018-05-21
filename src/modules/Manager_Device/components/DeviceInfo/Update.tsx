import * as React from 'react'
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
  Switch,
  message as Message
} from 'antd'
import classnames from 'classnames'
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
  DEVICE_ID_DATAINDEX,
  CONNECT_STATUS_DATAINDEX,
  CONNECT,
  LIBRARY_VERSION_DATAINDEX
} from '../../constants'
import Table from 'domainComponents/Table'
const FormItem = Form.Item
const Dragger = Upload.Dragger
import Tag from 'components/Tag'
import Card from 'domainComponents/Card'
import { getAppConfig } from 'domain/app'
import { get } from 'utils'
const LICENCE_SUCCESS = 1
const styles = require('./styles.less')
const deviceManagerConfig = get(getAppConfig(), ["deviceManager"], {})
const CommonCell = ({ value }) => (
  <div style={{ textAlign: "center" }}>{value}</div>
)
const LicenceBackPlaceholder = ({ isDark = false, shouldReload = false, onCancel }) => (
  <div >
    <h4 style={{
      color: "#108ee9",
      textAlign: "center",
      fontWeight: 500
    }}>
      感谢您使用本产品，本次批量升级操作已完成，若存在升级失败的设备请尝试重新升级
    </h4>
    <table className={styles["placeholder-table"]}>
      <tbody>
        <tr >
          <td >售后联系邮箱:</td>
          <td > antiy_shenzhen@antiy.cn</td>
        </tr>
        <tr >
          <td >售后联系电话:</td>
          <td >0755-26806561</td>
        </tr>
      </tbody>
    </table>
    <div style={{ textAlign: "center" }}>
      <Button
        onClick={() => shouldReload ? window.location.reload() : onCancel()}
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

const CommonListRenderer = ({ data = [] }) => (
  data.length !== 0
    ?
    <Card>
      <table>
        <tbody>
          {
            data.map((i, index) => (
              <tr key={`${index}-row`}>
                <td style={{ padding: "2px", textAlign: "center" }}>{i.name}</td>
                <td style={{ padding: "2px", textAlign: "center" }}>
                  <Tag color="#108ee9" style={{ marginBottom: "0" }}>{i.value}</Tag>
                </td>
                <td style={{ padding: "2px", textAlign: "center" }}>
                  {i.result}
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </Card>
    :
    null

)


const FILE_DATA_INDEX = "file",
  SERVER_URL_DATA_INDEX = "serverUrl",
  REMOTE_METHOD = "remote",
  LOCAL_METHOD = "local",
  DEVICE_LIST_DATA_INDEX = "idList"


class UpdateForm extends React.Component<any, any> {
  state = {
    result: [],
    fileVisible: false,
    disabledList: [],
    hasFail: false,
    method: REMOTE_METHOD,
    file: null,
    updateResult: [],
    hideNotValidItem: false,
    serverUrl: "",
    shouldReload: false
  }
  static defaultProps = {
    defaultValue: { data: [] }
  }
  setServerUrl = e => {
    this.setState({
      serverUrl: e.target.value,
    })
  }
  hideNotValidItemOnChange = () => this.setState({
    hideNotValidItem: !this.state.hideNotValidItem,
  })

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

    let { serverUrl } = this.state;

    const idList = this.getValidItems().map(i => i[ID_DATAINDEX])

    const res = method === REMOTE_METHOD
      ?
      updateRemote({ idList, serverUrl })
      :
      updateLocal({ idList, file })

    res.then(result => this.setState({
      updateResult: result,
      shouldReload: result.some(i => i.status === 1)
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

    const idList = this.getValidItems().map(i => i[ID_DATAINDEX])


    const res = method === REMOTE_METHOD
      ?
      getUpdateInfoRemote({ idList, serverUrl })
      :
      getUpdateInfoLocal({ idList, file })

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
  getValidItems = () => {
    const { defaultValue } = this.props,
      { data } = defaultValue;

    return data.filter(i => i[LICENCE_STATUS_DATAINDEX].value === LICENCE_VALID_VALUE)
      .filter(i => i[CONNECT_STATUS_DATAINDEX] === CONNECT)
      .map((i, index) => ({
        ...i,
        key: `${i[ID_DATAINDEX]}-item`
      }));
  }

  haveValidResult = () => this.state.result.some(i =>
    i[APPLIACTION_VERSION_DATAINDEX] !== null
    ||
    i[ENGINE_VERSION_LIST_DATAINDEX].some(e => e["version"] !== null)
    ||
    i[LIBRARY_VERSION_DATAINDEX].some(l => l["version"] !== null)
  )

  render() {
    const { getFieldDecorator } = this.props.form;
    const { isDark, loading, defaultValue = { data: [] }, style } = this.props;
    const { result, fileVisible, disabledList, shouldReload, updateResult, hideNotValidItem } = this.state
    const lblClasses = classnames({
      "lbl-dark": isDark
    })

    const { data = [] } = defaultValue;
    const haveResult = result.length !== 0,
      haveUpdateResult = updateResult.length !== 0;

    const versionColumns = [
      {
        dataIndex: APPLIACTION_VERSION_DATAINDEX,
        width: "100px",
        title: <p style={{ textAlign: "center" }}>{tableTextConfig.colTitles[APPLIACTION_VERSION_DATAINDEX]}</p>,
        render: (value, records) => {

          if (records[CONNECT_STATUS_DATAINDEX] !== CONNECT) {
            return null
          }

          if (records[LICENCE_STATUS_DATAINDEX].value !== LICENCE_VALID_VALUE) {
            return null
          }

          const deviceId = records[ID_DATAINDEX];
          const valueTag = <Tag
            color="#108ee9"
            style={{ marginBottom: "0" }}>
            {value}
          </Tag>
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
                  <Tag color="#108ee9">{version}</Tag>
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
        width: "400px",
        title: <p style={{ textAlign: "center" }}>{tableTextConfig.colTitles[LIBRARY_VERSION_LIST_DATAINDEX]}</p>,
        render: (value, records) => {

          if (records[CONNECT_STATUS_DATAINDEX] !== CONNECT) {
            return <p style={{ textAlign: "center" }}>
              设备连接异常 无法进行更新操作
            </p>
          }

          if (records[LICENCE_STATUS_DATAINDEX].value !== LICENCE_VALID_VALUE) {
            return <p style={{ textAlign: "center" }}>
              该设备未授权或授权已过期 无法进行更新操作
            </p>
          }

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
                      可升级至&nbsp;<Tag color="#108ee9">{newVersion}</Tag>
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

          if (records[CONNECT_STATUS_DATAINDEX] !== CONNECT) {
            return null
          }
          if (records[LICENCE_STATUS_DATAINDEX].value !== LICENCE_VALID_VALUE) {
            return null
          }

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
                      可升级至&nbsp;<Tag color="#108ee9">{newVersion}</Tag>
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

          if (records[CONNECT_STATUS_DATAINDEX] !== CONNECT) {
            return <p style={{ textAlign: "center" }}>
              设备连接异常 无法进行更新操作
            </p>
          }

          if (records[LICENCE_STATUS_DATAINDEX].value !== LICENCE_VALID_VALUE) {
            return <p style={{ textAlign: "center" }}>
              该设备未授权或授权已过期 无法进行更新操作
            </p>
          }

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
      scroll: { y: 400 },
      dataSource: hideNotValidItem
        ?
        this.getValidItems()
        :
        data.map((i, index) => ({
          ...i,
          key: `${i[ID_DATAINDEX]}-item`,
        })),
      columns: [
        {
          dataIndex: DEVICE_ID_DATAINDEX,
          title: <p style={{ textAlign: "center" }}>设备唯一标识</p>,
          width: "140px"
        },
        {
          dataIndex: HOST_IP_DATAINDEX,
          title: <p style={{ textAlign: "center" }}>主机IP</p>,
          width: "140px",
          render: value => <CommonCell value={value}></CommonCell>
        },
        ...(haveUpdateResult ? resultColumns : versionColumns)
      ]
    }





    const validItems = this.getValidItems()

    const isMulti = validItems.length > 1;


    const { clearError } = this;

    const haveValidResult = this.haveValidResult()

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
          <span className={lblClasses}>
            隐藏无法操作的设备 &nbsp;
          </span>
          <Switch
            onChange={this.hideNotValidItemOnChange}
            checked={this.state.hideNotValidItem}
            checkedChildren={<Icon type="check" />}
            unCheckedChildren={<Icon type="cross" />}>
          </Switch>
        </div>
        <div style={{ marginBottom: "15px" }}>
          <Table
            tableProps={tableProps}
            pagination={false}>
          </Table>
        </div>
        {
          haveResult
          &&
          haveUpdateResult
          &&
          <LicenceBackPlaceholder
            isDark={isDark}
            shouldReload={shouldReload}
            onCancel={this.props.onCancel}>
          </LicenceBackPlaceholder>
        }
        {
          haveResult
          &&
          !haveUpdateResult
          &&
          <div style={{ textAlign: "center" }}>
            {
              haveValidResult
                ?
                null
                :
                <p className={lblClasses}>
                  已是最新版本 无需更新
                </p>
            }
            <Button
              disabled={!haveValidResult}
              type="primary"
              onClick={this.handleUpdate}>
              确定
            </Button>
          </div>
        }
        {
          validItems.length !== 0
          &&
          !haveResult
          &&
          !haveUpdateResult
          &&
          <Row>
            <Col >
              <Radio.Group
                style={{ width: "100%" }}
                value={this.state.method}
                onChange={this.radioOnChange}>
                <Row>
                  <Col span={12} style={{ textAlign: "center" }}>
                    <Radio value="remote"><span className={lblClasses}>在线升级</span></Radio>
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
                          initialValue: deviceManagerConfig.serverUrl,
                          rules: [
                            // {
                            //   required: false, message: "服务器地址不能为空"
                            // }
                          ]
                        })(
                          <Input onChange={this.setServerUrl} placeholder="请填写升级服务器地址" disabled={loading}>
                          </Input>
                        )}
                      </FormItem>
                    </div>
                }
              </div>
            </Col>
            <Col>
              <div style={{ textAlign: "center", marginTop: "20px" }}>
                <Button type="primary" onClick={this.handleGetVersion}>获取升级版本信息</Button>
              </div>
            </Col>
          </Row>
        }
      </Form>
    )
  }
}

const WrappedForm: any = Form.create()(UpdateForm)

export default WrappedForm