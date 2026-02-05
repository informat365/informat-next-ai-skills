# _send_notification

## 技能ID
send_notification

## 描述
发送通知消息。

## 工具调用

### 思考
调用_send_notification工具

### 工具名称
_send_notification

### 参数
{
  "type": "object",
  "properties": {
    "title": {
      "type": "string",
      "description": "通知标题"
    },
    "content": {
      "type": "string",
      "description": "通知内容"
    },
    "accountId": {
      "type": "string",
      "description": "接收通知的账号 ID"
    },
    "type": {
      "type": "string",
      "description": "通知动作类型",
      "enum": [
        "openbpmntask",
        "openurl",
        "openrecord",
        "invokeautomatic"
      ]
    },
    "name": {
      "type": "string",
      "description": "通知名称"
    },
    "urlSetting": {
      "type": "object",
      "description": "链接配置信息（type=openurl 时必填）",
      "properties": {
        "url": {
          "type": "string",
          "description": "链接地址"
        },
        "isAppURL": {
          "type": "boolean",
          "description": "是否应用内链接"
        }
      },
      "additionalProperties": false
    },
    "recordSetting": {
      "type": "object",
      "description": "数据表记录配置信息（type=openrecord 时必填）",
      "properties": {
        "recordId": {
          "type": "string",
          "description": "记录 ID"
        },
        "moduleId": {
          "type": "string",
          "description": "模块 ID"
        }
      },
      "additionalProperties": false
    },
    "bpmnTaskSetting": {
      "type": "object",
      "description": "工作流任务配置信息（type=openbpmntask 时必填）",
      "properties": {
        "taskId": {
          "type": "string",
          "description": "任务 ID"
        },
        "moduleId": {
          "type": "string",
          "description": "模块 ID"
        }
      },
      "additionalProperties": false
    },
    "automaticSetting": {
      "type": "object",
      "description": "调用自动化配置（type=invokeautomatic 时必填）",
      "properties": {
        "automaticId": {
          "type": "string",
          "description": "自动化 ID"
        },
        "args": {
          "type": "array",
          "description": "自动化参数列表",
          "items": {
            "type": "object",
            "properties": {
              "valueVar": {
                "type": "string",
                "description": "参数变量值"
              }
            },
            "additionalProperties": false
          }
        }
      },
      "additionalProperties": false
    }
  },
  "required": [
    "title",
    "content",
    "type"
  ],
  "additionalProperties": false
}
