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
      data: []
    }
  }
  componentDidMount() {
    this.fetchData(this.props.initialFilters)
  }
  fetchData = (filters) => {
    this.props.fetch(filters).then(res => {
      this.setState({
        data: res
      })
    })
  }
  render() {
    return <div>
      <h4>威胁事件</h4>
      <Choose>
        <When condition={this.props.loading}>
          <Spin spinning={true}>
            <div style={{ height: "480px" }}></div>
          </Spin>
        </When>
        <Otherwise>
          <RankingBarCharts data={this.state.data}></RankingBarCharts>
        </Otherwise>
      </Choose>

    </div>
  }
}