import * as React from 'react'
import { Divider, Icon } from 'antd'
const styles = require("./styles.less")
import { getAppConfig } from 'domain/app'
import { get } from 'utils'

export default ({ children }) => {


  const phoneNumber = get(getAppConfig(), ["contactInfo", "phoneNumber"], ""),
    email = get(getAppConfig(), ["contactInfo", "email"], "")

  return (
    <div className={styles['contact-info']}>
      {children}
      <Divider>售后联系</Divider>
      <table >
        <tbody>
          <tr>
            <td>
              <Icon type="mail"></Icon>&nbsp;
              售后联系邮箱:
            </td>
            <td>
              <a href={`mailto:${email}`}>
                {email}
              </a>
            </td>
          </tr>
          <tr>
            <td>
              <Icon type="phone"></Icon>&nbsp;
              售后联系电话:
            </td>
            <td>
              <a href={`tel:${phoneNumber}`}>
                {phoneNumber}
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}