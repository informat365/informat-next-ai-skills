# _schedule_run_once

## 技能ID
schedule_run_once

## 描述
立即触发指定定时任务执行一次（不影响调度规则）。

## 工具调用

### 思考
调用_schedule_run_once工具

### 工具名称
_schedule_run_once

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
