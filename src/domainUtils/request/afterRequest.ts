import { isSecret, decrypt } from 'domain/secret'
import delay from 'utils/delay'

const decryptRes = res => {

  if (isSecret()) {
    return res.text().then(text => JSON.parse(decrypt(text)))
  }
  return Promise.resolve(res.json())
}

export default (url: string, options: object, res: any) => {

  return Promise.resolve()
    .then(_ => delay(300))
    .then(_ => decryptRes(res))
}