import * as React from 'react'
import $ from 'jquery'
import 'jquery.nicescroll'

export default class ScrollWrapper extends React.Component<any, any>{
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.initScroll()
  }
  initScroll = () => {
    $(this.con)
      .niceScroll({
        cursorborder: "",
        cursorcolor: "#cccccc",
        boxzoom: false,
        autohidemode: true,
        horizrailenabled: false,
      })
  }
  con = null
  render() {
    const { style = { maxHeight: "500px", overflow: "hidden" }, children } = this.props
    return (
      <div style={style} ref={target => this.con = target}>
        {children}
      </div>
    )
  }
}
