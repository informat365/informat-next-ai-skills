# _edit_table_module

## 技能ID
edit_table_module

## 描述
修改数据表模块信息。

## 工具调用

### 思考
调用_edit_table_module工具

### 工具名称
_edit_table_module

### 参数
{
  "type": "object",
  "properties": {
    "id": {
      "type": "string",
      "description": "数据表 ID（必须真实存在）。"
    },
    "name": {
      "type": "string",
      "description": "数据表名称"
    }
  },
  "required": [
    "id",
    "name"
  ]
}
