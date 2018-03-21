import * as React from 'react'
import { connect } from 'dva'
import { SET_UP_NAMESPACE } from 'constants/model'

@connect(state => {
  return {
    ...state[SET_UP_NAMESPACE] || {},
  }
})
export default class extends React.Component<any, any>{
  constructor(props) {
    super(props)
  }
  render() {
    const { initialDependencies } = this.props

    return (
      <div >
        <pre>
          {JSON.stringify(initialDependencies, null, 2)}
        </pre>
      </div>
    )
  }
}
