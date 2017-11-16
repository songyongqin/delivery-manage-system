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
  message as Message,
  Switch,
} from 'antd';
import styles from './styles.css';
import classnames from 'classnames';
import {
  CODE_DATAINDEX,
  ID_DATAINDEX,
  LICENCE_STATUS_DATAINDEX,
  LICENCE_VALID_VALUE,
  DEVICE_ID_DATAINDEX,
  CONNECT_STATUS_DATAINDEX,
  CONNECT,
} from '../../ConstConfig'
import EnhanciveTable from '../../../../domainComponents/EnhanciveTable';

const FormItem = Form.Item;
const Dragger = Upload.Dragger;
const LICENCE_SUCCESS = 1;

const LicenceBackPlaceholder = ({ isDark = false, shouldReload = false, onCancel }) => (
  <div >
    <h4 style={{
      color: "#108ee9",
      textAlign: "center",
      fontWeight: "500"
    }}>
      感谢您使用本产品，本次授权操作已完成，若存在授权失败的设备请尝试重新授权
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

const getColumns = ({ result, getFieldDecorator, lblClasses, loading, disabledList }) => {
  return [
    {
      dataIndex: DEVICE_ID_DATAINDEX,
      title: <p style={{ textAlign: "center" }}>设备唯一标识</p>,
      width: "50%",
    },
    {
      key: "code",
      title: <p style={{ textAlign: "center" }}>授权信息</p>,
      width: "50%",
      render: records => {
        if (records[CONNECT_STATUS_DATAINDEX] !== CONNECT) {
          return <p className={lblClasses}>
            该设备连接异常，无法进行授权
        </p>
        }

        //已授权的显示内容
        if (records[LICENCE_STATUS_DATAINDEX].value === LICENCE_VALID_VALUE) {
          return <p className={lblClasses}>
            该设备已授权且授权未即将过期，无需重新授权
          </p>
        }

        let target = {}, hasBack = false;
        result.some(i => {
          if (i[ID_DATAINDEX] === records[ID_DATAINDEX]) {
            target = i;
            hasBack = true;
            return true
          }
        });
        //尚没有返回结果的显示内容
        if (!hasBack) {
          return (
            <FormItem
              style={{ margin: "0" }}
              colon={false}
              required={true}
              hasFeedback={true}
            >
              {getFieldDecorator(`${records[ID_DATAINDEX]}`, {
                initialValue: "",
                rules: [
                  {
                    required: true, message: "授权码不能为空"
                  }
                ]
              })(
                <Input
                  placeholder="填写授权码"
                  disabled={loading || disabledList.includes(records[ID_DATAINDEX])}>
                </Input>
                )}
            </FormItem>
          )
        }

        //授权成功和失败的显示结果
        if (target.status === LICENCE_SUCCESS) {
          return <p style={{ color: "#108ee9", textAlign: "center" }}>
            <Icon type="check"></Icon> &nbsp;授权成功，<br />
            到期时间：{target["date"]}
          </p>
        } else {
          return <p style={{ color: "red", textAlign: "center" }}>
            <Icon type="close"></Icon> &nbsp;授权失败，<br />
            原因: {target["message"]}
          </p>
        }


      }
    }
  ]
}

@Form.create()
class WrappedForm extends React.Component {
  state = {
    result: [],
    fileVisible: false,
    disabledList: [],
    hasFail: false,
    hideNotValidItem: false,
  }
  static defaultProps = {
    defaultValue: { data: [] }
  }

  hideNotValidItemOnChange = () => this.setState({
    hideNotValidItem: !this.state.hideNotValidItem,
  })

  switchFilePanel = value => this.setState({
    fileVisible: value
  })
  exportDeviceId = () => {
    const { data } = this.props.defaultValue;
    const content = this.getValidItems().map(i => i[DEVICE_ID_DATAINDEX])
    const eleLink = document.createElement('a');
    eleLink.download = "deviceCodeList.json";
    eleLink.style.display = 'none';
    const blob = new Blob([JSON.stringify({ [DEVICE_ID_DATAINDEX]: content }, null, 2)]);
    eleLink.href = URL.createObjectURL(blob);
    document.body.appendChild(eleLink);
    eleLink.click();
    document.body.removeChild(eleLink);
  }
  autoInputCode = payload => {

    const { form, defaultValue } = this.props;
    const { data = [] } = defaultValue;

    const idMap = {}

    data.forEach(i => {
      idMap[i[DEVICE_ID_DATAINDEX]] = i[ID_DATAINDEX]
    })

    let codeList = {};
    payload.forEach(item => {
      const code = item.code,
        deviceId = idMap[item[DEVICE_ID_DATAINDEX]];

      codeList[deviceId] = code
    });

    data.forEach(item => {
      const deviceId = item[ID_DATAINDEX];


      deviceId in codeList
        ?
        form.setFieldsValue({ [deviceId]: codeList[deviceId] })
        :
        form.setFields({
          [deviceId]: {
            value: "",
            errors: [
              new Error("授权码未提供，请确认授权码文件中包含该设备的授权，重新导入授权文件")
            ]
          }
        })
    })

    this.setState({
      disabledList: Object.keys(codeList),
    })
  }
  getValidItems = () => {
    const { defaultValue } = this.props,
      { data } = defaultValue;

    return data.filter(i => i[LICENCE_STATUS_DATAINDEX].value !== LICENCE_VALID_VALUE)
      .filter(i => i[CONNECT_STATUS_DATAINDEX] === CONNECT)
      .map((i, index) => ({
        ...i,
        key: `${i[ID_DATAINDEX]}-item`
      }));
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const { onSubmit, form, defaultValue } = this.props;
    const { data } = defaultValue;

    form.validateFieldsAndScroll((err, values) => {
      if (err) {
        return
      }

      const payload = this.getValidItems().map(i => ({
        [ID_DATAINDEX]: i[ID_DATAINDEX],
        code: values[i[ID_DATAINDEX]]
      }))

      onSubmit && onSubmit(payload).then(result => {
        this.setState({
          result,
          shouldReload: result.some(i => i.status === 1)
        })
      });

    });
  }

  getOperationPanel = ({ result, haveResult, validItems, loading, isDark, shouldReload, lblClasses, isMulti, fileVisible, switchFilePanel, autoInputCode }) => {

    if (validItems.length === 0) {
      return null
    }

    if (haveResult) {
      return (
        <LicenceBackPlaceholder
          isDark={isDark}
          shouldReload={shouldReload}
          onCancel={this.props.onCancel}>
        </LicenceBackPlaceholder>
      )
    }


    const fileProps = {
      name: "file",
      multiple: false,
      showUploadList: false,
      beforeUpload: (file, fileList) => {
        let isJson = file.name.endsWith(".json");
        if (!isJson) {
          Message.error("只支持导入JSON格式文件")
          return;
        }
        let reader = new FileReader();
        reader.onload = function (e) {
          let content = [];
          try {
            content = JSON.parse(this.result).licence;
            Message.success("批量导入成功")
            switchFilePanel(false);
          } catch (e) {
            Message.error("JSON文件内容格式错误")
          }

          autoInputCode(content);

        }
        reader.readAsText(file);

        return false;
      }
    }

    return (
      <div>
        <p
          className={lblClasses}
          style={{ textAlign: "center", margin: "15px 0" }}>
          <span style={{ color: "red" }}>*</span>
          授权码请联系售后获取，需提供设备唯一标识码
        </p>
        <Row>
          {
            isMulti
            &&
            <Col span={8}>
              <FormItem style={{ textAlign: "center" }}>
                <Button
                  onClick={this.exportDeviceId}
                  type="primary"
                  loading={loading}
                >批量导出设备码</Button>
              </FormItem>
            </Col>
          }

          {
            isMulti
            &&
            <Col span={8}>
              <FormItem style={{ textAlign: "center" }}>
                <Button
                  onClick={() => { this.switchFilePanel(!fileVisible) }}
                  type="primary"
                  loading={loading}
                >批量导入授权码文件</Button>
              </FormItem>
            </Col>
          }

          <Col span={isMulti ? 8 : 24}>
            <FormItem style={{ textAlign: "center" }}>
              <Button type="primary"
                loading={loading}
                disabled={loading || result.length !== 0 || validItems.length === 0}
                onClick={this.handleSubmit}>授权</Button>
            </FormItem>
          </Col>
        </Row>
        {
          fileVisible
          &&
          <Row>
            <Col>
              <Dragger {...fileProps}>
                <p className="ant-upload-drag-icon" style={{ marginTop: "15px" }}>
                  <Icon type="file-text" />
                </p>
                <p className={lblClasses}>点击或拖拽文件到此处 仅支持JSON格式文件</p>
              </Dragger>
            </Col>
          </Row>
        }
      </div>
    )
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { isDark, loading, defaultValue = { data: [] }, style } = this.props;
    const { result, fileVisible, disabledList, shouldReload, hideNotValidItem } = this.state;
    const lblClasses = classnames({
      "lbl-dark": isDark
    })
    const { data = [] } = defaultValue;
    const tableProps = {
      dataSource: hideNotValidItem
        ?
        this.getValidItems()
        :
        data.map((i, index) => ({
          ...i,
          key: `${i[ID_DATAINDEX]}-item`,
        })),
      columns: getColumns({ result, disabledList, loading, getFieldDecorator })
    }

    const validItems = this.getValidItems()

    const isMulti = validItems.length > 1;

    const haveResult = result.length !== 0;


    const { switchFilePanel, autoInputCode } = this

    return (
      <Form >
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
          <EnhanciveTable
            tableProps={tableProps}
            pagination={false}>
          </EnhanciveTable>
        </div>
        {
          this.getOperationPanel({
            haveResult,
            validItems,
            loading,
            result,
            isDark,
            shouldReload,
            lblClasses,
            isMulti,
            fileVisible,
            switchFilePanel,
            autoInputCode,
          })
        }
      </Form>
    );
  }
}

export default WrappedForm;
