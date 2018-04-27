import { isSecret, decrypt } from 'domain/secret'
import delay from 'utils/delay'

const decryptRes = res => {
  //判断是否需要进行解密
  if (isSecret()) {
    return res.text().then(text => JSON.parse(decrypt(text)))
  }
  return Promise.resolve(res.json())
}

export default (url: string, options: object, res: any) => {

  return Promise.resolve()
    //将请求返回的内容 延迟300毫秒返回 ，原因：请求返回过快导致页面动画过渡不自然
    .then(_ => delay(300))
    //解密返回的内容
    .then(_ => decryptRes(res))
}