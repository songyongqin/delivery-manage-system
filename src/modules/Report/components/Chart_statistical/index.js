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
    const { splitResults, options, loading } = this.props;
    return (
      <div key="bar list">
        {
          options.map((i, index) => {
            return (
              <JoSpin key={`bar-chart-${index}`}>
                <BarChart data={splitResults[i] || []} ></BarChart>
              </JoSpin>
            )
          })
        }
      </div>
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
        {this.getContentPanel()}
      </JoSpin>
    )
  }
}
function mapStateToProps(state) {
  const { splitResults, loading, timestampRange, options } = state[NAMESPACE_CHART];
  return {
    splitResults,
    options,
    loading: state.loading.effects[`${NAMESPACE_CHART}/fetch`],
    timestampRange,
  };

}

export default connect(mapStateToProps)(Page);