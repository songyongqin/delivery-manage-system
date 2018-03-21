import { connect } from 'dva'
import { createMapDispatchWithPromise } from './dvaExtraDispatch'

export default (mapStateToProps = null, mapDispatchToProps = null) => {

  return connect(mapStateToProps, createMapDispatchWithPromise(mapDispatchToProps))
}