# _schedule_create_define

## 技能ID
schedule_create_define

## 描述
创建新的定时任务定义。

## 工具调用

### 思考
调用_schedule_create_define工具

### 工具名称
_schedule_create_define

### 参数
{
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "description": "定时任务名称"
    },
    "type": {
      "type": "string",
      "description": "定时任务类型",
      "enum": [
        "default",
        "cron"
      ]
    },
    "cron": {
      "type": "string",
      "description": "cron 表达式（type=cron 时必填）"
    },
    "invokeType": {
      "type": "string",
      "description": "调用类型",
      "enum": [
        "automatic",
        "script"
      ]
    },
    "automaticId": {
      "type": "string",
      "description": "自动化 ID（invokeType=automatic 时）"
    },
    "scriptId": {
      "type": "string",
      "description": "脚本 ID（invokeType=script 时）"
    },
    "scriptFunc": {
      "type": "string",
      "description": "脚本函数名（invokeType=script 时）"
    },
    "schedulePeriod": {
      "type": "string",
      "description": "调度周期（非 cron）",
      "enum": [
        "day",
        "week",
        "dualweek",
        "month",
        "interval"
      ]
    },
    "scheduleWeekList": {
      "type": "array",
      "description": "周调度列表（1-7）",
      "items": {
        "type": "integer",
        "minimum": 1,
        "maximum": 7
      }
    },
    "scheduleDayList": {
      "type": "array",
      "description": "月调度列表（1-31）",
      "items": {
        "type": "integer",
        "minimum": 1,
        "maximum": 31
      }
    },
    "scheduleTriggeredTime": {
      "type": "string",
      "format": "date-time",
      "description": "首次触发时间"
    },
    "scheduleInterval": {
      "type": "integer",
      "description": "间隔执行时间（分钟）"
    },
    "retryCount": {
      "type": "integer",
      "description": "失败重试次数（最大 10）",
      "minimum": 0,
      "maximum": 10
    },
    "misfireHandlingType": {
      "type": "string",
      "description": "失火处理策略"
    },
    "misfireThreshold": {
      "type": "integer",
      "description": "失火阈值（秒）"
    },
    "isEnable": {
      "type": "boolean",
      "description": "是否启用",
      "default": true
    },
    "serverIdList": {
      "type": "string",
      "description": "允许执行的服务ID列表（逗号分隔）"
    }
  },
  "required": [
    "name",
    "type",
    "invokeType"
  ],
  "additionalProperties": false
}
