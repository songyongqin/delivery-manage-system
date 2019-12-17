import * as React from 'react'
import extraConnect from 'domainUtils/extraConnect'
import { OVERVIEW_STATISTICS_EVENT_NAMESPACE } from 'constants/model'
import RankingBarCharts from 'domainComponents/RankingBarCharts'
import Spin from 'domainComponents/Spin'
import { Choose, When, Otherwise } from 'components/ControlStatements'

const mapStateToProps = state => {
  return {
    loading: state.loading.effects[`${OVERVIEW_STATISTICS_EVENT_NAMESPACE}/fetch`]
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetch: payload => dispatch({
      type: `${OVERVIEW_STATISTICS_EVENT_NAMESPACE}/fetch`,
      payload
    })
  }
}

@extraConnect(mapStateToProps, mapDispatchToProps)
export default class extends React.Component<any, any>{
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      initial: false
    }
  }
  componentDidMount() {
    this.fetchData(this.props.initialFilters)
  }
  componentWillReceiveProps(nextProps) {
    const updateFilters = nextProps.initialFilters === this.props.initialFilters
    if (!updateFilters) {
      this.fetchData(nextProps.initialFilters)
    }
  }
  fetchData = (filters) => {
    this.props.fetch(filters)
      .then(res => {
        this.setState({
          data: res,
        })
      })
      .then(_ => {
        this.setState({
          initial: true
        })
      })
  }
  render() {

    const { initial, data } = this.state

    return (
      <div>
        <h4>威脅事件</h4>
        <Spin spinning={this.props.loading}>
          <Choose>
            <When condition={initial}>
              <RankingBarCharts data={data}></RankingBarCharts>
            </When>
            <Otherwise>
              <div style={{ minHeight: "480px" }}>
              </div>
            </Otherwise>
          </Choose>
        </Spin>
      </div>
    )
  }
}