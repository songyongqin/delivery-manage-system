
import { SECRET_KEY_NAMESPACE, IV_NAMESPACE } from './ConstConfig'


export default window.sessionStorage.getItem(SECRET_KEY_NAMESPACE) ||
  "1234567812345678"


export const iv = window.sessionStorage.getItem(IV_NAMESPACE) ||
  "1234567812345678"