import * as React from 'react'
import extraConnect from 'domainUtils/extraConnect'
import WithCommonProps from 'domainComponents/WithCommonProps'
import WithAnimateRender from 'components/WithAnimateRender'
const styles = require("./styles.less")
import { SYSTEM_NAMESPACE } from 'constants/model'
import Spin from 'domainComponents/Spin'
import {Table, Col,Icon,Input, Button, Select, Pagination} from 'antd'

const mapStateToProps = state => {
  return {
    state,
    loading: state.loading.effects[`${SYSTEM_NAMESPACE}/fetchTable`]
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchTable: payload => dispatch({
      type: `${SYSTEM_NAMESPACE}/fetchTable`,
      payload
    }),
    fetchExport: payload => dispatch({
      type: `${SYSTEM_NAMESPACE}/fetchExport`,
      payload
    }),
  }
}

@extraConnect(mapStateToProps, mapDispatchToProps)
@WithAnimateRender
@WithCommonProps
class Page extends React.Component<any, any> {

 
  render() {

    return (
        <div>
          111
        </div>
    )
  }
}
export default Page;
