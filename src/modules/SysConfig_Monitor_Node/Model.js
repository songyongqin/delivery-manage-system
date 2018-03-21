/**
 * Created by jojo on 2017/8/21.
 */
import monitorModelGenerator from '../../Generators/MonitorModelGenerator'
import {
  NAMESPACE,
} from './ConstConfig'

export default monitorModelGenerator({
  type: "node",
  namespace: NAMESPACE
})