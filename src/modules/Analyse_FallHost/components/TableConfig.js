/**
 * Created by jojo on 2017/9/5.
 */
import React from 'react';
import styles from './styles.css'
import tableColumnsGenerator from 'utils/tableColumnsGenerator';
import JoTag from 'components/JoTag';
import { Icon, Switch, Card, Timeline, InputNumber, Button } from 'antd';
import classnames from 'classnames';
import * as tools from '../../../utils/tools';
import commonConstConfig from '../../../configs/ConstConfig';
import { filterRowDataIndexes, rowDataIndexes, tableTextConfig } from '../ConstConfig';
import FilterInputNumber from 'components/FilterInputNumber/index';
import TimeLabel from 'components/TimesLabel';
import QueryIPForm from './QueryIPForm'
import FilterDropdownWrapper from 'domainComponents/FilterDropdownWrapper'
import TagList from 'components/TagList'
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
} from '../ConstConfig'

const rowsRenderer = {
  [ATTACK_EVENT_TYPE_LIST_DATAINDEX]: value => (
    <TagList data={value} maxCount={8}></TagList>
  )
};


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



  return tableColumnsGenerator({
    keys: rowDataIndexes,
    titleTextConfig: tableTextConfig.rowTitles,
    filterTextConfig: {
      ...commonConstConfig.textConfig,
      ...filterTextConfig
    },
    filterOptions: filterOptions,
    filteredValue: queryFilters,
    renderer,
    extraProps: {
      [IP_DATAINDEX]: {
        filterIcon: <Icon type="filter" style={{ color: "#108ee9" }} />,
        filterDropdown: <FilterDropdownWrapper style={{ width: "320px" }}>
          <QueryIPForm defaultValue={queryFilters} onSubmit={onQuery}></QueryIPForm>
        </FilterDropdownWrapper>

      }
    }
  });

};


const { expandedRow } = tableTextConfig


class ScrollLoadTimeLine extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      limit: 10
    }
  }
  static defaultProps = {
    data: []
  }
  componentDidMount = () => {
    const { con } = this
    con.addEventListener("scroll", this.limitHandle)
  }
  componentWillUnmount = () => {
    const { con } = this
    con.removeEventListener("scroll", this.limitHandle)
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
        height: "600px",
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
                  <JoTag color="#108ee9">{i.title}</JoTag>
                  <br /><br />
                  {expandedRow.description + ":"}{i[DETAILS_DATAINDEX]}
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
                      <TimeLabel times={attackTime} />
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
    );
  };
};

