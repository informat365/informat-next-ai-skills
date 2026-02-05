# _table_record_batch_delete

## 技能ID
table_record_batch_delete

## 描述
批量删除指定数据表记录。必须按照提示词去删除对应表数据，不得删除与提示词无关的表数据。Args: tableId: 数据表ID，必须填写，数据来自调用_query_all_table_list得到的id字段，不要自己捏造;recordIdList: 记录ID列表。Returns:批量插入数据表的数量

## 工具调用

### 思考
调用_table_record_batch_delete工具

### 工具名称
_table_record_batch_delete

### 参数
{
  "type": "object",
  "properties": {
    "tableId": {
      "description": "数据表ID",
      "type": "string"
    },
    "recordIdList": {
      "type": "array",
      "items": {
        "type": "string",
        "description": "记录ID列表"
      }
    }
  },
  "required": [
    "tableId",
    "recordIdList"
  ]
}
