import * as React from 'react'
import Tag from '../Tagxt'
import ScrollWrapper from '../ScrollWrapper/index'

export default (data = []) => {
  if (data.length === 0) {
    return <div></div>
  }
  return (
    <div>
      <p style={{ color: "#40a9ff" }}>共{data.length}条</p>
      <ScrollWrapper>
        {
          [...data].map((i, index) => {
            return <div key={`${index}`} style={{ marginBottom: "5px" }}>
              <Tag color={"#40a9ff"} overflow={1e5}> {i}</Tag>
            </div>
          })
        }
      </ScrollWrapper>
    </div>
  )
}