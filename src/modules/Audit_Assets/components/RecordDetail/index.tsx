import * as React from 'react'
import { Steps } from 'antd'
import TableWithRemote from 'domainComponents/TableWithRemote'
import { ASSETS_RECORD_NAMESPACE } from 'constants/model'
import Card from 'domainComponents/Card'
import TreeCharts from 'domainComponents/TreeCharts/async'
import extraConnect from 'domainUtils/extraConnect'
import TreeChartsRL from 'domainComponents/TreeChartsRL/async'
const Step = Steps.Step;

@extraConnect(
  state => {
    return {
    }
  },
  dispatch => {
    return {
      fetchRecordDetail: payload => dispatch(
        {
          type: `${ASSETS_RECORD_NAMESPACE}/fetchRecordDetail`,
          payload
        }
      ),
    }
  }
)
export default class LastEvent extends React.PureComponent<any, any>{
  constructor(props) {
    super(props)
    this.state = {
      newAssets: [],
      newPort: [],
      initialFilters: {
        page: 1,
        limit: 20,
      }
    }
  }
  componentDidMount() {

    this.props.fetchRecordDetail({ scanTime: this.props.scanTime }).then(res => this.setState({ newAssets: res.newAssets, newPort: res.newPort, }))
  }


  formatData = (data) =>
    data.map((i) => {
      const a = i.portService.map((j) => {
        return {
          name: j.port,
          children: [
            {
              name: j.service,
              value: j.service
            }
          ]
        }
      }
      )
      return { name: i.ip, children: a }
    }
    )

  render() {
    const { newAssets, newPort } = this.state;
    const newAssetsData = this.formatData(newAssets);
    const newPortData = this.formatData(newPort);
    const a = {
      "name": "flare",
      "children": [
        {
          "name": "animate",
          "children": [
            { "name": "Easing", "value": 17010 },
            { "name": "FunctionSequence", "value": 5842 },
            {
              "name": "interpolate",
              "children": [
                { "name": "ArrayInterpolator", "value": 1983 },
                { "name": "ColorInterpolator", "value": 2047 },
                { "name": "DateInterpolator", "value": 1375 },
                { "name": "Interpolator", "value": 8746 },
                { "name": "MatrixInterpolator", "value": 2202 },
                { "name": "NumberInterpolator", "value": 1382 },
                { "name": "ObjectInterpolator", "value": 1629 },
                { "name": "PointInterpolator", "value": 1675 },
                { "name": "RectangleInterpolator", "value": 2042 }
              ]
            },
            { "name": "ISchedulable", "value": 1041 },
            { "name": "Parallel", "value": 5176 },
            { "name": "Pause", "value": 449 },
            { "name": "Scheduler", "value": 5593 },
            { "name": "Sequence", "value": 5534 },
            { "name": "Transition", "value": 9201 },
            { "name": "Transitioner", "value": 19975 },
            { "name": "TransitionEvent", "value": 1116 },
            { "name": "Tween", "value": 6006 }
          ]
        },
        {
          "name": "data",
          "children": [
            {
              "name": "converters",
              "children": [
                { "name": "Converters", "value": 721 },
                { "name": "DelimitedTextConverter", "value": 4294 },
                { "name": "GraphMLConverter", "value": 9800 },
                { "name": "IDataConverter", "value": 1314 },
                { "name": "JSONConverter", "value": 2220 }
              ]
            },
            { "name": "DataField", "value": 1759 },
            { "name": "DataSchema", "value": 2165 },
            { "name": "DataSet", "value": 586 },
            { "name": "DataSource", "value": 3331 },
            { "name": "DataTable", "value": 772 },
            { "name": "DataUtil", "value": 3322 }
          ]
        },
        {
          "name": "display",
          "children": [
            { "name": "DirtySprite", "value": 8833 },
            { "name": "LineSprite", "value": 1732 },
            { "name": "RectSprite", "value": 3623 },
            { "name": "TextSprite", "value": 10066 }
          ]
        },
      ]
    }

    return (
      <div>
        <div>
          <h3>新增资产</h3>
          <Steps progressDot style={{ width: "60%" }}>
            <Step title="IP" />
            <Step title="端口" status="process" />
            <Step title="服务" status="process" />
          </Steps>

          {newAssetsData.map((i, index) => <TreeCharts key={index} data={[i]}></TreeCharts>)}
        </div>
        <div>
          <h3>新增端口</h3>
          <Steps progressDot style={{ width: "60%" }}>
            <Step title="端口" />
            <Step title="服务" status="process" />
            <Step title="所属IP" status="process" />
          </Steps>

          {newPortData.map((i, index) => <TreeCharts key={index} data={[i]}></TreeCharts>)}
        </div>

      </div>

    )
  }
}