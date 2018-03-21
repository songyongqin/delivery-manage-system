import * as React from 'react'
import { openCryptoMode, isCryptoMode, closeCryptoMode } from 'configs/CryptoConfig'
import { Modal, message as Message, Input } from 'antd'
import Mousetrap from 'mousetrap'

export default () => {
  let ref = null

  Mousetrap.bind(['command+alt+b', 'ctrl+alt+b'], function () {

    if (ref) {
      ref.destroy()
      ref = null
      return false
    }


    ref = isCryptoMode()
      ?
      Modal.confirm({
        title: "加密模式",
        content: (
          <p>
            关闭加密模式模式（临时）,
              <b style={{ color: "red" }}>
              将关闭传输数据的加密和解密模块
              （关闭tab后重启或注销登录可清除临时设置的模式）
              </b>
          </p>
        ),
        okText: "确定",
        onOk: () => {
          ref = null
          closeCryptoMode()
          Message.success("加密模式关闭成功")

        },
        onCancel: () => ref = null
      })
      :
      Modal.confirm({
        title: "加密模式",
        content: (
          <p>
            是否开启加密模式（临时）
            <span style={{ color: "red" }}>将开启数据的加密和解密模块</span>
            （关闭tab后重启或注销登录可清除临时设置的模式）
          </p>
        ),
        okText: "确定",
        onOk: () => {

          ref = null

          openCryptoMode()

          isCryptoMode()
            ?
            Message.success("加密模式开启成功")
            :
            Message.error("加密模式开启失败")


        },
        onCancel: () => ref = null
      })

    return false
  })

}