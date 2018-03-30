import CommonForm from '../CommonForm'
import * as React from 'react'
import { Form, Icon, message as Message, Tooltip, Badge } from 'antd'
import classnames from 'classnames'
const FormItem = Form.Item
import extraConnect from 'domainUtils/extraConnect'
import Card from 'domainComponents/Card'
import { SYS_CONFIG_NETWORK_NAMESPACE } from 'constants/model'
import { When, Otherwise, Choose } from 'components/ControlStatements'
import {
  ADAPTER_IP_DATAINDEX,
  ADAPTER_GW_DATAINDEX,
  ADAPTER_MAS_DATAINDEX,
} from '../../constants'
import { ipReg } from 'utils/tools'

const rulesConfig = {
  [ADAPTER_IP_DATAINDEX]: [
    {
      required: true, message: "IP不能为空",
    },
    {
      pattern: ipReg,
      message: "请输入正确的IP"
    }
  ],
  [ADAPTER_MAS_DATAINDEX]: [
    {
      required: true, message: "子网掩码不能为空",
    },
    {
      pattern: ipReg,
      message: "请输入正确的子网掩码"
    }
  ],
  [ADAPTER_GW_DATAINDEX]: [
    {
      required: true, message: "网关不能为空",
    },
    {
      pattern: ipReg,
      message: "请输入正确的网关"
    }
  ]
}

const dataIndexes = [
  ADAPTER_IP_DATAINDEX,
  ADAPTER_MAS_DATAINDEX,
  ADAPTER_GW_DATAINDEX,
]

const labelTextConfig = {
  adapterGW: "网关",
  adapterIp: "IP",
  adapterMas: "子网掩码"
}

@extraConnect(
  state => {
    const effectsLoading = state.loading.effects
    return {
      loading: effectsLoading[`${SYS_CONFIG_NETWORK_NAMESPACE}/fetch`] ||
        effectsLoading[`${SYS_CONFIG_NETWORK_NAMESPACE}/put`]
    }
  },
  dispatch => {
    return {
      fetch: _ => dispatch({
        type: `${SYS_CONFIG_NETWORK_NAMESPACE}/fetch`,
      }),
      put: payload => dispatch({
        type: `${SYS_CONFIG_NETWORK_NAMESPACE}/put`,
        payload
      })
    }
  }
)
export default class extends React.Component<any, any>{
  state = {
    data: {
      adapterList: []
    },
    initial: false
  }
  componentDidMount() {
    this.fetchData()
  }
  fetchData = () => {
    this.props.fetch().then(res => this.setState({ data: res, initial: true }))
  }
  // onSubmit = payload => {
  //   return this.props.put(payload)
  //     .then(_ => Message.success("保存成功"))
  //     .then(this.fetchData)
  // }
  getFormConfig = (item) => {
    try {
      const { adapterName, virtual, adapterMac } = item

      const realKeyMap: any = {}

      const finalDefaultValue = Object.entries(item).reduce((target, [key, value]) => {

        if (dataIndexes.includes(key)) {
          target[`${adapterName}/${key}`] = value
          realKeyMap[`${adapterName}/${key}`] = key
        }
        return target
      }, {})

      const finalLabelTextConfig = Object.entries(labelTextConfig).reduce((target, [key, value]) => {
        target[`${adapterName}/${key}`] = value
        return target
      }, {})

      const finalRulesConfig = Object.entries(rulesConfig).reduce((target, [key, value]) => {
        target[`${adapterName}/${key}`] = value
        return target
      }, {})

      return {
        dataIndexes: Object.keys(finalDefaultValue),
        defaultValue: finalDefaultValue,
        rulesConfig: finalRulesConfig,
        labelTextConfig: finalLabelTextConfig,
        loading: this.props.loading,
        disabled: virtual === 1,
        btnDisabledTip: "该网卡是被br0桥接网卡，所有信息均为只读",
        onSubmit: payload => {
          const finalPayload: any = {
            adapterName,
            adapterMac
          }
          Object.entries(payload).map(([key, value]) => {
            finalPayload[realKeyMap[key]] = value
          })

          this.props.put(finalPayload)
            .then(_ => Message.success("保存成功"))
            .then(this.fetchData)
        }
      }

    } catch (e) {
      return {
        dataIndexes: [],
        defaultValue: {},
        disabled: false,
        labelTextConfig: {},
        loading: false,
        onSubmit: _ => { },
        rulesConfig: {}
      }
    }
  }
  render() {

    const { onSubmit } = this
    const { loading } = this.props
    const { data, initial } = this.state

    return (
      <Card
        title={
          <div>
            <Icon type="global"></Icon> &nbsp;网络配置&nbsp;&nbsp;
          </div>
        } style={{ marginBottom: "15px" }}>
        <Choose>
          <When condition={initial}>
            {
              data["adapterList"].map((i, index) => {

                const { adapterStatus, adapterName } = i

                return (
                  <div key={`${index}-item`} style={{ marginBottom: "10px" }}>
                    <Badge status={adapterStatus === 1 ? "success" : "error"}>
                    </Badge>
                    {adapterName}
                    {`(${adapterStatus === 1 ? "已连接" : "未连接"})`}
                    <CommonForm
                      {...this.getFormConfig(i)}
                      key={`${index}-common-form`}>
                    </CommonForm>
                  </div>
                )
              })
            }
          </When>
          <Otherwise>
            <Icon type="loading"></Icon>
          </Otherwise>
        </Choose>
      </Card>
    )
  }
}