# _table_record_batch_update

## 技能ID
table_record_batch_update

## 描述
批量更新指定数据表记录。必须按照提示词去更新对应表数据，不得更新与提示词无关的表数据。Args: tableId: 数据表ID，必须填写，数据来自调用_query_all_table_list得到的id字段，不要自己捏造;recordList: 记录列表，记录的key是数据表字段ID。Returns:批量更新数据表的数量

## 工具调用

### 思考
调用_table_record_batch_update工具

### 工具名称
_table_record_batch_update

### 参数
{
  "type": "object",
  "properties": {
    "tableId": {
      "description": "数据表ID",
      "type": "string"
    },
    "recordList": {
      "type": "array",
      "items": {
        "type": "object",
        "description": "记录字段键值对，键为字段ID，值为新数据。如果字段类型为Cascader时，如果是单选存储的结构是数组，如[\"广东省\",\"深圳市\",\"南山区\"]，如果是多选就是二维数组。"
      }
    }
  },
  "required": [
    "tableId",
    "recordList"
  ]
}
