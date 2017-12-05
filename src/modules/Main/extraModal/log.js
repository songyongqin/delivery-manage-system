import { DEBUG_MODE, SECRET_KEY_NAMESPACE, IV_NAMESPACE, LOG_NAMESPACE } from 'configs/ConstConfig'
import Mousetrap from 'mousetrap'
import { Modal, message as Message, Input } from 'antd'


export default () => {
  let ref = null

  Mousetrap.bind(['command+alt+l', 'ctrl+alt+l'], function () {

    if (ref) {
      ref.destroy()
      ref = null
      return false
    }

    ref = Modal.confirm({
      title: "LOG 模式",
      content: <p>
        开启日志打印模块，将在控制台输出所有请求发出的数据及相关信息
      </p>,
      okText: "确定",
      onOk: () => {
        sessionStorage.setItem(LOG_NAMESPACE, LOG_NAMESPACE)
        ref = null
        Message.success(`LOG模式设置成功，等待窗口刷新..`)

        setTimeout(() => {
          window.location.reload()
        }, 1200)

      },
      onCancel: () => ref = null
    })

    return false;
  });
}