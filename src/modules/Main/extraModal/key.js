import { DEBUG_MODE, SECRET_KEY_NAMESPACE, IV_NAMESPACE } from 'configs/ConstConfig'
import Mousetrap from 'mousetrap'
import { Modal, message as Message, Input } from 'antd'


export default () => {
  let ref = null

  let secretKey = "", iv = ""

  Mousetrap.bind(['command+alt+k', 'ctrl+alt+k'], function () {

    if (ref) {
      ref.destroy()
      ref = null
      return false
    }

    ref = Modal.confirm({
      title: "SECRET KEY设置",
      content: <p>
        设置临时的SECRET KEY 和 IV（关闭tab后重启或注销登录可清除）<br />
        设置的内容将会覆盖代码内置的 SECRET KEY 和 IV <br />
        <span style={{ color: "red" }}>*key和iv的长度建议为16位</span>
        <Input
          style={{ "marginBottom": "15px" }}
          placeholder="请输入key"
          onChange={e => secretKey = e.target.value}
          defaultValue={window.sessionStorage.getItem(SECRET_KEY_NAMESPACE)}>
        </Input>
        <Input
          placeholder="请输入iv"
          onChange={e => iv = e.target.value}
          defaultValue={window.sessionStorage.getItem(IV_NAMESPACE)}>
        </Input>
      </p>,
      okText: "确定",
      onOk: () => {
        sessionStorage.setItem(SECRET_KEY_NAMESPACE, secretKey)
        sessionStorage.setItem(IV_NAMESPACE, iv)
        secretKey = ""
        iv = ""
        ref = null

        Message.success(`${SECRET_KEY_NAMESPACE}设置成功，等待窗口刷新..`)

        setTimeout(() => {
          window.location.reload()
        }, 1200)

      },
      onCancel: () => ref = null
    })

    return false;
  });
}