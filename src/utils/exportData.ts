import { download } from './download'
/**
 * 该部分主要利用blob对象，在浏览器端 ，直接导出content内容
 */
export default (content, fileName) => {

  try {
    const FinalBlob = Blob
    const blob = new FinalBlob([content])
    const url = URL.createObjectURL(blob)
    download(url, fileName)
  } catch (e) {
    console.error(e)
    throw e
  }
}