import * as React from 'react'
import MapCharts from './MapCharts'
import { ANALYSE_THREAT_DISTRIBUTION_NAMESPACE } from 'constants/model'
import extraConnect from 'domainUtils/extraConnect'
import { Radio } from 'antd'
import DateRangePicker from 'domainComponents/DateRangePicker'
import Spin from 'domainComponents/Spin'


const mapStateToProps = state => {
  return {
    loading: state.loading.effects[`${ANALYSE_THREAT_DISTRIBUTION_NAMESPACE}/fetch`]
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetch: payload => dispatch({
      type: `${ANALYSE_THREAT_DISTRIBUTION_NAMESPACE}/fetch`,
      payload
    })
  }
}

@extraConnect(mapStateToProps, mapDispatchToProps)
export default class ThreatDistribution extends React.Component<any, any>{
  constructor(props) {
    super(props)
    this.state = {
      filters: {
        timestampRange: []
      },
      mapType: "world",
      data: {
        china: [],
        world: []
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
    this.props.fetch().then(res => {
      this.setState({
        data: res
      })
    })
  }
  mapTypeOnChange = e => {
    this.setState({
      mapType: e.target.value
    })
  }
  timestampRangeOnChange = filters => {
    this.fetchData({
      ...this.state.filters,
      ...filters
    })
  }
  render() {
    const { mapType, data, filters } = this.state
    const { loading } = this.props
    return (
      <div style={{ position: "relative" }}>
        <div style={{ float: "right", position: "absolute", right: "0", top: "-45px" }}>
          <DateRangePicker
            value={filters.timestampRange}
            onChange={this.timestampRangeOnChange}>
          </DateRangePicker>
        </div>
        <Radio.Group
          onChange={this.mapTypeOnChange}
          value={mapType}>
          <Radio.Button value="world">
            全球分布
          </Radio.Button>
          <Radio.Button value="china">
            国内分布
          </Radio.Button>
        </Radio.Group>
        <Spin spinning={loading}>
          <MapCharts
            data={data}
            mapType={mapType} >
          </MapCharts>
        </Spin>
      </div>
    )
  }
}