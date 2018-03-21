import react from 'react'
import { Tooltip } from 'antd'
export default function Tooltip_({ children, title, placement }) {
  return (
    <Tooltip title={title} placement={placement}>
      {children}
    </Tooltip>
  )
}