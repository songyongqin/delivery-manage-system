import { Icon } from 'antd'
export default (value) => {
  try {
    let isFiltered = Array.isArray(value) ? value.length !== 0 : value.trim().length !== 0

    return isFiltered
      ?
      <Icon type="filter" style={{ color: "#108ee9" }} className="anticon anticon-filter ant-dropdown-trigger" />
      :
      <Icon type="filter" style={{ color: "#999" }} className="anticon anticon-filter ant-dropdown-trigger" />
  } catch (e) {
    return <Icon type="filter" style={{ color: "#999" }} className="anticon anticon-filter ant-dropdown-trigger" />
  }
}
