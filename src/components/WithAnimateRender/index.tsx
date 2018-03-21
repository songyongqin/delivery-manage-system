import QueueAnim from 'rc-queue-anim'
import * as React from 'react'

const defaultOptions = {
  isAnimate: true,
  type: "right",
  interval: 300,
  duration: 800
}


export default (WrappedComponent): any => {
  return class extends React.Component<any, any> {
    animateRender = (children, options = defaultOptions) => {

      const { isAnimate, type, interval, duration } = options;

      if (!isAnimate) {
        return children
      }

      return (
        <QueueAnim type={type} interval={interval} duration={duration}>
          {children}
        </QueueAnim>
      )

    };
    render() {
      return <WrappedComponent {...this.props} animateRender={this.animateRender} />
    }
  }
};