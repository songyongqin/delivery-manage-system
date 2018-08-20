import * as React from 'react'
import Tag from 'components/Tag'
import { primaryColor } from 'themes/vars'
import ScrollWrapper from 'components/ScrollWrapper'

export default (data = []) => {
  if (data.length === 0) {
    return <div></div>
  }
  return (
    <div>
      <p style={{ color: primaryColor }}>共{data.length}条</p>
      <ScrollWrapper>
        {
          [...data].map((i, index) => {
            return <div key={`${index}`} style={{ marginBottom: "5px" }}>
              <Tag color={primaryColor} overflow={1e5}> {i}</Tag>
            </div>
          })
        }
      </ScrollWrapper>
    </div>
  )
}