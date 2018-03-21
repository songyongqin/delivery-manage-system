import * as React from 'react'
import { When, Choose, Otherwise } from 'components/ControlStatements'

export default () => {
  return <div>
    <Choose>
      <When condition={false}>
        this is first when statement
      </When>

      <When condition={false}>
        this is second when statement
      </When>

    </Choose>
  </div>
}