const VERSION_INFO_URL = "/static/versionInfo.json"
import baseRequest from 'utils/request'
import moment from 'moment'
import { primaryColor } from 'themes/vars'

//在控制台打印构建信息
const printInfo = (info) => {
  try {
    console.log(
      `%c版本:${info.version} \n构建时间：${moment(info.buildDate).format("YYYY-MM-DD HH:mm")}`,
      `color:${primaryColor};`
    )
  } catch (e) {
    console.error("Version info init error")
  }
}
//初始化构建信息
const init = () => {
  return baseRequest(VERSION_INFO_URL + `?request-id=${new Date().getTime()}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      }
    }
  ).then(info => {
    printInfo(info)
  }).then(_ => {

  })
}

export default init