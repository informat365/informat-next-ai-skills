# _query_table_define_designer

## 技能ID
query_table_define_designer

## 描述
查询指定数据表的配置信息，用于获取该数据表的全部字段信息。

参数说明：
- tableId：数据表 ID，必填。该值来源于调用 [_query_table_list_designer] 接口返回结果中的 id 字段，**禁止自行伪造**。

返回说明：
- 返回一个包含所查询数据表全部字段信息的 JSON 字符串。
- 当字段类型为 ListSelect、Tree 或 Cascader 时，在使用这些字段进行数据筛选时，应使用 optionList 中的 id，而不是 name。
- 当字段配置中的 multiple 属性为 true 时，表示该字段存储的是列表类型数据，**不可使用 eq 等单值比较运算符**。
- 当字段类型为 RelationRecord 时，表示该字段为关联其他数据表的字段，可通过该字段的 ID 查询关联数据表中的信息。

## 工具调用

### 思考
调用_query_table_define_designer工具

### 工具名称
_query_table_define_designer

### 参数
{
  "type": "object",
  "properties": {
    "tableId": {
      "description": "数据表 ID",
      "type": "string"
    }
  },
  "required": [
    "tableId"
  ]
}
