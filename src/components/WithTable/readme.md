

### 引用
```
//@config array 传入的columns中的基础配置
//理想的格式是这样的
//config= [{title:'姓名', 
//            dataIndex:'name', 
//            searchRule: 'ip'||'ipport'  可选参数，校验规则
//            types=['sorter'||'filters'||'search'||'detail'] }]
//注意，为了支持拓展性，types改为array类型，里面是字符串
//@contants object 内有filter与selectDetail参数，其中filter书筛选数组的，selectDetail为有详情页时传入的参数，数组形式，例['1']，可选
//@tableBeforeFetch function 触发此函数是，将会给与一个obj,带有table表格的change参数
//@Detail ReactNode 可选参数，当table有详情时使用
<MyTable  tableData={ this.state.tableData }
          constants = { constants }
          tableBeforeFetch = { this.tableBeforeFetch }
          Detail={ Detail }
          config={ columns }  />
```