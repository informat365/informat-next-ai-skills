# _schedule_update_define

## 技能ID
schedule_update_define

## 描述
更新已有定时任务定义。必须通过 updateFieldList 明确声明本次要修改的字段。

## 工具调用

### 思考
调用_schedule_update_define工具

### 工具名称
_schedule_update_define

### 参数
{
  "type": "object",
  "properties": {
    "id": {
      "type": "string",
      "description": "定时任务 ID"
    },
    "updateFieldList": {
      "type": "array",
      "description": "本次需要更新的字段列表",
      "items": {
        "type": "string",
        "pattern": "^[a-zA-Z][a-zA-Z0-9]*$"
      }
    },
    "name": {
      "type": "string"
    },
    "type": {
      "type": "string",
      "enum": [
        "default",
        "cron"
      ]
    },
    "cron": {
      "type": "string"
    },
    "invokeType": {
      "type": "string",
      "enum": [
        "automatic",
        "script"
      ]
    },
    "automaticId": {
      "type": "string"
    },
    "scriptId": {
      "type": "string"
    },
    "scriptFunc": {
      "type": "string"
    },
    "schedulePeriod": {
      "type": "string",
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
      "items": {
        "type": "integer",
        "minimum": 1,
        "maximum": 7
      }
    },
    "scheduleDayList": {
      "type": "array",
      "items": {
        "type": "integer",
        "minimum": 1,
        "maximum": 31
      }
    },
    "scheduleTriggeredTime": {
      "type": "string",
      "format": "date-time"
    },
    "scheduleInterval": {
      "type": "integer"
    },
    "retryCount": {
      "type": "integer",
      "minimum": 0,
      "maximum": 10
    },
    "misfireHandlingType": {
      "type": "string"
    },
    "misfireThreshold": {
      "type": "integer"
    },
    "isEnable": {
      "type": "boolean"
    },
    "serverIdList": {
      "type": "string"
    }
  },
  "required": [
    "id",
    "updateFieldList"
  ],
  "additionalProperties": false
}
