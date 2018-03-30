import * as React from 'react'
const styles = require("./styles.less")
import columnsCreator from 'domainUtils/columnsCreator'
import Tag from 'components/Tag'
import { Icon, Switch, Timeline, InputNumber, Button } from 'antd'
import classnames from 'classnames'
import * as tools from 'utils'
import {
  // filterRowDataIndexes, 
  rowDataIndexes, tableTextConfig
} from './constants'
import TimeLabel from 'components/TimeLabel'
// import QueryIPForm from './QueryIPForm'
// import FilterDropdownWrapper from 'domainComponents/FilterDropdownWrapper'
import TagList from 'components/TagList'
import Card from 'domainComponents/Card'
import {
  ATTACK_COUNTS_DATAINDEX,
  ITEMS_DATAINDEX,
  ATTACK_EVENT_TYPE_DATAINDEX,
  ATTACK_EVENT_TYPE_LIST_DATAINDEX,
  DESCRIPTION_DATAINDEX,
  ATTACKTIMES_DATAINDEX,
  expandTextConfig,
  sourceTextConfig,
  SOURCE_DATAINDEX,
  HONEYPOT_SOURCE,
  IDS_SOURCE,
  IDS_SOURCE_DES_DOMAIN_DATAINDEX,
  IDS_SOURCE_DES_TARGET_IP_DATAINDEX,
  IDS_SOURCE_DES_TARGET_PORT_DATAINDEX,
  IDS_SOURCE_DES_SOURCE_IP_DATAINDEX,
  IDS_SOURCE_DES_SOURCE_PORT_DATAINDEX,
  IDS_SOURCE_DES_OTHER_DATAINDEX,
  IDS_SOURCE_DES_PROTOCOL_DATAINDEX,
  DETAILS_DATAINDEX,
  IP_DATAINDEX
} from './constants'
import $ from 'jquery'

const rowsRenderer = {
  [ATTACK_EVENT_TYPE_LIST_DATAINDEX]: value => (
    <TagList data={value} maxCount={8}></TagList>
  )
};


// import getFilterIcon from 'utils/getFilterIcon'

export const getColumns = ({
  queryFilters,
  onSubmit,
  filters,
  filterTextConfig,
  onQuery
}) => {
  const renderer = {
    ...rowsRenderer
  },
    filterOptions = {
      ...filters
    };



  return columnsCreator({
    dataIndexes: rowDataIndexes,
    titleConfig: tableTextConfig.rowTitles,
    // filterConfig: {
    //   ...commonConstConfig.textConfig,
    //   ...filterTextConfig
    // },
    // filtersConfig: filterOptions,
    // filteredValue: queryFilters,
    renderer,
    // extraProps: {
    //   [IP_DATAINDEX]: {
    //     filterDropdown: <FilterDropdownWrapper style={{ width: "320px" }}>
    //       <QueryIPForm defaultValue={queryFilters} onSubmit={onQuery}></QueryIPForm>
    //     </FilterDropdownWrapper>,
    //     filterIcon: getFilterIcon(queryFilters[IP_DATAINDEX])
    //   },
    // }
  });

};


const { expandedRow } = tableTextConfig


