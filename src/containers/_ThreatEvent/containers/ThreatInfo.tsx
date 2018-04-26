import { getThreatInfoColumns } from '../tableConfig'
import commonTableContainerCreator from 'domainUtils/commonTableContainerCreator'
import { THREAT_EVENT_THREAT_INFO_NAMESPACE } from 'constants/model'
import { LIGHT_THEME } from 'constants/theme'

const initialFilters = {
  timestampRange: [],
  limit: 5,
  page: 1,
}

export default commonTableContainerCreator({
  getColumns: getThreatInfoColumns,
  initialFilters,
  namespace: THREAT_EVENT_THREAT_INFO_NAMESPACE,
  theme: LIGHT_THEME,
})