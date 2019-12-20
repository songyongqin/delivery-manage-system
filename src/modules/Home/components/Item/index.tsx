import * as React from 'react'
// import WithCommonProps from 'domainComponents/WithCommonProps'
// import WithAnimateRender from 'components/WithAnimateRender'
const styles = require("./styles.less")
import {ProIoc,CusIoc,TesIoc} from 'components/IconSvg'

export default class ItemCount extends React.Component<any, any> {

  render() {
    const {count, title, icon} = this.props
    return (
      <div className={styles['item']}>
        <div className={styles['wrap']}>
          {
            icon === "ProIoc" ? <ProIoc /> : icon === "CusIoc" ? <CusIoc /> : <TesIoc />
          }
          <div className={styles['count']}>
            <div>{count}</div>
            <div>{title}</div>
          </div>
        </div>
      </div>
    )
  }
}

