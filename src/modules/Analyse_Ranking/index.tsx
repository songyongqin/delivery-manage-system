import * as React from 'react'
import { ANALYSE_RANKING_NAMESPACE, ANALYSE_RANKING_OPTION_NAMESPACE } from 'constants/model'
import extraConnect from 'domainUtils/extraConnect'
import RankingBarCharts from 'domainComponents/RankingBarCharts'
import Spin from 'domainComponents/Spin'
import { Choose, When, Otherwise } from 'components/ControlStatements'
import DateRangePicker from 'domainComponents/DateRangePicker'

@extraConnect(
  null,
  dispatch => {
    return {
      fetch: payload => dispatch({
        type: `${ANALYSE_RANKING_NAMESPACE}/fetch`,
        payload
      })
    }
  })
class AnalyseRakingItem extends React.Component<any, any>{
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      loading: false,
      filters: props.initialFilters || {}
    }
  }
  componentDidMount() {
    this.fetchData(this.state.filters)
  }
  fetchData = (payload) => {

    this.setState({
      loading: true
    })

    this.props.fetch(payload)
      .then(res => {
        this.setState({
          data: res
        })
      })
      .then(_ => {
        this.setState({
          loading: false
        })
      })
  }

  render() {
    const { loading, data } = this.state
    return (
      <Choose>
        <When condition={loading}>
          <Spin spinning={loading}>
            <div style={{ height: "480px" }}></div>
          </Spin>
        </When>
        <Otherwise>
          <RankingBarCharts data={data}></RankingBarCharts>
        </Otherwise>
      </Choose>
    )
  }
}

const mapStateToProps = state => {
  return {
    loading: state.loading.effects[`${ANALYSE_RANKING_OPTION_NAMESPACE}/fetch`]
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchOption: _ => dispatch({
      type: `${ANALYSE_RANKING_OPTION_NAMESPACE}/fetch`,
    }),
  }
}

@extraConnect(mapStateToProps, mapDispatchToProps)
export default class AnalyseRanking extends React.Component<any, any>{
  constructor(props) {
    super(props)
    this.state = {
      options: [],
      filters: {
        timestampRange: []
      },
      lastReqTime: 0
    }
  }
  componentDidMount() {
    this.fetchOption()
  }
  fetchOption = () => {
    this.props.fetchOption().then(res => {
      this.setState({
        options: res
      })
    })
  }
  timestampRangeOnChange = filters => {
    this.setState({
      filters: {
        ...this.state.filters,
        ...filters
      },
      lastReqTime: new Date().getTime()
    })
  }
  render() {

    const { filters } = this.state
    const { loading } = this.props

    return (
      <Choose>
        <When condition={loading}>
          <Spin spinning={loading}>
            <div style={{ minHeight: "500px" }}>
            </div>
          </Spin>
        </When>
        <Otherwise>
          <div style={{ position: "relative" }}>
            <div style={{ float: "right", position: "absolute", right: "0", top: "-45px" }}>
              <DateRangePicker
                value={filters.timestampRange}
                onChange={this.timestampRangeOnChange}>
              </DateRangePicker>
            </div>
            {
              this.state.options.map((option, index) => {
                return (
                  <AnalyseRakingItem
                    initialFilters={{ ...filters, option }}
                    key={`${index}-${this.state.lastReqTime}-option-item`}>
                  </AnalyseRakingItem>
                )
              })
            }
          </div>
        </Otherwise>
      </Choose>
    )
  }
} 