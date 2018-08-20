import * as React from 'react'
import classnames from 'classnames'
const styles = require("./styles.less")
import { Icon, Menu, Dropdown } from 'antd'
// import ExtraIcon from 'components/Icon'
// import { USER_ACCOUNT_DATA_INDEX } from 'modules/Login/ConstConfig'
import { getAppConfig, initAppConfig } from 'domain/app'
import logo from './img/logo.png'

const USER_ACCOUNT_DATA_INDEX = "userAccount"

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


const Title = ({ title }) => {
  try {
    return (
      <h1 className={styles['title']}>
        {
          title
          ||
          getAppConfig().title
        }
      </h1>
    )
  } catch (e) {
    return <h1 className={styles['title']}>
      {
        initAppConfig().title
      }
    </h1>
  }
}

const Logo = () => {
  try {
    return <img src={logo} alt="logo" className={styles["logo"]} />
  } catch (e) {
    return <img src={initAppConfig().logoURL} alt="logo" className={styles["logo"]} />
  }
}

export default ({ theme, style, mini, onChange, themeOnChange, handle = {}, title, expandable = true, login = false, userData = {} }: Props) => {

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
      <div style={{ float: "left", marginLeft: mini ? -5 : 0 }}>
        <Logo></Logo>
      </div>
      {/* {
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
      } */}
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
      <Title title={title}></Title>
    </header>
  )
}