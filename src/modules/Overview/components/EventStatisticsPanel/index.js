import EventStatisticsPanel from "domainComponents/EventStatisticsPanel"
import { WithCommonConnect, WithCommonTableHandle, WithModal, WithContainerHeader } from 'domainComponents/HOSComponents'
import {
  STATISTICS_NAMESPACE
} from '../../ConstConfig';
import * as tools from 'utils/tools.js';
import JoSpin from 'components/JoSpin'
const { compose } = tools;

const StatisticsPanel = ({
  queryLoading,
  isDark,
  results,
  dispatch,
  getDetailsItemOnClickHandle
}) => {

  return (
    <JoSpin spinning={queryLoading}>
      <EventStatisticsPanel
        dispatch={dispatch}
        isDark={isDark}
        data={results.statistics}
        getDetailsItemOnClickHandle={getDetailsItemOnClickHandle}
      >
      </EventStatisticsPanel>
    </JoSpin>
  )

}


export default compose(
  WithCommonConnect(STATISTICS_NAMESPACE)
)(StatisticsPanel)