import * as React from 'react'
import ContactInfo from 'domainComponents/ContactInfo'
import WithModal from 'components/WithModal'
import { Icon, Modal } from 'antd'

const Footer = ({ modalVisible, setModalVisible }) => {
  return (
    <footer style={{
      height: "40px",
      lineHeight: "40px",
      // position: "fixed",
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 10,
      background: "white"
    }}>
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