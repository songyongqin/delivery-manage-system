import { DEBUG_MODE, SECRET_KEY_NAMESPACE, IV_NAMESPACE } from 'configs/ConstConfig'
import Mousetrap from 'mousetrap'
import { Modal, message as Message, Input } from 'antd'

export default () => {
  let ref = null

  Mousetrap.bind(['command+alt+b', 'ctrl+alt+b'], function () {

    if (ref) {
      ref.destroy()
      ref = null
      return false
    }

    const currentMode = sessionStorage.getItem(DEBUG_MODE)

    ref = currentMode
      ?
      Modal.confirm({
        title: "DEBUG模式",
        content: (
          <p>
            关闭debug模式,
            <b style={{ color: "red" }}>
              将开启传输数据的加密和解密模块
            </b>
          </p>
        ),
        okText: "确定",
        onOk: () => {
          ref = null
          sessionStorage.removeItem(DEBUG_MODE)
          Message.success("DEBUG模式关闭成功,等待窗口刷新..")
          setTimeout(() => {
            window.location.reload()
          }, 1200)
        },
        onCancel: () => ref = null
      })
      :
      Modal.confirm({
        title: "DEBUG模式",
        content: (
          <p>
            是否开启DEBUG模式
            <span style={{ color: "red" }}>将关闭数据的加密和解密模块</span>
            （关闭tab后重启或注销登录可取消DEBUG模式）
          </p>
        ),
        okText: "确定",
        onOk: () => {
          ref = null
          sessionStorage.setItem(DEBUG_MODE, DEBUG_MODE)
          if (sessionStorage.getItem(DEBUG_MODE)) {
            Message.success("DEBUG模式开启成功,等待窗口刷新..")
            setTimeout(() => {
              window.location.reload()
            }, 1200)
          } else {
            Message.error("DEBUG模式开启失败")
          }

        },
        onCancel: () => ref = null
      })

    return false;
  });
}