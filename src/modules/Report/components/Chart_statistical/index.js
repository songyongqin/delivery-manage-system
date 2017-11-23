import BarChart from '../../../../domainComponents/BarChart';
import JoSpin from '../../../../components/JoSpin';
import { Input, Button, Icon, Pagination, Spin } from 'antd';
import { WithAnimateRender } from '../../../../components/HOSComponents';
import { NAMESPACE_CHART } from '../../ConstConfig';
import { connect } from 'dva'
@WithAnimateRender
class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  getContentPanel = () => {
    const { data } = this.props;
    return (
      <BarChart key="bar-chart" data={data} ></BarChart>
    )
  }
  // onExport = () => {
  //   const { timestampRange } = this.props;
  //   const option = { chartStatistic: 1 }
  //   this.props.dispatch({
  //     type: `${NAMESPACE_CHART}/onExport`,
  //     payload:
  //     {
  //       option,
  //       timestampRange
  //     }
  //   });
  // }
  render = () => {
    return (
      <JoSpin spinning={this.props.loading}>
        {/* <div style={{ height: "40px" }} >
          <Button style={{ float: "right" }} type="primary" onClick={this.onExport}>导出</Button>
        </div> */}
        {this.getContentPanel()}

      </JoSpin>
    )
  }
}
function mapStateToProps(state) {
  const { data, loading, timestampRange } = state[NAMESPACE_CHART];
  return {
    data,
    loading: state.loading.effects[`${NAMESPACE_CHART}/fetch`],
    timestampRange,
  };

}

export default connect(mapStateToProps)(Page);