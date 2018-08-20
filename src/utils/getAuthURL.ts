import { getUserKey } from 'utils/domain'

const getAuthInfo = () => {
  try {
    return `${getUserKey()}:openapi`
  } catch (e) {
    console.error(e)
    return ""
  }
}

export default (originURL) => {
  try {
    return originURL
    // const [protocol, path] = originURL.split("//")
    // return `${protocol}//${getAuthInfo()}@${path}`
  } catch (e) {
    console.error(e)
    return originURL
  }
}