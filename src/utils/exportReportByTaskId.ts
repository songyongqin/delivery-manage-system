// import { getReport, exportReport } from 'modules/Report/Services'
import { download } from 'utils'
// import { COMMON_SUCCESS_STATUS } from 'configs/ConstConfig'
// import { panelDataHandleConfigs, BASIC_INFO } from 'modules/Report/components/PanelConfig'
// import { MD5_DATA_INDEX } from 'modules/Report/ConstConfig'
import getAuthURL from './getAuthURL'

import commonRequestCreator from 'domainUtils/commonRequestCreator'
import ApiConfig from 'services/apiConfig'
const httpApi = ApiConfig.http

const exportReport = commonRequestCreator.post(httpApi.ANALYSE_REPORT_EXPORT_URL)


export default (md5) => {
  return new Promise((resolve, reject) => {
    exportReport({ md5 }).then(res => {
      try {
        if (res.status === 1) {
          download(getAuthURL(res.payload))
          resolve()
        }
      } catch (e) {
        reject(e.message)
      }
    })

  })

}