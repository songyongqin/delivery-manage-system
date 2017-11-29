import JoTag from '../JoTag'
import React from 'react'
import { Popover } from 'antd'
const LAYOUT_X = "x",
  LAYOUT_Y = "y"

const defaultProps = {
  layout: LAYOUT_X,
  maxCount: null,
  showExtraBtn: true,
  tagItemProps: {},
  data: [],
  color: "#108ee9",
  style: {},
  extraContentStyle: {}
}


export default class TagList extends React.Component {
  static defaultProps = defaultProps
  constructor(props) {
    super(props)
  }
  render = () => {
    const { data, tagItemProps, maxCount, showExtraBtn, color, style, extraContentStyle } = this.props
    if (maxCount) {
      const list = data.slice(0, maxCount).map((i, index) => (
        <JoTag
          color={color}
          key={`${index}-tag-item`}
          {...tagItemProps}>
          {i}
        </JoTag>
      ))

      const contentStyle = data.length - maxCount > 1 ?
        {
          width: "440px",
          maxHeight: "400px",
          overflowY: "scroll",
          ...extraContentStyle
        }
        :
        extraContentStyle

      data.length > maxCount && list.push(
        <Popover
          key="extra-tag-item"
          arrowPointAtCenter={true}
          autoAdjustOverflow={true}
          content={
            <div style={contentStyle}>
              <TagList
                style={{ textAlign: "center" }}
                color={color}
                maxCount={null}
                data={data.slice(maxCount)}>
              </TagList>
            </div>
          }>
          <JoTag style={{ cursor: "pointer" }}>
            {`...`}
          </JoTag>
        </Popover>
      )
      return <div style={style}>{list}</div>
    }
    return (
      <div style={style}>
        {
          data.map((i, index) => (
            <JoTag
              color={color}
              key={`${index}-tag-item`}
              style={data.length === 0 ? { marginBottom: 0 } : {}}
              {...tagItemProps}>
              {i}
            </JoTag>
          ))
        }
      </div>
    )
  }
}