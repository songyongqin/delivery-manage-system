
import { SECRET_KEY_NAMESPACE } from './ConstConfig'


export default window.sessionStorage.getItem(SECRET_KEY_NAMESPACE) ||
  "this is something you can never guess"