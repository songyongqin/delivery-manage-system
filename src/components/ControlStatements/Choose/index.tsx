import * as React from 'react'
import When from 'components/ControlStatements/When'
import Otherwise from 'components/ControlStatements/Otherwise'
import isDev from 'utils/isDev'
interface Props {
  children: React.ReactNode
}

const HEAD = 0

export default class extends React.Component<Props, any>{
  render() {

    const { children } = this.props

    const finalChildren = Array.isArray(children) ? children : [children]

    const whenStatement = finalChildren
      .filter((i: React.ReactElement<any>) => {
        return i.type === When
      })
      .find((i: React.ReactElement<any>) => {
        return i.props.condition
      })
      || null

    const otherwiseStatements = finalChildren
      .filter((i: React.ReactElement<any>) => {
        return i.type === Otherwise
      })

    if (otherwiseStatements.length > 1 && isDev()) {
      console.warn("ControlStatements:<Choose> just support one <Otherwise> statement")
    }

    const otherwiseStatement = otherwiseStatements[HEAD] || <Otherwise>{null}</Otherwise>

    return whenStatement ? whenStatement : otherwiseStatement
  }
}

