import * as React from 'react'
import { Card } from 'antd'
const styles = require("./styles.css")
import classnames from 'classnames'

const WrappedCard = (props) => {
  const { className = "" } = props

  let finalProps = {
    ...props
  }

  try {
  } catch (e) {
    console.error(e)
  }

  const finalClasses = classnames({
    [styles["card"]]: true,
    [className]: true
  })

  return <Card {...finalProps} className={finalClasses}></Card>
}

export default WrappedCard