class ScrollLoadTimeLine extends React.Component<any, any> {
  constructor(props) {
    super(props)
    this.state = {
      limit: 10
    }
  }
  static defaultProps = {
    data: []
  }
  con = null
  initScroll = () => {
    try {
      $(this.con).niceScroll({
        cursorborder: "",
        cursorcolor: "#cccccc",
        boxzoom: false,
        autohidemode: true
      })
    } catch (e) {
      console.error(e)

    }
  }
  componentDidMount() {
    const { con } = this
    this.initScroll()
    con.addEventListener("scroll", this.limitHandle)
  }
  componentDidUpdate() {
    try {
      $(this.con).getNiceScroll().resize()
    } catch (e) {
      console.error(e)
    }
  }
  componentWillUnmount() {
    const { con } = this
    con.removeEventListener("scroll", this.limitHandle)
    $(this.con).getNiceScroll().remove()
  }
  limitHandle = () => {
    try {
      const { con } = this
      const { limit } = this.state
      const { data } = this.props
      if (limit > data.length) {
        return
      }
      if (con.scrollTop + con.clientHeight >= con.scrollHeight) {
        this.setState({
          limit: limit + 10
        })
      }
    } catch (e) {
      console.error(e)
    }
  }
  render() {

    const { data } = this.props
    const { limit } = this.state
    return (
      <div style={{
        maxHeight: "600px",
        overflowY: "scroll",
        overflowX: "hidden",
        paddingTop: "15px",
        maxWidth: "500px"
      }} ref={target => this.con = target}>
        <Timeline>
          {data.slice(0, limit).map((i, index) => {
            return (
              <Timeline.Item key={`${index}-timeline-item`}>
                <div>
                  <Tag color="#108ee9">{i.title}</Tag>
                  <br /><br />
                  {expandedRow.description + ":"}
                  {
                    i[DETAILS_DATAINDEX].map((i, index) => {
                      return <p key={`${index}-item`}>{i}</p>
                    })
                  }
                </div>
              </Timeline.Item>
            )
          })}
        </Timeline>
      </div>
    )

  }
}


export const getExpandedRowRender = ({ isDark }) => {
  return (records) => {

    const classes = classnames({
      ["expanded-row-dark"]: isDark
    });

    const items = records[ITEMS_DATAINDEX] || []



    return (
      <Card title={tools.getKeyText("title", expandedRow)}
        className={classes}>
        {
          items.map((i, index) => {

            let description = i[DESCRIPTION_DATAINDEX] || [],
              eventType = i[ATTACK_EVENT_TYPE_DATAINDEX],
              attackCount = i[ATTACK_COUNTS_DATAINDEX],
              attackTime = i[ATTACKTIMES_DATAINDEX] || [],
              source = i[SOURCE_DATAINDEX]


            return (
              <table key={`${index}-table`} className={styles["expanded-table"]}>
                <tbody>

                  <tr>
                    <td>
                      {tools.getKeyText(ATTACK_EVENT_TYPE_DATAINDEX, expandTextConfig)}
                    </td>
                    <td>
                      {eventType}
                    </td>
                  </tr>


                  <tr>
                    <td>
                      {tools.getKeyText(SOURCE_DATAINDEX, expandTextConfig)}
                    </td>
                    <td>
                      {tools.getKeyText(source, sourceTextConfig)}
                    </td>
                  </tr>


                  <tr>
                    <td>
                      {tools.getKeyText(ATTACK_COUNTS_DATAINDEX, expandTextConfig)}
                    </td>
                    <td>
                      {attackCount}
                    </td>
                  </tr>

                  <tr>
                    <td>
                      {tools.getKeyText(ATTACKTIMES_DATAINDEX, expandTextConfig)}
                    </td>
                    <td>
                      <TimeLabel value={attackTime} />
                    </td>
                  </tr>
                  {
                    source === HONEYPOT_SOURCE
                      ?
                      <tr>
                        <td>
                          {tools.getKeyText(DESCRIPTION_DATAINDEX, expandTextConfig)}
                        </td>
                        <td>
                          <ScrollLoadTimeLine data={description}></ScrollLoadTimeLine>
                        </td>
                      </tr>
                      :
                      null
                  }
                  {
                    source === IDS_SOURCE
                      ?
                      <tr>
                        <td>
                          {tools.getKeyText(DESCRIPTION_DATAINDEX, expandTextConfig)}
                        </td>
                        <td>
                          <div>
                            <TagList data={description} maxCount={8}></TagList>
                          </div>
                        </td>
                      </tr>
                      :
                      null
                  }

                </tbody>
              </table>
            )
          })
        }
      </Card>
    )
  }
}
