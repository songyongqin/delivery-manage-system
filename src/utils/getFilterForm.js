import FilterDropdownWrapper from 'domainComponents/FilterDropdownWrapper'
import SearchFilterForm from 'domainComponents/SearchFilterForm'
import { Icon } from 'antd'
export default ({ dataIndexes = [], queryFilters = {}, onQuery, textConfig = {}, ruleConfig = {} }) => {
  const result = {};

  dataIndexes.forEach(i => {
    result[i] = {
      filterIcon: <Icon type="filter" style={{ color: "#108ee9" }} />,
      filterDropdown: <FilterDropdownWrapper style={{ width: "320px" }}>
        <SearchFilterForm
          config={{
            dataIndex: i,
            placeholder: (textConfig[i] || {}).placeholder,
            label: (textConfig[i] || {}).label,
            rules: ruleConfig[i] || []
          }}
          defaultValue={queryFilters}
          onSubmit={onQuery}>
        </SearchFilterForm>
      </FilterDropdownWrapper>
    }
  })

  return result;
}