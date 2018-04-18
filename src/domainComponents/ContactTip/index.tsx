import { Button } from 'antd'
import { connect } from 'dva'
import * as React from 'react'
const styles = require('./styles.less')

const ContactTip = ({ isDark = false, title = "", onCancel }) => (
  <div>
    <h4 style={{
      color: "#108ee9",
      textAlign: "center",
      fontWeight: 500
    }}>
      {title}
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
        onClick={onCancel}
        size="large"
        type="primary">
        确定
      </Button>
    </div>
  </div >
)

export default ContactTip