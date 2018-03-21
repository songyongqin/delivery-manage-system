import { download } from './download'
export default (content, fileName) => {

  try {
    const FinalBlob = Blob || _Blob
    const blob = new FinalBlob([content])
    const url = URL.createObjectURL(blob)
    download(url, fileName)
  } catch (e) {
    console.error(e)
    throw e
  }
}