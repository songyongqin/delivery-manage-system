import * as React from 'react'
import CountUp from 'react-countup'
import classnames from 'classnames'
import {
  Row, Col, Modal, Icon
} from 'antd'
import { routerRedux } from 'dva/router'
import * as tools from 'utils'
import extraConnect from 'domainUtils/extraConnect'
import { EVENT_STATISTICS_NAMESPACE } from 'constants/model'
import Spin from 'domainComponents/Spin'
import ThreatEvent from 'modules/ThreatEvent'
const styles = require("./styles.less")
import ExtraIcon from 'components/Icon'

const STATISTICS_TITLE = "威胁事件分类"

const COUNTS_DATA_INDEX = "counts",
  HIGH_EVENTS_DATA_INDEX = 'highEvents',
  EXPLOITS_DATA_INDEX = "exploits",
  TOOLS_DATA_INDEX = "tools",
  THREAT_INFOS_DATA_INDEX = "threatInfos",
  FALL_HOST_DATA_INDEX = "fallHosts"

const haveDetailsDataIndexes = [
  EXPLOITS_DATA_INDEX,
  TOOLS_DATA_INDEX,
  THREAT_INFOS_DATA_INDEX,
]

const dataIndexes = [
  COUNTS_DATA_INDEX,
  HIGH_EVENTS_DATA_INDEX,
  EXPLOITS_DATA_INDEX,
  TOOLS_DATA_INDEX,
  THREAT_INFOS_DATA_INDEX,
  FALL_HOST_DATA_INDEX
];

const textConfig = {
  title: STATISTICS_TITLE,
  items: {
    [COUNTS_DATA_INDEX]: "攻击次数",
    [HIGH_EVENTS_DATA_INDEX]: "攻击高危次数",
    [EXPLOITS_DATA_INDEX]: "攻击利用漏洞",
    [TOOLS_DATA_INDEX]: "攻击武器",
    [THREAT_INFOS_DATA_INDEX]: "威胁情报",
    [FALL_HOST_DATA_INDEX]: "失陷主机"
  },
  units: {
    [COUNTS_DATA_INDEX]: "次",
    [HIGH_EVENTS_DATA_INDEX]: "起",
    [EXPLOITS_DATA_INDEX]: "个",
    [TOOLS_DATA_INDEX]: "个",
    [THREAT_INFOS_DATA_INDEX]: "条",
    [FALL_HOST_DATA_INDEX]: "台"
  },
  icons: {
    [COUNTS_DATA_INDEX]: <ExtraIcon type="hacker" />,
    [HIGH_EVENTS_DATA_INDEX]: <Icon type="exclamation-circle-o" />,
    [EXPLOITS_DATA_INDEX]: <ExtraIcon type="bug" />,
    [TOOLS_DATA_INDEX]: <ExtraIcon type="eyedropper" />,
    [THREAT_INFOS_DATA_INDEX]: <Icon type="file-text" />,
    [FALL_HOST_DATA_INDEX]: <Icon type="desktop" />
  }
};



const { title, units, items, icons } = textConfig

const spanConfig = { lg: { span: 4 }, md: { span: 8 }, sm: { span: 12 }, xs: { span: 24 } }

const mapStateToProps = state => {
  return {
    loading: state.loading.effects[`${EVENT_STATISTICS_NAMESPACE}/fetch`]
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    fetch: payload => dispatch({
      type: `${EVENT_STATISTICS_NAMESPACE}/fetch`,
      payload
    })
  }
}

@extraConnect(mapStateToProps, mapDispatchToProps)
class 
EventStatistics extends React.Component<any, any>{
  static defaultProps = {
    initialFilters: {}
  }
  constructor(props) {
    super(props)
    this.state = {
      data: {},
      visible: false,
      filters: {
        timestampRange: [],
        ...props.initialFilters,
        activeKey: null
      }
    }
  }
  componentDidMount() {
    this.fetchData(this.state.filters)
  }
  fetchData = (filters) => {
    this.setState({
      filters
    })
    this.props.fetch(filters).then(res => {
      this.setState({
        data: res.statistics || {}
      })
    })
  }
  getDetailsItemOnClickHandle = key => _ => {
    this.setState({
      activeKey: key,
      visible: true
    })
  }
  modalOnCancel = () => this.setState({
    visible: false
  })
  render() {
    const { isDark, dispatch, loading } = this.props
    const { data } = this.state
    const { getDetailsItemOnClickHandle } = this
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
            <div className={styles["counts"]}>
              <CountUp start={0}
                end={data[k] || 0}
                separator={","}
                useGrouping={true}
                duration={1}
                delay={0}
                suffix={units[k]} />
            </div>
            <h3 className={itemTitleClasses}>
              {tools.getKeyText(k, items)}
            </h3>
            {
              haveDetails
                ?
                <span className={styles["statistic-item-check-details"]}>
                  <Icon type="ellipsis" />
                </span>
                :
                null
            }
            {
              isFallHosts
                ?
                <span className={styles["statistic-item-check-details"]}>
                  <Icon type="link" />
                </span>
                :
                null
            }
          </div>
        </Col>
      )

    })

    return (
      <Spin spinning={loading}>
        <div className={listClasses}>
          {statisticsItems}
        </div>
        <Modal
          className={styles["event-modal"]}
          width={"90%"}
          destroyOnClose={true}
          style={{ position: "absolute", top: "30px", bottom: "30px", left: "5%", right: "5%" }}
          visible={this.state.visible}
          onCancel={this.modalOnCancel}
          footer={null}>
          <ThreatEvent
            initialFilters={this.props.initialFilters}
            activeKey={this.state.activeKey}>
          </ThreatEvent>
        </Modal>
      </Spin>
    )
  }
}

export default EventStatistics