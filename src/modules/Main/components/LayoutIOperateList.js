/**
 * Created by jojo on 2017/8/23.
 */
import styles from './LayoutOperateList.css';
import Icon from '../../../components/JoIcon';
import classnames from 'classnames';
export default ({status={},handle={},isDark})=>{

  const classes=classnames({
    [styles["layout-operate-list"]]:true,
    [styles["layout-operate-list-dark"]]:isDark,
  })

  return (
    <ul className={classes}>
      <li className={styles["item"]} key="nav">
        <a onClick={handle.nav}>
          {status.nav
            ?<Icon type="menuunfold"/>
            :<Icon type="menufold"/>
          }
        </a>
      </li>
      <li className={styles["item"]} key="theme">
        <a onClick={handle.theme}>

          {status.theme
            ?
            <Icon type="sun2"/>
            :
            <Icon type="night"/>
          }
        </a>
      </li>
      <li className={styles["item"]} key="lang">
        <a onClick={handle.lang}>
          {
            status.lang?"EN":"ZH"
          }
        </a>
      </li>
    </ul>
  )
}
