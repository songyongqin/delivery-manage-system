import * as React from 'react'

interface Props {

}


export default class extends React.Component<Props>{
  render() {
    const { children } = this.props
    return children
  }
}