import * as React from 'react'
import ScrollWrapper from '../../../../components/ScrollWrapper'

export default (data = []) => {
  if (data.length === 0) {
    return <div></div>
  }
  return (
    <div>
      <p style={{ color: "#40a9ff" }}>共{data.length}条</p>
      <ScrollWrapper>
        {
          data.map((i, index) => {
            return <p style={{ margin: "0" }} key={`${index}`}>{i}</p>
          })
        }
      </ScrollWrapper>
    </div>
  )
}