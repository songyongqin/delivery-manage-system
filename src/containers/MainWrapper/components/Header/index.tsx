import * as React from 'react'
import classnames from 'classnames'
const styles = require("./styles.less")
import { Icon, Menu, Dropdown } from 'antd'
import ExtraIcon from 'components/Icon'
import { LIGHT_THEME, DARK_THEME } from 'constants/theme'
import { USER_ACCOUNT_DATA_INDEX } from 'constants/user'
import RecordOfCreateVM from 'modules/Manager_Virtual/components/RecordOfCreateVM'

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
}



export default class Header extends React.PureComponent<Props, any>{
  render() {
    const { theme, style, mini, onChange, themeOnChange, handle = {}, title, expandable = true, login = false, userData = {} } = this.props

    const wrapperClasses = classnames({
      [styles["header"]]: true,
      [styles[theme]]: true
    })

    const expandBtnStyle = expandable ? { float: "left" } : { display: "none" },
      themeBtnStyle = expandable ? { float: "left", marginLeft: "20px" } : { float: "left" }


    const menu = (
      <Menu>
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
        {
          mini
            ?
            <a style={expandBtnStyle} onClick={() => onChange && onChange(false)}>
              <Icon type="menu-unfold" />
            </a>
            :
            <a style={expandBtnStyle} onClick={() => onChange && onChange(true)}>
              <Icon type="menu-fold" />
            </a>
        }
        {
          theme === LIGHT_THEME
            ?
            <a style={themeBtnStyle} onClick={() => themeOnChange(DARK_THEME)}>
              <ExtraIcon type="night"></ExtraIcon>
            </a>
            :
            <a style={themeBtnStyle} onClick={() => themeOnChange(LIGHT_THEME)}>
              <ExtraIcon type="sun"></ExtraIcon>
            </a>
        }
        <div style={{ float: "right", marginLeft: "15px" }}>
          <RecordOfCreateVM></RecordOfCreateVM>
        </div>
        {
          login
            ?
            <div style={{ float: "right" }}>
              <Icon type="user"></Icon>&nbsp;{userData[USER_ACCOUNT_DATA_INDEX]}&nbsp;
              <Dropdown overlay={menu}>
                <a>
                  <Icon type="down" />
                </a>
              </Dropdown>
            </div>
            :
            null
        }
        {
          <h1 className={styles['title']}>
            {title}
          </h1>
        }

      </header>
    )
  }
}