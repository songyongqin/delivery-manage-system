```javascript
{
  "columns":[
    {
      "dataIndex":"name",//数据对应的列
      "title":"",//列标题
      "filterType":""//过滤条件类型 【input】【select】,
      
      //select类型的配置
      "filters":[
        {
          "text":"something",//选项显示的文本内容
          "value":"something"//选项实际的值，用于接口
        }
      ],
      "filterMultiple":true//select是否多选,
      "translate":true //是否根据value 从 filters 获取里转化为对应的 text

      //input类型的配置
      //输入规则校验
      "filterInputRule":{
        "required":false,
        "type":"ip", //内置类型 【ip】 【port】 
        "placeholder":"",
        "text":""
      }
    }
  ]
}
```