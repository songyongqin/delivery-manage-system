import { Icon } from 'antd'
export default (value) => {
  try {
    return value.trim().length !== 0
      ?
      <Icon type="filter" style={{ color: "#108ee9" }} className="anticon anticon-filter ant-dropdown-trigger" />
      :
      <Icon type="filter" style={{ color: "#999" }} className="anticon anticon-filter ant-dropdown-trigger" />
  } catch (e) {
    return <Icon type="filter" style={{ color: "#999" }} className="anticon anticon-filter ant-dropdown-trigger" />
  }
}
