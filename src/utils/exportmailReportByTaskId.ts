import { exportReport } from 'modules/MailReport/Services'
import { download } from 'utils'
// import { COMMON_SUCCESS_STATUS } from 'configs/ConstConfig'
import getAuthURL from './getAuthURL'


export default (taskId) => {
  return new Promise((resolve, reject) => {
    exportReport({ taskId }).then(res => {
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