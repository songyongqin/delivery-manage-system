
import { ANALYSE_FALL_HOST_NAMESPACE } from 'constants/model'
import * as React from 'react'
import * as tableConfig from './tableConfig'
import WithAnimateRender from 'components/WithAnimateRender'
import TableWithRemote from 'domainComponents/TableWithRemote'
import DateRangePicker from 'domainComponents/DateRangePicker'


const initialFilters = {
  timestampRange: [],
  limit: 20,
  page: 1,
}

@WithAnimateRender
export default class FallHost extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      lastChangeTime: 0,
      filters: {
        ...initialFilters
      }
    }
  }

  timestampRangeOnChange = filters => {
    this.setState({
      filters: { ...initialFilters, ...filters },
      lastChangeTime: new Date().getTime()
    })
  }
  stageOnSubmit = filters => {
    this.setState({
      filters: { ...initialFilters, ...filters },
      lastChangeTime: new Date().getTime()
    })
  }
  render() {

    const { visible, activeKey, lastChangeTime, filters } = this.state


    return (
      <div style={{ position: "relative" }}>
        <div style={{ position: "absolute", right: "0", top: "-45px" }}>
          <DateRangePicker
            value={filters.timestampRange}
            onChange={this.timestampRangeOnChange}>
          </DateRangePicker>
        </div>
        {
          this.props.animateRender([
            <div key="attack-chain">
              <TableWithRemote
                key={`last-event-${lastChangeTime}`}
                initialFilters={{
                  ...initialFilters,
                  ...filters
                }}
                getExpandedRowRenderer={tableConfig.getExpandedRowRender}
                getColumns={tableConfig.getColumns}
                remoteNamespace={ANALYSE_FALL_HOST_NAMESPACE}
              />
            </div>
          ])
        }
      </div>
    )
  }
}