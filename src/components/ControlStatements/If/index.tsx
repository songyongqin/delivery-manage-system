import * as React from 'react'

interface Props {
  condition: any
}


export default class extends React.Component<Props, any>{
  render() {

    const { condition, children } = this.props

    return condition
      ?
      children
      :
      null
  }
}