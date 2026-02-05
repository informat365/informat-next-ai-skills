# _schedule_query_define_designer

## 技能ID
schedule_query_define_designer

## 描述
根据定时任务 ID 查询单个定时任务的完整定义（只读）

## 工具调用

### 思考
调用_schedule_query_define_designer工具

### 工具名称
_schedule_query_define_designer

### 参数
{
  "type": "object",
  "properties": {
    "id": {
      "type": "string",
      "description": "定时任务 ID（必须真实存在）"
    }
  },
  "required": [
    "id"
  ],
  "additionalProperties": false
}
