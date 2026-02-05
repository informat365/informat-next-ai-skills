# _query_table_field_designer

## 技能ID
query_table_field_designer

## 描述
查询指定数据表中某个字段的详细配置信息。可获取该数据表字段的全部信息。

参数说明：
- tableId：数据表 ID。该值来源于调用 _query_table_list_designer 接口返回结果中的 id 字段，**禁止自行伪造**。
- fieldId：字段 ID。该值来源于调用 _query_table_define_designer 接口返回结果中 fieldList 内的字段 id。

返回说明：
- 返回指定数据表字段的完整配置信息。

## 工具调用

### 思考
调用_query_table_field_designer工具

### 工具名称
_query_table_field_designer

### 参数
{
  "type": "object",
  "properties": {
    "tableId": {
      "description": "数据表 ID",
      "type": "string"
    },
    "fieldId": {
      "description": "字段 ID",
      "type": "string"
    }
  },
  "required": [
    "tableId",
    "fieldId"
  ]
}
