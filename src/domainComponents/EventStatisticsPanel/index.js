import styles from './styles.css'
import classnames from 'classnames'
import {
  Row, Col, Modal
} from 'antd'
import {
  textConfig,
  FALL_HOST_DATA_INDEX,
  dataIndexes,
  haveDetailsDataIndexes
} from './ConstConfig'
import CountUp from 'react-countup'
import { routerRedux } from 'dva/router'
import * as tools from 'utils/tools'
import JoIcon from 'components/JoIcon'

const { title, units, items, icons } = textConfig

const spanConfig = { lg: { span: 4 }, md: { span: 8 }, sm: { span: 12 }, xs: { span: 24 } };

export default ({ isDark, data, getDetailsItemOnClickHandle, dispatch }) => {

  const listClasses = classnames({
    [styles["statistic-list"]]: true,
    [styles["statistic-list-dark"]]: isDark,
    ["ant-row-flex"]: true,
    ["ant-row-flex-space-between"]: true,
  });

  const itemClasses = classnames({
    [styles["statistic-item"]]: true,
    ["shadow-hover"]: true,
  });

  const titleClasses = classnames({
    ["secondary-title"]: true,
    ["secondary-title-dark"]: isDark,
  });

  const itemTitleClasses = classnames({
    ["txt-color-dark"]: isDark,
    [styles["title"]]: true,
  });

  const statisticsItems = dataIndexes.map(k => {

    let haveDetails = haveDetailsDataIndexes.includes(k),

      isFallHosts = k === FALL_HOST_DATA_INDEX,

      itemStyles = (haveDetails || isFallHosts)
        ?
        { "cursor": "pointer" }
        :
        null,

      clickHandle = haveDetails
        ?
        getDetailsItemOnClickHandle(k)
        :
        null

    clickHandle = isFallHosts
      ?
      () => {
        dispatch(routerRedux.push("/analyse/fall-host"))
      }
      :
      clickHandle

    return (
      <Col
        {...spanConfig}
        className={styles["statistic-item-wrapper"]}
        key={`item-${k}`}>
        <div style={itemStyles}
          className={itemClasses}
          onClick={clickHandle}>
          <span className={styles["statistic-item-icon"]}>
            {icons[k]}
          </span>
          <p className={styles["counts"]}>
            <CountUp start={0}
              end={data[k] || 0}
              separator={","}
              useGrouping={true}
              duration={1}
              delay={0}
              suffix={units[k]} />
          </p>
          <h3 className={itemTitleClasses}>
            {tools.getKeyText(k, items)}
          </h3>
          {
            haveDetails
              ?
              <span className={styles["statistic-item-check-details"]}>
                <JoIcon type="ellipsis1" />
              </span>
              :
              null
          }
          {
            isFallHosts
              ?
              <span className={styles["statistic-item-check-details"]}>
                <JoIcon type="link2" />
              </span>
              :
              null
          }
        </div>
      </Col>
    )

  })

  return (
    <div>
      <h2 className={titleClasses}>{title}</h2>
      <div className={listClasses}>
        {statisticsItems}
      </div>
    </div>
  )

}