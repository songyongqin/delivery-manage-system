import * as React from 'react'
import ContactInfo from 'domainComponents/ContactInfo'
import WithModal from 'components/WithModal'
import { Icon, Modal } from 'antd'
const css = require('./index.less')

const Footer = ({ modalVisible, setModalVisible }) => {
  //     网页可见区域宽： document.body.clientWidth
// 网页可见区域高： document.body.clientHeight
// 网页可见区域宽： document.body.offsetWidth (包括边线的宽)
// 网页可见区域高： document.body.offsetHeight (包括边线的高)
// 网页正文全文宽： document.body.scrollWidth
// 网页正文全文高： document.body.scrollHeight
// 网页被卷去的高： document.body.scrollTop
// 网页被卷去的左： document.body.scrollLeft

  return (
    <footer className={ css.footer }  >
      <div style={{ textAlign: "center" }}>
        © 2017 Antiy Labs
        &nbsp;
        <a onClick={_ => setModalVisible("contacts", true)}>
          <Icon type="contacts"></Icon>
        </a>
      </div>

      <Modal
        visible={modalVisible["contacts"]}
        footer={null}
        onCancel={_ => setModalVisible("contacts", false)}>
        <ContactInfo></ContactInfo>
      </Modal>
    </footer>
  )
}

export default WithModal()(Footer)