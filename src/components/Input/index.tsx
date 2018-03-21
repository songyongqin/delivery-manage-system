import TextField from 'material-ui/TextField'
import * as React from 'react'



export default class extends React.Component<any, any> {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <TextField
        margin="normal"
        {...this.props}>
      </TextField>
    )
  }
}