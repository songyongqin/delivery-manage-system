import * as React from 'react'
import { connect } from 'dva'
import WithCommonProps from 'domainComponents/WithCommonProps'
import WithAnimateRender from 'components/WithAnimateRender'
// const styles = require("./styles.less")
import { DOMAIN_USER_NAMESPACE } from 'constants/model'


const mapStateToProps = state => {
  return {
    postSignLoading: state.loading.effects[`${DOMAIN_USER_NAMESPACE}/${"postSign"}`]
  }
}

const mapDispatchToProps = dispatch => ({

  postSign: payload => dispatch({
    type: `${DOMAIN_USER_NAMESPACE}/${"postSign"}`,
    payload
  })

})

@connect(mapStateToProps, mapDispatchToProps)
@WithAnimateRender
@WithCommonProps
class Page extends React.Component<any, any> {
  render() {
    return (
      <div>
       1
      </div>
    )
  }
}
export default Page;
