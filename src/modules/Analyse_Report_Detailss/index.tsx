import * as React from 'react'
import { connect } from 'dva'
import WithCommonProps from 'domainComponents/WithCommonProps'
import { Link, withRouter } from 'dva/router'
import {FILE_REPORT} from './ConstConfig'


const mapStateToProps = state => {
  return {

  }
}

const mapDispatchToProps = dispatch => {
  return {
    getDetail: payload => dispatch({
      type: `${FILE_REPORT}/detail`,
      payload
    }),
  }
}

@withRouter
@WithCommonProps
@connect(mapStateToProps, mapDispatchToProps)
export default class Page extends React.Component<any, any> {
  state = {
  }
  componentDidMount() {
    this.props.getDetail()
    .then(res => {
      console.log(11, res)
    })
  }
  render() {
    return (
      <div>
      111
      </div>
    )
  }
}

