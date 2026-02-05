# _schedule_delete_define

## 技能ID
schedule_delete_define

## 描述
删除指定定时任务。（危险操作，仅在用户明确要求时调用）

## 工具调用

### 思考
调用_schedule_delete_define工具

### 工具名称
_schedule_delete_define

### 参数
{
  "type": "object",
  "properties": {
    "id": {
      "type": "string",
      "description": "定时任务 ID"
    }
  },
  "required": [
    "id"
  ],
  "additionalProperties": false
}
