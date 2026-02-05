# _create_table_field_group

## 技能ID
create_table_field_group

## 描述
创建数据表分组。 

## 工具调用

### 思考
调用_create_table_field_group工具

### 工具名称
_create_table_field_group

### 参数
{
  "type": "object",
  "properties": {
    "tableId": {
      "type": "string",
      "description": "数据表ID（必须真实存在）。"
    },
    "name": {
      "type": "string",
      "description": "分组名称"
    }
  },
  "required": [
    "tableId",
    "name"
  ]
}
