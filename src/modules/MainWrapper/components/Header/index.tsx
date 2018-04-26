import * as React from 'react'
import classnames from 'classnames'
const styles = require("./styles.less")
import { Icon, Menu, Dropdown, Tooltip } from 'antd'
import ExtraIcon from 'components/Icon'
import { LIGHT_THEME, DARK_THEME } from 'constants/theme'
import { USER_ACCOUNT_DATA_INDEX } from 'constants/user'
import RecordOfCreateVM from 'modules/Manager_Virtual/components/RecordOfCreateVM'
import { getAppConfig } from 'domain/app'
import { If, Choose, When, Otherwise } from 'components/ControlStatements'
import { getIP } from 'models/domainUser'
import { get } from 'utils'

interface Props {
  theme?: string,
  style?: object,
  mini?: boolean,
  onChange?: (status: boolean) => any,
  themeOnChange?: (theme: string) => void,
  handle?: any,
  title?: any,
  expandable?: boolean,
  login?: boolean,
  userData?: any,
  admin?: boolean
}

const tipTextConfig = {
  admin: "说明：管理员属于授权用户,可对系统所有界面进行查看和操作",
  common: "说明：普通用户属于非授权用户，可对系统部分界面进行查看和操作"
}

export default class Header extends React.PureComponent<Props, any>{
  render() {
    const {
      theme,
      style,
      mini,
      onChange,
      themeOnChange,
      handle = {},
      title,
      expandable = true,
      login = false,
      userData = {},
      admin
    } = this.props

    const wrapperClasses = classnames({
      [styles["header"]]: true,
      [styles[theme]]: true
    })

    const expandBtnStyle = expandable ? { float: "left" } : { display: "none" },
      themeBtnStyle = expandable ? { float: "left", marginLeft: "20px" } : { float: "left" }


    const menu = (
      <Menu>
        <Menu.ItemGroup key="message" title={
          <div style={{ padding: "5px" }}>
            <span style={{ color: "#108ee9", fontWeight: 900 }}>{userData["userAccount"]}</span>
            &nbsp;&nbsp;
            <span>{admin ? "管理员" : "普通用户"}</span>
            <div style={{
              wordBreak: "break-all",
              maxWidth: "240px",
              overflow: "hidden",
              color: "#cccccc"
            }}>
              {admin ? tipTextConfig.admin : tipTextConfig.common}
            </div>
          </div>
        }>
        </Menu.ItemGroup>
        <Menu.Item key="modify-password">
          <a onClick={handle.showModifyPassword}><Icon type="edit"></Icon>&nbsp;修改密码</a>
        </Menu.Item>
        <Menu.Item key="sign-out">
          <a onClick={handle.signOut}><Icon type="poweroff"></Icon>&nbsp;退出登录</a>
        </Menu.Item>
      </Menu>
    )

    return (
      <header className={wrapperClasses} style={style}>
        <Choose>
          <When condition={mini}>
            <a style={expandBtnStyle} onClick={() => onChange && onChange(false)}>
              <Icon type="menu-unfold" />
            </a>
          </When>
          <Otherwise>
            <a style={expandBtnStyle} onClick={() => onChange && onChange(true)}>
              <Icon type="menu-fold" />
            </a>
          </Otherwise>
        </Choose>
        {/* {
          theme === LIGHT_THEME
            ?
            <a style={themeBtnStyle} onClick={() => themeOnChange(DARK_THEME)}>
              <ExtraIcon type="night"></ExtraIcon>
            </a>
            :
            <a style={themeBtnStyle} onClick={() => themeOnChange(LIGHT_THEME)}>
              <ExtraIcon type="sun"></ExtraIcon>
            </a>
        } */}
        <If condition={getAppConfig()['recordOfCreatingVM']}>
          <div style={{ float: "right", marginLeft: "15px" }}>
            <RecordOfCreateVM></RecordOfCreateVM>
          </div>
        </If>
        <If condition={login}>
          <div style={{ float: "right" }}>
            <Icon type="user"></Icon>&nbsp;{userData[USER_ACCOUNT_DATA_INDEX]}&nbsp;
              <Dropdown overlay={menu}>
              <a>
                <Icon type="down" />
              </a>
            </Dropdown>
          </div>
        </If>
        <If condition={get(getAppConfig(), ["ipInfo", "honeypotNode"], false) && getIP()}>
          <span style={{ float: "right", marginRight: "5px" }}>
            <Tooltip title="此为该蜜罐节点主机的IP，用于区分不同的蜜罐节点">
              蜜罐节点：<span style={{ color: "#108ee9" }}>{getIP()}</span>
            </Tooltip>
          </span>
        </If>
        <If condition={get(getAppConfig(), ["ipInfo", "idsNode"], false) && getIP()}>
          <span style={{ float: "right", marginRight: "5px" }}>
            <Tooltip title="此为该流量监测设备节点主机的IP，用于区分不同的流量监测设备节点">
              流量监测设备节点：<span style={{ color: "#108ee9" }}>{getIP()}</span>
            </Tooltip>
          </span>
        </If>
        <h1 className={styles['title']}>
          {(getAppConfig() as any).title}
        </h1>
      </header>
    )
  }
}